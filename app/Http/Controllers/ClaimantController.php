<?php

namespace App\Http\Controllers;
use Illuminate\Database\QueryException;
use App\Http\Requests\ClaimantRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\ClaimantResource;
use App\Models\Claimant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class ClaimantController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {

    Gate::authorize('viewAny', Claimant::class);

    $claimants = Claimant::orderBy('id', 'desc')->get();

    return Inertia::render(
      'Claimant/Index',
      [
        'claimants' => ClaimantResource::collection($claimants),
      ]
    );
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {

    return Inertia::render(
      'Claimant/Create',
    );
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(ClaimantRequest $request)
  {
    try {
      Claimant::create($request->validated());

      return redirect()->route('claimants.index')
        ->with('success', 'Claimant created successfully!');
    } catch (QueryException $e) {
      if ($e->errorInfo[1] == 1062) { // MySQL error code for duplicate entry
        return redirect()->back()
          ->withInput() // Keeps old input values
          ->with('error', 'A claimant with the same details already exists. Please check your input.');
      }

      return redirect()->back()
        ->withInput()
        ->with('error', 'An unexpected error occurred. Please try again.');
    }

  }

  /**
   * Display the specified resource.
   */
  public function show(Claimant $claimant)
  {
    dd($claimant);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($id): Response
  {

    $claimant = Claimant::findOrFail($id);

    return Inertia::render('Claimant/Edit', [
      'claimant' => $claimant,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(ClaimantRequest $request, Claimant $claimant)
  {
    $claimant->update($request->validated());

    return redirect()->route('claimants.index')->with('success', 'Claimant updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    // get the id parameter from the request
    $id = $request->id;

    Claimant::destroy($id);
    return Redirect::route('claimants.index', ['message' => 'Claimant deleted successfully']);

  }
}
