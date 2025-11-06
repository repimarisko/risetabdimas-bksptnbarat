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
        Schema::create('pt_penelitian', function (Blueprint $table) {
            $table->string('uuid', 100)->primary();
            $table->string('title', 255);
            $table->string('id_skema', 100)->nullable();
            $table->string('id_tkt', 100)->nullable();
            $table->string('id_sdg', 100)->nullable();
            $table->string('id_fokus', 100)->nullable();

            $table->double('biaya_usulan_1')->nullable();
            $table->double('biaya_usulan_2')->nullable();
            $table->double('biaya_usulan_3')->nullable();
            $table->double('biaya_usulan_4')->nullable();
            $table->double('biaya_disetujui')->nullable();

            $table->integer('tahun')->nullable();
            $table->integer('tahun_pelaksanaan')->nullable();
            $table->string('status', 50)->nullable();
            $table->text('target_luaran')->nullable();
            $table->string('email_pengusul', 255)->nullable();

            // timestamps
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable(); // ✅ kolom baru ditambahkan di sini
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('deleted_at')->nullable();
            $table->foreignId('deleted_by')->nullable()->constrained('users')->nullOnDelete();

            // foreign key relations
            $table->foreign('id_skema')->references('uuid')->on('ref_skema');
            $table->foreign('id_tkt')->references('uuid')->on('ref_tkt');
            $table->foreign('id_sdg')->references('uuid')->on('ref_sdg');
            $table->foreign('id_fokus')->references('uuid')->on('ref_fokus');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pt_penelitian');
    }
};
