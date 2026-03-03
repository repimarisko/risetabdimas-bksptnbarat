<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Penelitian\Concerns\BuildsPenelitianPreview;
use App\Models\Dosen;
use App\Models\PtPenelitian;
use App\Models\PtPenelitianAnggota;
use App\Models\PtPenelitianReview;
use App\Models\User;
use Illuminate\Support\Carbon;
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

    public const REVIEW_RECOMMENDATIONS = [
        'diterima' => 'Diterima',
        'revisi' => 'Perlu Revisi',
        'ditolak' => 'Ditolak',
    ];

    public const REVIEW_WEIGHTS = [
        ['key' => 'substansi', 'label' => 'Evaluasi Substansi', 'weight' => 60],
        ['key' => 'rab', 'label' => 'Kelayakan RAB', 'weight' => 40],
    ];

    public function index(Request $request): InertiaResponse
    {
        $penelitian = PtPenelitian::query()
            ->with('user')
            ->where(function ($query) use ($request): void {
                $query->where('created_by', $request->user()->id)
                    ->orWhereHas('anggota', function ($anggotaQuery) use ($request): void {
                        $anggotaQuery->where('dosen_uuid', optional($request->user()->dosen)->uuid);
                    });
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        $approvalSummaries = $this->resolveApprovalSummaries(
            $penelitian->getCollection()->pluck('uuid'),
        );

        $penelitian = $penelitian->through(function ($item) use ($approvalSummaries) {
            $summary = $approvalSummaries[$item->uuid] ?? [
                'total' => 0,
                'approved' => 0,
                'pending' => 0,
                'missing' => 0,
                'all_approved' => false,
            ];

            return [
                ...$item->toArray(),
                'ketua_nama' => optional($item->user)->name,
                'approval_summary' => $summary,
            ];
        });

        $isVerified = $this->userVerified($request->user());
        $isProfileComplete = $this->profileComplete($request->user());
        $eligibilitySkema = DB::table('ref_skema')
            ->where('jenis_skema', 'penelitian')
            ->select(
                'uuid',
                'nama',
                'nama_singkat',
                'anggota_min',
                'anggota_max',
                'biaya_minimal',
                'biaya_maksimal',
                'multi_tahun',
                'mulai',
                'selesai'
            )
            ->whereNull('deleted_at')
            ->where(function ($query) {
                $query->whereNull('status')->orWhere('status', 'aktif');
            })
            ->orderBy('nama')
            ->get()
            ->map(fn($row) => [
                'uuid' => $row->uuid,
                'nama' => $row->nama,
                'nama_singkat' => $row->nama_singkat,
                'anggota_min' => $row->anggota_min,
                'anggota_max' => $row->anggota_max,
                'biaya_minimal' => $row->biaya_minimal,
                'biaya_maksimal' => $row->biaya_maksimal,
                'multi_tahun' => (bool) $row->multi_tahun,
                'mulai' => $row->mulai,
                'selesai' => $row->selesai,
            ])
            ->toArray();

        return Inertia::render('penelitian/index', [
            'penelitian' => $penelitian,
            'submissionLocked' => ! $isVerified || ! $isProfileComplete,
            'lockReason' => ! $isVerified
                ? 'Akun Anda belum disetujui oleh admin PT.'
                : (! $isProfileComplete
                    ? 'Lengkapi data profil (user detail) sebelum mengajukan usulan.'
                    : null),
            'isAccountVerified' => $isVerified,
            'eligibility' => [
                'schemes' => $eligibilitySkema,
                'profile' => [
                    'has_profile' => (bool) optional($request->user()->dosen)->uuid,
                    'verified' => $isVerified,
                    'profile_complete' => $isProfileComplete,
                    'uuid_pt' => $request->user()->uuid_pt,
                    'name' => $request->user()->name,
                ],
            ],
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
            ->where('jenis_skema', 'penelitian')
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
            ->whereNull('users.deleted_at')
            ->whereNull('dosen.deleted_at')
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
            ->select('id', 'id_komponen_rab', 'nama_komponen', 'jenis', 'keterangan')
            ->orderBy('nama_komponen')
            ->get()
            ->map(fn($record) => [
                'id' => $record->id,
                'id_komponen_rab' => $record->id_komponen_rab,
                'nama_komponen' => $record->nama_komponen,
                'jenis' => $record->jenis,
                'keterangan' => $record->keterangan,
            ])
            ->toArray();

        $kelompokOptions = DB::table('ref_komponen_rab')
            ->select('id', 'kategori', 'nama')
            ->orderBy('id')
            ->get()
            ->map(fn($record) => [
                'id' => $record->id,
                'kategori' => $record->kategori,
                'nama' => $record->nama,
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
            'kelompokOptions' => $kelompokOptions,
        ]);
    }

    public function perbaikan(Request $request): InertiaResponse
    {
        $user = $request->user();
        $keywords = ['perbaikan', 'revisi', 'koreksi'];

        $items = PtPenelitian::query()
            ->where('created_by', $user->id)
            ->where(function ($query) use ($keywords): void {
                foreach ($keywords as $keyword) {
                    $query->orWhereRaw(
                        'LOWER(COALESCE(status, \'\')) LIKE ?',
                        ['%' . Str::lower($keyword) . '%']
                    );
                }
            })
            ->when(
                Schema::hasColumn('pt_penelitian', 'updated_at'),
                fn($query) => $query->orderByDesc('updated_at'),
                fn($query) => $query
            )
            ->orderByDesc('created_at')
            ->get([
                'uuid',
                'title',
                'status',
                'created_at',
                'tahun',
                'tahun_pelaksanaan',
                'biaya_usulan_1',
                'biaya_usulan_2',
                'biaya_usulan_3',
                'biaya_usulan_4',
            ])
            ->map(function (PtPenelitian $item) {
                $usulanValues = collect([
                    $item->biaya_usulan_1,
                    $item->biaya_usulan_2,
                    $item->biaya_usulan_3,
                    $item->biaya_usulan_4,
                ])->filter();


                return [
                    'uuid' => $item->uuid,
                    'title' => $item->title,
                    'status' => $item->status,
                    'created_at' => Carbon::make($item->created_at)?->toIso8601String(),
                    'tahun' => $item->tahun,
                    'tahun_pelaksanaan' => $item->tahun_pelaksanaan,
                    'total_usulan' => $usulanValues->sum(),
                ];
            })
            ->values()
            ->all();

        return Inertia::render('penelitian/perbaikan', [
            'items' => $items,
        ]);
    }

    public function reviewerIndex(Request $request): InertiaResponse
    {
        $this->authorizeReviewer($request);

        $userId = $request->user()->id;

        $items = PtPenelitian::query()
            ->select([
                'pt_penelitian.uuid',
                'pt_penelitian.title',
                'pt_penelitian.status',
                'pt_penelitian.tahun',
                'pt_penelitian.tahun_pelaksanaan',
                'pt_penelitian.uuid_pt',
                'pt_penelitian_reviewer.assigned_at',
                'reviews.rekomendasi as reviewer_rekomendasi',
                'reviews.skor_kualitas as reviewer_skor_kualitas',
                'reviews.skor_rab as reviewer_skor_rab',
            ])
            ->join('pt_penelitian_reviewer', 'pt_penelitian_reviewer.penelitian_uuid', '=', 'pt_penelitian.uuid')
            ->leftJoin('pt_penelitian_reviews as reviews', function ($join) use ($userId): void {
                $join->on('reviews.penelitian_uuid', '=', 'pt_penelitian.uuid')
                    ->where('reviews.reviewer_id', '=', $userId);
            })
            ->where('pt_penelitian_reviewer.reviewer_id', $userId)
            ->with('perguruanTinggi')
            ->orderByDesc('pt_penelitian_reviewer.assigned_at')
            ->orderByDesc('pt_penelitian.created_at')
            ->get()
            ->map(function (PtPenelitian $item) {
                return [
                    'uuid' => $item->uuid,
                    'title' => $item->title,
                    'status' => $item->status,
                    'tahun' => $item->tahun,
                    'tahun_pelaksanaan' => $item->tahun_pelaksanaan,
                    'perguruan_tinggi' => optional($item->perguruanTinggi)->nama,
                    'assigned_at' => optional(Carbon::make($item->getAttribute('assigned_at')))?->toIso8601String(),
                    'review' => [
                        'rekomendasi' => $item->getAttribute('reviewer_rekomendasi'),
                        'skor_kualitas' => $item->getAttribute('reviewer_skor_kualitas'),
                        'skor_rab' => $item->getAttribute('reviewer_skor_rab'),
                    ],
                    'links' => [
                        'preview' => route('pt-penelitian.preview', $item),
                        'review' => route('reviewer.pt-penelitian.review', $item),
                    ],
                ];
            });

        return Inertia::render('penelitian/reviewer-index', [
            'items' => $items,
            'weights' => self::REVIEW_WEIGHTS,
            'breadcrumbs' => [
                ['title' => 'Dashboard Reviewer', 'href' => '/dashboard/reviewer'],
                ['title' => 'Review Proposal', 'href' => '#'],
            ],
        ]);
    }

    public function reviewForm(Request $request, PtPenelitian $ptPenelitian): InertiaResponse
    {
        $this->authorizeReviewer($request, $ptPenelitian);

        $preview = $this->buildPenelitianPreview($ptPenelitian);
        $review = PtPenelitianReview::query()
            ->where('penelitian_uuid', $ptPenelitian->uuid)
            ->where('reviewer_id', $request->user()->id)
            ->first();

        return Inertia::render('penelitian/review', [
            ...$preview,
            'review' => $review,
            'recommendationOptions' => self::REVIEW_RECOMMENDATIONS,
            'weights' => self::REVIEW_WEIGHTS,
            'breadcrumbs' => [
                ['title' => 'Dashboard Reviewer', 'href' => '/dashboard/reviewer'],
                ['title' => 'Review Proposal', 'href' => '/reviewer/pt-penelitian'],
                ['title' => 'Review Usulan', 'href' => '#'],
            ],
        ]);
    }

    public function reviewSubmit(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizeReviewer($request, $ptPenelitian);

        $data = $request->validate([
            'rekomendasi' => 'nullable|string|max:50',
            'skor_kualitas' => 'nullable|integer|min:0|max:100',
            'skor_rab' => 'nullable|integer|min:0|max:100',
            'catatan_umum' => 'nullable|string',
            'catatan_rab' => 'nullable|string',
        ]);

        PtPenelitianReview::updateOrCreate(
            [
                'penelitian_uuid' => $ptPenelitian->uuid,
                'reviewer_id' => $request->user()->id,
            ],
            [
                ...$data,
            ],
        );

        return redirect()
            ->route('reviewer.pt-penelitian.review', $ptPenelitian)
            ->with('success', 'Review berhasil disimpan.');
    }

    public function store(Request $request): RedirectResponse
    {
        if ($response = $this->redirectIfNotVerified($request)) {
            return $response;
        }

        try {
            $this->normalizePayload($request);
            $this->ensureSupportingTables();
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
                $now = now();

                $penelitian = PtPenelitian::create([
                    'uuid' => (string) Str::uuid(),
                    ...$data,
                    'created_by' => $request->user()->id,
                    'email_pengusul' => $request->user()->email,
                    'created_at' => $now,
                    ...($this->hasUpdatedAtColumn() ? ['updated_at' => $now] : []),
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
                        ...($this->hasUpdatedAtColumn() ? ['updated_at' => now()] : []),
                    ])->save();
                }
            });

            return redirect()
                ->route('pt-penelitian.index')
                ->with('success', 'Usulan penelitian berhasil dibuat.');
        } catch (\Throwable $e) {
            report($e);

            return back()->with('error', 'Gagal menyimpan usulan. Silakan coba lagi atau hubungi admin.')
                ->withInput();
        }
    }

    public function edit(PtPenelitian $ptPenelitian): InertiaResponse
    {
        $this->authorizeOwnership($ptPenelitian);

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
            ->whereNull('users.deleted_at')
            ->whereNull('dosen.deleted_at')
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
            ->select('id', 'id_komponen_rab', 'nama_komponen', 'jenis', 'keterangan')
            ->orderBy('nama_komponen')
            ->get()
            ->map(fn($record) => [
                'id' => $record->id,
                'id_komponen_rab' => $record->id_komponen_rab,
                'nama_komponen' => $record->nama_komponen,
                'jenis' => $record->jenis,
                'keterangan' => $record->keterangan,
            ])
            ->toArray();

        $kelompokOptions = DB::table('ref_komponen_rab')
            ->select('id', 'kategori', 'nama')
            ->orderBy('id')
            ->get()
            ->map(fn($record) => [
                'id' => $record->id,
                'kategori' => $record->kategori,
                'nama' => $record->nama,
            ])
            ->toArray();

        $anggota = $ptPenelitian->anggota()
            ->with('dosen')
            ->orderBy('id')
            ->get(['dosen_uuid', 'peran', 'tugas'])
            ->map(fn(PtPenelitianAnggota $item) => [
                'uuid_pt' => optional($item->dosen)->uuid_pt ?? '',
                'dosen_uuid' => $item->dosen_uuid,
                'peran' => $item->peran,
                'tugas' => $item->tugas,
            ])
            ->toArray();

        $rabTables = [
            1 => 'pt_rab_tahun_1',
            2 => 'pt_rab_tahun_2',
            3 => 'pt_rab_tahun_3',
            4 => 'pt_rab_tahun_4',
        ];

        $rabEntries = collect($rabTables)
            ->map(function (string $table, int $year) use ($ptPenelitian) {
                $items = DB::table($table)
                    ->select('id_komponen', 'nama_item', 'jumlah_item', 'harga_satuan', 'total_biaya', 'uuid')
                    ->where('id_penelitian', $ptPenelitian->uuid)
                    ->whereNull('deleted_at')
                    ->orderBy('uuid')
                    ->get()
                    ->map(function ($row) {
                        $name = trim((string) ($row->nama_item ?? ''));

                        if ($name === '') {
                            return null;
                        }

                        return [
                            'id_komponen' => $row->id_komponen ? (int) $row->id_komponen : null,
                            'nama_item' => $name,
                            'jumlah_item' => $row->jumlah_item !== null ? (float) $row->jumlah_item : null,
                            'harga_satuan' => $row->harga_satuan !== null ? (float) $row->harga_satuan : null,
                            'total_biaya' => $row->total_biaya !== null ? (float) $row->total_biaya : null,
                        ];
                    })
                    ->filter()
                    ->values()
                    ->all();

                if (empty($items)) {
                    return null;
                }

                return [
                    'tahun' => $year,
                    'items' => $items,
                ];
            })
            ->filter()
            ->values()
            ->all();

        $lamaWaktu = empty($rabEntries) ? null : max(array_column($rabEntries, 'tahun'));

        return Inertia::render('penelitian/edit', [
            'penelitian' => [
                'uuid' => $ptPenelitian->uuid,
                'title' => $ptPenelitian->title,
                'id_skema' => $ptPenelitian->id_skema,
                'id_tkt' => $ptPenelitian->id_tkt,
                'id_sdg' => $ptPenelitian->id_sdg,
                'id_fokus' => $ptPenelitian->id_fokus,
                'tahun_pengajuan' => $ptPenelitian->tahun,
                'tahun_pelaksanaan' => $ptPenelitian->tahun_pelaksanaan,
                'target_luaran' => $ptPenelitian->target_luaran,
                'proposal_filename' => $ptPenelitian->proposal_filename,
                'lampiran_filename' => $ptPenelitian->lampiran_filename,
                'rab' => $rabEntries,
                'anggota' => $anggota,
                'lama_waktu' => $lamaWaktu,
            ],
            'skemaOptions' => $skemaOptions,
            'fokusOptions' => $fokusOptions,
            'sdgOptions' => $sdgOptions,
            'tktOptions' => $tktOptions,
            'dosenOptions' => $dosenOptions,
            'perguruanOptions' => $perguruanOptions,
            'komponenOptions' => $komponenOptions,
            'kelompokOptions' => $kelompokOptions,
        ]);
    }

    public function update(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizeOwnership($ptPenelitian);

        try {
            $this->normalizePayload($request);
            $this->ensureSupportingTables();
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
                        ...($this->hasUpdatedAtColumn() ? ['updated_at' => now()] : []),
                    ])->save();
                }
            });

            return redirect()
                ->route('pt-penelitian.index')
                ->with('success', 'Usulan penelitian berhasil diperbarui.');
        } catch (\Throwable $e) {
            report($e);

            return back()->with('error', 'Gagal memperbarui usulan. Silakan coba lagi atau hubungi admin.')
                ->withInput();
        }
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

    public function submit(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizeOwnership($ptPenelitian);

        $summary = $this->resolveApprovalSummaries([$ptPenelitian->uuid])[$ptPenelitian->uuid] ?? [
            'pending' => 0,
            'missing' => 0,
            'all_approved' => false,
        ];

        $status = strtolower($ptPenelitian->status ?? '');
        $isWaitingForAnggota = str_contains($status, 'menunggu') || str_contains($status, 'anggota');

        if (! $isWaitingForAnggota && str_contains($status, 'mengaju')) {
            return back()->with('success', 'Usulan sudah berstatus Mengajukan.');
        }

        if (! ($summary['all_approved'] ?? false)) {
            return back()->with('error', 'Masih ada anggota yang belum menyetujui usulan.');
        }

        if (! $isWaitingForAnggota && $status) {
            return back()->with('error', 'Status usulan tidak dapat diubah ke Mengajukan.');
        }

        $ptPenelitian->forceFill([
            'status' => 'Mengajukan',
            ...($this->hasUpdatedAtColumn() ? ['updated_at' => now()] : []),
        ])->save();

        return back()->with('success', 'Status usulan diubah menjadi Mengajukan.');
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

    protected function profileComplete($user): bool
    {
        if (! $user) {
            return false;
        }

        $detail = DB::table('user_detail')->where('id_user', $user->id)->first();
        $requiredFields = ['nama_lengkap', 'tanggal_lahir', 'tempat_lahir', 'alamat', 'nik', 'hp'];

        if (! $detail) {
            return false;
        }

        foreach ($requiredFields as $field) {
            if (empty($detail->{$field})) {
                return false;
            }
        }

        return true;
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
                ['file', 'mimes:pdf,doc,docx', 'max:5120'] // 5 MB
            ),
            'lampiran_file' => ['nullable', 'file', 'mimes:pdf,doc,docx,zip', 'max:10240'], // 10 MB
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
        $this->authorizePreviewAccess($request, $ptPenelitian);

        $previewData = $this->buildPenelitianPreview($ptPenelitian);
        $navigation = $this->buildPreviewNavigation($request);

        return Inertia::render('penelitian/preview', [
            ...$previewData,
            'breadcrumbs' => $navigation['breadcrumbs'],
            'backLink' => $navigation['backLink'],
            'canManageStatus' => false,
            'statusUrls' => null,
            'currentStatus' => $ptPenelitian->status,
        ]);
    }

    protected function buildPreviewNavigation(Request $request): array
    {
        $user = $request->user();

        if ($user?->hasRole('reviewer')) {
            return [
                'breadcrumbs' => [
                    ['title' => 'Dashboard Reviewer', 'href' => '/dashboard/reviewer'],
                    ['title' => 'Review Proposal', 'href' => '/reviewer/pt-penelitian'],
                    ['title' => 'Preview', 'href' => '#'],
                ],
                'backLink' => [
                    'href' => '/reviewer/pt-penelitian',
                    'label' => 'Kembali ke daftar review',
                ],
            ];
        }

        if ($user?->hasAnyRole([
            User::ROLE_SUPER_ADMIN,
            User::ROLE_ADMIN_PT,
            User::ROLE_KETUA_LPPM,
        ])) {
            $dashboardHref = '/dashboard';

            if ($user->hasRole(User::ROLE_SUPER_ADMIN)) {
                $dashboardHref = '/dashboard/super-admin';
            } elseif ($user->hasRole(User::ROLE_ADMIN_PT)) {
                $dashboardHref = '/dashboard/admin-pt';
            } elseif ($user->hasRole(User::ROLE_KETUA_LPPM)) {
                $dashboardHref = '/dashboard/ketua-lppm';
            }

            $penelitianHref = $user->hasRole(User::ROLE_SUPER_ADMIN)
                ? '/admin/pt-penelitian'
                : '/admin/pt-penelitian';

            return [
                'breadcrumbs' => [
                    ['title' => 'Dashboard', 'href' => $dashboardHref],
                    ['title' => 'Penelitian', 'href' => $penelitianHref],
                    ['title' => 'Preview', 'href' => '#'],
                ],
                'backLink' => [
                    'href' => $penelitianHref,
                    'label' => 'Kembali',
                ],
            ];
        }

        return [
            'breadcrumbs' => [
                ['title' => 'Dashboard Dosen', 'href' => '/dashboard/dosen'],
                ['title' => 'Penelitian', 'href' => '/pt-penelitian'],
                ['title' => 'Preview', 'href' => '#'],
            ],
            'backLink' => [
                'href' => '/pt-penelitian',
                'label' => 'Kembali',
            ],
        ];
    }

    public function download(Request $request, PtPenelitian $ptPenelitian, string $type): StreamedResponse
    {
        // Pengunggah/anggota tim atau pengguna dengan akses menu yang relevan dapat mengunduh dokumen.
        $this->authorizeDownloadAccess($request, $ptPenelitian);

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

    protected function authorizeDownloadAccess(Request $request, PtPenelitian $ptPenelitian): void
    {
        $user = $request->user();

        if (! $user) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak diizinkan mengakses data ini.');
        }

        // Tetap izinkan mekanisme lama: ketua/anggota tim penelitian.
        if ($ptPenelitian->created_by === $user->id) {
            return;
        }

        $dosenUuid = optional($user->dosen)->uuid;

        if ($dosenUuid && $ptPenelitian->anggota()->where('dosen_uuid', $dosenUuid)->exists()) {
            return;
        }

        if ($user->hasRole('reviewer')) {
            $isAssignedReviewer = $ptPenelitian->reviewers()
                ->where('reviewer_id', $user->id)
                ->exists();

            if ($isAssignedReviewer) {
                return;
            }
        }

        if (! $this->canAccessPenelitianDownloadMenu($user, $ptPenelitian)) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak diizinkan mengakses dokumen ini.');
        }
    }

    protected function canAccessPenelitianDownloadMenu(User $user, PtPenelitian $ptPenelitian): bool
    {
        $menuPermissions = collect($user->getAllPermissions()->pluck('name'))
            ->filter(fn(string $permission) => str_starts_with($permission, 'menu:'))
            ->values();

        $downloadMenuPermissions = [
            'menu:pt-penelitian-admin',
            'menu:assign-reviewer',
        ];

        // Samakan perilaku backend dengan frontend:
        // jika permission menu sudah dikonfigurasi, maka harus lolos permission menu;
        // jika belum, fallback ke role administratif.
        $hasDownloadMenuAccess = $menuPermissions->isNotEmpty()
            ? $menuPermissions->intersect($downloadMenuPermissions)->isNotEmpty()
            : $user->hasAnyRole([
                User::ROLE_ADMIN_PT,
                User::ROLE_KETUA_LPPM,
                User::ROLE_SUPER_ADMIN,
            ]);

        if (! $hasDownloadMenuAccess) {
            return false;
        }

        if ($user->hasRole(User::ROLE_SUPER_ADMIN)) {
            return true;
        }

        $userUuidPt = $user->uuid_pt ?? optional($user->dosen)->uuid_pt;

        if (! $userUuidPt || ! $ptPenelitian->uuid_pt) {
            return true;
        }

        return $userUuidPt === $ptPenelitian->uuid_pt;
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

    protected function hasUpdatedAtColumn(): bool
    {
        return Schema::hasColumn('pt_penelitian', 'updated_at');
    }

    protected function ensureSupportingTables(): void
    {
        $requiredTables = [
            'pt_penelitian_anggotas',
            'pt_penelitian_anggota_approvals',
            'pt_rab_tahun_1',
        ];

        foreach ($requiredTables as $table) {
            if (! Schema::hasTable($table)) {
                throw ValidationException::withMessages([
                    'proposal_file' => 'Struktur database belum lengkap. Jalankan `php artisan migrate` untuk membuat tabel pendukung (' . $table . ').',
                ]);
            }
        }
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
        //         ...( $this->hasUpdatedAtColumn() ? ['updated_at' => now()] : []),
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
    public function rejectAnggota(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
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

        if ($approval && $approval->status === 'rejected') {
            return back()->with('info', 'Anda sudah menolak keikutsertaan dalam penelitian ini.');
        }

        DB::table('pt_penelitian_anggota_approvals')
            ->updateOrInsert(
                ['anggota_id' => $anggota->id],
                [
                    'dosen_uuid' => $anggota->dosen_uuid,
                    'status' => 'rejected',
                    'approved_at' => null,
                    'updated_at' => now(),
                    'created_at' => $approval?->created_at ?? now(),
                ],
            );

        return back()->with('info', 'Penolakan keikutsertaan berhasil direkam.');
    }

    protected function resolveApprovalSummaries(iterable $penelitianUuids): array
    {
        $uuids = collect($penelitianUuids)->filter()->values();

        if ($uuids->isEmpty()) {
            return [];
        }

        return DB::table('pt_penelitian_anggotas as anggota')
            ->leftJoin(
                'pt_penelitian_anggota_approvals as approvals',
                'approvals.anggota_id',
                '=',
                'anggota.id'
            )
            ->select(
                'anggota.penelitian_uuid',
                DB::raw('count(anggota.id) as anggota_count'),
                DB::raw("sum(case when approvals.status = 'approved' then 1 else 0 end) as approved_count"),
                DB::raw("sum(case when approvals.status = 'pending' then 1 else 0 end) as pending_count"),
                DB::raw("sum(case when approvals.id is null then 1 else 0 end) as missing_count"),
                DB::raw('max(approvals.approved_at) as latest_approved_at'),
            )
            ->whereIn('anggota.penelitian_uuid', $uuids)
            ->groupBy('anggota.penelitian_uuid')
            ->get()
            ->mapWithKeys(function ($row) {
                $total = (int) $row->anggota_count;
                $pending = (int) $row->pending_count;
                $missing = (int) $row->missing_count;

                return [
                    $row->penelitian_uuid => [
                        'total' => $total,
                        'approved' => (int) $row->approved_count,
                        'pending' => $pending,
                        'missing' => $missing,
                        'all_approved' => ($pending + $missing) === 0 && $total >= 0,
                        'latest_approved_at' => $row->latest_approved_at,
                    ],
                ];
            })
            ->toArray();
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

    protected function authorizeReviewer(Request $request, ?PtPenelitian $ptPenelitian = null): void
    {
        $user = $request->user();

        if (! $user || ! $user->hasRole('reviewer')) {
            abort(Response::HTTP_FORBIDDEN, 'Akses reviewer diperlukan.');
        }

        if (! $ptPenelitian) {
            return;
        }

        $isAssigned = $ptPenelitian->reviewers()
            ->where('reviewer_id', $user->id)
            ->exists();

        if ($isAssigned) {
            return;
        }

        abort(Response::HTTP_FORBIDDEN, 'Anda tidak ditugaskan sebagai reviewer untuk usulan ini.');
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
