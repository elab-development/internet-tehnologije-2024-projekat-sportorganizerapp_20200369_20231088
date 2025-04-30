<?php

namespace Database\Factories;

use App\Models\Tip;
use Illuminate\Database\Eloquent\Factories\Factory;

class TipFactory extends Factory
{
    protected $model = Tip::class;

    public function definition()
    {
        return [
            'naziv' => $this->faker->randomElement([
                'konferencija za stampu', 
                'intervju', 
                'utakmica', 
                'proslava', 
                'docek', 
                'ispracaj', 
                'trening', 
                'takmicenje', 
                'otvaranje sezone', 
                'zavrsni turnir'
            ]),
            'rang_vaznosti' => $this->faker->randomElement(['nizak', 'srednji', 'visok']),
        ];
    }
}
