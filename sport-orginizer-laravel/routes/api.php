<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DogadjajController;
use App\Http\Controllers\TipController;
use App\Http\Controllers\RezervacijaController;

Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']); 

Route::middleware('auth:sanctum')->group(function () {

  Route::get('/dogadjaji', [DogadjajController::class, 'index']);
  Route::post('/dogadjaji', [DogadjajController::class, 'store']);
  Route::put('/dogadjaji/{dogadjaj}', [DogadjajController::class, 'update']);
  Route::delete('/dogadjaji/{dogadjaj}', [DogadjajController::class, 'destroy']);
  Route::get('/dogadjaji/metrics', [DogadjajController::class, 'metrics']);
  Route::get('/dogadjaji/export', [DogadjajController::class, 'exportToExcel']);


  Route::get('/rezervacije', [RezervacijaController::class, 'index']);
  Route::post('/rezervacije', [RezervacijaController::class, 'store']);
  Route::patch('/rezervacije/{rezervacija}', [RezervacijaController::class, 'update']);
  Route::delete('/rezervacije/{rezervacija}', [RezervacijaController::class, 'destroy']);

  Route::apiResource('tipovi', TipController::class);

  Route::post('/logout', [AuthController::class, 'logout']);
});