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
        Schema::create('ref_skema', function (Blueprint $table) {
            $table->string('uuid', 100)->primary();
            $table->string('jenis_skema', 255)->nullable();
            $table->string('nama', 255)->nullable();
            $table->string('nama_singkat', 100)->nullable();
            $table->boolean('multi_tahun')->nullable();
            $table->double('biaya_minimal')->nullable();
            $table->double('biaya_maksimal')->nullable();
            $table->string('sumber_dana', 255)->nullable();
            $table->integer('anggota_min')->nullable();
            $table->integer('anggota_max')->nullable();
            $table->date('mulai')->nullable();
            $table->date('selesai')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('status', 50)->nullable();
        });

        Schema::create('ref_fokus', function (Blueprint $table) {
            $table->string('uuid', 100)->primary();
            $table->string('fokus', 255)->nullable();
            $table->timestamp('created_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
        });

        Schema::create('ref_sdg', function (Blueprint $table) {
            $table->string('uuid', 100)->primary();
            $table->string('sdg', 255)->nullable();
            $table->integer('level')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
        });

        Schema::create('ref_tkt', function (Blueprint $table) {
            $table->string('uuid', 100)->primary();
            $table->string('tkt', 255)->nullable();
            $table->integer('level')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
        });

        Schema::create('ref_komponen_biaya', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_komponen_rab')->nullable();
            $table->string('jenis', 10)->nullable();
            $table->string('nama_komponen', 255)->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_komponen_biaya');
        Schema::dropIfExists('ref_tkt');
        Schema::dropIfExists('ref_sdg');
        Schema::dropIfExists('ref_fokus');
        Schema::dropIfExists('ref_skema');
    }
};
