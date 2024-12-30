<?php

namespace Database\Factories;

use App\Models\Rezervacija;
use App\Models\User;
use App\Models\Dogadjaj;
use Illuminate\Database\Eloquent\Factories\Factory;

class RezervacijaFactory extends Factory
{
    protected $model = Rezervacija::class;

    public function definition()
    {
        $brojKarata = $this->faker->numberBetween(1, 10);
        $cenaKarte = Dogadjaj::factory()->create()->cena_karte;

        return [
            'korisnik_id' => User::factory(), 
            'dogadjaj_id' => Dogadjaj::factory(), 
            'broj_karata' => $brojKarata,
            'ukupna_cena' => $brojKarata * $cenaKarte, 
            'status' => $this->faker->randomElement(['aktivna', 'pauzirana']),
        ];
    }
}
