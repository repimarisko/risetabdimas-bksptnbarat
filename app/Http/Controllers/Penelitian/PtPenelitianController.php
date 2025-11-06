<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Penelitian\Concerns\BuildsPenelitianPreview;
use App\Models\Dosen;
use App\Models\PtPenelitian;
use App\Models\PtPenelitianAnggota;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PtPenelitianController extends Controller
{
    use BuildsPenelitianPreview;

    public function index(Request $request): InertiaResponse
    {
        $penelitian = PtPenelitian::query()
            ->with('user')
            ->where('created_by', $request->user()->id)
            ->orWhereHas('anggota', function ($query) use ($request) {
                $query->where('dosen_uuid', optional($request->user()->dosen)->uuid);
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->through(fn($item) => [
                ...$item->toArray(),
                'ketua_nama' => optional($item->user)->name,
            ])
            ->withQueryString();

        $isVerified = $this->userVerified($request->user());

        return Inertia::render('penelitian/index', [
            'penelitian' => $penelitian,
            'submissionLocked' => ! $isVerified,
            'lockReason' => $isVerified
                ? null
                : 'Akun Anda belum disetujui oleh admin PT.',
            'isAccountVerified' => $isVerified,
        ]);
    }

    public function create(Request $request): InertiaResponse|RedirectResponse
    {
        if ($response = $this->redirectIfNotVerified($request)) {
            return $response;
        }

        $skemaOptions = DB::table('ref_skema')
            ->select('uuid', 'nama', 'nama_singkat')
            ->whereNull('deleted_at')
            ->where(fn($query) => $query->whereNull('status')->orWhere('status', 'aktif'))
            ->orderBy('nama')
            ->get()
            ->map(fn($record) => [
                'uuid' => $record->uuid,
                'nama' => $record->nama,
                'nama_singkat' => $record->nama_singkat,
            ])
            ->toArray();

        $fokusOptions = DB::table('ref_fokus')
            ->select('uuid', 'fokus')
            ->orderBy('fokus')
            ->get()
            ->map(fn($record) => [
                'uuid' => $record->uuid,
                'fokus' => $record->fokus,
            ])
            ->toArray();

        $sdgOptions = DB::table('ref_sdg')
            ->select('uuid', 'sdg', 'level')
            ->orderBy('level')
            ->orderBy('sdg')
            ->get()
            ->map(fn($record) => [
                'uuid' => $record->uuid,
                'sdg' => $record->sdg,
                'level' => $record->level,
            ])
            ->toArray();

        $tktOptions = DB::table('ref_tkt')
            ->select('uuid', 'tkt', 'level')
            ->orderBy('level')
            ->orderBy('tkt')
            ->get()
            ->map(fn($record) => [
                'uuid' => $record->uuid,
                'tkt' => $record->tkt,
                'level' => $record->level,
            ])
            ->toArray();

        $perguruanOptions = DB::table('ref_perguruan_tinggi')
            ->select('uuid', 'nama', 'nama_singkat')
            ->orderBy('nama')
            ->get()
            ->map(fn($record) => [
                'uuid' => $record->uuid,
                'nama' => $record->nama,
                'nama_singkat' => $record->nama_singkat,
            ])
            ->toArray();

        $dosenOptions = DB::table('dosen')
            ->join('users', 'dosen.id_user', '=', 'users.id')
            ->select('dosen.uuid', 'users.name', 'dosen.nidn', 'dosen.email', 'dosen.uuid_pt')
            ->orderBy('users.name')
            ->get()
            ->map(fn($record) => [
                'uuid' => $record->uuid,
                'nama' => $record->name,
                'nidn' => $record->nidn,
                'email' => $record->email,
                'uuid_pt' => $record->uuid_pt,
            ])
            ->toArray();

        $komponenOptions = DB::table('ref_komponen_biaya')
            ->select('id', 'nama_komponen', 'jenis', 'keterangan')
            ->orderBy('nama_komponen')
            ->get()
            ->map(fn($record) => [
                'id' => $record->id,
                'nama_komponen' => $record->nama_komponen,
                'jenis' => $record->jenis,
                'keterangan' => $record->keterangan,
            ])
            ->toArray();

        return Inertia::render('penelitian/create', [
            'skemaOptions' => $skemaOptions,
            'fokusOptions' => $fokusOptions,
            'sdgOptions' => $sdgOptions,
            'tktOptions' => $tktOptions,
            'dosenOptions' => $dosenOptions,
            'perguruanOptions' => $perguruanOptions,
            'komponenOptions' => $komponenOptions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        if ($response = $this->redirectIfNotVerified($request)) {
            return $response;
        }

        $this->normalizePayload($request);
        $validated = $this->validatedData($request);
        $data = $validated['fields'];
        $anggotaPayload = $validated['anggota'];
        $rabPayload = $validated['rab'];
        $ownerUuidPt = optional($request->user()->dosen)->uuid_pt
            ?? $request->user()->uuid_pt;

        if (! $this->documentColumnsAvailable()) {
            throw ValidationException::withMessages([
                'proposal_file' => 'Kolom penyimpanan dokumen belum tersedia. Jalankan perintah `php artisan migrate` terlebih dahulu.',
            ]);
        }

        $proposalPath = null;
        $proposalFilename = null;
        if ($request->hasFile('proposal_file')) {
            $proposalFile = $request->file('proposal_file');
            $proposalPath = $proposalFile->store('penelitian/proposals', 'public');
            $proposalFilename = $proposalFile->getClientOriginalName();
        }

        $lampiranPath = null;
        $lampiranFilename = null;
        if ($request->hasFile('lampiran_file')) {
            $lampiranFile = $request->file('lampiran_file');
            $lampiranPath = $lampiranFile->store('penelitian/lampiran', 'public');
            $lampiranFilename = $lampiranFile->getClientOriginalName();
        }

        if ($ownerUuidPt) {
            $data['uuid_pt'] = $ownerUuidPt;
        }

        DB::transaction(function () use (
            $request,
            $data,
            $proposalPath,
            $proposalFilename,
            $lampiranPath,
            $lampiranFilename,
            $anggotaPayload,
            $rabPayload
        ): void {
            $data['status'] = 'Menunggu Persetujuan Anggota';

            $penelitian = PtPenelitian::create([
                'uuid' => (string) Str::uuid(),
                ...$data,
                'created_by' => $request->user()->id,
                'email_pengusul' => $request->user()->email,
                'created_at' => now(),
                'proposal_path' => $proposalPath,
                'proposal_filename' => $proposalFilename,
                'lampiran_path' => $lampiranPath,
                'lampiran_filename' => $lampiranFilename,
            ]);

            $this->syncAnggota($penelitian, $anggotaPayload);
            $this->syncRab($penelitian, $rabPayload);

            $pendingApprovals = $this->initializeAnggotaApprovals($penelitian);

            if ($pendingApprovals === 0) {
                $penelitian->forceFill([
                    'status' => 'Mengajukan',
                    'updated_at' => now(),
                ])->save();
            }
        });

        return redirect()
            ->route('pt-penelitian.index')
            ->with('success', 'Usulan penelitian berhasil dibuat.');
    }

    public function edit(PtPenelitian $ptPenelitian): InertiaResponse
    {
        $this->authorizeOwnership($ptPenelitian);

        return Inertia::render('penelitian/edit', [
            'penelitian' => $ptPenelitian,
        ]);
    }

    public function update(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizeOwnership($ptPenelitian);

        $this->normalizePayload($request);
        $validated = $this->validatedData($request, true);
        $data = $validated['fields'];
        $anggotaPayload = $validated['anggota'];
        $rabPayload = $validated['rab'];
        if (
            ($request->hasFile('proposal_file') || $request->hasFile('lampiran_file'))
            && ! $this->documentColumnsAvailable()
        ) {
            throw ValidationException::withMessages([
                'proposal_file' => 'Kolom penyimpanan dokumen belum tersedia. Jalankan perintah `php artisan migrate` terlebih dahulu.',
            ]);
        }

        if ($request->hasFile('proposal_file')) {
            $ptPenelitian->deleteStoredFile('proposal');
            $proposalFile = $request->file('proposal_file');
            $data['proposal_path'] = $proposalFile->store('penelitian/proposals', 'public');
            $data['proposal_filename'] = $proposalFile->getClientOriginalName();
        }

        if ($request->hasFile('lampiran_file')) {
            $ptPenelitian->deleteStoredFile('lampiran');
            $lampiranFile = $request->file('lampiran_file');
            $data['lampiran_path'] = $lampiranFile->store('penelitian/lampiran', 'public');
            $data['lampiran_filename'] = $lampiranFile->getClientOriginalName();
        }

        DB::transaction(function () use ($ptPenelitian, $data, $anggotaPayload, $rabPayload): void {
            $ptPenelitian->update($data);
            $this->syncAnggota($ptPenelitian, $anggotaPayload);
            $this->syncRab($ptPenelitian, $rabPayload);

            $pendingApprovals = $this->initializeAnggotaApprovals($ptPenelitian);

            if ($pendingApprovals === 0) {
                $this->refreshPenelitianStatusAfterApprovals($ptPenelitian);
            } else {
                $ptPenelitian->forceFill([
                    'status' => 'Menunggu Persetujuan Anggota',
                    'updated_at' => now(),
                ])->save();
            }
        });

        return redirect()
            ->route('pt-penelitian.index')
            ->with('success', 'Usulan penelitian berhasil diperbarui.');
    }

    public function destroy(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizeOwnership($ptPenelitian);

        $ptPenelitian->forceFill([
            'deleted_by' => $request->user()->id,
        ])->save();

        $ptPenelitian->delete();

        return redirect()
            ->route('pt-penelitian.index')
            ->with('success', 'Usulan penelitian berhasil dihapus.');
    }

    protected function authorizeOwnership(PtPenelitian $ptPenelitian): void
    {
        abort_unless(
            $ptPenelitian->created_by === auth()->id(),
            Response::HTTP_FORBIDDEN,
            'Anda tidak diizinkan mengakses data ini.'
        );
    }

    protected function authorizeOwnershipOrMembership(Request $request, PtPenelitian $ptPenelitian): void
    {
        $user = $request->user();

        if (! $user) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak diizinkan mengakses data ini.');
        }

        if ($ptPenelitian->created_by === $user->id) {
            return;
        }

        $dosenUuid = optional($user->dosen)->uuid;

        if ($dosenUuid && $ptPenelitian->anggota()->where('dosen_uuid', $dosenUuid)->exists()) {
            return;
        }

        abort(Response::HTTP_FORBIDDEN, 'Anda tidak diizinkan mengakses data ini.');
    }

    protected function validatedData(Request $request, bool $isUpdate = false): array
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'id_skema' => 'nullable|string|max:100',
            'id_tkt' => 'nullable|string|max:100',
            'id_sdg' => 'nullable|string|max:100',
            'id_fokus' => 'nullable|string|max:100',
            'tahun' => 'nullable|integer',
            'tahun_pelaksanaan' => 'nullable|integer',
            'biaya_usulan_1' => 'nullable|numeric',
            'biaya_usulan_2' => 'nullable|numeric',
            'biaya_usulan_3' => 'nullable|numeric',
            'biaya_usulan_4' => 'nullable|numeric',
            'biaya_disetujui' => 'nullable|numeric',
            'status' => 'nullable|string|max:50',
            'target_luaran' => 'nullable|string',
            'proposal_file' => array_merge(
                $isUpdate ? ['nullable'] : ['required'],
                ['file', 'mimes:pdf,doc,docx', 'max:10240']
            ),
            'lampiran_file' => ['nullable', 'file', 'mimes:pdf,doc,docx,zip', 'max:20480'],
            'anggota' => ['nullable', 'array'],
            'anggota.*.dosen_uuid' => ['required', 'string', 'exists:dosen,uuid'],
            'anggota.*.peran' => ['nullable', 'string', 'max:100'],
            'anggota.*.tugas' => ['nullable', 'string', 'max:255'],
            'rab' => ['nullable', 'array'],
            'rab.*.tahun' => ['required', 'integer', 'min:1', 'max:4'],
            'rab.*.items' => ['required', 'array', 'min:1'],
            'rab.*.items.*.id_komponen' => ['nullable', 'integer', 'exists:ref_komponen_biaya,id'],
            'rab.*.items.*.nama_item' => ['required', 'string', 'max:255'],
            'rab.*.items.*.jumlah_item' => ['nullable', 'numeric'],
            'rab.*.items.*.harga_satuan' => ['nullable', 'numeric'],
            'rab.*.items.*.total_biaya' => ['nullable', 'numeric'],
        ]);

        $anggota = $validated['anggota'] ?? [];
        $normalizeNumber = static function ($value): ?float {
            if ($value === null || $value === '') {
                return null;
            }

            return is_numeric($value) ? (float) $value : null;
        };

        $rabEntries = collect($validated['rab'] ?? [])
            ->map(function (array $entry) use ($normalizeNumber) {
                $year = isset($entry['tahun']) ? (int) $entry['tahun'] : 0;

                if ($year < 1 || $year > 4) {
                    return null;
                }

                $items = collect($entry['items'] ?? [])
                    ->map(function (array $item) use ($normalizeNumber) {
                        $name = trim((string) ($item['nama_item'] ?? ''));

                        if ($name === '') {
                            return null;
                        }

                        $component = isset($item['id_komponen']) && $item['id_komponen'] !== ''
                            ? (int) $item['id_komponen']
                            : null;
                        $jumlah = $normalizeNumber($item['jumlah_item'] ?? null);
                        $harga = $normalizeNumber($item['harga_satuan'] ?? null);
                        $total = $normalizeNumber($item['total_biaya'] ?? null);

                        if ($total === null && $jumlah !== null && $harga !== null) {
                            $total = $jumlah * $harga;
                        }

                        return [
                            'id_komponen' => $component,
                            'nama_item' => $name,
                            'jumlah_item' => $jumlah,
                            'harga_satuan' => $harga,
                            'total_biaya' => $total,
                        ];
                    })
                    ->filter()
                    ->values();

                if ($items->isEmpty()) {
                    return null;
                }

                return [
                    'tahun' => $year,
                    'items' => $items->all(),
                ];
            })
            ->filter()
            ->values()
            ->all();

        $totalsByYear = collect($rabEntries)
            ->mapWithKeys(fn(array $entry) => [
                (int) $entry['tahun'] => collect($entry['items'])
                    ->sum(fn($item) => $item['total_biaya'] ?? 0),
            ]);

        foreach ([1, 2, 3, 4] as $year) {
            $field = "biaya_usulan_{$year}";
            $validated[$field] = $totalsByYear->has($year)
                ? (float) $totalsByYear->get($year)
                : null;
        }

        unset($validated['proposal_file'], $validated['lampiran_file'], $validated['anggota'], $validated['rab']);

        return [
            'fields' => $validated,
            'anggota' => $anggota,
            'rab' => $rabEntries,
        ];
    }

    protected function normalizePayload(Request $request): void
    {
        $numericFields = [
            'biaya_usulan_1',
            'biaya_usulan_2',
            'biaya_usulan_3',
            'biaya_usulan_4',
            'biaya_disetujui',
            'tahun',
            'tahun_pelaksanaan',
        ];

        foreach ($numericFields as $field) {
            if (! $request->filled($field)) {
                $request->merge([$field => null]);
            }
        }

        $nullableStrings = ['id_skema', 'id_tkt', 'id_sdg', 'id_fokus', 'status'];

        foreach ($nullableStrings as $field) {
            if ($request->has($field) && $request->input($field) === '') {
                $request->merge([$field => null]);
            }
        }
    }

    public function preview(Request $request, PtPenelitian $ptPenelitian): InertiaResponse
    {
        $this->authorizeOwnershipOrMembership($request, $ptPenelitian);

        $previewData = $this->buildPenelitianPreview($ptPenelitian);

        return Inertia::render('penelitian/preview', [
            ...$previewData,
            'breadcrumbs' => [
                ['title' => 'Dashboard Dosen', 'href' => '/dashboard/dosen'],
                ['title' => 'Penelitian', 'href' => '/pt-penelitian'],
                ['title' => 'Preview', 'href' => '#'],
            ],
            'backLink' => [
                'href' => '/pt-penelitian',
                'label' => 'Kembali',
            ],
            'canManageStatus' => false,
            'statusUrls' => null,
            'currentStatus' => $ptPenelitian->status,
        ]);
    }

    public function download(Request $request, PtPenelitian $ptPenelitian, string $type): StreamedResponse
    {
        $this->authorizeOwnership($ptPenelitian);

        $type = $type === 'lampiran' ? 'lampiran' : 'proposal';

        $path = $type === 'proposal' ? $ptPenelitian->proposal_path : $ptPenelitian->lampiran_path;
        $filename = $type === 'proposal'
            ? ($ptPenelitian->proposal_filename ?? 'proposal-' . $ptPenelitian->getKey())
            : ($ptPenelitian->lampiran_filename ?? 'lampiran-' . $ptPenelitian->getKey());

        abort_if(! $path, Response::HTTP_NOT_FOUND);

        $disk = Storage::disk('public');

        abort_if(! $disk->exists($path), Response::HTTP_NOT_FOUND);

        return $disk->download($path, $filename);
    }

    protected function documentColumnsAvailable(): bool
    {
        return Schema::hasColumns('pt_penelitian', [
            'proposal_path',
            'proposal_filename',
            'lampiran_path',
            'lampiran_filename',
        ]);
    }

    protected function syncAnggota(PtPenelitian $ptPenelitian, array $anggota): void
    {
        $ptPenelitian->anggota()->delete();

        if (empty($anggota)) {
            return;
        }

        $timestamp = now();

        $anggotaCollection = collect($anggota)
            ->filter(fn($item) => filled($item['dosen_uuid'] ?? null));

        $records = $anggotaCollection
            ->map(fn($item) => [
                'penelitian_uuid' => $ptPenelitian->uuid,
                'dosen_uuid' => $item['dosen_uuid'],
                'peran' => $item['peran'] ?? null,
                'tugas' => $item['tugas'] ?? null,
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
            ])
            ->values()
            ->all();

        if (! empty($records)) {
            PtPenelitianAnggota::insert($records);
        }
    }

    protected function syncRab(PtPenelitian $ptPenelitian, array $rab): void
    {
        $tableMap = [
            1 => 'pt_rab_tahun_1',
            2 => 'pt_rab_tahun_2',
            3 => 'pt_rab_tahun_3',
            4 => 'pt_rab_tahun_4',
        ];

        foreach ($tableMap as $table) {
            DB::table($table)
                ->where('id_penelitian', $ptPenelitian->uuid)
                ->delete();
        }

        if (empty($rab)) {
            return;
        }

        $timestamp = now();

        foreach ($rab as $entry) {
            $year = (int) ($entry['tahun'] ?? 0);
            $table = $tableMap[$year] ?? null;

            if (! $table) {
                continue;
            }

            $records = collect($entry['items'] ?? [])
                ->map(fn(array $item) => [
                    'id_penelitian' => $ptPenelitian->uuid,
                    'id_komponen' => $item['id_komponen'],
                    'nama_item' => $item['nama_item'],
                    'jumlah_item' => $item['jumlah_item'],
                    'harga_satuan' => $item['harga_satuan'],
                    'total_biaya' => $item['total_biaya'],
                    'id_satuan' => null,
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ])
                ->values()
                ->all();

            if (! empty($records)) {
                DB::table($table)->insert($records);
            }
        }
    }

    protected function initializeAnggotaApprovals(PtPenelitian $ptPenelitian): int
    {
        $anggotaCollection = $ptPenelitian->anggota()->get();

        if ($anggotaCollection->isEmpty()) {
            return 0;
        }

        $anggotaIds = $anggotaCollection->pluck('id');

        DB::table('pt_penelitian_anggota_approvals')
            ->whereIn('anggota_id', $anggotaIds)
            ->delete();

        $now = now();

        $records = $anggotaCollection
            ->map(function (PtPenelitianAnggota $anggota) use ($now) {
                $peran = strtolower($anggota->peran ?? '');
                $isKetua = str_contains($peran, 'ketua');

                return [
                    'anggota_id' => $anggota->id,
                    'dosen_uuid' => $anggota->dosen_uuid,
                    'status' => $isKetua ? 'approved' : 'pending',
                    'approved_at' => $isKetua ? $now : null,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            })
            ->values();

        if ($records->isEmpty()) {
            return 0;
        }

        DB::table('pt_penelitian_anggota_approvals')->insert($records->all());

        return $records->filter(fn($record) => $record['status'] !== 'approved')->count();
    }

    protected function refreshPenelitianStatusAfterApprovals(PtPenelitian $ptPenelitian): void
    {
        // $pendingCount = DB::table('pt_penelitian_anggota_approvals')
        //     ->whereIn('anggota_id', $ptPenelitian->anggota()->pluck('id'))
        //     ->where('status', 'pending')
        //     ->count();

        // if ($pendingCount === 0) {
        //     $ptPenelitian->forceFill([
        //         'status' => 'Mengajukan',
        //         'updated_at' => now(),
        //     ])->save();
        // }
    }

    public function approveAnggota(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizeAnggotaAccess($request, $ptPenelitian);

        $dosenUuid = optional($request->user()->dosen)->uuid;

        $anggota = $ptPenelitian->anggota()
            ->where('dosen_uuid', $dosenUuid)
            ->first();

        if (! $anggota) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak terdaftar sebagai anggota penelitian ini.');
        }

        $approval = DB::table('pt_penelitian_anggota_approvals')
            ->where('anggota_id', $anggota->id)
            ->first();

        if (! $approval) {
            $this->initializeAnggotaApprovals($ptPenelitian);
            $approval = DB::table('pt_penelitian_anggota_approvals')
                ->where('anggota_id', $anggota->id)
                ->first();
        }

        if ($approval && $approval->status === 'approved') {
            return back()->with('success', 'Anda sudah menyetujui keikutsertaan dalam penelitian ini.');
        }

        DB::table('pt_penelitian_anggota_approvals')
            ->updateOrInsert(
                ['anggota_id' => $anggota->id],
                [
                    'dosen_uuid' => $anggota->dosen_uuid,
                    'status' => 'approved',
                    'approved_at' => now(),
                    'updated_at' => now(),
                    'created_at' => $approval?->created_at ?? now(),
                ],
            );

        $ptPenelitian->refresh();
        // $this->refreshPenelitianStatusAfterApprovals($ptPenelitian);

        return back()->with('success', 'Persetujuan keikutsertaan berhasil direkam.');
    }

    protected function authorizeAnggotaAccess(Request $request, PtPenelitian $ptPenelitian): void
    {
        $dosenUuid = optional($request->user()->dosen)->uuid;

        if (! $dosenUuid) {
            abort(Response::HTTP_FORBIDDEN, 'Profil dosen tidak ditemukan.');
        }

        $isAnggota = $ptPenelitian->anggota()
            ->where('dosen_uuid', $dosenUuid)
            ->exists();

        if (! $isAnggota) {
            abort(Response::HTTP_FORBIDDEN, 'Anda bukan anggota penelitian ini.');
        }
    }

    protected function userVerified(?User $user): bool
    {
        if (! $user) {
            return false;
        }

        if ($user->hasAnyRole([User::ROLE_SUPER_ADMIN, User::ROLE_ADMIN_PT])) {
            return true;
        }

        return (bool) optional($user->dosen)->verified_at;
    }

    protected function redirectIfNotVerified(Request $request): ?RedirectResponse
    {
        if ($this->userVerified($request->user())) {
            return null;
        }

        return redirect()
            ->route('pt-penelitian.index')
            ->with('error', 'Akun Anda belum disetujui oleh admin PT. Silakan hubungi admin di perguruan tinggi Anda.');
    }
}
