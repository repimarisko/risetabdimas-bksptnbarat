<?php

use App\Http\Controllers\Penelitian\AdminPtPenelitianController;
use App\Http\Controllers\Penelitian\AdminPtSkemaController;
use App\Http\Controllers\Penelitian\PtPenelitianController;
use App\Http\Controllers\Penelitian\ReportPenelitianController;
use App\Http\Controllers\Penelitian\ReviewPtPenelitianController;
use Illuminate\Support\Facades\Route;

// ─────────────────────────────────────────────
// DOSEN
// ─────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'active_role:dosen'])
    ->prefix('pt-penelitian')
    ->name('pt-penelitian.')
    ->group(function () {
        Route::get('/', [PtPenelitianController::class, 'index'])->name('index');
        Route::get('/perbaikan', [PtPenelitianController::class, 'perbaikan'])->name('perbaikan');
        Route::get('/create', [PtPenelitianController::class, 'create'])->name('create');
        Route::post('/', [PtPenelitianController::class, 'store'])->name('store');
        Route::get('/{ptPenelitian}/edit', [PtPenelitianController::class, 'edit'])->name('edit');
        Route::put('/{ptPenelitian}', [PtPenelitianController::class, 'update'])->name('update');
        Route::delete('/{ptPenelitian}', [PtPenelitianController::class, 'destroy'])->name('destroy');
        Route::patch('/{ptPenelitian}/submit', [PtPenelitianController::class, 'submit'])->name('submit');
        Route::post('/{ptPenelitian}/anggota-approve', [PtPenelitianController::class, 'approveAnggota'])->name('approve-anggota');
        Route::post('/{ptPenelitian}/anggota-reject', [PtPenelitianController::class, 'rejectAnggota'])->name('reject-anggota');
    });

// Download (semua role aktif yang relevan)
Route::middleware(['auth', 'verified', 'active_role:dosen,ketua-lppm,reviewer,admin-pt,super-admin'])
    ->prefix('pt-penelitian')
    ->name('pt-penelitian.')
    ->group(function () {
        Route::get('/{ptPenelitian}/download/{type}', [PtPenelitianController::class, 'download'])
            ->whereIn('type', ['proposal', 'lampiran'])
            ->name('download');
    });

// ─────────────────────────────────────────────
// REVIEWER
// ─────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'active_role:reviewer'])
    ->prefix('reviewer/pt-penelitian')
    ->as('reviewer.pt-penelitian.')
    ->group(function () {

        // Administrasi
        Route::get('/penugasan', [ReviewPtPenelitianController::class, 'indexSkema'])->name('indexSkema');
        Route::get('/penugasan/{id_skema}/administrasi', [ReviewPtPenelitianController::class, 'listPenugasan'])->name('listPenugasanAdministrasi');
        Route::get('/penugasan/{id_penugasan}/nilai-administrasi', [ReviewPtPenelitianController::class, 'nilaiAdministrasi'])->name('nilaiAdministrasi');
        Route::post('/penugasan/{id_penugasan}/simpan-nilai', [ReviewPtPenelitianController::class, 'simpanNilai'])->name('simpan-nilai');
        Route::post('/penugasan/{id_penugasan}/selesaikan', [ReviewPtPenelitianController::class, 'selesaikanReview'])->name('selesaikan-review');

        // Substansi
        Route::get('/penugasan-substansi', [ReviewPtPenelitianController::class, 'indexSkemaSubstansi'])->name('indexSkemaSubstansi');
        Route::get('/penugasan/{id_skema}/substansi', [ReviewPtPenelitianController::class, 'listPenugasanSubstansi'])->name('listPenugasanSubstansi');
        Route::get('/penugasan/{id_penugasan}/nilai-substansi', [ReviewPtPenelitianController::class, 'nilaiSubstansi'])->name('nilaiSubstansi');
        Route::post('/penugasan/{id_penugasan}/simpan-nilai-substansi', [ReviewPtPenelitianController::class, 'storeSubstansi'])->name('storeSubstansi');
        Route::post('/penugasan/{id_penugasan}/selesai-substansi', [ReviewPtPenelitianController::class, 'finalizeSubstansi'])->name('finalizeSubstansi');

        // Detail
        Route::get('/penugasan/{id_penelitian}/detail', [ReviewPtPenelitianController::class, 'detail'])->name('detail');
        // Download
        Route::get('/penugasan/{id_penelitian}/download/{type}', [ReviewPtPenelitianController::class, 'download'])
            ->whereIn('type', ['proposal', 'lampiran'])
            ->name('download');

        Route::fallback(fn() => redirect()->route('dashboard.reviewer'));
    });

