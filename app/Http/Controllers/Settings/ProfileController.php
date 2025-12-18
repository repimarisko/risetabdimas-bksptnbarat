<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $detail = DB::table('user_detail')
            ->where('id_user', $request->user()->id)
            ->first();

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'userDetail' => $detail ? [
                'nama_lengkap' => $detail->nama_lengkap,
                'tanggal_lahir' => $detail->tanggal_lahir,
                'tempat_lahir' => $detail->tempat_lahir,
                'alamat' => $detail->alamat,
                'nik' => $detail->nik,
                'nip' => $detail->nip,
                'nuptk' => $detail->nuptk,
                'hp' => $detail->hp,
                'status_aktif' => (bool) $detail->status_aktif,
                'sinta_id' => $detail->sinta_id,
                'scopus_id' => $detail->scopus_id,
                'sinta_link' => $detail->sinta_link,
                'scopus_link' => $detail->scopus_link,
            ] : null,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $request->user()->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        $detailData = [
            'nama_lengkap' => $validated['nama_lengkap'],
            'tanggal_lahir' => $validated['tanggal_lahir'],
            'tempat_lahir' => $validated['tempat_lahir'],
            'alamat' => $validated['alamat'],
            'nik' => $validated['nik'],
            'nip' => $validated['nip'] ?? null,
            'nuptk' => $validated['nuptk'] ?? null,
            'hp' => $validated['hp'],
            'status_aktif' => true,
            'sinta_id' => $validated['sinta_id'] ?? null,
            'scopus_id' => $validated['scopus_id'] ?? null,
            'sinta_link' => $validated['sinta_link'] ?? null,
            'scopus_link' => $validated['scopus_link'] ?? null,
            'updated_at' => now(),
        ];

        DB::table('user_detail')->updateOrInsert(
            ['id_user' => $request->user()->id],
            [
                ...$detailData,
                'created_at' => DB::raw('COALESCE(created_at, NOW())'),
            ]
        );

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
