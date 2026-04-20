<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ReviewerSeeder extends Seeder
{
    public function run(): void
    {
        $reviewers = [
            [
                'name' => 'Reviewer 1',
                'email' => 'reviewer1@example.com',
            ],
            [
                'name' => 'Reviewer 2',
                'email' => 'reviewer2@example.com',
            ],
        ];

        foreach ($reviewers as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'role' =>  'reviewer',
                    'uuid_pt' => null,
                ]
            );

            $user->assignRole('reviewer');
        }
    }
}
