<?php

namespace Tests\Feature\Dashboard;

use App\Models\PtPenelitian;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class DosenDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dosen_dashboard_requires_dosen_role(): void
    {
        Role::create(['name' => 'dosen', 'guard_name' => 'web']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('dashboard.dosen'))
            ->assertForbidden();
    }

    public function test_it_returns_aggregated_stats_and_recent_penelitian(): void
    {
        Role::create(['name' => 'dosen', 'guard_name' => 'web']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $user = User::factory()->create();
        $user->assignRole('dosen');

        PtPenelitian::create([
            'uuid' => (string) Str::uuid(),
            'title' => 'Penelitian A',
            'status' => 'Perlu Perbaikan',
            'created_at' => now()->subDays(2),
            'created_by' => $user->id,
            'email_pengusul' => $user->email,
            'tahun' => 2023,
        ]);

        PtPenelitian::create([
            'uuid' => (string) Str::uuid(),
            'title' => 'Penelitian B',
            'status' => 'Sedang Berjalan',
            'created_at' => now()->subDay(),
            'created_by' => $user->id,
            'email_pengusul' => $user->email,
            'tahun' => 2024,
            'tahun_pelaksanaan' => 2025,
        ]);

        PtPenelitian::create([
            'uuid' => (string) Str::uuid(),
            'title' => 'Penelitian C',
            'status' => null,
            'created_at' => now(),
            'created_by' => $user->id,
            'email_pengusul' => $user->email,
        ]);

        $response = $this->actingAs($user)
            ->get(route('dashboard.dosen'));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/dosen')
            ->where('stats.total', 3)
            ->where('stats.needs_revision', 1)
            ->where('stats.in_progress', 1)
            ->has('latestPenelitian', 3)
        );
    }
}
