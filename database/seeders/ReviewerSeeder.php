<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewerSeeder extends Seeder
{
    public function run(): void
    {
        $users = [6, 7, 8, 9];

        foreach ($users as $userId) {
            // Drop if exists
            DB::table('reviewer')->where('id_user', $userId)->delete();

            DB::table('reviewer')->insert([
                'id_user'    => $userId,
                'email'      => DB::table('users')->where('id', $userId)->value('email'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
