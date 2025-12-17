<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleMenuController extends Controller
{
    public function index(): InertiaResponse
    {
        $menus = $this->availableMenus();
        $menuPermissions = $this->ensureMenuPermissions($menus);
        $menuPermissionNames = $menuPermissions->pluck('name');

        $roles = Role::query()
            ->where('guard_name', 'web')
            ->with([
                'permissions' => fn($query) => $query->whereIn('name', $menuPermissionNames),
            ])
            ->orderBy('name')
            ->get(['id', 'name']);

        $roleIds = $roles->pluck('id');

        $userCounts = DB::table('model_has_roles')
            ->select('role_id', DB::raw('count(*) as total'))
            ->whereIn('role_id', $roleIds)
            ->groupBy('role_id')
            ->pluck('total', 'role_id');

        $roles = $roles->map(function (Role $role) use ($userCounts) {
            $menuNames = $role->permissions
                ->pluck('name')
                ->map(fn(string $name) => str_replace('menu:', '', $name))
                ->values()
                ->all();

            return [
                'id' => $role->id,
                'name' => $role->name,
                'menus' => $menuNames,
                'user_count' => (int) ($userCounts[$role->id] ?? 0),
            ];
        })
            ->values()
            ->all();

        return Inertia::render('settings/role-menus', [
            'menus' => $menus,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, Role $role): RedirectResponse
    {
        $menus = $this->availableMenus();
        $menuKeys = collect($menus)->pluck('key')->all();

        $data = $request->validate([
            'menus' => ['array'],
            'menus.*' => ['string', Rule::in($menuKeys)],
        ]);

        $menuPermissions = $this->ensureMenuPermissions($menus);
        $menuPermissionNames = $menuPermissions->map->name;
        $menuPermissionsByKey = $menuPermissions
            ->keyBy(fn(Permission $permission) => str_replace('menu:', '', $permission->name));

        $selectedPermissions = collect($data['menus'] ?? [])
            ->filter()
            ->unique()
            ->map(fn(string $key) => $menuPermissionsByKey->get($key))
            ->filter();

        DB::transaction(function () use ($role, $menuPermissionNames, $selectedPermissions) {
            $role->permissions()
                ->whereIn('name', $menuPermissionNames)
                ->detach();

            if ($selectedPermissions->isNotEmpty()) {
                $role->givePermissionTo($selectedPermissions);
            }
        });

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        return redirect()
            ->back()
            ->with('success', 'Akses menu untuk role diperbarui.');
    }

    protected function availableMenus(): array
    {
        $menus = array_values(array_map(function (array $menu) {
            return [
                'key' => (string) $menu['key'],
                'label' => (string) ($menu['label'] ?? $menu['key']),
                'description' => $menu['description'] ?? null,
                'path' => $menu['path'] ?? null,
            ];
        }, config('menu.menus', [])));

        $keys = array_column($menus, 'key');
        $duplicates = array_keys(array_filter(array_count_values($keys), fn(int $count) => $count > 1));

        if (!empty($duplicates)) {
            throw new \InvalidArgumentException('Duplikat key menu pada konfigurasi: ' . implode(', ', $duplicates));
        }

        return $menus;
    }

    protected function ensureMenuPermissions(array $menus): Collection
    {
        $menuKeys = collect($menus)->pluck('key')->unique()->values();
        $permissionNames = $menuKeys->map(fn(string $key) => 'menu:' . $key);

        $existing = Permission::query()
            ->where('guard_name', 'web')
            ->whereIn('name', $permissionNames)
            ->get()
            ->keyBy('name');

        $missing = $permissionNames->filter(fn(string $name) => !isset($existing[$name]));

        foreach ($missing as $name) {
            $existing[$name] = Permission::create([
                'name' => $name,
                'guard_name' => 'web',
            ]);
        }

        return $menuKeys
            ->map(fn(string $key) => $existing['menu:' . $key] ?? null)
            ->filter()
            ->values();
    }
}
