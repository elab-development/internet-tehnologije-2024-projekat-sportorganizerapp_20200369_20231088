<?php

namespace App\Exports;

use App\Models\Dogadjaj;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class DogadjajiExport implements FromCollection, WithHeadings
{
    /**
     * Dohvata kolekciju podataka za export.
     */
    public function collection()
    {
        return Dogadjaj::select('id', 'datum', 'vreme', 'lokacija', 'tip_dogadjaja', 'cena_karte', 'vrsta_sporta')->get();
    }

    /**
     * Definiše zaglavlja za Excel fajl.
     */
    public function headings(): array
    {
        return ['ID', 'Datum', 'Vreme', 'Lokacija', 'Tip Događaja', 'Cena Karte', 'Vrsta Sporta'];
    }
}
