<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\SendMailController;
use App\Http\Controllers\ActivityReportController;
use App\Http\Controllers\Api\ActivityApiController;
use Inertia\Inertia;

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

Route::get('/', [LandingController::class,'index'])->name('landing.index');
Route::get('mail-send', [SendMailController::class, 'index']);
Route::get('/report/{id}', [ActivityReportController::class, 'show'])->name('report.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('activities',ActivityController::class);
    Route::resource('activityReport',ActivityReportController::class)->except('show');
});

Route::as('api.v1')
    ->prefix('api/v1')
    ->namespace('Api')
    ->middleware('auth')
    ->group(function () {
        Route::get('userActivities',[ActivityApiController::class,'index']);
        Route::get('report',[ActivityApiController::class,'report']);
    });



require __DIR__.'/auth.php';
