<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Dogadjaj;
use App\Models\Tip;

class DogadjajSeeder extends Seeder
{
    public function run(): void
    {
        $tipovi = Tip::all();

        Dogadjaj::factory()
            ->count(20)
            ->create([
                'tip_dogadjaja' => $tipovi->random()->id,
            ]);
    }
}
