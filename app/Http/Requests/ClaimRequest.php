<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClaimRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {

    return [
      'patient_id' => 'required',
      'claimant_id' => 'required',
      'financial_type_id' => 'required',
      'barangay_id' => 'required',
      'amount' => 'required',
      'purpose' => '',
      'claim_date' => 'required|date',
      'purok' => '',
      'app_year' => '',
      'app_month' => ''
    ];
  }
  public function messages(): array
  {
    return [
      'patient_id.required' => 'Patient is required.',
      'claimant_id.required' => 'Claimant is required.',
      'financial_type_id.required' => 'Financial Type is required.',
      'barangay_id.required' => 'Barangay is required.',
      'amount.required' => 'Amount is required.',
      'claim_date.required' => 'Claim Date is required.',
    ];
  }
}
