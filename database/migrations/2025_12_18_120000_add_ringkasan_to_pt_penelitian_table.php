<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('pt_penelitian')) {
            return;
        }

        Schema::table('pt_penelitian', function (Blueprint $table): void {
            if (! Schema::hasColumn('pt_penelitian', 'ringkasan')) {
                $table->text('ringkasan')->nullable()->after('id_fokus');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('pt_penelitian')) {
            return;
        }

        Schema::table('pt_penelitian', function (Blueprint $table): void {
            if (Schema::hasColumn('pt_penelitian', 'ringkasan')) {
                $table->dropColumn('ringkasan');
            }
        });
    }
};
