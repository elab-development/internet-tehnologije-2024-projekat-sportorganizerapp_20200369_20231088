<?php

namespace App\Http\Controllers;

use App\Models\Rezervacija;
use App\Models\Dogadjaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\RezervacijaResource;

class RezervacijaController extends Controller
{
    /**
     * Lista svih rezervacija za ulogovanog korisnika.
     */
    public function index()
    {
        if (!Auth::check() || Auth::user()->user_type !== 'obican_korisnik') {
            return response()->json(['error' => 'Nemate dozvolu za pregled rezervacija.'], 403);
        }

        $rezervacije = Rezervacija::where('korisnik_id', Auth::id())->get();

        return RezervacijaResource::collection($rezervacije);
    }

    /**
     * Kreiranje nove rezervacije.
     */
    public function store(Request $request)
    {
        if (!Auth::check() || Auth::user()->user_type !== 'obican_korisnik') {
            return response()->json(['error' => 'Nemate dozvolu za kreiranje rezervacija.'], 403);
        }

        $validated = $request->validate([
            'dogadjaj_id' => 'required|exists:dogadjaji,id',
            'broj_karata' => 'required|integer|min:1',
        ]);

        $dogadjaj = Dogadjaj::find($validated['dogadjaj_id']);

        $rezervacija = Rezervacija::create([
            'korisnik_id' => Auth::id(),
            'dogadjaj_id' => $validated['dogadjaj_id'],
            'broj_karata' => $validated['broj_karata'],
            'ukupna_cena' => $validated['broj_karata'] * $dogadjaj->cena_karte,
            'status' => 'aktivna',
        ]);

        return new RezervacijaResource($rezervacija);
    }

    /**
     * Ažuriranje rezervacije.
     */
    public function update(Request $request, Rezervacija $rezervacija)
    {
        if (!Auth::check() || Auth::id() !== $rezervacija->korisnik_id) {
            return response()->json(['error' => 'Nemate dozvolu za ažuriranje ove rezervacije.'], 403);
        }

        $validated = $request->validate([
            'broj_karata' => 'sometimes|integer|min:1',
            'status' => 'sometimes|in:aktivna,pauzirana',
        ]);

        if (isset($validated['broj_karata'])) {
            $rezervacija->broj_karata = $validated['broj_karata'];
            $rezervacija->ukupna_cena = $rezervacija->broj_karata * $rezervacija->dogadjaj->cena_karte;
        }

        if (isset($validated['status'])) {
            $rezervacija->status = $validated['status'];
        }

        $rezervacija->save();

        return new RezervacijaResource($rezervacija);
    }

    /**
     * Brisanje rezervacije.
     */
    public function destroy(Rezervacija $rezervacija)
    {
        if (!Auth::check() || Auth::id() !== $rezervacija->korisnik_id) {
            return response()->json(['error' => 'Nemate dozvolu za brisanje ove rezervacije.'], 403);
        }

        $rezervacija->delete();

        return response()->json(['message' => 'Rezervacija je uspešno obrisana.'], 200);
    }
}
