<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportPenelitianController extends Controller
{
    public function index(Request $request)
    {
        $result = $this->buildReportData($request);

        return Inertia::render('penelitian/report/index', [
            'penelitian' => $result['penelitian'],
            'filters' => $result['filters'],
            'statusOptions' => $result['statusOptions'],
            'statusAdministrasiOptions' => $result['statusAdministrasiOptions'],
            'statusSubstansiOptions' => $result['statusSubstansiOptions'],
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Laporan Penelitian', 'href' => '/admin/pt-penelitian/report'],
            ],
        ]);
    }

    public function exportExcel(Request $request): StreamedResponse
    {
        $result = $this->buildReportData($request);
        $penelitian = collect($result['penelitian']);

        $rows = $penelitian->map(function ($item, $index) {
            return [
                'no' => $index + 1,
                'judul' => $item['title'],
                'ketua' => $item['user']['name'] ?? '-',
                'email_ketua' => $item['user']['email'] ?? '-',
                'nidn' => $item['user']['nidn'] ?? '-',
                'skema' => $item['skema_singkat'] ?: ($item['skema'] ?: '-'),
                'tahun' => $item['tahun'],
                'tahun_pelaksanaan' => $item['tahun_pelaksanaan'],
                'status_proposal' => $item['status'],
                'status_administrasi_ringkas' => $item['status_administrasi'],
                'status_substansi_ringkas' => $item['status_substansi'],

                'jumlah_reviewer_administrasi' => count($item['administrasi'] ?? []),
                'reviewer_administrasi' => $this->joinReviewerNames($item['administrasi'] ?? []),
                'status_penugasan_administrasi' => $this->joinFieldWithReviewer($item['administrasi'] ?? [], 'status_penugasan'),
                'status_review_administrasi' => $this->joinFieldWithReviewer($item['administrasi'] ?? [], 'status_review'),
                'hasil_administrasi' => $this->joinFieldWithReviewer($item['administrasi'] ?? [], 'hasil'),
                'komentar_administrasi' => $this->joinFieldWithReviewer($item['administrasi'] ?? [], 'komentar'),

                'jumlah_reviewer_substansi' => count($item['substansi'] ?? []),
                'reviewer_substansi' => $this->joinReviewerNames($item['substansi'] ?? []),
                'status_penugasan_substansi' => $this->joinFieldWithReviewer($item['substansi'] ?? [], 'status_penugasan'),
                'status_review_substansi' => $this->joinFieldWithReviewer($item['substansi'] ?? [], 'status_review'),
                'nilai_akhir_substansi' => $this->joinFieldWithReviewer($item['substansi'] ?? [], 'nilai_akhir'),
                'status_penilaian_substansi' => $this->joinStatusPenilaianWithReviewer($item['substansi'] ?? []),
                'komentar_substansi' => $this->joinFieldWithReviewer($item['substansi'] ?? [], 'komentar'),
            ];
        })->values();

        $filename = 'laporan_penelitian_' . now()->format('Ymd_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename={$filename}",
        ];

        return response()->streamDownload(function () use ($rows) {
            $handle = fopen('php://output', 'w');

            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

            fputcsv($handle, [
                'No',
                'Judul',
                'Ketua',
                'Email Ketua',
                'NIDN',
                'Skema',
                'Tahun',
                'Tahun Pelaksanaan',
                'Status Proposal',
                'Status Administrasi Ringkas',
                'Status Substansi Ringkas',

                'Jumlah Reviewer Administrasi',
                'Reviewer Administrasi',
                'Status Penugasan Administrasi',
                'Status Review Administrasi',
                'Hasil Administrasi',
                'Komentar Administrasi',

                'Jumlah Reviewer Substansi',
                'Reviewer Substansi',
                'Status Penugasan Substansi',
                'Status Review Substansi',
                'Nilai Akhir Substansi',
                'Status Penilaian Substansi',
                'Komentar Substansi',
            ]);

            foreach ($rows as $row) {
                fputcsv($handle, [
                    $row['no'],
                    $row['judul'],
                    $row['ketua'],
                    $row['email_ketua'],
                    $row['nidn'],
                    $row['skema'],
                    $row['tahun'],
                    $row['tahun_pelaksanaan'],
                    $row['status_proposal'],
                    $row['status_administrasi_ringkas'],
                    $row['status_substansi_ringkas'],

                    $row['jumlah_reviewer_administrasi'],
                    $row['reviewer_administrasi'],
                    $row['status_penugasan_administrasi'],
                    $row['status_review_administrasi'],
                    $row['hasil_administrasi'],
                    $row['komentar_administrasi'],

                    $row['jumlah_reviewer_substansi'],
                    $row['reviewer_substansi'],
                    $row['status_penugasan_substansi'],
                    $row['status_review_substansi'],
                    $row['nilai_akhir_substansi'],
                    $row['status_penilaian_substansi'],
                    $row['komentar_substansi'],
                ]);
            }

            fclose($handle);
        }, $filename, $headers);
    }

    private function buildReportData(Request $request): array
    {
        $uuidPt = $request->user()->uuid_pt;
        $role = $request->user()->roles->pluck('name')->first();

        $search = trim((string) $request->get('search', ''));
        $status = trim((string) $request->get('status', ''));
        $statusAdministrasi = trim((string) $request->get('status_administrasi', ''));
        $statusSubstansi = trim((string) $request->get('status_substansi', ''));

        $query = DB::table('pt_penelitian')
            ->leftJoin('users', 'pt_penelitian.created_by', '=', 'users.id')
            ->leftJoin('dosen', 'users.id', '=', 'dosen.id_user')
            ->leftJoin('ref_skema', 'pt_penelitian.id_skema', '=', 'ref_skema.uuid')
            ->whereNull('pt_penelitian.deleted_at')
            ->select(
                'pt_penelitian.uuid',
                'pt_penelitian.title',
                'pt_penelitian.tahun',
                'pt_penelitian.tahun_pelaksanaan',
                'pt_penelitian.status',
                'pt_penelitian.uuid_pt',
                'users.id as user_id',
                'users.name as user_name',
                'users.email as user_email',
                'dosen.nidn',
                'ref_skema.nama as nama_skema',
                'ref_skema.nama_singkat as nama_skema_singkat'
            );

        if ($role !== 'super-admin') {
            $query->where('pt_penelitian.uuid_pt', $uuidPt);
        }

        $penelitianRows = $query
            ->orderByDesc('pt_penelitian.tahun')
            ->orderBy('pt_penelitian.title')
            ->get();

        $penelitianIds = $penelitianRows->pluck('uuid')->filter()->values()->toArray();

        $penugasanRows = collect();

        if (!empty($penelitianIds)) {
            $penugasanRows = DB::table('pt_penugasan_review as ppr')
                ->leftJoin('reviewer', 'ppr.id_reviewer', '=', 'reviewer.id')
                ->leftJoin('users as reviewer_user', 'reviewer.id_user', '=', 'reviewer_user.id')
                ->leftJoin('pt_review_administrasi as pra', 'ppr.id', '=', 'pra.id_penugasan')
                ->leftJoin('pt_review_substansi as prs', 'ppr.id', '=', 'prs.id_penugasan')
                ->whereIn('ppr.id_penelitian', $penelitianIds)
                ->select(
                    'ppr.id',
                    'ppr.id_penelitian',
                    'ppr.id_jenis_penugasan',
                    'ppr.id_reviewer',
                    'ppr.status_review as status_penugasan',
                    'ppr.tanggal_penugasan',
                    'ppr.batas_waktu',
                    'reviewer_user.name as reviewer_name',
                    'reviewer_user.email as reviewer_email',

                    'pra.hasil as hasil_administrasi',
                    'pra.komentar as komentar_administrasi',
                    'pra.status_review as status_review_administrasi',

                    'prs.komentar as komentar_substansi',
                    'prs.nilai_akhir as nilai_substansi',
                    'prs.status_review as status_review_substansi',
                    'prs.status_penilaian as status_penilaian_substansi'
                )
                ->orderBy('ppr.id_penelitian')
                ->orderBy('ppr.id_jenis_penugasan')
                ->orderBy('ppr.id')
                ->get();
        }

        $penugasanGrouped = $penugasanRows->groupBy(function ($item) {
            return $item->id_penelitian . '_' . $item->id_jenis_penugasan;
        });

        $allPenelitian = $penelitianRows->map(function ($item) use ($penugasanGrouped) {
            $administrasi = collect($penugasanGrouped->get($item->uuid . '_1', []))
                ->map(function ($row) {
                    return [
                        'id_penugasan' => $row->id,
                        'id_reviewer' => $row->id_reviewer,
                        'reviewer_name' => $row->reviewer_name,
                        'reviewer_email' => $row->reviewer_email,
                        'tanggal_penugasan' => $row->tanggal_penugasan,
                        'batas_waktu' => $row->batas_waktu,
                        'status_penugasan' => $row->status_penugasan,
                        'status_review' => $row->status_review_administrasi,
                        'hasil' => $row->hasil_administrasi,
                        'komentar' => $row->komentar_administrasi,
                        'nilai_akhir' => null,
                        'status_penilaian' => null,
                    ];
                })
                ->values()
                ->toArray();

            $substansi = collect($penugasanGrouped->get($item->uuid . '_2', []))
                ->map(function ($row) {
                    return [
                        'id_penugasan' => $row->id,
                        'id_reviewer' => $row->id_reviewer,
                        'reviewer_name' => $row->reviewer_name,
                        'reviewer_email' => $row->reviewer_email,
                        'tanggal_penugasan' => $row->tanggal_penugasan,
                        'batas_waktu' => $row->batas_waktu,
                        'status_penugasan' => $row->status_penugasan,
                        'status_review' => $row->status_review_substansi,
                        'komentar' => $row->komentar_substansi,
                        'nilai_akhir' => $row->nilai_substansi,
                        'status_penilaian' => $row->status_penilaian_substansi,
                        'hasil' => null,
                    ];
                })
                ->values()
                ->toArray();

            $hasilAdministrasiList = collect($administrasi)
                ->pluck('hasil')
                ->filter()
                ->values();

            if (count($administrasi) === 0) {
                $statusAdministrasiRingkas = 'Belum Direview';
            } elseif ($hasilAdministrasiList->isEmpty()) {
                $statusAdministrasiRingkas = 'Proses Review';
            } elseif ($hasilAdministrasiList->contains('Tidak Lolos') && $hasilAdministrasiList->contains('Lolos')) {
                $statusAdministrasiRingkas = 'Lolos & Tidak Lolos';
            } elseif ($hasilAdministrasiList->contains('Tidak Lolos')) {
                $statusAdministrasiRingkas = 'Tidak Lolos';
            } elseif ($hasilAdministrasiList->contains('Lolos')) {
                $statusAdministrasiRingkas = 'Lolos';
            } else {
                $statusAdministrasiRingkas = 'Proses Review';
            }

            $statusSubList = collect($substansi)
                ->pluck('status_penilaian')
                ->filter()
                ->values();

            if (count($substansi) === 0) {
                $statusSubstansiRingkas = 'Belum Direview';
            } elseif ($statusSubList->isEmpty()) {
                $statusSubstansiRingkas = 'Proses Review';
            } elseif ($statusSubList->contains('tidak_rekomendasi') && $statusSubList->contains('rekomendasi')) {
                $statusSubstansiRingkas = 'Rekomendasi & Tidak Rekomendasi';
            } elseif ($statusSubList->contains('tidak_rekomendasi')) {
                $statusSubstansiRingkas = 'Tidak Rekomendasi';
            } elseif ($statusSubList->contains('rekomendasi')) {
                $statusSubstansiRingkas = 'Rekomendasi';
            } else {
                $statusSubstansiRingkas = 'Proses Review';
            }

            return [
                'uuid' => $item->uuid,
                'title' => $item->title,
                'tahun' => $item->tahun,
                'tahun_pelaksanaan' => $item->tahun_pelaksanaan,
                'status' => $item->status,
                'skema' => $item->nama_skema,
                'skema_singkat' => $item->nama_skema_singkat,
                'user' => $item->user_id ? [
                    'id' => $item->user_id,
                    'name' => $item->user_name,
                    'email' => $item->user_email,
                    'nidn' => $item->nidn,
                ] : null,
                'administrasi' => $administrasi,
                'substansi' => $substansi,
                'status_administrasi' => $statusAdministrasiRingkas,
                'status_substansi' => $statusSubstansiRingkas,
                'jumlah_reviewer_administrasi' => count($administrasi),
                'jumlah_reviewer_substansi' => count($substansi),
            ];
        })->values();

        $statusOptions = $allPenelitian->pluck('status')->filter()->unique()->values()->toArray();
        $statusAdministrasiOptions = $allPenelitian->pluck('status_administrasi')->filter()->unique()->values()->toArray();
        $statusSubstansiOptions = $allPenelitian->pluck('status_substansi')->filter()->unique()->values()->toArray();

        $filteredPenelitian = $allPenelitian->filter(function ($item) use ($search, $status, $statusAdministrasi, $statusSubstansi) {
            $matchSearch = $search === ''
                || str_contains(strtolower($item['title'] ?? ''), strtolower($search))
                || str_contains(strtolower($item['user']['name'] ?? ''), strtolower($search))
                || str_contains(strtolower($item['skema'] ?? ''), strtolower($search))
                || str_contains(strtolower($item['skema_singkat'] ?? ''), strtolower($search));

            $matchStatus = $status === '' || ($item['status'] ?? '') === $status;
            $matchStatusAdministrasi = $statusAdministrasi === '' || ($item['status_administrasi'] ?? '') === $statusAdministrasi;
            $matchStatusSubstansi = $statusSubstansi === '' || ($item['status_substansi'] ?? '') === $statusSubstansi;

            return $matchSearch && $matchStatus && $matchStatusAdministrasi && $matchStatusSubstansi;
        })->values()->toArray();

        return [
            'penelitian' => $filteredPenelitian,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'status_administrasi' => $statusAdministrasi,
                'status_substansi' => $statusSubstansi,
            ],
            'statusOptions' => $statusOptions,
            'statusAdministrasiOptions' => $statusAdministrasiOptions,
            'statusSubstansiOptions' => $statusSubstansiOptions,
        ];
    }

    private function joinReviewerNames(array $items): string
    {
        if (empty($items)) {
            return '-';
        }

        $result = collect($items)
            ->map(function ($item, $index) {
                $nama = $item['reviewer_name'] ?? '-';
                return 'Reviewer ' . ($index + 1) . ': ' . $nama;
            })
            ->implode(' | ');

        return $result !== '' ? $result : '-';
    }

    private function joinFieldWithReviewer(array $items, string $field): string
    {
        if (empty($items)) {
            return '-';
        }

        $result = collect($items)
            ->map(function ($item, $index) use ($field) {
                $label = 'Reviewer ' . ($index + 1);
                $value = $item[$field] ?? '-';

                if ($value === null || $value === '') {
                    $value = '-';
                }

                return $label . ': ' . $value;
            })
            ->implode(' | ');

        return $result !== '' ? $result : '-';
    }

    private function joinStatusPenilaianWithReviewer(array $items): string
    {
        if (empty($items)) {
            return '-';
        }

        $result = collect($items)
            ->map(function ($item, $index) {
                $label = 'Reviewer ' . ($index + 1);
                $value = $item['status_penilaian'] ?? '-';

                if ($value === 'rekomendasi') {
                    $value = 'Rekomendasi';
                } elseif ($value === 'tidak_rekomendasi') {
                    $value = 'Tidak Rekomendasi';
                } elseif ($value === null || $value === '') {
                    $value = '-';
                }

                return $label . ': ' . $value;
            })
            ->implode(' | ');

        return $result !== '' ? $result : '-';
    }
}