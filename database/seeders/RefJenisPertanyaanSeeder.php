<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RefJenisPertanyaanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ref_jenis_pertanyaan')->insert([
            [
                'id' => 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3',
                'nomor_urut' => 2,
                'jenis' => 'Urgensi Penelitian',
                'created_at' => '2026-02-23 23:31:12',
                'updated_at' => '2026-02-23 23:31:12',
            ],
            [
                'id' => 'be4c4678-a0cf-4e1a-bbce-4f892ff8d90c',
                'nomor_urut' => 1,
                'jenis' => 'Rekam jejak yang relevan',
                'created_at' => '2026-02-23 23:31:00',
                'updated_at' => '2026-02-23 23:31:00',
            ],
            [
                'id' => 'dc442208-36a3-4203-aa70-4ac0c03baa7a',
                'nomor_urut' => 4,
                'jenis' => 'Referensi',
                'created_at' => '2026-02-23 23:31:35',
                'updated_at' => '2026-02-23 23:31:35',
            ],
            [
                'id' => 'f732b5a3-3b70-4b59-bec6-21232bd59ad2',
                'nomor_urut' => 3,
                'jenis' => 'Metode',
                'created_at' => '2026-02-23 23:31:23',
                'updated_at' => '2026-02-23 23:31:23',
            ],
        ]);
    }
}
