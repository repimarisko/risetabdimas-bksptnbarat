<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Penelitian\Concerns\BuildsPenelitianPreview;
use App\Models\PtPenelitian;
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

        $penelitian = PtPenelitian::query()
            ->when($uuidPt, fn($query, $uuid) => $query->where('uuid_pt', $uuid))
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('penelitian/index-all', [
            'penelitian' => $penelitian,
        ]);
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