// ─────────────────────────────────────────────
// ADMIN (Admin PT, Ketua LPPM, Super Admin)
// ─────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'active_role:admin-pt,ketua-lppm,super-admin'])
    ->prefix('admin/pt-penelitian')
    ->as('admin.pt-penelitian.')
    ->group(function () {
        Route::get('/', [AdminPtPenelitianController::class, 'index'])->name('index-all');
        Route::get('/export', [AdminPtPenelitianController::class, 'export'])->name('export');
        Route::get('/assign-reviewer', [AdminPtPenelitianController::class, 'reviewerAssignIndex'])->name('assign-index');

        Route::prefix('/penugasan-review')->as('penugasan-review.')->group(function () {
            Route::get('/', [AdminPtPenelitianController::class, 'penugasanReview'])->name('index');
            Route::post('/store', [AdminPtPenelitianController::class, 'storePenugasan'])->name('store');
            Route::put('/{id}', [AdminPtPenelitianController::class, 'updatePenugasan'])->name('update');
            Route::delete('/{id}', [AdminPtPenelitianController::class, 'deletePenugasan'])->name('delete');
        });
        // REPORT
        // Report
        Route::prefix('/report')->as('report.')->group(function () {
            Route::get('/', [ReportPenelitianController::class, 'index'])->name('index');
            Route::get('/export', [ReportPenelitianController::class, 'exportExcel']);
        });
        // Super Admin only
        Route::middleware('active_role:super-admin')->group(function () {
            Route::get('/deleted', [AdminPtPenelitianController::class, 'deleted'])->name('deleted');
            Route::post('/{uuid}/restore', [AdminPtPenelitianController::class, 'restore'])->name('restore');
        });

        Route::patch('/{ptPenelitian}/approve', [AdminPtPenelitianController::class, 'approve'])->name('approve');
        Route::patch('/{ptPenelitian}/reject', [AdminPtPenelitianController::class, 'reject'])->name('reject');
        Route::post('/{ptPenelitian}/assign-reviewer', [AdminPtPenelitianController::class, 'assignReviewer'])->name('assign-reviewer');
        Route::get('/{ptPenelitian}', [AdminPtPenelitianController::class, 'show'])->name('show');
        Route::delete('/{ptPenelitian}', [AdminPtPenelitianController::class, 'destroy'])->name('destroy');
    });

// SKEMA
// ─────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'active_role:admin-pt,ketua-lppm,super-admin'])
    ->prefix('admin/pt-skema')
    ->as('admin.pt-skema.')
    ->group(function () {
        Route::get('/', [AdminPtSkemaController::class, 'index'])->name('index');

        // Super Admin only
        Route::middleware('active_role:super-admin')->group(function () {
            Route::get('/create', [AdminPtSkemaController::class, 'create'])->name('create');
            Route::post('/', [AdminPtSkemaController::class, 'store'])->name('store');

            Route::prefix('/{uuid}/konfigurasi')->as('konfigurasi.')->group(function () {
                Route::get('/', [AdminPtSkemaController::class, 'konfigurasi'])->name('index');

                Route::prefix('/jenis-pertanyaan')->as('jenis-pertanyaan.')->group(function () {
                    Route::post('/', [AdminPtSkemaController::class, 'storeJenisPertanyaan'])->name('store');
                    Route::put('/{id}', [AdminPtSkemaController::class, 'updateJenisPertanyaan'])->name('update');
                    Route::delete('/{id}', [AdminPtSkemaController::class, 'destroyJenisPertanyaan'])->name('destroy');
                });

                Route::prefix('/pertanyaan')->as('pertanyaan.')->group(function () {
                    Route::post('/', [AdminPtSkemaController::class, 'storePertanyaan'])->name('store');
                    Route::put('/{id}', [AdminPtSkemaController::class, 'updatePertanyaan'])->name('update');
                    Route::delete('/{id}', [AdminPtSkemaController::class, 'destroyPertanyaan'])->name('destroy');
                });
            });
        });
    });
