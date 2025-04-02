<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\Claimant;
use App\Models\FinancialType;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {

    $financialAssistanceTypes = FinancialType::with('claims')->get();

    // total amount by financial assistance types
    $totalAmountByFinancialAssistanceTypes = $financialAssistanceTypes->map(function ($type) {
      return [
        'type' => $type->type,
        'total_amount' => number_format($type->claims->sum('amount') ?? 0, 2, '.', ',')
      ];
    });

    return Inertia::render(
      'Dashboard/Index',
      [
        'totalUsers' => User::count(), // where year = now
        'totalPatients' => Patient::count(),
        'totalClaimants' => Claimant::count(),
        'totalClaims' => Claim::count(),
        'totalAmountByFinancialAssistanceTypes' => $totalAmountByFinancialAssistanceTypes,
      ]
    );
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
