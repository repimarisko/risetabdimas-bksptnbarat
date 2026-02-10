<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class MenuController extends Controller
{
    public function index(): InertiaResponse
    {
        $menus = Menu::query()
            ->with('permissions.roles')
            ->orderBy('sort')
            ->get()
            ->map(function (Menu $menu) {
                return [
                    'id' => $menu->id,
                    'name' => $menu->name,
                    'slug' => $menu->slug,
                    'href' => $menu->href,
                    'icon' => $menu->icon,
                    'parent_id' => $menu->parent_id,
                    'sort' => $menu->sort,
                    'roles' => $menu->permissions
                        ->flatMap(fn($permission) => $permission->roles)
                        ->pluck('name')
                        ->unique()
                        ->values(),
                ];
            });

        $roles = Role::query()->orderBy('name')->pluck('name');

        return Inertia::render('settings/menus', [
            'menus' => $menus,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $menu = Menu::create($data);

        $this->syncMenuPermissions($menu, $data['roles'] ?? []);

        return back()->with('success', 'Menu ditambahkan.');
    }

    public function update(Request $request, Menu $menu): RedirectResponse
    {
        $data = $this->validated($request, $menu->id);

        $menu->update($data);
        $this->syncMenuPermissions($menu, $data['roles'] ?? []);

        return back()->with('success', 'Menu diperbarui.');
    }

    public function destroy(Menu $menu): RedirectResponse
    {
        $menu->delete();

        return back()->with('success', 'Menu dihapus.');
    }

    protected function validated(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('menus', 'slug')->ignore($ignoreId),
            ],
            'href' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'parent_id' => ['nullable', 'integer', 'exists:menus,id'],
            'sort' => ['nullable', 'integer', 'min:0'],
            'roles' => ['array'],
            'roles.*' => ['string'],
        ]);
    }

    protected function syncMenuPermissions(Menu $menu, array $roles): void
    {
        $permissionName = 'menu.' . $menu->slug;
        $permission = Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);

        $menu->permissions()->sync([$permission->id]);

        $permission->syncRoles($roles);
    }
}
