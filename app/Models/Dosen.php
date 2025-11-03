<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Dosen extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'dosen';

    protected $primaryKey = 'uuid';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'uuid',
        'nidn',
        'id_user',
        'email',
        'uuid_pt',
        'verified_at',
        'verified_by',
        'created_by',
        'created_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $dosen): void {
            if (! $dosen->uuid) {
                $dosen->uuid = (string) Str::uuid();
            }

            if (! $dosen->created_at) {
                $dosen->created_at = now();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function perguruanTinggi(): BelongsTo
    {
        return $this->belongsTo(RefPerguruanTinggi::class, 'uuid_pt', 'uuid');
    }
}
