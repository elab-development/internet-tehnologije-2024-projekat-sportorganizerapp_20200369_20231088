# 🏟️ SPORTIFY — Full-stack React/Laravel/MySQL aplikacija

**SPORTIFY** je platforma za upravljanje sportskim događajima i rezervacijama karata.  
Aplikacija obuhvata **REST API (Laravel + MySQL)** i **SPA frontend (React)** sa jasnim ulogama i dozvolama.

---

## 🚀 Tehnologije

- **Backend:** Laravel 10+, PHP 8.x, MySQL, Laravel Sanctum (personal access tokens), Maatwebsite/Excel (export)
- **Frontend:** React (Vite/CRA), Axios, React Router
- **Autentikacija:** Bearer token (Sanctum)
- **Deploy/Dev:** `php artisan serve` (API), `npm start` (React)

---

## 👥 Uloge i dozvole

### 1) Neulogovani korisnik (gost)
- ✅ Registracija i prijava (autentikacija)
- ✅ Javno dostupne stranice (npr. „O nama“)
- ❌ Nema pristup listi događaja niti pravljenju rezervacija
- ❌ Nema pristup moderator alatima

### 2) Običan korisnik (`user_type = obican_korisnik`)
- ✅ Prikaz/paginacija/filtriranje sportskih događaja  
  (filtri: `vrsta_sporta`, `tip_dogadjaja`, pretraga, sortiranje po ceni)
- ✅ Kreiranje rezervacije za izabrani događaj
- ✅ Pregled **sopstvenih** rezervacija
- ✅ Ažuriranje **sopstvenih** rezervacija  
  (polja: `broj_karata`, `status` ∈ {`aktivna`, `pauzirana`})
- ✅ Brisanje **sopstvenih** rezervacija
- ❌ Nema kreiranje/izmene događaja
- ❌ Nema export/metrike

### 3) Moderator (`user_type = moderator`)
- ✅ Sve što i običan korisnik
- ✅ **CRUD nad događajima** (kreiranje, izmena, brisanje)
- ✅ **Export događaja u Excel** (`dogadjaji.xlsx`)
- ✅ **Metrike** (npr. najzastupljeniji sport, distribucija po mesecima)
- ❌ Rezervacije drugih korisnika može samo pregledati kroz događaje (bez menjanja)

---

## 📦 Modeli i šema podataka (sažetak)

- **users**: `id`, `name`, `email`, `password`, `user_type` (`obican_korisnik|moderator`), timestamps
- **tipovi**: `id`, `naziv`, timestamps  *(tip događaja; FK u dogadjaji)*
- **dogadjaji**:  
  `id`, `datum (date)`, `vreme (time/string)`, `lokacija (string)`,  
  `tip_dogadjaja (FK -> tipovi.id)`, `cena_karte (decimal)`, `vrsta_sporta (string)`, timestamps
- **rezervacije**:  
  `id`, `korisnik_id (FK -> users.id)`, `dogadjaj_id (FK -> dogadjaji.id)`,  
  `broj_karata (int)`, `ukupna_cena (decimal)`, `status ('aktivna'|'pauzirana')`, timestamps

> Migrations su obuhvaćene (kreiranje tabela, dodatne kolone, FK constraints).

---

## 🔌 API (sažet pregled ruta)

> *Putanje i payload-i su usklađeni sa postojećim kontrolerima (`AuthController`, `DogadjajController`, `RezervacijaController`, `TipController`).*

### Autentikacija
- `POST /api/register` → registracija
- `POST /api/login` → prijava (dobija se **Bearer token**)

### Događaji
- `GET /api/dogadjaji` → lista (samo ulogovani: `obican_korisnik` ili `moderator`)  
  **Query:** `page`, `vrsta_sporta`, `tip_dogadjaja`  
  **Odgovor:** Laravel pagination + `DogadjajResource`
- `GET /api/dogadjaji/{id}` → detalji
- `POST /api/dogadjaji` *(moderator)*  
  **Body:** `{ datum, vreme, lokacija, tip_dogadjaja, cena_karte, vrsta_sporta }`
- `PUT /api/dogadjaji/{id}` *(moderator)*  
  **Body:** bilo koje od navedenih polja (partial update)
- `DELETE /api/dogadjaji/{id}` *(moderator)*
- `GET /api/dogadjaji/export` *(moderator)* → Excel fajl (`dogadjaji.xlsx`)
- (opciono) `GET /api/dogadjaji/metrics` *(moderator)* → metrika (po sportu, po mesecu)

### Tipovi
- `GET /api/tipovi` → lista tipova događaja (za dropdown)

### Rezervacije
- `GET /api/rezervacije` *(običan korisnik)* → lista **sopstvenih** rezervacija (`RezervacijaResource`)
- `POST /api/rezervacije` *(običan korisnik)*  
  **Body:** `{ dogadjaj_id, broj_karata }`  
  **Napomena:** `ukupna_cena` se računa: `broj_karata * cena_karte`
- `PUT /api/rezervacije/{id}` *(vlasnik rezervacije)*  
  **Body:** `{ broj_karata?, status? }` (`status` ∈ `aktivna|pauzirana`)
- `DELETE /api/rezervacije/{id}` *(vlasnik rezervacije)*

> Sve zaštićene rute zahtevaju `Authorization: Bearer {token}`.

---

## 🖥️ Frontend (struktura i ključne strane/komponente)

- `Pocetna.jsx` — hero, uvod
- `ONama.jsx` — o aplikaciji + **Slajder poznatih sportista**  
  (slike/sport sa TheSportsDB kroz proxy; **opisi** sa Wikipedia API-ja)
- `Dogadjaji.jsx` — lista događaja (filteri/sort/paginacija)
- `Dogadjaj.jsx` — detalji događaja + kreiranje rezervacije
- `MojeRezervacije.jsx` — pregled/izmene/brisanje **sopstvenih** rezervacija
- `ModeratorPocetna.jsx` — brzi pregled
- `DogadjajiModerator.jsx` — **CRUD nad događajima** + **export u Excel**
- `Metrike.jsx` — grafički pregled metrika
- `Prijava.jsx`, `Registracija.jsx` — autentikacija
- UI pomoćne: `Navigacija.jsx`, `Futer.jsx`, `Breadcrumbs.jsx`, kartice itd.
- Hook: `useFamousSportsman.js` — dohvat poznatih sportista (SportsDB + Wikipedia)

---

## ⚙️ Setup (lokalni razvoj)

---------------------------

1. Klonirajte repozitorijum:
```bash
    git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-sportorganizerapp_20200369_20231088.git
```
2. Pokrenite backend:
```bash
   cd sport-organizer-laravel
   composer install
   php artisan migrate:fresh --seed
   php artisan serve
```
    
3. Pokrenite frontend:
```bash
   cd sport-organizer-react
   npm install
   npm start
```
    
4.  Frontend pokrenut na: [http://localhost:3000](http://localhost:3000) Backend API pokrenut na: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)

