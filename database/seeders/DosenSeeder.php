<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\RefPerguruanTinggi;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DosenSeeder extends Seeder
{
    public function run(): void
    {
        $ptList = RefPerguruanTinggi::all();

        foreach ($ptList as $pt) {
            $slug = Str::slug($pt->nama_singkat ?: $pt->nama, '');

            $dosenList = [
                [
                    'name' => 'Dosen 1 ' . ($pt->nama_singkat ?: $pt->nama),
                    'email' => 'dosen1.' . strtolower($slug) . '@example.com',
                    'nidn' =>  str_pad((string) rand(1, 9999), 4, '0', STR_PAD_LEFT) . '01',
                    'uuid_pt' => $pt->uuid,
                ],
                [
                    'name' => 'Dosen 2 ' . ($pt->nama_singkat ?: $pt->nama),
                    'email' => 'dosen2.' . strtolower($slug) . '@example.com',
                    'nidn' =>  str_pad((string) rand(1, 9999), 4, '0', STR_PAD_LEFT) . '02',
                    'uuid_pt' => $pt->uuid,
                ],
            ];

            foreach ($dosenList as $data) {
                $password = 'password';

                $user = User::firstOrCreate(
                    ['email' => $data['email']],
                    [
                        'name' => $data['name'],
                        'password' => Hash::make($password),
                        'email_verified_at' => now(),
                        'role' => User::ROLE_DOSEN ?? 'dosen',
                        'uuid_pt' => $data['uuid_pt'],
                    ]
                );

                $user->assignRole('dosen');

                if ($user->uuid_pt !== $data['uuid_pt'] || $user->role !== 'dosen') {
                    $user->forceFill([
                        'uuid_pt' => $data['uuid_pt'],
                        'role' => 'dosen',
                    ])->save();
                }

                Dosen::updateOrCreate(
                    ['id_user' => $user->id],
                    [
                        'nidn' => $data['nidn'],
                        'email' => $data['email'],
                        'uuid_pt' => $data['uuid_pt'],
                        'created_by' => $user->id,
                        'verified_at' => now(),
                        'verified_by' => $user->id,
                    ]
                );
            }
        }
    }
}
