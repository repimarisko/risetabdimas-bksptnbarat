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
        Schema::create('lppm_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('uuid_pt', 100)->unique();
            $table->string('nomor_sk')->nullable();
            $table->string('nama_lembaga')->nullable();
            $table->text('alamat')->nullable();
            $table->string('telepon')->nullable();
            $table->string('fax')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('nama_jabatan')->nullable();
            $table->string('nidn_pimpinan')->nullable();
            $table->string('nama_pimpinan')->nullable();
            $table->timestamps();

            $table
                ->foreign('uuid_pt')
                ->references('uuid')
                ->on('ref_perguruan_tinggi')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lppm_profiles');
    }
};
