<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pt_penelitian', function (Blueprint $table) {
            // 1. drop foreign key
            $table->dropForeign('pt_penelitian_id_sdg_foreign');

            // 2. drop index pakai nama yang SAMA
            $table->dropIndex('pt_penelitian_id_sdg_foreign');
        });

        Schema::table('pt_penelitian', function (Blueprint $table) {
            // 3. baru ubah ke TEXT
            $table->text('id_sdg')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('pt_penelitian', function (Blueprint $table) {
            $table->string('id_sdg', 100)->nullable()->change();
        });

        Schema::table('pt_penelitian', function (Blueprint $table) {
            $table->index('id_sdg');
            $table->foreign('id_sdg')
                ->references('uuid')
                ->on('ref_sdg')
                ->onDelete('cascade');
        });
    }
};
