<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tip extends Model
{
    use HasFactory;

    protected $table = 'tipovi';

    protected $fillable = [
        'naziv',
        'rang_vaznosti',
    ];

    public function dogadjaji()
    {
        return $this->hasMany(Dogadjaj::class, 'tip_dogadjaja');
    }
}
