<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $tables = [
            'pt_rab_tahun_1',
            'pt_rab_tahun_2',
            'pt_rab_tahun_3',
            'pt_rab_tahun_4',
        ];

        foreach ($tables as $table) {
            // Step 1: Hapus AUTO_INCREMENT dulu, ubah ke int biasa
            DB::statement("ALTER TABLE `{$table}` MODIFY `uuid` INT(10) UNSIGNED NOT NULL");

            // Step 2: Baru drop primary key
            DB::statement("ALTER TABLE `{$table}` DROP PRIMARY KEY");

            // Step 3: Ubah tipe kolom uuid dari int -> varchar(36)
            DB::statement("ALTER TABLE `{$table}` MODIFY `uuid` VARCHAR(36) NOT NULL");

            // Step 4: Set uuid sebagai primary key
            DB::statement("ALTER TABLE `{$table}` ADD PRIMARY KEY (`uuid`)");
        }
    }

    public function down(): void
    {
        $tables = [
            'pt_rab_tahun_1',
            'pt_rab_tahun_2',
            'pt_rab_tahun_3',
            'pt_rab_tahun_4',
        ];

        foreach ($tables as $table) {
            DB::statement("ALTER TABLE `{$table}` DROP PRIMARY KEY");
            DB::statement("ALTER TABLE `{$table}` MODIFY `uuid` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT");
            DB::statement("ALTER TABLE `{$table}` ADD PRIMARY KEY (`uuid`)");
        }
    }
};
