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
        Schema::create('pt_penelitian_reviews', function (Blueprint $table): void {
            $table->id();
            $table->string('penelitian_uuid', 100);
            $table->foreignId('reviewer_id')->constrained('users')->cascadeOnDelete();
            $table->string('rekomendasi', 50)->nullable();
            $table->unsignedTinyInteger('skor_kualitas')->nullable();
            $table->unsignedTinyInteger('skor_rab')->nullable();
            $table->text('catatan_umum')->nullable();
            $table->text('catatan_rab')->nullable();
            $table->timestamps();

            $table->foreign('penelitian_uuid')
                ->references('uuid')
                ->on('pt_penelitian')
                ->cascadeOnDelete();

            $table->unique(['penelitian_uuid', 'reviewer_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pt_penelitian_reviews');
    }
};
