<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\PtPenelitian;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DosenDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $baseQuery = PtPenelitian::query()
            ->where('created_by', $user->id);

        $stats = [
            'total' => (clone $baseQuery)->count(),
            'needs_revision' => $this->countByStatusKeywords($baseQuery, [
                'perbaikan',
                'revisi',
                'koreksi',
            ]),
            'in_progress' => $this->countByStatusKeywords($baseQuery, [
                'berjalan',
                'pelaksana',
                'setuju',
                'terima',
                'ongoing',
            ]),
        ];

        $latestPenelitian = (clone $baseQuery)
            ->latest('created_at')
            ->limit(5)
            ->get([
                'uuid',
                'title',
                'status',
                'created_at',
                'tahun',
                'tahun_pelaksanaan',
            ])
            ->map(static fn(PtPenelitian $item) => [
                'uuid' => $item->uuid,
                'title' => $item->title,
                'status' => $item->status,
                'created_at' => Carbon::make($item->created_at)?->toISOString(),
                'tahun' => $item->tahun,
                'tahun_pelaksanaan' => $item->tahun_pelaksanaan,
            ]);

        return Inertia::render('dashboard/dosen', [
            'stats' => $stats,
            'latestPenelitian' => $latestPenelitian,
        ]);
    }

    private function countByStatusKeywords(Builder $query, array $keywords): int
    {
        $keywords = array_filter($keywords);

        if ($keywords === []) {
            return 0;
        }

        $builder = clone $query;

        $builder->where(function (Builder $inner) use ($keywords): void {
            foreach ($keywords as $keyword) {
                $inner->orWhereRaw(
                    'LOWER(COALESCE(status, \'\')) LIKE ?',
                    ['%' . Str::lower($keyword) . '%']
                );
            }
        });

        return $builder->count();
    }
}
