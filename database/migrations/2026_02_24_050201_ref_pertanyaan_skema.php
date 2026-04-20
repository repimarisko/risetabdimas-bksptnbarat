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
        Schema::create('ref_pertanyaan_skema', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('uuid_skema');
            $table->uuid('uuid_jenis');

            $table->text('pertanyaan');
            $table->integer('bobot')->default(0);

            $table->timestamps();

            // Foreign key ke ref_skema — references 'uuid' karena PK-nya uuid
            $table->foreign('uuid_skema')
                ->references('uuid')        // ← fix: 'uuid' bukan 'id'
                ->on('ref_skema')
                ->cascadeOnDelete();

            // Foreign key ke ref_jenis_pertanyaan
            $table->foreign('uuid_jenis')
                ->references('id')
                ->on('ref_jenis_pertanyaan')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ref_pertanyaan_skema');
    }
};
