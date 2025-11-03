<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RefTablesSeeder extends Seeder
{
    /**
     * Seed reference tables that share the `ref_` prefix.
     */
    public function run(): void
    {
        $now = now();

        DB::table('ref_perguruan_tinggi')->upsert([
            [
                'uuid' => '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01',
                'nama' => 'Universitas Contoh Nusantara',
                'nama_singkat' => 'UCN',
                'id_pt' => 'PT-001',
                'alamat' => 'Jl. Ilmiah No. 123, Jakarta',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'uuid' => '0a7f9626-2390-43a9-82fa-3ab87ff9a27b',
                'nama' => 'Institut Teknologi Samudra',
                'nama_singkat' => 'ITS',
                'id_pt' => 'PT-002',
                'alamat' => 'Jl. Samudra Raya No. 45, Surabaya',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'uuid' => '17d65870-9cb3-49c7-a095-0ebe65a0be43',
                'nama' => 'Politeknik Negeri Angkasa',
                'nama_singkat' => 'POLNA',
                'id_pt' => 'PT-003',
                'alamat' => 'Jl. Angkasa No. 7, Bandung',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['uuid'], ['nama', 'nama_singkat', 'id_pt', 'alamat', 'updated_at']);

        DB::table('ref_skema')->upsert([
            [
                'uuid' => 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12',
                'jenis_skema' => 'Penelitian',
                'nama' => 'Penelitian Dasar Unggulan',
                'nama_singkat' => 'PDU',
                'multi_tahun' => true,
                'biaya_minimal' => 50000000,
                'biaya_maksimal' => 150000000,
                'sumber_dana' => 'Internal',
                'anggota_min' => 3,
                'anggota_max' => 5,
                'mulai' => '2025-01-01',
                'selesai' => '2025-12-31',
                'created_at' => $now,
                'created_by' => null,
                'updated_at' => $now,
                'deleted_at' => null,
                'status' => 'aktif',
            ],
            [
                'uuid' => '87d2d454-24b8-4fd5-9031-02ba9bc2a1d2',
                'jenis_skema' => 'Penelitian',
                'nama' => 'Penelitian Terapan',
                'nama_singkat' => 'PTN',
                'multi_tahun' => true,
                'biaya_minimal' => 75000000,
                'biaya_maksimal' => 200000000,
                'sumber_dana' => 'LPDP',
                'anggota_min' => 4,
                'anggota_max' => 6,
                'mulai' => '2025-02-01',
                'selesai' => '2026-01-31',
                'created_at' => $now,
                'created_by' => null,
                'updated_at' => $now,
                'deleted_at' => null,
                'status' => 'aktif',
            ],
            [
                'uuid' => '34de00c7-1a1c-4cc9-8d07-98b236c9d399',
                'jenis_skema' => 'Pengabdian',
                'nama' => 'Kemitraan Masyarakat',
                'nama_singkat' => 'KPM',
                'multi_tahun' => false,
                'biaya_minimal' => 20000000,
                'biaya_maksimal' => 75000000,
                'sumber_dana' => 'DRPM',
                'anggota_min' => 2,
                'anggota_max' => 4,
                'mulai' => '2025-03-01',
                'selesai' => '2025-09-30',
                'created_at' => $now,
                'created_by' => null,
                'updated_at' => $now,
                'deleted_at' => null,
                'status' => 'aktif',
            ],
        ], ['uuid'], [
            'jenis_skema',
            'nama',
            'nama_singkat',
            'multi_tahun',
            'biaya_minimal',
            'biaya_maksimal',
            'sumber_dana',
            'anggota_min',
            'anggota_max',
            'mulai',
            'selesai',
            'created_by',
            'updated_at',
            'deleted_at',
            'status',
        ]);

        DB::table('ref_fokus')->upsert([
            [
                'uuid' => 'f4a3b5f7-8c5d-4a71-9b53-6ef620a43112',
                'fokus' => 'Ketahanan Pangan',
                'created_at' => $now,
                'created_by' => null,
            ],
            [
                'uuid' => 'db29f914-cf33-4692-8532-522a0aa96ab6',
                'fokus' => 'Energi Terbarukan',
                'created_at' => $now,
                'created_by' => null,
            ],
            [
                'uuid' => '9721b041-3a54-4975-80df-b796cf38bcdd',
                'fokus' => 'Teknologi Kesehatan',
                'created_at' => $now,
                'created_by' => null,
            ],
        ], ['uuid'], ['fokus', 'created_by']);

        DB::table('ref_sdg')->upsert([
            [
                'uuid' => 'b02ce966-49b1-4e89-944d-2bb3770a3489',
                'sdg' => 'Tanpa Kemiskinan',
                'level' => 1,
                'created_at' => $now,
                'created_by' => null,
            ],
            [
                'uuid' => '0bc0ed8e-03b6-4f35-adab-b1dfdddcbbc6',
                'sdg' => 'Pendidikan Berkualitas',
                'level' => 4,
                'created_at' => $now,
                'created_by' => null,
            ],
            [
                'uuid' => '19d64911-1d9c-48eb-85c4-50dbfad8473c',
                'sdg' => 'Energi Bersih dan Terjangkau',
                'level' => 7,
                'created_at' => $now,
                'created_by' => null,
            ],
        ], ['uuid'], ['sdg', 'level', 'created_by']);

        DB::table('ref_tkt')->upsert([
            [
                'uuid' => 'fd3b21a9-0c89-4fe1-85a3-ed3f13d7a2fc',
                'tkt' => 'Konsep dasar divalidasi',
                'level' => 3,
                'created_at' => $now,
                'created_by' => null,
            ],
            [
                'uuid' => '7a8c2e5c-9455-4c9e-996a-1ca5bde42a55',
                'tkt' => 'Prototipe laboratorium',
                'level' => 5,
                'created_at' => $now,
                'created_by' => null,
            ],
            [
                'uuid' => '3a13cafb-96f5-4e6a-9c83-2852db66b56f',
                'tkt' => 'Validasi lapangan',
                'level' => 7,
                'created_at' => $now,
                'created_by' => null,
            ],
        ], ['uuid'], ['tkt', 'level', 'created_by']);

        DB::table('ref_komponen_biaya')->upsert([
            [
                'id' => 1,
                'id_komponen_rab' => 1001,
                'jenis' => 'HON',
                'nama_komponen' => 'Honorarium Peneliti',
                'keterangan' => 'Honor untuk ketua dan anggota tim peneliti',
                'created_at' => $now,
                'updated_at' => $now,
                'deleted_at' => null,
            ],
            [
                'id' => 2,
                'id_komponen_rab' => 1002,
                'jenis' => 'OPS',
                'nama_komponen' => 'Operasional Laboratorium',
                'keterangan' => 'Pembelian bahan habis pakai laboratorium',
                'created_at' => $now,
                'updated_at' => $now,
                'deleted_at' => null,
            ],
            [
                'id' => 3,
                'id_komponen_rab' => 1003,
                'jenis' => 'PER',
                'nama_komponen' => 'Peralatan Pendukung',
                'keterangan' => 'Peralatan untuk menunjang pelaksanaan penelitian',
                'created_at' => $now,
                'updated_at' => $now,
                'deleted_at' => null,
            ],
            [
                'id' => 4,
                'id_komponen_rab' => 2001,
                'jenis' => 'MDK',
                'nama_komponen' => 'Pengabdian Masyarakat',
                'keterangan' => 'Biaya kegiatan sosialisasi dan pendampingan masyarakat',
                'created_at' => $now,
                'updated_at' => $now,
                'deleted_at' => null,
            ],
            [
                'id' => 5,
                'id_komponen_rab' => 2002,
                'jenis' => 'ADM',
                'nama_komponen' => 'Administrasi',
                'keterangan' => 'Biaya administrasi dan pelaporan kegiatan',
                'created_at' => $now,
                'updated_at' => $now,
                'deleted_at' => null,
            ],
        ], ['id'], [
            'id_komponen_rab',
            'jenis',
            'nama_komponen',
            'keterangan',
            'updated_at',
            'deleted_at',
        ]);
    }
}

