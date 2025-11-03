<?php

namespace App\Http\Controllers\Penelitian\Concerns;

use App\Models\PtPenelitian;
use Illuminate\Support\Facades\DB;

trait BuildsPenelitianPreview
{
    protected function buildPenelitianPreview(PtPenelitian $ptPenelitian): array
    {
        $skema = $ptPenelitian->id_skema
            ? DB::table('ref_skema')
                ->select('uuid', 'nama', 'nama_singkat', 'jenis_skema', 'sumber_dana', 'anggota_min', 'anggota_max')
                ->where('uuid', $ptPenelitian->id_skema)
                ->first()
            : null;

        $fokus = $ptPenelitian->id_fokus
            ? DB::table('ref_fokus')
                ->select('uuid', 'fokus')
                ->where('uuid', $ptPenelitian->id_fokus)
                ->first()
            : null;

        $sdg = $ptPenelitian->id_sdg
            ? DB::table('ref_sdg')
                ->select('uuid', 'sdg', 'level')
                ->where('uuid', $ptPenelitian->id_sdg)
                ->first()
            : null;

        $tkt = $ptPenelitian->id_tkt
            ? DB::table('ref_tkt')
                ->select('uuid', 'tkt', 'level')
                ->where('uuid', $ptPenelitian->id_tkt)
                ->first()
            : null;

        $references = [
            'skema' => $skema ? (array) $skema : null,
            'fokus' => $fokus ? (array) $fokus : null,
            'sdg' => $sdg ? (array) $sdg : null,
            'tkt' => $tkt ? (array) $tkt : null,
        ];

        $owner = null;

        if ($ptPenelitian->created_by) {
            $ownerRecord = DB::table('users')
                ->select('id', 'name', 'email')
                ->where('id', $ptPenelitian->created_by)
                ->first();

            if ($ownerRecord) {
                $owner = [
                    'id' => (int) $ownerRecord->id,
                    'name' => $ownerRecord->name,
                    'email' => $ownerRecord->email,
                ];
            }
        }

        $usulanValues = [
            [
                'label' => 'Tahun 1',
                'value' => $ptPenelitian->biaya_usulan_1,
            ],
            [
                'label' => 'Tahun 2',
                'value' => $ptPenelitian->biaya_usulan_2,
            ],
            [
                'label' => 'Tahun 3',
                'value' => $ptPenelitian->biaya_usulan_3,
            ],
            [
                'label' => 'Tahun 4',
                'value' => $ptPenelitian->biaya_usulan_4,
            ],
        ];

        $budgetSummary = [
            'items' => array_values(array_filter($usulanValues, static fn ($item) => $item['value'])),
            'total_usulan' => collect($usulanValues)
                ->pluck('value')
                ->filter()
                ->sum(),
            'biaya_disetujui' => $ptPenelitian->biaya_disetujui,
            'detail' => $this->resolveRabDetails($ptPenelitian),
        ];

        $anggotaRecords = $ptPenelitian->anggota()
            ->with(['dosen.user'])
            ->get();

        $approvalMap = DB::table('pt_penelitian_anggota_approvals')
            ->whereIn('anggota_id', $anggotaRecords->pluck('id'))
            ->get()
            ->keyBy('anggota_id');

        $anggota = $anggotaRecords
            ->map(function ($anggota) use ($approvalMap) {
                $approval = $approvalMap->get($anggota->id);

                return [
                    'id' => $anggota->id,
                    'peran' => $anggota->peran,
                    'tugas' => $anggota->tugas,
                    'dosen' => [
                        'uuid' => $anggota->dosen?->uuid,
                        'nama' => $anggota->dosen?->user?->name,
                        'nidn' => $anggota->dosen?->nidn,
                        'email' => $anggota->dosen?->email,
                    ],
                    'approval' => $approval ? [
                        'status' => $approval->status,
                        'approved_at' => $approval->approved_at
                            ? (string) $approval->approved_at
                            : null,
                    ] : null,
                ];
            })
            ->toArray();

        $penelitianData = $ptPenelitian->toArray();

        return [
            'penelitian' => $penelitianData,
            'references' => $references,
            'owner' => $owner,
            'budget' => $budgetSummary,
            'anggota' => $anggota,
            'dokumen' => [
                'proposal' => [
                    'filename' => $ptPenelitian->proposal_filename,
                    'url' => $ptPenelitian->proposal_file_url,
                ],
                'lampiran' => [
                    'filename' => $ptPenelitian->lampiran_filename,
                    'url' => $ptPenelitian->lampiran_file_url,
                ],
            ],
        ];
    }

    protected function resolveRabDetails(PtPenelitian $ptPenelitian): array
    {
        $komponenMap = DB::table('ref_komponen_biaya')
            ->select('id', 'nama_komponen')
            ->pluck('nama_komponen', 'id')
            ->toArray();

        $tables = [
            1 => 'pt_rab_tahun_1',
            2 => 'pt_rab_tahun_2',
            3 => 'pt_rab_tahun_3',
            4 => 'pt_rab_tahun_4',
        ];

        $details = [];

        foreach ($tables as $year => $table) {
            $items = DB::table($table)
                ->select('id_komponen', 'nama_item', 'jumlah_item', 'harga_satuan', 'total_biaya')
                ->where('id_penelitian', $ptPenelitian->uuid)
                ->orderBy('uuid')
                ->get()
                ->map(fn ($record) => [
                    'id_komponen' => $record->id_komponen,
                    'komponen' => $record->id_komponen ? ($komponenMap[$record->id_komponen] ?? null) : null,
                    'nama_item' => $record->nama_item,
                    'jumlah_item' => $record->jumlah_item,
                    'harga_satuan' => $record->harga_satuan,
                    'total_biaya' => $record->total_biaya,
                ])
                ->toArray();

            if (! empty($items)) {
                $details[$year] = $items;
            }
        }

        return $details;
    }
}
