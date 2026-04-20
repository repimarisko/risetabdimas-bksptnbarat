<?php

namespace Database\Seeders;

use App\Models\RefPerguruanTinggi;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminPtSeeder extends Seeder
{
    public function run(): void
    {
        $ptList = RefPerguruanTinggi::all();

        foreach ($ptList as $pt) {
            $slug = Str::slug($pt->nama_singkat ?: $pt->nama, '');
            $email = 'adminpt.' . strtolower($slug) . '@example.com';

            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => 'Admin PT ' . ($pt->nama_singkat ?: $pt->nama),
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'role' => User::ROLE_ADMIN_PT ?? 'admin-pt',
                    'uuid_pt' => $pt->uuid,
                ]
            );

            $user->assignRole('admin-pt');

            if ($user->uuid_pt !== $pt->uuid || $user->role !== 'admin-pt') {
                $user->forceFill([
                    'uuid_pt' => $pt->uuid,
                    'role' => 'admin-pt',
                ])->save();
            }
        }
    }
}
