<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PtPenelitianAnggota extends Model
{
    use HasFactory;

    protected $table = 'pt_penelitian_anggotas';

    protected $fillable = [
        'penelitian_uuid',
        'dosen_uuid',
        'peran',
        'tugas',
    ];

    public function penelitian(): BelongsTo
    {
        return $this->belongsTo(PtPenelitian::class, 'penelitian_uuid', 'uuid');
    }

    public function dosen(): BelongsTo
    {
        return $this->belongsTo(Dosen::class, 'dosen_uuid', 'uuid')->withTrashed();
    }
}
