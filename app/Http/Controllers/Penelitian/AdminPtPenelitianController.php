<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Penelitian\Concerns\BuildsPenelitianPreview;
use App\Models\PtPenelitian;
use App\Models\PtPenelitianReview;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminPtPenelitianController extends Controller
{
    use BuildsPenelitianPreview;

    public function index(Request $request): InertiaResponse
    {
        $uuidPt = $request->user()->uuid_pt;
        $isSuperAdmin = $request->user()?->hasRole('super-admin');

        $penelitian = PtPenelitian::query()
            ->when($uuidPt, fn($query, $uuid) => $query->where('uuid_pt', $uuid))
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        $deleted = $isSuperAdmin
            ? collect()
            : PtPenelitian::onlyTrashed()
            ->when($uuidPt, fn($query, $uuid) => $query->where('uuid_pt', $uuid))
            ->orderByDesc('deleted_at')
            ->limit(10)
            ->get(['uuid', 'title', 'deleted_at']);

        return Inertia::render('penelitian/index-all', [
            'penelitian' => $penelitian,
            'deletedPenelitian' => $deleted,
            'showDeletedLink' => $isSuperAdmin,
        ]);
    }

    public function deleted(Request $request): InertiaResponse
    {
        abort_unless($request->user()?->hasRole('super-admin'), Response::HTTP_FORBIDDEN);

        $penelitian = PtPenelitian::onlyTrashed()
            ->with(['user' => fn($query) => $query->withTrashed()])
            ->orderByDesc('deleted_at')
            ->paginate(15)
            ->withQueryString()
            ->through(function (PtPenelitian $item) {
                return [
                    'uuid' => $item->uuid,
                    'title' => $item->title,
                    'status' => $item->status,
                    'email_pengusul' => optional($item->user)->email,
                    'deleted_at' => optional($item->deleted_at)?->toIso8601String(),
                    'created_at' => optional($item->created_at)?->toIso8601String(),
                ];
            });

        return Inertia::render('penelitian/deleted', [
            'penelitian' => $penelitian,
        ]);
    }

    public function restore(Request $request, string $uuid): RedirectResponse
    {
        abort_unless($request->user()?->hasRole('super-admin'), Response::HTTP_FORBIDDEN);

        $ptPenelitian = PtPenelitian::onlyTrashed()->where('uuid', $uuid)->firstOrFail();
        $ptPenelitian->restore();

        return redirect()
            ->back()
            ->with('success', 'Usulan berhasil dipulihkan.');
    }

    public function show(Request $request, PtPenelitian $ptPenelitian): InertiaResponse
    {
        $this->authorizePerguruan($request, $ptPenelitian);

        $previewData = $this->buildPenelitianPreview($ptPenelitian);

        return Inertia::render('penelitian/preview', [
            ...$previewData,
            'breadcrumbs' => [
                $this->resolveDashboardBreadcrumb($request),
                $this->resolveIndexBreadcrumb($request),
                ['title' => 'Detail Usulan', 'href' => '#'],
            ],
            'backLink' => [
                'href' => '/admin/pt-penelitian',
                'label' => 'Kembali',
            ],
            'canManageStatus' => true,
            'statusUrls' => [
                'approve' => route('admin.pt-penelitian.approve', $ptPenelitian),
                'reject' => route('admin.pt-penelitian.reject', $ptPenelitian),
            ],
            'currentStatus' => $ptPenelitian->status,
            'reviewers' => $ptPenelitian->reviewers()
                ->get(['users.id', 'users.name', 'users.email'])
                ->map(fn(User $user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]),
        ]);
    }

    public function destroy(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizePerguruan($request, $ptPenelitian);

        $ptPenelitian->forceFill([
            'deleted_by' => $request->user()->id,
        ])->save();

        $ptPenelitian->delete();

        return redirect()
            ->route('admin.pt-penelitian.index-all')
            ->with('success', 'Usulan penelitian dihapus.');
    }

    public function approve(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizePerguruan($request, $ptPenelitian);

        $ptPenelitian->forceFill([
            'status' => 'Disetujui',
        ])->save();

        return redirect()
            ->back()
            ->with('success', 'Usulan penelitian disetujui.');
    }

    public function reject(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizePerguruan($request, $ptPenelitian);

        $ptPenelitian->forceFill([
            'status' => 'Ditolak',
        ])->save();

        return redirect()
            ->back()
            ->with('success', 'Usulan penelitian ditolak.');
    }

    public function reviewerAssignIndex(Request $request): InertiaResponse
    {
        $uuidPt = $request->user()->uuid_pt;

        $rows = PtPenelitian::query()
            ->when(
                $uuidPt,
                fn($query, $uuid) => $query->where('uuid_pt', $uuid),
            )
            ->whereRaw("LOWER(COALESCE(status, '')) LIKE '%disetujui%'")
            ->orderByDesc('created_at')
            ->with(['reviewers'])
            ->get(['uuid', 'title', 'status', 'uuid_pt', 'created_at'])
            ->map(function (PtPenelitian $item) {
                return [
                    'uuid' => $item->uuid,
                    'title' => $item->title,
                    'status' => $item->status,
                    'created_at' =>  $item->created_at,
                    'reviewers' => $item->reviewers->map(fn(User $user) => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                    ]),
                ];
            })
            ->values()
            ->all();

        $availableReviewers = DB::table('model_has_roles')
            ->join('users', 'users.id', '=', 'model_has_roles.model_id')
            ->where('model_has_roles.model_type', '=', User::class)
            ->where('model_has_roles.role_id', function ($query) {
                $query->select('id')
                    ->from('roles')
                    ->where('name', 'reviewer')
                    ->limit(1);
            })
            ->whereNull('users.deleted_at')
            ->orderBy('users.name')
            ->get(['users.id', 'users.name', 'users.email'])
            ->map(fn($row) => [
                'id' => (int) $row->id,
                'name' => $row->name,
                'email' => $row->email,
            ]);

        return Inertia::render('penelitian/assign-reviewers', [
            'items' => $rows,
            'reviewers' => $availableReviewers,
            'breadcrumbs' => [
                $this->resolveDashboardBreadcrumb($request),
                ['title' => 'Plotting Reviewer', 'href' => '#'],
            ],
        ]);
    }

    public function assignReviewer(Request $request, PtPenelitian $ptPenelitian): RedirectResponse
    {
        $this->authorizePerguruan($request, $ptPenelitian);

        $data = $request->validate([
            'reviewer_id' => 'required|integer|exists:users,id',
        ]);

        $ptPenelitian->reviewers()->syncWithoutDetaching([
            $data['reviewer_id'] => ['assigned_at' => now()],
        ]);

        return redirect()
            ->back()
            ->with('success', 'Reviewer berhasil ditugaskan.');
    }

    public function export(Request $request): StreamedResponse
    {
        $uuidPt = $request->user()->uuid_pt;

        $records = PtPenelitian::query()
            ->when($uuidPt, fn($query, $uuid) => $query->where('uuid_pt', $uuid))
            ->orderByDesc('created_at')
            ->with(['perguruanTinggi', 'anggota.dosen.user'])
            ->get();

        $filename = 'penelitian-' . ($uuidPt ?? 'semua') . '-' . now()->format('Ymd-His') . '.csv';

        return response()->streamDownload(function () use ($records): void {
            $handle = fopen('php://output', 'w');

            if (! $handle) {
                return;
            }

            // Add BOM so Excel detects UTF-8
            fwrite($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

            fputcsv($handle, [
                'Judul',
                'Status',
                'Tahun Pengajuan',
                'Tahun Pelaksanaan',
                'Biaya Usulan Total',
                'Biaya Disetujui',
                'Email Pengusul',
                'Perguruan Tinggi',
                'Tanggal Dibuat',
                'Jumlah Anggota',
            ]);

            foreach ($records as $penelitian) {
                $totalUsulan = collect([
                    $penelitian->biaya_usulan_1,
                    $penelitian->biaya_usulan_2,
                    $penelitian->biaya_usulan_3,
                    $penelitian->biaya_usulan_4,
                ])->filter(fn($value) => is_numeric($value))->sum();

                $anggotaCount = $penelitian->anggota->count();

                fputcsv($handle, [
                    $penelitian->title,
                    $penelitian->status,
                    $penelitian->tahun,
                    $penelitian->tahun_pelaksanaan,
                    $totalUsulan,
                    $penelitian->biaya_disetujui,
                    $penelitian->email_pengusul,
                    $penelitian->perguruanTinggi->nama ?? '-',
                    optional($penelitian->created_at)?->format('Y-m-d H:i:s'),
                    $anggotaCount,
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
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

    protected function resolveIndexBreadcrumb(Request $request): array
    {
        $user = $request->user();

        if ($user?->hasRole('ketua-lppm')) {
            return ['title' => 'Persetujuan Penelitian', 'href' => '/admin/pt-penelitian'];
        }

        return ['title' => 'Semua Usulan', 'href' => '/admin/pt-penelitian'];
    }

    protected function authorizePerguruan(Request $request, PtPenelitian $ptPenelitian): void
    {
        $uuidPt = $request->user()->uuid_pt;

        if ($uuidPt && $ptPenelitian->uuid_pt && $ptPenelitian->uuid_pt !== $uuidPt) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak diizinkan mengakses data ini.');
        }
    }
    // MENU PENUGASAN REVIEW
    public function penugasanReview(Request $request)
    {
        $idpt = $request->user()->uuid_pt;
        $role = $request->user()->roles->pluck('name')->first();
        // var_dump($role);
        // die();

        $query = DB::table('pt_penelitian')
            ->leftJoin('pt_penugasan_review', 'pt_penelitian.uuid', '=', 'pt_penugasan_review.id_penelitian')
            ->leftJoin('pt_review_administrasi', 'pt_penugasan_review.id', '=', 'pt_review_administrasi.id_penugasan')
            ->leftJoin('users', 'pt_penelitian.created_by', '=', 'users.id')
            ->where('pt_penelitian.status', 'disetujui')
            ->whereNull('pt_penelitian.deleted_at');

        if ($role !== 'super-admin') {
            $query->where('pt_penelitian.uuid_pt', $idpt);
        }

        $penelitian = $query
            ->select(
                'pt_penelitian.uuid',
                'pt_penelitian.title',
                'pt_review_administrasi.hasil as status_review_administrasi',
                'pt_penelitian.tahun',
                'pt_penelitian.tahun_pelaksanaan',
                'pt_penelitian.status',
                'users.id as user_id',
                'users.name as user_name',
                'users.email as user_email'
            )
            ->get()
            ->map(fn($item) => [
                'uuid' => $item->uuid,
                'title' => $item->title,
                'tahun' => $item->tahun,
                'tahun_pelaksanaan' => $item->tahun_pelaksanaan,
                'status' => $item->status,
                'status_review_administrasi' => $item->status_review_administrasi,
                'user' => $item->user_id ? [
                    'id' => $item->user_id,
                    'name' => $item->user_name,
                    'email' => $item->user_email,
                ] : null,
            ])
            ->toArray();

        // var_dump($penelitian);
        // die();
        // Ambil semua reviewer
        $reviewers = DB::table('reviewer')
            ->join('users', 'reviewer.id_user', '=', 'users.id')

            ->select(
                'reviewer.id',
                'users.name',
                'users.email',

            )
            ->get()
            ->map(fn($item) => [
                'id'    => $item->id,
                'name'  => $item->name,
                'email' => $item->email,

            ])
            ->toArray();

        // Ambil penugasan yang sudah ada, group by id_penelitian
        $uuids = array_column($penelitian, 'uuid');

        $penugasanRaw = DB::table('pt_penugasan_review')
            ->whereIn('pt_penugasan_review.id_penelitian', $uuids)
            ->join('reviewer', 'pt_penugasan_review.id_reviewer', '=', 'reviewer.id')
            ->join('users', 'reviewer.id_user', '=', 'users.id')
            ->join('ref_jenis_penugasan', 'pt_penugasan_review.id_jenis_penugasan', '=', 'ref_jenis_penugasan.id')
            // ->leftjoin('pt_penelitian', 'pt_penugasan_review.id_penelitian', '=', 'pt_penelitian.uuid')
            ->select(
                'pt_penugasan_review.id',
                'pt_penugasan_review.id_penelitian',
                'pt_penugasan_review.id_reviewer', // ✅ tambah ini
                'pt_penugasan_review.id_jenis_penugasan',
                'pt_penugasan_review.tanggal_penugasan',
                'pt_penugasan_review.batas_waktu',
                'pt_penugasan_review.status_review',
                'ref_jenis_penugasan.nama as jenis_nama',
                'users.name as reviewer_name',
                'users.email as reviewer_email'
            )
            ->get();
        // var_dump($penugasanRaw);
        // die();
        // Group by id_penelitian
        $penugasan = [];
        foreach ($penugasanRaw as $item) {
            $penugasan[$item->id_penelitian][] = [
                'id'                  => $item->id,
                'id_jenis_penugasan'  => $item->id_jenis_penugasan,
                'id_reviewer'  => $item->id_reviewer,
                'jenis_nama'          => $item->jenis_nama,
                'reviewer_name'       => $item->reviewer_name,
                'reviewer_email'      => $item->reviewer_email,
                'tanggal_penugasan'   => $item->tanggal_penugasan,
                'batas_waktu'         => $item->batas_waktu,
                'status_review'       => $item->status_review,
            ];
        }

        $breadcrumbs = [
            ['title' => 'Dashboard',         'href' => '/dashboard'],
            ['title' => 'Penugasan Review',  'href' => '/admin/pt-penelitian/penugasan-review'],
        ];

        return Inertia::render('penelitian/penugasanReview/index', [
            'penelitian' => $penelitian,
            'reviewers'  => $reviewers,
            'penugasan'  => $penugasan,
            'breadcrumbs' => $breadcrumbs,
        ]);
    }

    // STORE PENUGASAN
    public function storePenugasan(Request $request)
    {
        $request->validate([
            'id_penelitian'      => 'required|exists:pt_penelitian,uuid',
            'id_reviewer'        => 'required|exists:reviewer,id',
            'id_jenis_penugasan' => 'required|exists:ref_jenis_penugasan,id',
            'tanggal_penugasan'  => 'required|date',
            'batas_waktu'        => 'required|date|after_or_equal:tanggal_penugasan',
        ]);
        // JIKA REVIEWER ADALAH ANGGOTA PENELITIAN, MAKA TIDAK BISA DI PLOTTING
        $idreviewer = $request->id_reviewer;
        $idPenelitian = $request->id_penelitian;

        $reviewer = DB::table('reviewer')
            ->where('id', $idreviewer)
            ->first();

        $exists = DB::table('pt_penelitian_anggotas')
            ->join('dosen', 'pt_penelitian_anggotas.dosen_uuid', '=', 'dosen.uuid')
            ->where('pt_penelitian_anggotas.penelitian_uuid', $idPenelitian)
            ->where('dosen.id_user', $reviewer->id_user)
            ->exists();

        if ($exists) {
            return back()->with('error', 'Reviewer tidak dapat ditugaskan karena merupakan anggota pada penelitian ini.');
        }
        // JIKA REVIEWER ADALAH ANGGOTA PENELITIAN, MAKA TIDAK BISA DI PLOTTING
        DB::table('pt_penugasan_review')->insert([
            'id'                 => (string) Str::uuid(), // ← tambahkan
            'id_penelitian'      => $request->id_penelitian,
            'id_reviewer'        => $request->id_reviewer,
            'id_jenis_penugasan' => $request->id_jenis_penugasan,
            'tanggal_penugasan'  => $request->tanggal_penugasan,
            'batas_waktu'        => $request->batas_waktu,
            'status_review'      => 'Pending',
            'created_at'         => now(),
            'updated_at'         => now(),
        ]);

        return back()->with('success', 'Reviewer berhasil ditugaskan.');
    }

    // UPDATE PENUGASAN
    public function updatePenugasan(Request $request, $id)
    {
        $request->validate([
            'id_reviewer'        => 'required|exists:reviewer,id',
            'id_jenis_penugasan' => 'required|exists:ref_jenis_penugasan,id',
            'tanggal_penugasan'  => 'required|date',
            'batas_waktu'        => 'required|date|after_or_equal:tanggal_penugasan',
        ]);

        $exists = DB::table('pt_penugasan_review')->where('id', $id)->exists();

        if (!$exists) {
            return back()->withErrors(['not_found' => 'Penugasan tidak ditemukan.']);
        }

        DB::table('pt_penugasan_review')
            ->where('id', $id)
            ->update([
                'id_reviewer'        => $request->id_reviewer,
                'id_jenis_penugasan' => $request->id_jenis_penugasan,
                'tanggal_penugasan'  => $request->tanggal_penugasan,
                'batas_waktu'        => $request->batas_waktu,
                'updated_at'         => now(),
            ]);

        return back()->with('success', 'Penugasan berhasil diperbarui.');
    }

    // DELETE PENUGASAN
    public function deletePenugasan($id)
    {
        $exists = DB::table('pt_penugasan_review')->where('id', $id)->exists();

        if (!$exists) {
            return back()->withErrors(['not_found' => 'Penugasan tidak ditemukan.']);
        }

        DB::table('pt_penugasan_review')->where('id', $id)->delete();

        return back()->with('success', 'Penugasan berhasil dihapus.');
    }
}
