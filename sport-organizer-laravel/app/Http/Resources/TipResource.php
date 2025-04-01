<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TipResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'rang_vaznosti' => $this->rang_vaznosti,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
