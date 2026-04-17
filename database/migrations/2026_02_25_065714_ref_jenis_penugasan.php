<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ref_jenis_penugasan', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nama', 100);
            $table->timestamps();
        });

        DB::table('ref_jenis_penugasan')->insert([
            ['id' => 1, 'nama' => 'Administrasi', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'nama' => 'Substansi',    'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('ref_jenis_penugasan');
    }
};
