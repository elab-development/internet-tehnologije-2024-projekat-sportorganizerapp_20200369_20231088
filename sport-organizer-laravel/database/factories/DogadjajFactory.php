<?php

namespace Database\Factories;

use App\Models\Dogadjaj;
use App\Models\Tip;
use Illuminate\Database\Eloquent\Factories\Factory;

class DogadjajFactory extends Factory
{
    protected $model = Dogadjaj::class;

    public function definition()
    {
        return [
            'datum' => $this->faker->date(),
            'vreme' => $this->faker->time(),
            'lokacija' => $this->faker->address(),
            'tip_dogadjaja' => Tip::factory(),
            'cena_karte' => $this->faker->randomFloat(2, 100, 1000),
            'vrsta_sporta' => $this->faker->randomElement([
                'hokej', 'kosarka', 'vaterpolo', 'fudbal', 'ragbi', 'americki fudbal', 'stoni tenis',
                'badminton', 'golf', 'kuglanje', 'bilijar', 'streljastvo', 'atletika', 'odbojka',
                'rukomet', 'plivanje', 'skakanje u vodu', 'karate', 'dzudo', 'boks', 'mma', 'rvanje',
            ]),
        ];
    }
}
