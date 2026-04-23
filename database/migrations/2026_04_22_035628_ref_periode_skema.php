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
        // Hapus dulu tabelnya jika sempat terbuat setengah jalan agar tidak "already exists"
        Schema::dropIfExists('ref_periode_skema');

        Schema::create('ref_periode_skema', function (Blueprint $table) {
            // Gunakan char(36) agar persis sama dengan struktur UUID manual
            $table->char('id', 36)->primary();
            $table->char('uuid_skema', 36)->index(); // Jangan gunakan foreignUuid dulu

            $table->char('periode', 5);
            $table->string('nama_periode', 100);
            $table->year('tahun');
            $table->dateTime('tanggal_mulai');
            $table->dateTime('tanggal_selesai');
            $table->dateTime('tanggal_akhir_acc');
            $table->dateTime('tanggal_akhir_submit');
            $table->boolean('is_active')->default(false);
            $table->timestamps();

            // Deklarasikan foreign key di baris terpisah
            $table->foreign('uuid_skema')
                ->references('uuid')
                ->on('ref_skema')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_periode_skema');
    }
};
