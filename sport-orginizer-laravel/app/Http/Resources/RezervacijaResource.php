<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RezervacijaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'dogadjaj' => [
                'id' => $this->dogadjaj->id,
                'datum' => $this->dogadjaj->datum,
                'vreme' => $this->dogadjaj->vreme,
                'lokacija' => $this->dogadjaj->lokacija,
                'cena_karte' => $this->dogadjaj->cena_karte,
                'vrsta_sporta' => $this->dogadjaj->vrsta_sporta,
            ],
            'broj_karata' => $this->broj_karata,
            'ukupna_cena' => $this->ukupna_cena,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
