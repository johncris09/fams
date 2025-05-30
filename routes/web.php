<?php

use App\Http\Controllers\BarangayController;
use App\Http\Controllers\CashAdvanceController;
use App\Http\Controllers\ClaimantController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FinancialTypeController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::redirect('/', destination: 'dashboard');

Route::group(['middleware' => ['auth:sanctum']], function () {

  // DASHBOARD
  // Route::get('dashboard', function () {
  //   return Inertia::render('Dashboard');
  // })->name('dashboard');
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

  // PROFILE
  Route::get('/profile', array(ProfileController::class, 'edit'))->name('profile.edit');
  Route::patch('/profile', array(ProfileController::class, 'update'))->name('profile.update');
  Route::delete('/profile', array(ProfileController::class, 'destroy'))->name('profile.destroy');
  Route::post('profile/avatar', [ProfileController::class, 'updateAvatar'])
    ->name('profile.avatar.update');
  // USERS
  Route::get('/users', [UserController::class, 'index'])->name('users.index');
  Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
  Route::post('/users', [UserController::class, 'store'])->name('users.store');
  Route::get('/users/{id}', [UserController::class, 'findById'])->name('users.show');
  Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
  Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');
  // Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
  Route::delete('/users/{id}', array(UserController::class, 'destroy'))->name('users.destroy');
  // Route::delete('/users/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('users.bulk-destroy');

  // PATIENTS
  Route::get('/patients', [PatientController::class, 'index'])->name(name: 'patients.index');
  Route::get('/patients/create', [PatientController::class, 'create'])->name('patients.create');
  Route::post('/patients', [PatientController::class, 'store'])->name('patients.store');
  Route::get('/patients/{id}', [PatientController::class, 'findById'])->name('patients.show');
  Route::get('/patients/{id}/edit', [PatientController::class, 'edit'])->name('patients.edit');
  Route::patch('/patients/{patient}', [PatientController::class, 'update'])->name('patients.update');
  Route::delete('/patients/{id}', [PatientController::class, 'destroy'])->name('patients.destroy');
  Route::delete('/patients/{id}', array(PatientController::class, 'destroy'))->name('patients.destroy');


  // CLAIMANTS
  Route::get('/claimants', [ClaimantController::class, 'index'])->name(name: 'claimants.index');
  Route::get('/claimants/create', [ClaimantController::class, 'create'])->name('claimants.create');
  Route::post('/claimants', [ClaimantController::class, 'store'])->name('claimants.store');
  Route::get('/claimants/{id}', [ClaimantController::class, 'findById'])->name('claimants.show');
  Route::get('/claimants/{id}/edit', [ClaimantController::class, 'edit'])->name('claimants.edit');
  Route::patch('/claimants/{claimant}', [ClaimantController::class, 'update'])->name('claimants.update');
  Route::delete('/claimants/{id}', array(ClaimantController::class, 'destroy'))->name('claimants.destroy');

  // FINANCIAL TYPE
  Route::get('/financial_types', [FinancialTypeController::class, 'index'])->name(name: 'financial_types.index');
  Route::get('/financial_types/create', [FinancialTypeController::class, 'create'])->name('financial_types.create');
  Route::post('/financial_types', [FinancialTypeController::class, 'store'])->name('financial_types.store');
  Route::get('/financial_types/{id}', [FinancialTypeController::class, 'findById'])->name('financial_types.show');
  Route::get('/financial_types/{id}/edit', [FinancialTypeController::class, 'edit'])->name('financial_types.edit');
  Route::patch('/financial_types/{financial_type}', [FinancialTypeController::class, 'update'])->name('financial_types.update');
  Route::delete('/financial_types/{id}', [FinancialTypeController::class, 'destroy'])->name('financial_types.destroy');
  Route::delete('/financial_types/{id}', array(FinancialTypeController::class, 'destroy'))->name('financial_types.destroy');


  // CASH ADVANCE
  Route::get('/cash_advances', [CashAdvanceController::class, 'index'])->name(name: 'cash_advances.index');
  Route::get('/cash_advances/create', [CashAdvanceController::class, 'create'])->name('cash_advances.create');
  Route::post('/cash_advances', [CashAdvanceController::class, 'store'])->name('cash_advances.store');
  Route::get('/cash_advances/{id}', [CashAdvanceController::class, 'findById'])->name('cash_advances.show');
  Route::get('/cash_advances/{id}/edit', [CashAdvanceController::class, 'edit'])->name('cash_advances.edit');
  Route::patch('/cash_advances/{cash_advance}', [CashAdvanceController::class, 'update'])->name('cash_advances.update');
  Route::delete('/cash_advances/{id}', [CashAdvanceController::class, 'destroy'])->name('cash_advances.destroy');
  Route::delete('/cash_advances/{id}', array(CashAdvanceController::class, 'destroy'))->name('cash_advances.destroy');


  // BARANGAY
  Route::get('/barangays', [BarangayController::class, 'index'])->name(name: 'barangays.index');
  Route::get('/barangays/create', [BarangayController::class, 'create'])->name('barangays.create');
  Route::post('/barangays', [BarangayController::class, 'store'])->name('barangays.store');
  Route::get('/barangays/{id}', [BarangayController::class, 'findById'])->name('barangays.show');
  Route::get('/barangays/{id}/edit', [BarangayController::class, 'edit'])->name('barangays.edit');
  Route::patch('/barangays/{barangay}', [BarangayController::class, 'update'])->name('barangays.update');
  Route::delete('/barangays/{id}', [BarangayController::class, 'destroy'])->name('barangays.destroy');
  Route::delete('/barangays/{id}', array(BarangayController::class, 'destroy'))->name('barangays.destroy');


  // CLAIM
  Route::get('/claims', [ClaimController::class, 'index'])->name(name: 'claims.index');
  Route::get('/claims/create', [ClaimController::class, 'create'])->name('claims.create');
  Route::post('/claims', [ClaimController::class, 'store'])->name('claims.store');
  Route::get('/claims/{id}', [ClaimController::class, 'findById'])->name('claims.show');
  Route::get('/claims/{id}/edit', [ClaimController::class, 'edit'])->name('claims.edit');
  Route::patch('/claims/{claim}', [ClaimController::class, 'update'])->name('claims.update');
  Route::delete('/claims/{id}', [ClaimController::class, 'destroy'])->name('claims.destroy');
  Route::delete('/claims/{id}', array(ClaimController::class, 'destroy'))->name('claims.destroy');


  // ROLE
  Route::get('/roles', [RoleController::class, 'index'])->name(name: 'roles.index');
  Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create');
  Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
  Route::get('/roles/{id}', [RoleController::class, 'findById'])->name('roles.show');
  Route::get('/roles/{id}/edit', [RoleController::class, 'edit'])->name('roles.edit');
  Route::patch('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
  Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->name('roles.destroy');
  Route::delete('/roles/{id}', array(RoleController::class, 'destroy'))->name('roles.destroy');



});
require __DIR__ . '/auth.php';
