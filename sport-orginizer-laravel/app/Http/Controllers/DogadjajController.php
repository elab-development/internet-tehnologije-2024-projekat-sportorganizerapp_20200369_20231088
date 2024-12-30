<?php

namespace App\Http\Controllers;

use App\Models\Dogadjaj;
use Illuminate\Http\Request;
use App\Http\Resources\DogadjajResource;
use Illuminate\Support\Facades\Auth;

class DogadjajController extends Controller
{
    /**
     * Prikaz svih događaja sa filtrima za korisnike.
     */
    public function index(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Morate biti ulogovani da biste videli događaje.'], 401);
        }

        if (Auth::user()->user_type !== 'obican_korisnik' && Auth::user()->user_type !== 'moderator') {
            return response()->json(['error' => 'Nemate dozvolu za pregled događaja.'], 403);
        }

        $query = Dogadjaj::query();

        // Filtriranje po tipu događaja
        if ($request->has('tip_dogadjaja')) {
            $query->where('tip_dogadjaja', $request->tip_dogadjaja);
        }

        // Filtriranje po sportu
        if ($request->has('vrsta_sporta')) {
            $query->where('vrsta_sporta', $request->vrsta_sporta);
        }

        $dogadjaji = $query->paginate(10);

        return DogadjajResource::collection($dogadjaji);
    }

    /**
     * Kreiranje novog događaja (samo za moderatore).
     */
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Morate biti ulogovani da biste kreirali događaj.'], 401);
        }

        if (Auth::user()->user_type !== 'moderator') {
            return response()->json(['error' => 'Samo moderatori mogu kreirati događaje.'], 403);
        }

        $validated = $request->validate([
            'datum' => 'required|date',
            'vreme' => 'required',
            'lokacija' => 'required|string',
            'tip_dogadjaja' => 'required|exists:tipovi,id',
            'cena_karte' => 'required|numeric',
            'vrsta_sporta' => 'required|string',
        ]);

        $dogadjaj = Dogadjaj::create($validated);

        return new DogadjajResource($dogadjaj);
    }

    /**
     * Ažuriranje događaja (samo za moderatore).
     */
    public function update(Request $request, Dogadjaj $dogadjaj)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Morate biti ulogovani da biste ažurirali događaj.'], 401);
        }

        if (Auth::user()->user_type !== 'moderator') {
            return response()->json(['error' => 'Samo moderatori mogu ažurirati događaje.'], 403);
        }

        $validated = $request->validate([
            'datum' => 'sometimes|date',
            'vreme' => 'sometimes',
            'lokacija' => 'sometimes|string',
            'tip_dogadjaja' => 'sometimes|exists:tipovi,id',
            'cena_karte' => 'sometimes|numeric',
            'vrsta_sporta' => 'sometimes|string',
        ]);

        $dogadjaj->update($validated);

        return new DogadjajResource($dogadjaj);
    }

    /**
     * Brisanje događaja (samo za moderatore).
     */
    public function destroy(Dogadjaj $dogadjaj)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Morate biti ulogovani da biste obrisali događaj.'], 401);
        }

        if (Auth::user()->user_type !== 'moderator') {
            return response()->json(['error' => 'Samo moderatori mogu brisati događaje.'], 403);
        }

        $dogadjaj->delete();

        return response()->json(['message' => 'Događaj je uspešno obrisan!'], 200);
    }

    /**
     * Prikaz metrika za moderatore.
     */
    public function metrics()
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Morate biti ulogovani da biste videli metrike.'], 401);
        }

        if (Auth::user()->user_type !== 'moderator') {
            return response()->json(['error' => 'Samo moderatori mogu pregledati metrike.'], 403);
        }

        $metrics = [
            'najvise_dogadjaja_po_sportu' => Dogadjaj::groupBy('vrsta_sporta')
                ->selectRaw('vrsta_sporta, COUNT(*) as broj')
                ->orderByDesc('broj')
                ->first(),
            'najvise_dogadjaja_po_mesecu' => Dogadjaj::selectRaw('MONTH(datum) as mesec, COUNT(*) as broj')
                ->groupBy('mesec')
                ->orderByDesc('broj')
                ->first(),
        ];

        return response()->json($metrics);
    }
}
