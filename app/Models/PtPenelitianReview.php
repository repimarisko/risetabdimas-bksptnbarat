<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PtPenelitianReview extends Model
{
    use HasFactory;

    protected $table = 'pt_penelitian_reviews';

    protected $fillable = [
        'penelitian_uuid',
        'reviewer_id',
        'rekomendasi',
        'skor_kualitas',
        'skor_rab',
        'catatan_umum',
        'catatan_rab',
    ];

    public function penelitian(): BelongsTo
    {
        return $this->belongsTo(PtPenelitian::class, 'penelitian_uuid', 'uuid');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id', 'id');
    }
}
