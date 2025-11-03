<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefSkema extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'ref_skema';
    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'uuid',
        'jenis_skema',
        'nama',
        'nama_singkat',
        'multi_tahun',
        'biaya_minimal',
        'biaya_maksimal',
        'sumber_dana',
        'anggota_min',
        'anggota_max',
        'mulai',
        'selesai',
        'created_at',
        'created_by',
        'updated_at',
        'deleted_at',
        'status',
    ];

    protected $casts = [
        'multi_tahun' => 'boolean',
        'biaya_minimal' => 'float',
        'biaya_maksimal' => 'float',
        'anggota_min' => 'integer',
        'anggota_max' => 'integer',
        'mulai' => 'date',
        'selesai' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];
}

