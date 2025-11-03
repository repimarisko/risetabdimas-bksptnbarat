<?php

use App\Http\Controllers\Dashboard\DosenDashboardController;
use App\Http\Controllers\Users\AdminPtUserApprovalController;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $user = $request->user();

        if ($user?->hasRole('super-admin')) {
            return redirect()->route('dashboard.super-admin');
        }

        if ($user?->hasRole('ketua-lppm')) {
            return redirect()->route('dashboard.ketua-lppm');
        }

        if ($user?->hasRole('admin-pt')) {
            return redirect()->route('dashboard.admin-pt');
        }

        if ($user?->hasRole('dosen')) {
            return redirect()->route('dashboard.dosen');
        }

        return Inertia::render('dashboard');
    })->name('dashboard');

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

    Route::middleware('role:super-admin')->group(function () {
        Route::get('dashboard/super-admin', fn() => Inertia::render('dashboard/super-admin'))
            ->name('dashboard.super-admin');
        Route::get('settings/role-assignment', fn() => Inertia::render('settings/role-assignment'))
            ->name('settings.role-assignment');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/penelitian.php';

use App\Http\Controllers\Penelitian\PtPenelitianController;

Route::middleware(['auth', 'role:dosen|ketua-lppm'])->group(function () {
    Route::get('/pt-penelitian/{ptPenelitian}/preview', [PtPenelitianController::class, 'preview'])
        ->name('pt-penelitian.preview');
});
