<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\RefPerguruanTinggi;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DosenSeeder extends Seeder
{
    /**
     * Seed dosen accounts alongside their corresponding user records.
     */
    public function run(): void
    {
        $dosenList = [
            [
                'name' => 'Dr. Andi Pratama',
                'email' => 'andi.pratama@example.com',
                'nidn' => '0123456789',
                'uuid_pt' => '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01',
            ],
            [
                'name' => 'Prof. Siti Rahma',
                'email' => 'siti.rahma@example.com',
                'nidn' => '9876543210',
                'uuid_pt' => '0a7f9626-2390-43a9-82fa-3ab87ff9a27b',
            ],
            [
                'name' => 'Ir. Budi Santoso',
                'email' => 'budi.santoso@example.com',
                'nidn' => '1122334455',
                'uuid_pt' => '17d65870-9cb3-49c7-a095-0ebe65a0be43',
            ],
        ];

        foreach ($dosenList as $data) {
            if (! RefPerguruanTinggi::where('uuid', $data['uuid_pt'])->exists()) {
                continue;
            }

            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'role' => User::ROLE_DOSEN,
                    'uuid_pt' => $data['uuid_pt'],
                ]
            );

            $user->assignRole(User::ROLE_DOSEN);

            if ($user->uuid_pt !== $data['uuid_pt']) {
                $user->forceFill([
                    'uuid_pt' => $data['uuid_pt'],
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
