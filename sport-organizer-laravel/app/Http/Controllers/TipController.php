<?php

namespace App\Http\Controllers;

use App\Models\Tip;
use Illuminate\Http\Request;
use App\Http\Resources\TipResource;
use Illuminate\Support\Facades\Auth;

class TipController extends Controller
{
    /**
     * Prikaz svih tipova.
     */
    public function index()
    {
        if (!Auth::check() || Auth::user()->user_type !== 'obican_korisnik') {
            return response()->json(['error' => 'Nemate dozvolu za pregled rezervacija.'], 403);
        }

        $tipovi = Tip::all(); 
        return TipResource::collection($tipovi); 
    }
}
