<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{
    use HasFactory;

    protected $table = 'dogadjaji';

    protected $fillable = [
        'datum',
        'vreme',
        'lokacija',
        'tip_dogadjaja',
        'cena_karte',
        'vrsta_sporta',
    ];

    public function tip()
    {
        return $this->belongsTo(Tip::class, 'tip_dogadjaja');
    }

    public function rezervacije()
    {
        return $this->hasMany(Rezervacija::class, 'dogadjaj_id');
    }
}