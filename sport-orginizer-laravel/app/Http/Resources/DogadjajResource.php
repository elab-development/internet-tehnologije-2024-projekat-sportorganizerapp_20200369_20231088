<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DogadjajResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'datum' => $this->datum,
            'vreme' => $this->vreme,
            'lokacija' => $this->lokacija,
            'tip_dogadjaja' => $this->tip->naziv ?? null,
            'cena_karte' => $this->cena_karte,
            'vrsta_sporta' => $this->vrsta_sporta,
        ];
    }
}
