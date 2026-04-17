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
        Schema::create('pt_penelitian_anggota_approvals', function (Blueprint $table): void {
            $table->id();
            $table->unsignedBigInteger('anggota_id');
            $table->string('dosen_uuid', 100);
            $table->enum('status', ['pending', 'approved'])->default('pending');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->foreign('anggota_id')
                ->references('id')
                ->on('pt_penelitian_anggotas')
                ->cascadeOnDelete();

            $table->foreign('dosen_uuid')
                ->references('uuid')
                ->on('dosen')
                ->cascadeOnDelete();

            $table->unique(['anggota_id', 'dosen_uuid']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pt_penelitian_anggota_approvals');
    }
};
