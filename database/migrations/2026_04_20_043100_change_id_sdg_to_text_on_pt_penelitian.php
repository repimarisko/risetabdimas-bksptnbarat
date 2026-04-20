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
        Schema::table('pt_penelitian', function (Blueprint $table) {
            $table->dropForeign(['id_sdg']);
        });

        Schema::table('pt_penelitian', function (Blueprint $table) {
            $table->text('id_sdg')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pt_penelitian', function (Blueprint $table) {
            $table->string('id_sdg', 100)->nullable()->change();
        });

        Schema::table('pt_penelitian', function (Blueprint $table) {
            $table->foreign('id_sdg')->references('uuid')->on('ref_sdg');
        });
    }
};
