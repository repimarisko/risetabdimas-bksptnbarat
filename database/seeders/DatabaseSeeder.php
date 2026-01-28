<?php

namespace Database\Seeders;

use App\Models\RefPerguruanTinggi;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RefTablesSeeder::class);

        $roles = [
            'super-admin',
            'admin-pt',
            'ketua-lppm',
            'dosen',
            'reviewer',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role, 'guard_name' => 'web'],
                []
            );
        }

        $this->call(MenuSeeder::class);

        $defaultPerguruanTinggi = RefPerguruanTinggi::firstOrCreate(
            ['uuid' => '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01'],
            [
                'nama' => 'Universitas Contoh Nusantara',
                'nama_singkat' => 'UCN',
                'id_pt' => 'PT-001',
                'alamat' => 'Jl. Ilmiah No. 123, Jakarta',
            ]
        );

        $users = [
            [
                'role' => 'super-admin',
                'name' => 'Super Admin',
                'email' => 'superadmin@example.com',
                'uuid_pt' => null,
            ],
            [
                'role' => 'admin-pt',
                'name' => 'Admin PT UCN',
                'email' => 'adminpt.ucn@example.com',
                'uuid_pt' => $defaultPerguruanTinggi->uuid,
            ],
            [
                'role' => 'admin-pt',
                'name' => 'Admin PT ITS',
                'email' => 'adminpt.its@example.com',
                'uuid_pt' => '0a7f9626-2390-43a9-82fa-3ab87ff9a27b',
            ],
            [
                'role' => 'admin-pt',
                'name' => 'Admin PT POLNA',
                'email' => 'adminpt.polna@example.com',
                'uuid_pt' => '17d65870-9cb3-49c7-a095-0ebe65a0be43',
            ],
            [
                'role' => 'ketua-lppm',
                'name' => 'Ketua LPPM UCN',
                'email' => 'ketua.lppm.ucn@example.com',
                'uuid_pt' => $defaultPerguruanTinggi->uuid,
            ],
            [
                'role' => 'reviewer',
                'name' => 'Reviewer Demo',
                'email' => 'reviewer@example.com',
                'uuid_pt' => null,
            ],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'role' => $userData['role'],
                    'uuid_pt' => $userData['uuid_pt'],
                ]
            );

            $user->assignRole($userData['role']);

            if ($user->uuid_pt !== $userData['uuid_pt']) {
                $user->forceFill([
                    'uuid_pt' => $userData['uuid_pt'],
                ])->save();
            }
        }

        $this->call(DosenSeeder::class);
    }
}
