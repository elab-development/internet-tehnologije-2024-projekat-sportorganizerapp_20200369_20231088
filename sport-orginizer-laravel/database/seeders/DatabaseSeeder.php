<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            TipDogadjajaSeeder::class,
            UserSeeder::class,
            DogadjajSeeder::class,
            RezervacijaSeeder::class,
        ]);
    }
}
