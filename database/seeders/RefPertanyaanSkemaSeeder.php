<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RefPertanyaanSkemaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ref_pertanyaan_skema')->insert([
            [
                'id' => '1419b3fb-24d9-4b73-947c-944899901e30',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'be4c4678-a0cf-4e1a-bbce-4f892ff8d90c',
                'pertanyaan' => 'Publikasi, kekayaan intelektual, buku ketua pengusul yang disitasi pada proposal',
                'bobot' => 5,
                'created_at' => '2026-02-23 23:32:44',
                'updated_at' => '2026-02-23 23:32:44',
            ],
            [
                'id' => '16e33004-9dbb-4ee2-b661-4dddb2449514',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3',
                'pertanyaan' => 'State of the art dan kebaruan',
                'bobot' => 10,
                'created_at' => '2026-02-23 23:39:36',
                'updated_at' => '2026-02-23 23:39:36',
            ],
            [
                'id' => '66658335-2604-46f8-826e-65470644eb11',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'f732b5a3-3b70-4b59-bec6-21232bd59ad2',
                'pertanyaan' => 'Kejelasan pembagian tugas tim peneliti',
                'bobot' => 5,
                'created_at' => '2026-02-23 23:40:25',
                'updated_at' => '2026-02-23 23:40:25',
            ],
            [
                'id' => '7f006329-99a3-4e48-bb2b-c423fb4bcabf',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'f732b5a3-3b70-4b59-bec6-21232bd59ad2',
                'pertanyaan' => 'Kredibilitas mitra dan bentuk dukungan',
                'bobot' => 5,
                'created_at' => '2026-02-23 23:40:53',
                'updated_at' => '2026-02-23 23:40:53',
            ],
            [
                'id' => '99109f41-7260-426b-89e4-5bb6869af3be',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'f732b5a3-3b70-4b59-bec6-21232bd59ad2',
                'pertanyaan' => 'Kesesuaian metode dengan waktu, luaran dan fasilitas',
                'bobot' => 5,
                'created_at' => '2026-02-23 23:40:36',
                'updated_at' => '2026-02-23 23:40:36',
            ],
            [
                'id' => 'a5efe52c-972b-4049-9374-79b3b7d571b3',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'be4c4678-a0cf-4e1a-bbce-4f892ff8d90c',
                'pertanyaan' => 'Jumlah kolaborator publikasi jurnal bereputasi internasional',
                'bobot' => 5,
                'created_at' => '2026-02-23 23:33:24',
                'updated_at' => '2026-02-23 23:33:24',
            ],
            [
                'id' => 'af9655da-efc6-44db-9e8c-7d86dba38ad9',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'be4c4678-a0cf-4e1a-bbce-4f892ff8d90c',
                'pertanyaan' => 'Relevansi kepakaran pengusul dengan tema proposal (kata kunci)',
                'bobot' => 5,
                'created_at' => '2026-02-23 23:33:06',
                'updated_at' => '2026-02-23 23:33:06',
            ],
            [
                'id' => 'b6a5c098-42b4-4fa2-b40b-83ee5fd3417a',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'dc442208-36a3-4203-aa70-4ac0c03baa7a',
                'pertanyaan' => 'Kebaruan referensi',
                'bobot' => 5,
                'created_at' => '2026-02-23 23:41:08',
                'updated_at' => '2026-02-23 23:41:08',
            ],
            [
                'id' => 'badad23b-2836-43ce-a3a4-7075b3392fe3',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'f732b5a3-3b70-4b59-bec6-21232bd59ad2',
                'pertanyaan' => 'Akurasi metode penelitian',
                'bobot' => 10,
                'created_at' => '2026-02-23 23:40:05',
                'updated_at' => '2026-02-23 23:40:05',
            ],
            [
                'id' => 'c00b3c8c-2cb7-4cdf-8dbd-6e88181af11f',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3',
                'pertanyaan' => 'Akurasi peta jalan (roadmap) penelitian',
                'bobot' => 10,
                'created_at' => '2026-02-23 23:39:47',
                'updated_at' => '2026-02-23 23:39:47',
            ],
            [
                'id' => 'c51e39aa-0ed9-4b96-9824-3d1bbceabd05',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'dc442208-36a3-4203-aa70-4ac0c03baa7a',
                'pertanyaan' => 'Relevansi dan kualitas referensi',
                'bobot' => 10,
                'created_at' => '2026-02-23 23:41:26',
                'updated_at' => '2026-02-23 23:43:32',
            ],
            [
                'id' => 'd43a28fd-bc63-498b-ae73-6691e8fb821d',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3',
                'pertanyaan' => 'Ketajaman perumusan Masalah',
                'bobot' => 15,
                'created_at' => '2026-02-23 23:33:56',
                'updated_at' => '2026-02-23 23:33:56',
            ],
            [
                'id' => 'e8f0187e-f91b-4535-b601-9e01119d851b',
                'uuid_skema' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'uuid_jenis' => 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3',
                'pertanyaan' => 'Inovasi pendekatan pemecahan masalah',
                'bobot' => 10,
                'created_at' => '2026-02-23 23:39:09',
                'updated_at' => '2026-02-23 23:39:20',
            ],
        ]);
    }
}
