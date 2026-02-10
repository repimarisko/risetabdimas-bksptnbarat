<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $menus = [
            [
                'slug' => 'dashboard',
                'name' => 'Dashboard',
                'href' => '/dashboard',
                'roles' => ['super-admin', 'admin-pt', 'ketua-lppm', 'dosen', 'reviewer'],
            ],
            [
                'slug' => 'pt-penelitian',
                'name' => 'Usulan Penelitian',
                'href' => '/pt-penelitian',
                'roles' => ['dosen'],
            ],
            [
                'slug' => 'pt-penelitian-perbaikan',
                'name' => 'Perbaikan Usulan Penelitian',
                'href' => '/pt-penelitian/perbaikan',
                'roles' => ['dosen'],
            ],
            [
                'slug' => 'admin-pt-penelitian',
                'name' => 'Usulan Penelitian (Admin PT)',
                'href' => '/admin/pt-penelitian',
                'roles' => ['admin-pt', 'super-admin', 'ketua-lppm'],
            ],
            [
                'slug' => 'assign-reviewer',
                'name' => 'Plotting Reviewer',
                'href' => '/admin/pt-penelitian/assign-reviewer',
                'roles' => ['admin-pt', 'super-admin'],
            ],
            [
                'slug' => 'users-approvals',
                'name' => 'Approve Akun Baru',
                'href' => '/users/approvals',
                'roles' => ['admin-pt'],
            ],
            [
                'slug' => 'pt-skema',
                'name' => 'Skema Aktif',
                'href' => '/admin/pt-skema',
                'roles' => ['admin-pt', 'super-admin'],
            ],
            [
                'slug' => 'role-assignment',
                'name' => 'Role Assignment',
                'href' => '/settings/role-assignment',
                'roles' => ['super-admin'],
            ],
            [
                'slug' => 'settings-menus',
                'name' => 'Menu Settings',
                'href' => '/settings/menus',
                'roles' => ['super-admin'],
            ],
            [
                'slug' => 'reviewer-dashboard',
                'name' => 'Review Proposal',
                'href' => '/reviewer/pt-penelitian',
                'roles' => ['reviewer'],
            ],
        ];

        $guard = 'web';

        foreach ($menus as $index => $item) {
            $menu = Menu::updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'name' => $item['name'],
                    'href' => $item['href'],
                    'icon' => $item['icon'] ?? null,
                    'parent_id' => null,
                    'sort' => $item['sort'] ?? ($index + 1),
                ],
            );

            $permissionName = 'menu.' . $item['slug'];
            $permission = Permission::firstOrCreate(
                ['name' => $permissionName, 'guard_name' => $guard],
                [],
            );

            foreach ($item['roles'] as $roleName) {
                $role = Role::firstOrCreate(
                    ['name' => $roleName, 'guard_name' => $guard],
                    [],
                );

                if (! $role->hasPermissionTo($permission)) {
                    $role->givePermissionTo($permission);
                }

                $menu->permissions()->syncWithoutDetaching([$permission->id]);
            }
        }
    }
}
