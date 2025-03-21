<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashAdvanceRequest;
use App\Http\Resources\CashAdvanceResource;
use App\Models\CashAdvance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CashAdvanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


    $cashAdvance = CashAdvance::orderBy('date_added', 'desc')->get();

    return Inertia::render(
      'CashAdvance/Index',
      [
        'cashAdvances' => CashAdvanceResource::collection($cashAdvance),
      ]
    );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CashAdvanceRequest $request)
    {

      CashAdvance::create($request->validated());

      return redirect()->route('cash_advances.index')
        ->with('success', 'Cash Advance created successfully!');
    }

  /**
   * Display the specified resource.
   */
  public function show(CashAdvance $cashAdvance)
  {

    dd($cashAdvance);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(CashAdvanceRequest $request, CashAdvance $cashAdvance)
  {
    $cashAdvance->update($request->validated());

    return redirect()->route('cash_advances.index')->with('success', 'Cash Advance updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {

    // get the id parameter from the request
    $id = $request->id;

    CashAdvance::destroy($id);
    return Redirect::route('cash_advances.index', ['message' => 'Cash Advance deleted successfully']);
  }
}
