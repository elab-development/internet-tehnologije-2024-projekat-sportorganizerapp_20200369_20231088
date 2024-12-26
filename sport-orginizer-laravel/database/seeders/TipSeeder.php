<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipDogadjaja;

class TipDogadjajaSeeder extends Seeder
{
    public function run(): void
    {
        TipDogadjaja::factory()->count(5)->create();
    }
}
