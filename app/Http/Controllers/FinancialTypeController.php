<?php

namespace App\Http\Controllers;

use App\Http\Requests\FinancialTypeRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\FinancialTypeResource;
use App\Models\FinancialType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Gate;

class FinancialTypeController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {

    Gate::authorize('viewAny', FinancialType::class);

    $financialType = FinancialType::orderBy('type', 'asc')->get();

    return Inertia::render(
      'FinancialType/Index',
      [
        'financialTypes' => FinancialTypeResource::collection($financialType),
      ]
    );
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(FinancialTypeRequest $request)
  {

    FinancialType::create($request->validated());

    return redirect()->route('financial_types.index')
      ->with('success', 'Financial Type created successfully!');
  }

  /**
   * Display the specified resource.
   */
  public function show(FinancialType $financialType)
  {

    dd($financialType);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(FinancialTypeRequest $request, FinancialType $financialType)
  {
    $financialType->update($request->validated());

    return redirect()->route('financial_types.index')->with('success', 'Financial Type updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {

    // get the id parameter from the request
    $id = $request->id;

    FinancialType::destroy($id);
    return Redirect::route('financial_types.index', ['message' => 'Financial Type deleted successfully']);
  }
}
