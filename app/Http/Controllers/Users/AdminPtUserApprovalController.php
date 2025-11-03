<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AdminPtUserApprovalController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $uuidPt = $request->user()->uuid_pt;

        $pending = collect();
        $approved = collect();
        $perguruan = null;

        if ($uuidPt) {
            $pending = Dosen::query()
                ->with('user')
                ->where('uuid_pt', $uuidPt)
                ->whereNull('verified_at')
                ->orderBy('created_at')
                ->get()
                ->map(fn (Dosen $dosen) => $this->mapDosen($dosen));

            $approved = Dosen::query()
                ->with('user')
                ->where('uuid_pt', $uuidPt)
                ->whereNotNull('verified_at')
                ->orderByDesc('verified_at')
                ->take(20)
                ->get()
                ->map(fn (Dosen $dosen) => $this->mapDosen($dosen));

            $perguruan = DB::table('ref_perguruan_tinggi')
                ->select('uuid', 'nama', 'nama_singkat')
                ->where('uuid', $uuidPt)
                ->first();
        }

        return Inertia::render('users/approvals', [
            'pending' => $pending->values()->all(),
            'approved' => $approved->values()->all(),
            'perguruan' => $perguruan ? (array) $perguruan : null,
        ]);
    }

    public function approve(Request $request, Dosen $dosen): RedirectResponse
    {
        $this->authorizePerguruan($request, $dosen);

        $dosen->forceFill([
            'verified_at' => now(),
            'verified_by' => $request->user()->id,
        ])->save();

        return redirect()
            ->back()
            ->with('success', 'Akun dosen berhasil disetujui.');
    }

    protected function authorizePerguruan(Request $request, Dosen $dosen): void
    {
        $uuidPt = $request->user()->uuid_pt;

        if (! $uuidPt || $dosen->uuid_pt !== $uuidPt) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak diizinkan mengakses data ini.');
        }
    }

    protected function mapDosen(Dosen $dosen): array
    {
        return [
            'uuid' => $dosen->uuid,
            'name' => $dosen->user?->name,
            'email' => $dosen->email,
            'nidn' => $dosen->nidn,
            'created_at' => optional($dosen->created_at)?->toISOString(),
            'verified_at' => optional($dosen->verified_at)?->toISOString(),
        ];
    }
}
