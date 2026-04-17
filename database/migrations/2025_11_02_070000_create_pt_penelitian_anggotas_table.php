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
        Schema::create('pt_penelitian_anggotas', function (Blueprint $table): void {
            $table->id();
            $table->string('penelitian_uuid', 100);
            $table->string('dosen_uuid', 100);
            $table->string('peran', 100)->nullable();
            $table->string('tugas', 255)->nullable();
            $table->timestamps();

            $table->foreign('penelitian_uuid')
                ->references('uuid')
                ->on('pt_penelitian')
                ->cascadeOnDelete();

            $table->foreign('dosen_uuid')
                ->references('uuid')
                ->on('dosen')
                ->cascadeOnDelete();

            $table->unique(['penelitian_uuid', 'dosen_uuid', 'peran'], 'penelitian_dosen_peran_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pt_penelitian_anggotas');
    }
};

