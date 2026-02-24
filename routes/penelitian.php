<?php

use App\Http\Controllers\Penelitian\AdminPtPenelitianController;
use App\Http\Controllers\Penelitian\AdminPtSkemaController;
use App\Http\Controllers\Penelitian\PtPenelitianController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:dosen'])
    ->prefix('pt-penelitian')
    ->name('pt-penelitian.')
    ->group(function () {
        Route::get('/', [PtPenelitianController::class, 'index'])->name('index');
        Route::get('/perbaikan', [PtPenelitianController::class, 'perbaikan'])->name('perbaikan');
        Route::get('/create', [PtPenelitianController::class, 'create'])->name('create');
        Route::post('/', [PtPenelitianController::class, 'store'])->name('store');
        Route::post('/{ptPenelitian}/anggota-approve', [PtPenelitianController::class, 'approveAnggota'])
            ->name('approve-anggota');
        Route::post('/{ptPenelitian}/anggota-reject', [PtPenelitianController::class, 'rejectAnggota'])
            ->name('reject-anggota');
        Route::patch('/{ptPenelitian}/submit', [PtPenelitianController::class, 'submit'])
            ->name('submit');
        Route::get('/{ptPenelitian}/edit', [PtPenelitianController::class, 'edit'])->name('edit');
        Route::put('/{ptPenelitian}', [PtPenelitianController::class, 'update'])->name('update');
        Route::delete('/{ptPenelitian}', [PtPenelitianController::class, 'destroy'])->name('destroy');

        // HASIL REVIEW
        Route::get('/{ptPenelitian}/hasilreview', [PtPenelitianController::class, 'hasilreview'])->name('create');
    });

Route::middleware(['auth', 'verified', 'role:dosen|ketua-lppm|reviewer|admin-pt|super-admin'])
    ->prefix('pt-penelitian')
    ->name('pt-penelitian.')
    ->group(function () {
        Route::get('/{ptPenelitian}/download/{type}', [PtPenelitianController::class, 'download'])
            ->whereIn('type', ['proposal', 'lampiran'])
            ->name('download');
    });

Route::middleware(['auth', 'verified', 'role:reviewer'])
    ->prefix('reviewer/pt-penelitian')
    ->as('reviewer.pt-penelitian.')
    ->group(function () {
        Route::get('/', [PtPenelitianController::class, 'reviewerIndex'])
            ->name('index');
        Route::get('/{ptPenelitian}/review', [PtPenelitianController::class, 'reviewForm'])
            ->name('review');
        Route::post('/{ptPenelitian}/review', [PtPenelitianController::class, 'reviewSubmit'])
            ->name('review.submit');
    });

Route::middleware(['auth', 'verified', 'role:admin-pt|ketua-lppm|super-admin'])
    ->prefix('admin/pt-penelitian')
    ->as('admin.pt-penelitian.')
    ->group(function () {
        Route::get('/', [AdminPtPenelitianController::class, 'index'])->name('index-all');
        Route::get('/deleted', [AdminPtPenelitianController::class, 'deleted'])
            ->middleware('role:super-admin')
            ->name('deleted');
        Route::post('/{uuid}/restore', [AdminPtPenelitianController::class, 'restore'])
            ->middleware('role:super-admin')
            ->name('restore');
        Route::get('/assign-reviewer', [AdminPtPenelitianController::class, 'reviewerAssignIndex'])
            ->name('assign-index');
        Route::get('/export', [AdminPtPenelitianController::class, 'export'])->name('export');
        Route::patch('/{ptPenelitian}/approve', [AdminPtPenelitianController::class, 'approve'])->name('approve');
        Route::patch('/{ptPenelitian}/reject', [AdminPtPenelitianController::class, 'reject'])->name('reject');
        Route::post('/{ptPenelitian}/assign-reviewer', [AdminPtPenelitianController::class, 'assignReviewer'])
            ->name('assign-reviewer');
        Route::get('/{ptPenelitian}', [AdminPtPenelitianController::class, 'show'])->name('show');
        Route::delete('/{ptPenelitian}', [AdminPtPenelitianController::class, 'destroy'])->name('destroy');
    });

Route::middleware(['auth', 'verified'])
    ->prefix('admin/pt-skema')
    ->as('admin.pt-skema.')
    ->group(function () {
        Route::middleware('role:admin-pt|ketua-lppm|super-admin')
            ->get('/', [AdminPtSkemaController::class, 'index'])
            ->name('index');

        Route::middleware('role:super-admin')->group(function () {
            Route::get('/create', [AdminPtSkemaController::class, 'create'])->name('create');
            Route::post('/', [AdminPtSkemaController::class, 'store'])->name('store');
        });
    });