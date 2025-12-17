<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAssignmentController extends Controller
{
    public function index(): InertiaResponse
    {
        $perguruanLookup = DB::table('ref_perguruan_tinggi')
            ->select('uuid', 'nama', 'nama_singkat')
            ->get()
            ->keyBy('uuid');

        $users = User::query()
            ->with('roles')
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'role', 'uuid_pt', 'created_at'])
            ->map(function (User $user) use ($perguruanLookup) {
                $perguruan = $user->uuid_pt ? ($perguruanLookup[$user->uuid_pt] ?? null) : null;

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'roles' => $user->roles->pluck('name')->values()->all(),
                    'uuid_pt' => $user->uuid_pt,
                    'perguruan_tinggi' => $perguruan ? [
                        'uuid' => $perguruan->uuid,
                        'nama' => $perguruan->nama,
                        'nama_singkat' => $perguruan->nama_singkat,
                    ] : null,
                    'created_at' => optional($user->created_at)?->toISOString(),
                ];
            })
            ->values()
            ->all();

        $roles = Role::query()
            ->where('guard_name', 'web')
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn(Role $role) => [
                'id' => $role->id,
                'name' => $role->name,
            ])
            ->values()
            ->all();

        return Inertia::render('settings/role-assignment', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $request->validate([
            'role' => [
                'required',
                'string',
                Rule::exists('roles', 'name')->where('guard_name', 'web'),
            ],
        ]);

        $user->forceFill([
            'role' => $data['role'],
        ])->save();

        $user->syncRoles([$data['role']]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        return redirect()
            ->back()
            ->with('success', 'Role pengguna berhasil diperbarui.');
    }
}
