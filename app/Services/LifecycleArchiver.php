<?php

namespace App\Services;

use App\Models\PtPenelitian;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class LifecycleArchiver
{
    /**
     * Archive soft-deleted records and purge old archives.
     */
    public function run(int $archiveAfterDays = 30, int $purgeAfterDays = 365): array
    {
        $archiveAfter = max(1, $archiveAfterDays);
        $purgeAfter = max(1, $purgeAfterDays);

        return [
            'users' => $this->archiveUsers($archiveAfter, $purgeAfter),
            'pt_penelitian' => $this->archivePenelitian($archiveAfter, $purgeAfter),
        ];
    }

    private function archiveUsers(int $archiveAfterDays, int $purgeAfterDays): array
    {
        $archived = 0;
        $cutoff = Carbon::now()->subDays($archiveAfterDays);

        User::onlyTrashed()
            ->where('deleted_at', '<=', $cutoff)
            ->chunkById(100, function ($users) use (&$archived): void {
                foreach ($users as $user) {
                    $payload = $user->toArray();
                    $timestamp = Carbon::now();

                    DB::transaction(function () use ($user, $payload, $timestamp, &$archived): void {
                        DB::table('user_archives')->updateOrInsert(
                            ['source_id' => $user->id],
                            [
                                'payload' => $payload,
                                'archived_at' => $timestamp,
                                'created_at' => $timestamp,
                                'updated_at' => $timestamp,
                            ],
                        );

                        $user->forceDelete();
                        $archived++;
                    });
                }
            });

        $purged = DB::table('user_archives')
            ->where('archived_at', '<=', Carbon::now()->subDays($purgeAfterDays))
            ->delete();

        return ['archived' => $archived, 'purged' => $purged];
    }

    private function archivePenelitian(int $archiveAfterDays, int $purgeAfterDays): array
    {
        $archived = 0;
        $cutoff = Carbon::now()->subDays($archiveAfterDays);

        PtPenelitian::onlyTrashed()
            ->where('deleted_at', '<=', $cutoff)
            ->orderBy('uuid')
            ->chunk(50, function ($items) use (&$archived): void {
                foreach ($items as $penelitian) {
                    $payload = $this->buildPenelitianPayload($penelitian);
                    $timestamp = Carbon::now();

                    DB::transaction(function () use ($penelitian, $payload, $timestamp, &$archived): void {
                        DB::table('pt_penelitian_archives')->updateOrInsert(
                            ['source_uuid' => $penelitian->uuid],
                            [
                                'payload' => $payload,
                                'archived_at' => $timestamp,
                                'created_at' => $timestamp,
                                'updated_at' => $timestamp,
                            ],
                        );

                        $this->cleanupRabTables($penelitian->uuid);
                        $penelitian->forceDelete();
                        $archived++;
                    });
                }
            });

        $purged = DB::table('pt_penelitian_archives')
            ->where('archived_at', '<=', Carbon::now()->subDays($purgeAfterDays))
            ->delete();

        return ['archived' => $archived, 'purged' => $purged];
    }

    private function buildPenelitianPayload(PtPenelitian $penelitian): array
    {
        $rabTables = [
            1 => 'pt_rab_tahun_1',
            2 => 'pt_rab_tahun_2',
            3 => 'pt_rab_tahun_3',
            4 => 'pt_rab_tahun_4',
        ];

        $rab = [];

        foreach ($rabTables as $year => $table) {
            $records = DB::table($table)
                ->where('id_penelitian', $penelitian->uuid)
                ->get()
                ->map(fn($row) => (array) $row)
                ->all();

            if (! empty($records)) {
                $rab[$year] = $records;
            }
        }

        $penelitianData = $penelitian->toArray();
        unset($penelitianData['proposal_file_url'], $penelitianData['lampiran_file_url']);
        $penelitianData['proposal_path'] = $penelitian->proposal_path;
        $penelitianData['lampiran_path'] = $penelitian->lampiran_path;

        return [
            'penelitian' => $penelitianData,
            'anggota' => $penelitian->anggota()->get()->map(fn($row) => $row->toArray())->all(),
            'rab' => $rab,
            'reviews' => DB::table('pt_penelitian_reviews')
                ->where('penelitian_uuid', $penelitian->uuid)
                ->get()
                ->map(fn($row) => (array) $row)
                ->all(),
            'reviewers' => DB::table('pt_penelitian_reviewer')
                ->where('penelitian_uuid', $penelitian->uuid)
                ->get()
                ->map(fn($row) => (array) $row)
                ->all(),
        ];
    }

    private function cleanupRabTables(string $penelitianUuid): void
    {
        foreach (['pt_rab_tahun_1', 'pt_rab_tahun_2', 'pt_rab_tahun_3', 'pt_rab_tahun_4'] as $table) {
            DB::table($table)->where('id_penelitian', $penelitianUuid)->delete();
        }
    }
}
