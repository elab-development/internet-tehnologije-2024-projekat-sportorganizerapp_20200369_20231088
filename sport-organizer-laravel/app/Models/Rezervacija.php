<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rezervacija extends Model
{
    use HasFactory;

    protected $table = 'rezervacije';

    protected $fillable = [
        'korisnik_id',
        'dogadjaj_id',
        'broj_karata',
        'ukupna_cena',
        'status',
    ];

    public function korisnik()
    {
        return $this->belongsTo(User::class, 'korisnik_id');
    }

    public function dogadjaj()
    {
        return $this->belongsTo(Dogadjaj::class, 'dogadjaj_id');
    }
}
