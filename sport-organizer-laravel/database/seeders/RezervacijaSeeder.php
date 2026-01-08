<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rezervacija;
use App\Models\User;
use App\Models\Dogadjaj;

class RezervacijaSeeder extends Seeder
{
    public function run(): void
    {
        $korisnici = User::all();
        $dogadjaji = Dogadjaj::all();

        Rezervacija::factory()
            ->count(50)
            ->create(function () use ($korisnici, $dogadjaji) {
                return [
                    'korisnik_id' => $korisnici->random()->id,
                    'dogadjaj_id' => $dogadjaji->random()->id,
                ];
            });
    }
}
