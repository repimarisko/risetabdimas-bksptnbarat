<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pt_penelitian', function (Blueprint $table): void {
            if (! Schema::hasColumn('pt_penelitian', 'uuid_pt')) {
                $table->string('uuid_pt', 100)
                    ->nullable()
                    ->after('status');

                $table->foreign('uuid_pt')
                    ->references('uuid')
                    ->on('ref_perguruan_tinggi')
                    ->nullOnDelete();
            }
        });

        if (Schema::hasTable('pt_penelitian')) {
            DB::table('pt_penelitian')
                ->select('uuid', 'created_by')
                ->orderBy('uuid')
                ->chunkById(100, function ($rows) {
                    foreach ($rows as $row) {
                        if (! $row->created_by) {
                            continue;
                        }

                        $uuidPt = DB::table('users')
                            ->where('id', $row->created_by)
                            ->value('uuid_pt');

                        if (! $uuidPt) {
                            $uuidPt = DB::table('dosen')
                                ->where('id_user', $row->created_by)
                                ->value('uuid_pt');
                        }

                        if (! $uuidPt) {
                            continue;
                        }

                        DB::table('pt_penelitian')
                            ->where('uuid', $row->uuid)
                            ->update(['uuid_pt' => $uuidPt]);
                    }
                }, 'uuid');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pt_penelitian', function (Blueprint $table): void {
            if (Schema::hasColumn('pt_penelitian', 'uuid_pt')) {
                $table->dropForeign(['uuid_pt']);
                $table->dropColumn('uuid_pt');
            }
        });
    }
};
