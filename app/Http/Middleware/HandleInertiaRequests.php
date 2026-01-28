<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Spatie\Permission\Models\Role;
use App\Models\Menu;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $activeRole = $request->session()->get('active_role', $user?->role);

        if ($user && $activeRole && ! $request->session()->has('active_role')) {
            $request->session()->put('active_role', $activeRole);
        }

        if ($user && ! $user->relationLoaded('dosen')) {
            $user->load('dosen');
        }

        $pendingApprovals = [];
        $pendingApprovalsCount = 0;

        $dosenUuid = optional($user)->dosen->uuid ?? null;

        if ($dosenUuid) {
            $pendingApprovals = DB::table('pt_penelitian_anggota_approvals as approvals')
                ->join('pt_penelitian_anggotas as anggota', 'anggota.id', '=', 'approvals.anggota_id')
                ->join('pt_penelitian as penelitian', 'penelitian.uuid', '=', 'anggota.penelitian_uuid')
                ->join('dosen', 'dosen.uuid', '=', 'approvals.dosen_uuid')
                ->select(
                    'approvals.id',
                    'approvals.anggota_id',
                    'penelitian.uuid as penelitian_uuid',
                    'penelitian.title',
                    'penelitian.status as penelitian_status',
                    'penelitian.created_at',
                    'approvals.status as approval_status',
                )
                ->where('approvals.status', 'pending')
                ->where('approvals.dosen_uuid', $dosenUuid)
                ->whereNull('dosen.deleted_at')
                ->whereNull('penelitian.deleted_at')
                ->orderByDesc('penelitian.created_at')
                ->limit(10)
                ->get()
                ->map(function ($record) {
                    $createdAt = $record->created_at;

                    if ($createdAt && method_exists($createdAt, 'toDateTimeString')) {
                        $createdAt = $createdAt->toDateTimeString();
                    }

                    return [
                        'id' => (int) $record->id,
                        'anggota_id' => (int) $record->anggota_id,
                        'penelitian_uuid' => $record->penelitian_uuid,
                        'title' => $record->title,
                        'status' => $record->penelitian_status,
                        'approval_status' => $record->approval_status,
                        'created_at' => $createdAt ? (string) $createdAt : null,
                    ];
                })
                ->toArray();

            $pendingApprovalsCount = count($pendingApprovals);
        }

        $allRoles = $user?->getRoleNames()->toArray() ?? [];
        $activeRole = $request->session()->get('active_role');
        if ($user && $activeRole && ! in_array($activeRole, $allRoles, true)) {
            $activeRole = null;
        }
        if ($user && ! $activeRole && ! empty($allRoles)) {
            $activeRole = $allRoles[0];
            $request->session()->put('active_role', $activeRole);
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
                'roles' => $allRoles,
                'active_role' => $activeRole,
                'permissions' => $user?->getAllPermissions()->pluck('name')->toArray() ?? [],
                'pendingApprovals' => $pendingApprovals,
                'pendingApprovalsCount' => $pendingApprovalsCount,
                'menus' => $menus,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
