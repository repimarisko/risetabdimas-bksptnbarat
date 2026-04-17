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
        Schema::create('ref_perguruan_tinggi', function (Blueprint $table) {
            $table->string('uuid', 100)->primary();
            $table->string('nama', 255);
            $table->string('nama_singkat', 100);
            $table->string('id_pt', 100);
            $table->text('alamat')->nullable();
            $table->timestamps();
        });

        Schema::create('dosen', function (Blueprint $table) {
            $table->string('uuid', 100)->primary();
            $table->string('nidn', 50)->nullable();
            $table->foreignId('id_user')->constrained('users')->cascadeOnDelete();
            $table->string('email', 255)->unique();
            $table->string('uuid_pt', 100);
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('uuid_pt')->references('uuid')->on('ref_perguruan_tinggi')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dosen');
        Schema::dropIfExists('ref_perguruan_tinggi');
    }
};
