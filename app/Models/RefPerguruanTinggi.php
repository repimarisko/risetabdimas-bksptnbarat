<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefPerguruanTinggi extends Model
{
    use HasFactory;

    protected $table = 'ref_perguruan_tinggi';

    protected $primaryKey = 'uuid';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'uuid',
        'nama',
        'nama_singkat',
        'id_pt',
        'alamat',
    ];
}
