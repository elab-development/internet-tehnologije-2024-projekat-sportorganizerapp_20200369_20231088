<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tip;

class TipSeeder extends Seeder
{
    public function run(): void
    {
        Tip::factory()->count(5)->create();
    }
}
