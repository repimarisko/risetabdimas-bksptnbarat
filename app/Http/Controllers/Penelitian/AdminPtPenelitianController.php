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
                    'created_at' => optional($item->created_at)?->toIso8601String(),
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
}
