<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = [
            'super-admin',
            'admin-pt',
            'ketua-lppm',
            'dosen',
            'reviewer',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate([
                'name' => $role,
                'guard_name' => 'web',
            ]);
        }

        $this->call([
            RefTablesSeeder::class,
            MenuSeeder::class,

            SuperAdminSeeder::class,
            AdminPtSeeder::class,
            KetuaLppmSeeder::class,
            DosenSeeder::class,
            ReviewerSeeder::class,

            RefJenisPertanyaanSeeder::class,
            RefPertanyaanSkemaSeeder::class,
        ]);
    }
}
