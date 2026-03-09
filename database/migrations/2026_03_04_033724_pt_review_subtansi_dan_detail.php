<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Table: pt_review_substansi
        |--------------------------------------------------------------------------
        */
        Schema::create('pt_review_substansi', function (Blueprint $table) {

            $table->uuid('id')->primary();

            $table->uuid('id_penugasan');
            $table->text('komentar')->nullable();
            $table->integer('nilai_akhir')->nullable();
            $table->enum('status_review', ['Draft', 'Selesai'])->default('Draft');
            $table->uuid('created_by')->nullable();
            $table->timestamps();

            $table->foreign('id_penugasan')
                ->references('id')
                ->on('pt_penugasan_review')
                ->onDelete('cascade');
        });


        /*
        |--------------------------------------------------------------------------
        | Table: pt_review_substansi_detail
        |--------------------------------------------------------------------------
        */
        Schema::create('pt_review_substansi_detail', function (Blueprint $table) {

            $table->uuid('id')->primary();

            $table->uuid('id_review');
            $table->uuid('id_pertanyaan');
            $table->integer('bobot')->nullable();
            $table->integer('nilai')->nullable();
            $table->text('komentar')->nullable();

            $table->timestamps();

            $table->foreign('id_review')
                ->references('id')
                ->on('pt_review_substansi')
                ->onDelete('cascade');

            $table->foreign('id_pertanyaan')
                ->references('id')
                ->on('ref_pertanyaan_skema')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pt_review_substansi_detail');
        Schema::dropIfExists('pt_review_substansi');
    }
};
