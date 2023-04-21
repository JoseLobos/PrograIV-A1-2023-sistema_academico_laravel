<?php

use App\Models\Alumno;
use App\Models\Docente;
use App\Models\Materia;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\MateriaController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*Route::apiResources([
    'alumnos'=>AlumnoController::class
]);*/
Route::controller(AlumnoController::class)->group(function(){
    Route::get('/alumnos', 'index');
    Route::post('/alumnos', 'store');
    Route::put('/alumnos', 'update');
    Route::delete('/alumnos', 'destroy');

    
});
Route::controller(DocenteController::class)->group(function(){
    Route::get('/docentes', 'index');
    Route::post('/docentes', 'store');
    Route::put('/docentes', 'update');
    Route::delete('/docentes', 'destroy');
});

Route::controller(MateriaController::class)->group(function(){
    Route::get('/materias', 'index');
    Route::post('/materias', 'store');
    Route::put('/materias', 'update');
    Route::delete('/materias', 'destroy');
});
Route::get('/', function () {
    return view('welcome');
});
