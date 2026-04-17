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
        $this->createRabTable('pt_rab_tahun_1');
        $this->createRabTable('pt_rab_tahun_2');
        $this->createRabTable('pt_rab_tahun_3');
        $this->createRabTable('pt_rab_tahun_4');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pt_rab_tahun_4');
        Schema::dropIfExists('pt_rab_tahun_3');
        Schema::dropIfExists('pt_rab_tahun_2');
        Schema::dropIfExists('pt_rab_tahun_1');
    }

    /**
     * Create a pt_rab_tahun table with the shared structure.
     */
    private function createRabTable(string $tableName): void
    {
        Schema::create($tableName, function (Blueprint $table) {
            $table->increments('uuid');
            $table->string('id_penelitian', 100);
            $table->unsignedInteger('id_komponen')->nullable();
            $table->string('nama_item', 255)->nullable();
            $table->double('jumlah_item')->nullable();
            $table->double('harga_satuan')->nullable();
            $table->double('total_biaya')->nullable();
            $table->integer('id_satuan')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('id_penelitian')->references('uuid')->on('pt_penelitian');
            $table->foreign('id_komponen')->references('id')->on('ref_komponen_biaya');
        });
    }
};
