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

    public function edit(Request $request, string $uuid): InertiaResponse
    {
        if (! $request->user()?->hasRole('super-admin')) {
            abort(Response::HTTP_FORBIDDEN, 'Hanya super admin yang dapat mengedit skema.');
        }

        $skema = RefSkema::where('uuid', $uuid)->firstOrFail();

        return Inertia::render('penelitian/skema/edit', [
            'breadcrumbs' => [
                $this->resolveDashboardBreadcrumb($request),
                ['title' => 'Kelola Skema', 'href' => '/admin/pt-skema'],
                ['title' => 'Edit Skema', 'href' => "/admin/pt-skema/{$uuid}/edit"],
            ],
            'skema' => [
                'uuid'          => $skema->uuid,
                'jenis_skema'   => $skema->jenis_skema,
                'nama'          => $skema->nama,
                'nama_singkat'  => $skema->nama_singkat,
                'multi_tahun'   => (bool) $skema->multi_tahun,
                'biaya_minimal' => $skema->biaya_minimal,
                'biaya_maksimal'=> $skema->biaya_maksimal,
                'sumber_dana'   => $skema->sumber_dana,
                'anggota_min'   => $skema->anggota_min,
                'anggota_max'   => $skema->anggota_max,
                'mulai'         => optional($skema->mulai)?->format('Y-m-d'),
                'selesai'       => optional($skema->selesai)?->format('Y-m-d'),
                'status'        => $skema->status,
            ],
            'statusOptions' => [
                ['value' => 'aktif',    'label' => 'Aktif'],
                ['value' => 'nonaktif', 'label' => 'Nonaktif'],
            ],
            'redirectBackUrl' => $request->query('back', '/admin/pt-skema'),
        ]);
    }

    public function update(Request $request, string $uuid): RedirectResponse
    {
        if (! $request->user()?->hasRole('super-admin')) {
            abort(Response::HTTP_FORBIDDEN, 'Hanya super admin yang dapat mengedit skema.');
        }

        $skema = RefSkema::where('uuid', $uuid)->firstOrFail();

        $validated = $request->validate([
            'jenis_skema'    => ['required', 'string', 'max:255'],
            'nama'           => ['required', 'string', 'max:255'],
            'nama_singkat'   => ['nullable', 'string', 'max:100'],
            'multi_tahun'    => ['required', 'boolean'],
            'biaya_minimal'  => ['nullable', 'numeric', 'min:0'],
            'biaya_maksimal' => ['nullable', 'numeric', 'min:0'],
            'sumber_dana'    => ['nullable', 'string', 'max:255'],
            'anggota_min'    => ['nullable', 'integer', 'min:1'],
            'anggota_max'    => ['nullable', 'integer', 'min:1'],
            'mulai'          => ['nullable', 'date'],
            'selesai'        => ['nullable', 'date', 'after_or_equal:mulai'],
            'status'         => ['nullable', 'in:aktif,nonaktif'],
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

        $skema->update([
            'jenis_skema'    => $validated['jenis_skema'],
            'nama'           => $validated['nama'],
            'nama_singkat'   => $validated['nama_singkat'] ?? null,
            'multi_tahun'    => $validated['multi_tahun'],
            'biaya_minimal'  => $validated['biaya_minimal'] ?? null,
            'biaya_maksimal' => $validated['biaya_maksimal'] ?? null,
            'sumber_dana'    => $validated['sumber_dana'] ?? null,
            'anggota_min'    => $validated['anggota_min'] ?? null,
            'anggota_max'    => $validated['anggota_max'] ?? null,
            'mulai'          => $validated['mulai'] ?? null,
            'selesai'        => $validated['selesai'] ?? null,
            'status'         => $validated['status'] ?? 'aktif',
            'updated_at'     => now(),
        ]);

        return redirect()
            ->route('admin.pt-skema.index')
            ->with('success', 'Skema berhasil diperbarui.');
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
    public function updateSkema(Request $request, string $uuid)
    {
        $skema = $this->resolveSkema($uuid);

        // Ambil semua periode milik skema ini
        $periodeList = DB::table('ref_periode_skema')
            ->where('uuid_skema', $uuid)
            ->orderBy('tahun', 'desc')
            ->orderBy('created_at', 'desc') // terbaru di atas dalam tahun yang sama
            ->get();

        return Inertia::render('penelitian/skema/update', [
            'skema'       => $skema,
            'periodeList' => $periodeList,
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Skema', 'href' => route('admin.pt-skema.index')],
                ['title' => 'Update Skema', 'href' => '#'],
            ],
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
    public function storePeriode(Request $request, string $uuid)
    {
        $validated = $request->validate([
            'periode'              => 'required|string|max:5',
            'nama_periode'         => 'required|string|max:100',
            'tahun'                => 'required|digits:4|integer',
            'tanggal_mulai'        => 'required|date',
            'tanggal_selesai'      => 'required|date|after_or_equal:tanggal_mulai',
            'tanggal_akhir_acc'    => 'required|date',
            'tanggal_akhir_submit' => 'required|date',
            'is_active'            => 'boolean',
        ]);

        try {
            DB::transaction(function () use ($validated, $uuid) {
                // Jika periode baru langsung diaktifkan, nonaktifkan semua yang lain
                if (!empty($validated['is_active'])) {
                    DB::table('ref_periode_skema')
                        ->where('uuid_skema', $uuid)
                        ->update(['is_active' => false]);
                }

                DB::table('ref_periode_skema')->insert([
                    'id'                   => (string) \Illuminate\Support\Str::uuid(),
                    'uuid_skema'           => $uuid,
                    'periode'              => $validated['periode'],
                    'nama_periode'         => $validated['nama_periode'],
                    'tahun'                => $validated['tahun'],
                    'tanggal_mulai'        => $validated['tanggal_mulai'],
                    'tanggal_selesai'      => $validated['tanggal_selesai'],
                    'tanggal_akhir_acc'    => $validated['tanggal_akhir_acc'],
                    'tanggal_akhir_submit' => $validated['tanggal_akhir_submit'],
                    'is_active'            => $validated['is_active'] ?? false,
                    'created_at'           => now(),
                    'updated_at'           => now(),
                ]);
            });

            return back()->with('success', 'Periode berhasil ditambahkan.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal simpan: ' . $e->getMessage()])->withInput();
        }
    }

    public function setAktifPeriode(string $uuid, string $periodeId)
    {
        try {
            DB::transaction(function () use ($uuid, $periodeId) {
                // Nonaktifkan semua periode dalam skema ini
                DB::table('ref_periode_skema')
                    ->where('uuid_skema', $uuid)
                    ->update(['is_active' => false]);

                // Aktifkan yang dipilih
                DB::table('ref_periode_skema')
                    ->where('id', $periodeId)
                    ->where('uuid_skema', $uuid) // safety check
                    ->update(['is_active' => true, 'updated_at' => now()]);
            });

            return back()->with('success', 'Periode berhasil diaktifkan.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function deletePeriode(string $uuid, string $periodeId)
    {
        try {
            DB::table('ref_periode_skema')
                ->where('id', $periodeId)
                ->where('uuid_skema', $uuid)
                ->delete();

            return back()->with('success', 'Periode berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
