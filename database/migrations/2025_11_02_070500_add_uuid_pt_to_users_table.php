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
        Schema::table('users', function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'uuid_pt')) {
                $table->string('uuid_pt', 100)
                    ->nullable()
                    ->after('role');

                $table->foreign('uuid_pt')
                    ->references('uuid')
                    ->on('ref_perguruan_tinggi')
                    ->nullOnDelete();
            }
        });

        if (Schema::hasTable('dosen')) {
            DB::table('dosen')
                ->select('uuid', 'id_user', 'uuid_pt')
                ->orderBy('uuid')
                ->chunkById(100, function ($rows) {
                    foreach ($rows as $row) {
                        if (! $row->id_user || ! $row->uuid_pt) {
                            continue;
                        }

                        DB::table('users')
                            ->where('id', $row->id_user)
                            ->update(['uuid_pt' => $row->uuid_pt]);
                    }
                }, 'uuid');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            if (Schema::hasColumn('users', 'uuid_pt')) {
                $table->dropForeign(['uuid_pt']);
                $table->dropColumn('uuid_pt');
            }
        });
    }
};
