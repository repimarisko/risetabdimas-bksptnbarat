<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    public const ROLE_SUPER_ADMIN = 'super-admin';
    public const ROLE_ADMIN_PT = 'admin-pt';
    public const ROLE_KETUA_LPPM = 'ketua-lppm';
    public const ROLE_DOSEN = 'dosen';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'uuid_pt',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function dosen(): HasOne
    {
        return $this->hasOne(Dosen::class, 'id_user');
    }

    protected static function booted(): void
    {
        static::creating(function (User $user): void {
            static::ensureRoleExists($user->role);
        });

        static::created(function (User $user): void {
            static::syncRoleAssignment($user);
        });

        static::retrieved(function (User $user): void {
            static::syncRoleAssignment($user);
        });

        static::updated(function (User $user): void {
            if ($user->wasChanged('role')) {
                static::syncRoleAssignment($user, true);
            }
        });
    }

    protected static function ensureRoleExists(?string $role): void
    {
        if (! $role) {
            return;
        }

        Role::findOrCreate($role, 'web');
    }

    protected static function syncRoleAssignment(User $user, bool $force = false): void
    {
        if (! $user->role) {
            return;
        }

        static::ensureRoleExists($user->role);

        if ($force) {
            if (! $user->hasRole($user->role)) {
                $user->assignRole($user->role);
            }

            return;
        }

        if (! $user->hasRole($user->role)) {
            $user->assignRole($user->role);
        }
    }
}
