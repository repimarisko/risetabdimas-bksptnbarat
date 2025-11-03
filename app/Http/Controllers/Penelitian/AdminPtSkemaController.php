<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use App\Models\RefSkema;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AdminPtSkemaController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $jenisFilter = $request->query('jenis');

        $skemaQuery = RefSkema::query()
            ->orderBy('nama');

        if ($jenisFilter) {
            $skemaQuery->where('jenis_skema', $jenisFilter);
        }

        $skema = $skemaQuery
            ->get()
            ->map(fn (RefSkema $record) => [
                'uuid' => $record->uuid,
                'jenis_skema' => $record->jenis_skema,
                'nama' => $record->nama,
                'nama_singkat' => $record->nama_singkat,
                'multi_tahun' => $record->multi_tahun,
                'biaya_minimal' => $record->biaya_minimal,
                'biaya_maksimal' => $record->biaya_maksimal,
                'sumber_dana' => $record->sumber_dana,
                'anggota_min' => $record->anggota_min,
                'anggota_max' => $record->anggota_max,
                'mulai' => optional($record->mulai)?->format('Y-m-d'),
                'selesai' => optional($record->selesai)?->format('Y-m-d'),
                'status' => $record->status,
                'created_at' => optional($record->created_at)?->format('Y-m-d H:i'),
                'updated_at' => optional($record->updated_at)?->format('Y-m-d H:i'),
            ]);

        $jenisOptions = RefSkema::query()
            ->select('jenis_skema')
            ->distinct()
            ->whereNotNull('jenis_skema')
            ->orderBy('jenis_skema')
            ->pluck('jenis_skema')
            ->map(fn (string $jenis) => [
                'value' => $jenis,
                'label' => $jenis,
            ])
            ->values()
            ->all();

        return Inertia::render('penelitian/skema/index', [
            'breadcrumbs' => [
                $this->resolveDashboardBreadcrumb($request),
                ['title' => 'Kelola Skema', 'href' => '/admin/pt-skema'],
            ],
            'skema' => $skema,
            'selectedJenis' => $jenisFilter,
            'jenisOptions' => $jenisOptions,
        ]);
    }

    public function create(Request $request): InertiaResponse
    {
        if (! $request->user()?->hasRole('super-admin')) {
            abort(Response::HTTP_FORBIDDEN, 'Hanya super admin yang dapat membuat skema.');
        }

        return Inertia::render('penelitian/skema/create', [
            'breadcrumbs' => [
                $this->resolveDashboardBreadcrumb($request),
                ['title' => 'Kelola Skema', 'href' => '/admin/pt-skema'],
                ['title' => 'Tambah Skema', 'href' => '/admin/pt-skema/create'],
            ],
            'statusOptions' => [
                ['value' => 'aktif', 'label' => 'Aktif'],
                ['value' => 'nonaktif', 'label' => 'Nonaktif'],
            ],
            'redirectBackUrl' => $request->query('back', '/admin/pt-skema'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        if (! $request->user()?->hasRole('super-admin')) {
            abort(Response::HTTP_FORBIDDEN, 'Hanya super admin yang dapat membuat skema.');
        }

        $validated = $request->validate([
            'jenis_skema' => ['required', 'string', 'max:255'],
            'nama' => ['required', 'string', 'max:255'],
            'nama_singkat' => ['nullable', 'string', 'max:100'],
            'multi_tahun' => ['required', 'boolean'],
            'biaya_minimal' => ['nullable', 'numeric', 'min:0'],
            'biaya_maksimal' => ['nullable', 'numeric', 'min:0'],
            'sumber_dana' => ['nullable', 'string', 'max:255'],
            'anggota_min' => ['nullable', 'integer', 'min:1'],
            'anggota_max' => ['nullable', 'integer', 'min:1'],
            'mulai' => ['nullable', 'date'],
            'selesai' => ['nullable', 'date', 'after_or_equal:mulai'],
            'status' => ['nullable', 'in:aktif,nonaktif'],
        ]);

        if (
            isset($validated['anggota_min'], $validated['anggota_max']) &&
            $validated['anggota_min'] > $validated['anggota_max']
        ) {
            return back()
                ->withErrors([
                    'anggota_max' => 'Anggota maksimal harus lebih besar atau sama dengan anggota minimal.',
                ])
                ->withInput();
        }

        $now = now();

        RefSkema::create([
            'uuid' => (string) Str::uuid(),
            'jenis_skema' => $validated['jenis_skema'],
            'nama' => $validated['nama'],
            'nama_singkat' => $validated['nama_singkat'] ?? null,
            'multi_tahun' => $validated['multi_tahun'],
            'biaya_minimal' => $validated['biaya_minimal'] ?? null,
            'biaya_maksimal' => $validated['biaya_maksimal'] ?? null,
            'sumber_dana' => $validated['sumber_dana'] ?? null,
            'anggota_min' => $validated['anggota_min'] ?? null,
            'anggota_max' => $validated['anggota_max'] ?? null,
            'mulai' => $validated['mulai'] ?? null,
            'selesai' => $validated['selesai'] ?? null,
            'status' => $validated['status'] ?? 'aktif',
            'created_at' => $now,
            'updated_at' => $now,
            'created_by' => Auth::id(),
        ]);

        return redirect()
            ->route('admin.pt-skema.index')
            ->with('success', 'Skema baru berhasil dibuat.');
    }

    protected function resolveDashboardBreadcrumb(Request $request): array
    {
        $user = $request->user();

        if ($user?->hasRole('ketua-lppm')) {
            return ['title' => 'Dashboard Ketua LPPM', 'href' => '/dashboard/ketua-lppm'];
        }

        if ($user?->hasRole('super-admin')) {
            return ['title' => 'Dashboard Super Admin', 'href' => '/dashboard/super-admin'];
        }

        return ['title' => 'Dashboard Admin PT', 'href' => '/dashboard/admin-pt'];
    }
}
