<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ref_pertanyaan_administrasi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('nomor_urut');
            $table->text('pertanyaan');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        DB::table('ref_pertanyaan_administrasi')->insert([
            ['id' => \Illuminate\Support\Str::uuid(), 'nomor_urut' => 1, 'pertanyaan' => 'Kesesuaian isi per bab',                                                  'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => \Illuminate\Support\Str::uuid(), 'nomor_urut' => 2, 'pertanyaan' => 'Jumlah kata per bagian',                                                  'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => \Illuminate\Support\Str::uuid(), 'nomor_urut' => 3, 'pertanyaan' => 'Model penulisan sitasi dan penulisan Daftar Pustaka',                     'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => \Illuminate\Support\Str::uuid(), 'nomor_urut' => 4, 'pertanyaan' => 'Kelengkapan Proposal (Cover, Identitas, Usulan, Substansi dan Lampiran)', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        Schema::create('pt_review_administrasi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('id_penugasan', 36); // ← ganti unsignedBigIntegerclear
            $table->enum('hasil', ['Lolos', 'Tidak Lolos'])->nullable();
            $table->text('komentar')->nullable();
            $table->enum('status_review', ['Draft', 'Selesai'])->default('Draft');
            $table->unsignedBigInteger('created_by'); // ← sesuai users.id
            $table->timestamps();

            $table->foreign('id_penugasan')
                ->references('id')
                ->on('pt_penugasan_review')
                ->onDelete('cascade');

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');
        });

        Schema::create('pt_review_administrasi_detail', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('id_review');
            $table->uuid('id_pertanyaan');
            $table->boolean('jawaban')->nullable();
            $table->timestamps();

            $table->foreign('id_review')
                ->references('id')
                ->on('pt_review_administrasi')
                ->onDelete('cascade');

            $table->foreign('id_pertanyaan')
                ->references('id')
                ->on('ref_pertanyaan_administrasi')
                ->onDelete('restrict');

            $table->unique(['id_review', 'id_pertanyaan']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pt_review_administrasi_detail');
        Schema::dropIfExists('pt_review_administrasi');
        Schema::dropIfExists('ref_pertanyaan_administrasi');
    }
};
