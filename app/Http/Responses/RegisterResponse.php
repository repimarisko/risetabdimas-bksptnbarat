<?php

namespace App\Http\Responses;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    /**
     * @param  \Illuminate\Http\Request  $request
     */
    public function toResponse($request)
    {
        $guard = config('fortify.guard', 'web');

        Auth::guard($guard)->logout();

        if ($request instanceof Request) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return redirect()
            ->route('login')
            ->with('status', 'Pendaftaran berhasil. Silakan masuk menggunakan email dan kata sandi Anda.');
    }
}

