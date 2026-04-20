<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $activeRole = (string) ($request->session()->get('active_role') ?? '');

        if (! $activeRole) {
            $activeRole = (string) ($user->getRoleNames()->first() ?? '');
            $request->session()->put('active_role', $activeRole);
        }

        $dashboardMap = [
            'super-admin' => 'dashboard.super-admin',
            'ketua-lppm'  => 'dashboard.ketua-lppm',
            'admin-pt'    => 'dashboard.admin-pt',
            'reviewer'    => 'dashboard.reviewer',
            'dosen'       => 'dashboard.dosen',
        ];

        if (isset($dashboardMap[$activeRole])) {
            return redirect()->route($dashboardMap[$activeRole]);
        }

        return Inertia::render('dashboard');
    }
}
