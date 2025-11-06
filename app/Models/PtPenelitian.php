<?php

namespace App\Models;

use App\Models\RefPerguruanTinggi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class PtPenelitian extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pt_penelitian';
    protected $primaryKey = 'uuid';
    public $incrementing = false; // karena primary key bukan auto increment
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'uuid',
        'title',
        'id_skema',
        'id_tkt',
        'id_sdg',
        'id_fokus',
        'biaya_usulan_1',
        'biaya_usulan_2',
        'biaya_usulan_3',
        'biaya_usulan_4',
        'biaya_disetujui',
        'tahun',
        'tahun_pelaksanaan',
        'status',
        'uuid_pt',
        'target_luaran',
        'email_pengusul',
        'created_at',
        'created_by',
        'deleted_by',
        'proposal_path',
        'proposal_filename',
        'lampiran_path',
        'lampiran_filename',
    ];

    protected $dates = [
        'created_at',
        'deleted_at',
    ];

    protected $casts = [
        'biaya_usulan_1' => 'float',
        'biaya_usulan_2' => 'float',
        'biaya_usulan_3' => 'float',
        'biaya_usulan_4' => 'float',
        'biaya_disetujui' => 'float',
        'tahun' => 'integer',
        'tahun_pelaksanaan' => 'integer',
    ];

    protected $hidden = [
        'proposal_path',
        'lampiran_path',
    ];

    protected $appends = [
        'proposal_file_url',
        'lampiran_file_url',
    ];

    public function getProposalFileUrlAttribute(): ?string
    {
        if (! $this->proposal_path) {
            return null;
        }

        return route('pt-penelitian.download', [
            'ptPenelitian' => $this->getKey(),
            'type' => 'proposal',
        ]);
    }

    public function getLampiranFileUrlAttribute(): ?string
    {
        if (! $this->lampiran_path) {
            return null;
        }

        return route('pt-penelitian.download', [
            'ptPenelitian' => $this->getKey(),
            'type' => 'lampiran',
        ]);
    }

    public function anggota(): HasMany
    {
        return $this->hasMany(PtPenelitianAnggota::class, 'penelitian_uuid', 'uuid');
    }

    public function perguruanTinggi(): BelongsTo
    {
        return $this->belongsTo(RefPerguruanTinggi::class, 'uuid_pt', 'uuid');
    }

    public function deleteStoredFile(string $type): void
    {
        $path = match ($type) {
            'proposal' => $this->proposal_path,
            'lampiran' => $this->lampiran_path,
            default => null,
        };

        if (! $path) {
            return;
        }

        Storage::disk('public')->delete($path);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'created_by', 'id');
    }
}
