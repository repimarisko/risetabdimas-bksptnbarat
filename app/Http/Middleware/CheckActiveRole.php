<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckActiveRole
{
    public function handle(Request $request, Closure $next, string ...$roles): mixed
    {
        $activeRole = session('active_role');

        // 1. Cek session active_role sesuai
        if (! $activeRole || ! in_array($activeRole, $roles)) {
            return redirect()->route('active-role.forbidden');
        }

        // 2. Cek user benar-benar punya role itu di DB (pengganti Spatie)
        if (! $request->user()?->hasRole($activeRole)) {
            return redirect()->route('active-role.forbidden');
        }

        return $next($request);
    }
}
