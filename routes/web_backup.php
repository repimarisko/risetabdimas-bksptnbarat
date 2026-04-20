<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Dashboard\DosenDashboardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Settings\RoleAssignmentController;
use App\Http\Controllers\Settings\RoleMenuController;
use App\Http\Controllers\Users\AdminPtUserApprovalController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
// routes/web.php
Route::get('/forbidden', function () {
    $activeRole = session('active_role');
    $dashboard = match ($activeRole) {
        'super-admin' => '/dashboard/super-admin',
        'admin-pt'    => '/dashboard/admin-pt',
        'ketua-lppm'  => '/dashboard/ketua-lppm',
        'dosen'       => '/dashboard/dosen',
        'reviewer'    => '/dashboard/reviewer',
        default       => '/dashboard',
    };
    return inertia('errors/forbidden', ['redirectTo' => $dashboard]);
})->name('active-role.forbidden')->middleware('auth');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::middleware('role:dosen')->group(function () {
        Route::get('dashboard/dosen', DosenDashboardController::class)
            ->name('dashboard.dosen');
    });

    Route::middleware('role:admin-pt')->group(function () {
        Route::get('dashboard/admin-pt', fn() => Inertia::render('dashboard/admin-pt'))
            ->name('dashboard.admin-pt');
        Route::get('users/approvals', [AdminPtUserApprovalController::class, 'index'])
            ->name('users.approvals');
        Route::patch('users/approvals/{dosen}/approve', [AdminPtUserApprovalController::class, 'approve'])
            ->name('users.approvals.approve');
    });

    Route::middleware('role:ketua-lppm')->group(function () {
        Route::get('dashboard/ketua-lppm', fn() => Inertia::render('dashboard/ketua-lppm'))
            ->name('dashboard.ketua-lppm');
    });

    Route::middleware('role:reviewer')->group(function () {
        Route::get('dashboard/reviewer', fn() => Inertia::render('dashboard/reviewer'))
            ->name('dashboard.reviewer');
    });



    Route::middleware('role:super-admin')->group(function () {
        Route::get('dashboard/super-admin', fn() => Inertia::render('dashboard/super-admin'))
            ->name('dashboard.super-admin');
        Route::get('settings/role-assignment', [RoleAssignmentController::class, 'index'])
            ->name('settings.role-assignment');
        Route::patch('settings/role-assignment/{user}', [RoleAssignmentController::class, 'update'])
            ->name('settings.role-assignment.update');
        Route::get('settings/role-menus', [RoleMenuController::class, 'index'])
            ->name('settings.role-menus.index');
        Route::patch('settings/role-menus/{role}', [RoleMenuController::class, 'update'])
            ->name('settings.role-menus.update');
        Route::get('settings/menus', [\App\Http\Controllers\Settings\MenuController::class, 'index'])
            ->name('settings.menus.index');
        Route::post('settings/menus', [\App\Http\Controllers\Settings\MenuController::class, 'store'])
            ->name('settings.menus.store');
        Route::put('settings/menus/{menu}', [\App\Http\Controllers\Settings\MenuController::class, 'update'])
            ->name('settings.menus.update');
        Route::delete('settings/menus/{menu}', [\App\Http\Controllers\Settings\MenuController::class, 'destroy'])
            ->name('settings.menus.destroy');
    });

    // Semua pengguna terautentikasi boleh mengganti role aktif yang dimilikinya
    Route::post('settings/active-role', function (\Illuminate\Http\Request $request) {
        $roles = $request->user()?->getRoleNames()->toArray() ?? [];
        $role = $request->input('role');
        if (! $role || ! in_array($role, $roles, true)) {
            return back()->with('error', 'Role tidak valid.');
        }

        $request->session()->put('active_role', $role);

        $dashboardMap = [
            'super-admin' => '/dashboard/super-admin',
            'admin-pt' => '/dashboard/admin-pt',
            'ketua-lppm' => '/dashboard/ketua-lppm',
            'dosen' => '/dashboard/dosen',
            'reviewer' => '/dashboard/reviewer',
        ];

        $redirectTo = $dashboardMap[$role] ?? '/dashboard';

        return redirect($redirectTo)->with('success', 'Role aktif diperbarui.');
    })->name('settings.active-role');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/penelitian.php';

use App\Http\Controllers\Penelitian\PtPenelitianController;

Route::middleware(['auth', 'role:dosen|ketua-lppm|reviewer|admin-pt|super-admin'])->group(function () {
    Route::get('/pt-penelitian/{ptPenelitian}/preview', [PtPenelitianController::class, 'preview'])
        ->name('pt-penelitian.preview');
});
