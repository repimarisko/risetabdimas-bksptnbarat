<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use App\Models\RefSkema;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            ->map(fn(RefSkema $record) => [
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
            ->map(fn(string $jenis) => [
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

    // =========================================================================
    // HELPER
    // =========================================================================

    private function resolveSkema(string $uuid): object
    {
        $skema = DB::table('ref_skema')
            ->where('uuid', $uuid)
            ->first();

        abort_if(is_null($skema), 404, 'Skema tidak ditemukan.');

        return $skema;
    }

    // =========================================================================
    // HALAMAN KONFIGURASI
    // =========================================================================

    public function konfigurasi(string $uuid)
    {
        $skema = $this->resolveSkema($uuid);

        $jenisPertanyaanList = DB::table('ref_jenis_pertanyaan')
            ->orderBy('nomor_urut', 'asc')
            ->orderBy('jenis', 'asc')
            ->get();

        // Masalah: orderBy('j.nomor_urut', ...) pada join mungkin tidak bekerja karena orderBy pada kolom dari table alias
        // Solusi: Pastikan select juga nomor_urut & tambahkan orderBy pada query builder setelah select
        $pertanyaanSkemaList = DB::table('ref_pertanyaan_skema as p')
            ->join('ref_jenis_pertanyaan as j', 'p.uuid_jenis', '=', 'j.id')
            ->where('p.uuid_skema', $skema->uuid)
            ->select(
                'p.id',
                'p.uuid_skema',
                'p.uuid_jenis',
                'j.jenis as jenis_label',
                'j.nomor_urut as jenis_nomor_urut',
                'p.pertanyaan',
                'p.bobot',
                'p.created_at',
                'p.updated_at',
            )
            ->orderBy('j.nomor_urut', 'ASC')
            ->orderBy('p.created_at', 'ASC')
            ->get();
        // Alternatif (jika orderBy pada kolom alias tetap gagal, urutkan setelah get di collection):
        // $pertanyaanSkemaList = $pertanyaanSkemaList->sortBy(['jenis_nomor_urut', 'created_at'])->values();

        return Inertia::render('penelitian/skema/konfigurasi', [
            'uuid'                => $skema->uuid,
            'redirectBackUrl'     => route('admin.pt-skema.index'),
            'jenisPertanyaanList' => $jenisPertanyaanList,
            'pertanyaanSkemaList' => $pertanyaanSkemaList,
            'breadcrumbs'         => [
                ['title' => 'Skema Penelitian', 'href' => route('admin.pt-skema.index')],
                ['title' => 'Konfigurasi',      'href' => route('admin.pt-skema.konfigurasi.index', ['uuid' => $uuid])],
            ],
        ]);
    }

    // =========================================================================
    // JENIS PERTANYAAN — CRUD
    // =========================================================================

    // ── CREATE ────────────────────────────────────────────────────────────────

    public function storeJenisPertanyaan(Request $request, string $uuid)
    {
        $this->resolveSkema($uuid);

        $validated = $request->validate([
            'nomor_urut' => ['nullable', 'integer', 'min:0'],
            'jenis'      => ['required', 'string', 'max:100', 'unique:ref_jenis_pertanyaan,jenis'],
        ], [
            'jenis.required'     => 'Jenis pertanyaan wajib diisi.',
            'jenis.max'          => 'Jenis pertanyaan maksimal 100 karakter.',
            'jenis.unique'       => 'Jenis pertanyaan ini sudah terdaftar.',
            'nomor_urut.integer' => 'Nomor urut harus berupa angka.',
            'nomor_urut.min'     => 'Nomor urut minimal 0.',
        ]);

        DB::table('ref_jenis_pertanyaan')->insert([
            'id'         => (string) Str::uuid(),
            'nomor_urut' => $validated['nomor_urut'] ?? 0,
            'jenis'      => $validated['jenis'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()
            ->route('admin.pt-skema.konfigurasi.index', ['uuid' => $uuid])
            ->with('success', 'Jenis pertanyaan berhasil ditambahkan.');
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    public function updateJenisPertanyaan(Request $request, string $uuid, string $id)
    {
        $this->resolveSkema($uuid);

        $jenis = DB::table('ref_jenis_pertanyaan')->where('id', $id)->first();
        abort_if(is_null($jenis), 404, 'Jenis pertanyaan tidak ditemukan.');

        $validated = $request->validate([
            'nomor_urut' => ['nullable', 'integer', 'min:0'],
            'jenis'      => [
                'required',
                'string',
                'max:100',
                "unique:ref_jenis_pertanyaan,jenis,{$id}",
            ],
        ], [
            'jenis.required'     => 'Jenis pertanyaan wajib diisi.',
            'jenis.max'          => 'Jenis pertanyaan maksimal 100 karakter.',
            'jenis.unique'       => 'Jenis pertanyaan ini sudah terdaftar.',
            'nomor_urut.integer' => 'Nomor urut harus berupa angka.',
            'nomor_urut.min'     => 'Nomor urut minimal 0.',
        ]);

        DB::table('ref_jenis_pertanyaan')
            ->where('id', $id)
            ->update([
                'nomor_urut' => $validated['nomor_urut'] ?? 0,
                'jenis'      => $validated['jenis'],
                'updated_at' => now(),
            ]);

        return redirect()
            ->route('admin.pt-skema.konfigurasi.index', ['uuid' => $uuid])
            ->with('success', 'Jenis pertanyaan berhasil diperbarui.');
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    public function destroyJenisPertanyaan(string $uuid, string $id)
    {
        $this->resolveSkema($uuid);

        $jenis = DB::table('ref_jenis_pertanyaan')->where('id', $id)->first();
        abort_if(is_null($jenis), 404, 'Jenis pertanyaan tidak ditemukan.');

        DB::table('ref_jenis_pertanyaan')->where('id', $id)->delete();

        return redirect()
            ->route('admin.pt-skema.konfigurasi.index', ['uuid' => $uuid])
            ->with('success', 'Jenis pertanyaan berhasil dihapus.');
    }

    // =========================================================================
    // PERTANYAAN SKEMA — CRUD
    // =========================================================================

    // ── CREATE ────────────────────────────────────────────────────────────────

    public function storePertanyaan(Request $request, string $uuid)
    {
        $skema = $this->resolveSkema($uuid);

        $validated = $request->validate([
            'uuid_jenis' => ['required', 'uuid', 'exists:ref_jenis_pertanyaan,id'],
            'pertanyaan' => ['required', 'string'],
            'bobot'      => ['required', 'numeric', 'min:0', 'max:999.99'],
        ], [
            'uuid_jenis.required' => 'Jenis pertanyaan wajib dipilih.',
            'uuid_jenis.exists'   => 'Jenis pertanyaan tidak valid.',
            'pertanyaan.required' => 'Isi pertanyaan wajib diisi.',
            'bobot.required'      => 'Bobot wajib diisi.',
            'bobot.numeric'       => 'Bobot harus berupa angka.',
            'bobot.min'           => 'Bobot minimal 0.',
            'bobot.max'           => 'Bobot maksimal 999.99.',
        ]);

        DB::table('ref_pertanyaan_skema')->insert([
            'id'         => (string) Str::uuid(),
            'uuid_skema' => $skema->uuid,
            'uuid_jenis' => $validated['uuid_jenis'],
            'pertanyaan' => $validated['pertanyaan'],
            'bobot'      => $validated['bobot'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()
            ->route('admin.pt-skema.konfigurasi.index', ['uuid' => $uuid])
            ->with('success', 'Pertanyaan berhasil ditambahkan.');
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    public function updatePertanyaan(Request $request, string $uuid, string $id)
    {
        $this->resolveSkema($uuid);

        $pertanyaan = DB::table('ref_pertanyaan_skema')->where('id', $id)->first();
        abort_if(is_null($pertanyaan), 404, 'Pertanyaan tidak ditemukan.');

        $validated = $request->validate([
            'uuid_jenis' => ['required', 'uuid', 'exists:ref_jenis_pertanyaan,id'],
            'pertanyaan' => ['required', 'string'],
            'bobot'      => ['required', 'numeric', 'min:0', 'max:999.99'],
        ], [
            'uuid_jenis.required' => 'Jenis pertanyaan wajib dipilih.',
            'uuid_jenis.exists'   => 'Jenis pertanyaan tidak valid.',
            'pertanyaan.required' => 'Isi pertanyaan wajib diisi.',
            'bobot.required'      => 'Bobot wajib diisi.',
            'bobot.numeric'       => 'Bobot harus berupa angka.',
            'bobot.min'           => 'Bobot minimal 0.',
            'bobot.max'           => 'Bobot maksimal 999.99.',
        ]);

        DB::table('ref_pertanyaan_skema')
            ->where('id', $id)
            ->update([
                'uuid_jenis' => $validated['uuid_jenis'],
                'pertanyaan' => $validated['pertanyaan'],
                'bobot'      => $validated['bobot'],
                'updated_at' => now(),
            ]);

        return redirect()
            ->route('admin.pt-skema.konfigurasi.index', ['uuid' => $uuid])
            ->with('success', 'Pertanyaan berhasil diperbarui.');
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    public function destroyPertanyaan(string $uuid, string $id)
    {
        $this->resolveSkema($uuid);

        $pertanyaan = DB::table('ref_pertanyaan_skema')->where('id', $id)->first();
        abort_if(is_null($pertanyaan), 404, 'Pertanyaan tidak ditemukan.');

        DB::table('ref_pertanyaan_skema')->where('id', $id)->delete();

        return redirect()
            ->route('admin.pt-skema.konfigurasi.index', ['uuid' => $uuid])
            ->with('success', 'Pertanyaan berhasil dihapus.');
    }

    // 1. Method untuk Render Halaman Form
public function updateSkema(Request $request, string $uuid) {
    $skema = $this->resolveSkema($uuid); // Pastikan ini mengembalikan data, bukan null
    
    return Inertia::render('penelitian/skema/update', [ // Sesuaikan path file .tsx Anda
        'skema' => $skema,
        'breadcrumbs' => [
            ['title' => 'Dashboard', 'href' => '/dashboard'],
            ['title' => 'Skema', 'href' => route('admin.pt-skema.index')],
            ['title' => 'Update Skema', 'href' => '#'],
        ]
    ]);
}

public function updateSkemaStore(Request $request, string $uuid)
{
    // 1. Validasi ketat
    $validated = $request->validate([
        'jenis_skema'    => 'required|string',
        'nama'           => 'required|string|max:255',
        'nama_singkat'   => 'required|string|max:50',
        'multi_tahun'    => 'required|boolean',
        // Anggota: Minimal minimal 0, Maksimal harus >= Minimal
        'anggota_min'    => 'required|integer|min:0',
        'anggota_max'    => 'required|integer|gte:anggota_min',
        // Biaya: Gunakan numeric untuk mendukung desimal tanpa pembulatan
        'biaya_minimal'  => 'required|numeric|min:0',
        'biaya_maksimal' => 'required|numeric|gte:biaya_minimal',
        'sumber_dana'    => 'required|string',
        'mulai'          => 'required|date',
        'selesai'        => 'required|date|after_or_equal:mulai',
        'status'         => 'required|in:aktif,tidak aktif',
    ], [
        'anggota_max.gte' => 'Jumlah anggota maksimal tidak boleh lebih kecil dari anggota minimal.',
        'biaya_maksimal.gte' => 'Biaya maksimal tidak boleh lebih kecil dari biaya minimal.',
    ]);

    try {
        // 2. Gunakan Query Builder agar tidak terkena casting otomatis Model (Rounded)
        $update = DB::table('ref_skema') 
            ->where('uuid', $uuid)
            ->update([
                'jenis_skema'    => $validated['jenis_skema'],
                'nama'           => $validated['nama'],
                'nama_singkat'   => $validated['nama_singkat'],
                'multi_tahun'    => $validated['multi_tahun'],
                'biaya_minimal'  => $validated['biaya_minimal'], // Tetap float/decimal
                'biaya_maksimal' => $validated['biaya_maksimal'], 
                'sumber_dana'    => $validated['sumber_dana'],
                'anggota_min'    => (int) $validated['anggota_min'],
                'anggota_max'    => (int) $validated['anggota_max'],
                'mulai'          => $validated['mulai'],
                'selesai'        => $validated['selesai'],
                'status'         => $validated['status'],
                'updated_at'     => now(),
            ]);

        return redirect()
            ->route('admin.pt-skema.index')
            ->with('success', 'Skema berhasil diperbarui .');

    } catch (\Exception $e) {
        return back()->withErrors(['error' => 'Gagal simpan: ' . $e->getMessage()])->withInput();
    }
}
}
