<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Spatie\Permission\Models\Role;

class RoleAssignmentController extends Controller
{
    public function index(): InertiaResponse
    {
        $roles = Role::query()
            ->orderBy('name')
            ->pluck('name')
            ->toArray();

        $users = User::query()
            ->with('roles')
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'role'])
            ->map(function (User $user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'active_role' => $user->role,
                    'roles' => $user->roles->pluck('name')->toArray(),
                ];
            })
            ->values();

        return Inertia::render('settings/role-assignment', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $request->validate([
            'roles' => ['array'],
            'roles.*' => [
                'string',
                Rule::in(Role::pluck('name')->toArray()),
            ],
            'active_role' => ['nullable', 'string'],
        ]);

        $roles = $data['roles'] ?? [];
        $activeRole = $data['active_role'] ?? ($roles[0] ?? null);

        $user->syncRoles($roles);

        if (! empty($roles) && $activeRole) {
            $user->forceFill(['role' => $activeRole])->save();
        }

        return redirect()
            ->back()
            ->with('success', 'Role pengguna diperbarui.');
    }

    public function switchRole(Request $request): RedirectResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'role' => ['required', 'string'],
        ]);

        if (! $user || ! $user->hasRole($data['role'])) {
            return redirect()->back()->with('error', 'Role tidak tersedia untuk akun Anda.');
        }

        $request->session()->put('active_role', $data['role']);

        if ($user->role !== $data['role']) {
            $user->forceFill(['role' => $data['role']])->save();
        }

        return redirect()->back()->with('success', 'Role aktif diperbarui.');
    }
}
