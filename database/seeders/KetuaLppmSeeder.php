<?php

namespace Database\Seeders;

use App\Models\RefPerguruanTinggi;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class KetuaLppmSeeder extends Seeder
{
    public function run(): void
    {
        $ptList = RefPerguruanTinggi::all();

        foreach ($ptList as $pt) {
            $slug = Str::slug($pt->nama_singkat ?: $pt->nama, '');
            $email = 'ketualppm.' . strtolower($slug) . '@example.com';

            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => 'Ketua LPPM ' . ($pt->nama_singkat ?: $pt->nama),
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'role' => User::ROLE_KETUA_LPPM ?? 'ketua-lppm',
                    'uuid_pt' => $pt->uuid,
                ]
            );

            $user->assignRole('ketua-lppm');

            if ($user->uuid_pt !== $pt->uuid || $user->role !== 'ketua-lppm') {
                $user->forceFill([
                    'uuid_pt' => $pt->uuid,
                    'role' => 'ketua-lppm',
                ])->save();
            }
        }
    }
}
