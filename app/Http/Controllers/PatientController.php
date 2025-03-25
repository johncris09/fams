<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\PatientResource;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;
use App\Models\User;


class PatientController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(User $user)
  {

    Gate::authorize('viewAny', Patient::class);

    $patients = Patient::orderBy('id', 'desc')->get();

    return Inertia::render(
      'Patient/Index',
      [
        'patients' => PatientResource::collection($patients),
      ]
    );
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {

    return Inertia::render(
      'Patient/Create',
    );
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(PatientRequest $request)
  {
    // Create a new patient record
    Patient::create($request->validated());

    return redirect()->route('patients.index')
      ->with('success', 'Patient created successfully!');

  }

  /**
   * Display the specified resource.
   */
  public function show(Patient $patient)
  {
    dd($patient);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($id): Response
  {

    $patient = Patient::findOrFail($id); // Explicitly retrieve the patient

    return Inertia::render('Patient/Edit', [
      'patient' => $patient, // Pass patient data to the frontend
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(PatientRequest $request, Patient $patient)
  {
    $patient->update($request->validated());

    return redirect()->route('patients.index')->with('success', 'Patient updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    // get the id parameter from the request
    $id = $request->id;

    Patient::destroy($id);
    return redirect()->route('patients.index', ['message' => 'Patient deleted successfully']);
  }
}
