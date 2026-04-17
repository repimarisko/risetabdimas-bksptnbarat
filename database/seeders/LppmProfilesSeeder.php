<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LppmProfilesSeeder extends Seeder
{
    /**
     * Jalankan seeder database.
     */
    public function run(): void
    {
        // Contoh ambil satu UUID dari tabel ref_perguruan_tinggi (asumsi sudah ada datanya)
        $uuidPt = DB::table('ref_perguruan_tinggi')->value('uuid') ?? Str::uuid();

        DB::table('lppm_profiles')->insert([
            [
                'uuid_pt'        => $uuidPt,
                'nomor_sk'       => 'SK-001/LPPM/2025',
                'nama_lembaga'   => 'Lembaga Penelitian dan Pengabdian kepada Masyarakat Universitas Contoh',
                'alamat'         => 'Jl. Pendidikan No. 45, Kota Ilmu, Indonesia',
                'telepon'        => '0751-123456',
                'fax'            => '0751-654321',
                'email'          => 'lppm@univcontoh.ac.id',
                'website'        => 'https://lppm.univcontoh.ac.id',
                'nama_jabatan'   => 'Kepala LPPM',
                'nidn_pimpinan'  => '0011223344',
                'nama_pimpinan'  => 'Dr. Ahmad Santoso',
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
        ]);
    }
}
