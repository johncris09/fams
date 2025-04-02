<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClaimRequest;
use App\Http\Resources\BarangayResource;
use App\Http\Resources\ClaimantResource;
use App\Http\Resources\FinancialTypeResource;
use App\Http\Resources\PatientResource;
use App\Models\Barangay;
use App\Models\Claim;
use App\Models\Claimant;
use App\Models\FinancialType;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class ClaimController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {

    Gate::authorize('viewAny', Claim::class);


    $year = $request->year ?? date('Y'); // Get year from request or default to current year


    if (isset($request->year) && $request->year != null) {
      $year = $request->year;
    }


    // Fetch latest control number for the selected year
    $lastClaim = Claim::where('app_year', $year)
      ->orderBy('control_number', 'desc')
      ->first();

    // Generate next control number
    $control_number = $lastClaim ? Claim::generateControlNumber() : Claim::generateControlNumber();


    $claims = Claim::with([
      'patient',
      'claimant',
      'financialType',
      'barangay'
    ])
      ->where('app_year', $year)
      ->orderBy('id', 'desc')
      ->get();

    $barangays = Barangay::orderBy('barangay', 'asc')->get();
    $claimants = Claimant::orderBy('last_name', 'asc')->get();
    $patients = Patient::orderBy('last_name', 'asc')->get();
    $financialType = FinancialType::orderBy('type', 'asc')->get();

    // Count claims by claimant gender
    $genderCounts = $claims->groupBy(fn($claim) => strtolower($claim->claimant->gender))
      ->map->count()
      ->toArray();

    // Ensure both keys exist
    $formattedCounts = [
      'female' => $genderCounts['female'] ?? 0,
      'male' => $genderCounts['male'] ?? 0
    ];


    return Inertia::render(
      'Claim/Index',
      [
        'claims' => $claims,
        'appYear' => $year,
        'appMonth' => date('m'),
        'controlNumber' => $control_number,
        'barangays' => BarangayResource::collection($barangays),
        'claimants' => ClaimantResource::collection($claimants),
        'patients' => PatientResource::collection($patients),
        'financialTypes' => FinancialTypeResource::collection($financialType),
        'claimantsByGender' => $formattedCounts,

      ]
    );
  }
  public function store(ClaimRequest $request)
  {

    // Validate the request
    $validated = $request->validated();

    // Extract necessary fields
    $claimantId = $validated['claimant_id'];
    $patientId = $validated['patient_id'];
    $financialTypeId = $validated['financial_type_id'];

    // Check if a similar record exists in the last 3 months
    $existingClaim = Claim::where(function ($query) use ($claimantId, $patientId, $financialTypeId) {
      $query->where('claimant_id', $claimantId)
        ->where('patient_id', $patientId)
        ->where('financial_type_id', $financialTypeId);
    })
      ->where('claim_date', '>=', now()->subMonths(3)) // Check the last 3 months
      ->exists();

    if ($existingClaim) {
      return redirect()->route('claims.index')
        ->with('error', 'A claim for this financial assistance type has already been made by this claimant and patient within the last 3 months. Please check the latest transaction date.');
    }


    // Add the generated control number before saving
    $validated['control_number'] = Claim::generateControlNumber();
    $validated['app_year'] = date('Y');
    $validated['app_month'] = date('m');

    // Create the claim
    Claim::create($validated);


    return redirect()->route('claims.index')
      ->with('success', 'Claim created successfully!');

  }

  /**
   * Display the specified resource.
   */
  public function show(Claim $claim)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(ClaimRequest $request, Claim $claim)
  {

    // Validate the request
    $validated = $request->validated();

    // Extract necessary fields
    $claimantId = $validated['claimant_id'];
    $patientId = $validated['patient_id'];
    $financialTypeId = $validated['financial_type_id'];

    // Check if a similar record exists in the last 3 months
    $existingClaim = Claim::where('claimant_id', $claimantId)
      ->where('patient_id', $patientId)
      ->where('financial_type_id', $financialTypeId)
      ->where('claim_date', '>=', now()->subMonths(3)) // Check the last 3 months
      ->where('id', '!=', $claim->id) // Exclude the current record
      ->exists();

    if ($existingClaim) {
      return redirect()->route('claims.index')
        ->with('error', 'A claim for this financial assistance type has already been made by this claimant and patient within the last 3 months. Please check the latest transaction date.');
    }

    // Update the claim
    $claim->update($validated);

    return redirect()->route('claims.index')->with('success', 'Claim updated successfully.');

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, Claim $claim)
  {
    // get the id parameter from the request
    $id = $request->id;

    Claim::destroy($id);

    return redirect()->route('claims.index')->with('success', 'Claim deleted successfully.');

  }
}
