<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DogadjajController;

Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']); 

Route::middleware('auth:sanctum')->group(function () {

  Route::get('/dogadjaji', [DogadjajController::class, 'index']);
  Route::post('/dogadjaji', [DogadjajController::class, 'store']);
  Route::put('/dogadjaji/{dogadjaj}', [DogadjajController::class, 'update']);
  Route::delete('/dogadjaji/{dogadjaj}', [DogadjajController::class, 'destroy']);
  Route::get('/dogadjaji/metrics', [DogadjajController::class, 'metrics']);

    Route::post('/logout', [AuthController::class, 'logout']);
});