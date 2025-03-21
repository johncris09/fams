<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FinancialTypeRequest extends FormRequest
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
      'type' => 'required|string|max:255', // Required, must be a string, max 255 chars
      'amount' => 'required|numeric|min:0|max:9999999.99', // Required, numeric, min 0, max 9,999,999.99
      'description' => 'nullable|string|max:500', // Optional, string, max 500 chars
    ];
  }
  public function messages(): array
  {
    return [
      'type.required' => 'Type is required.',
      'amount.required' => 'The amount field is required.',
      'amount.numeric' => 'The amount must be a valid number.',
      'amount.min' => 'The amount must be at least 0.',
      'amount.max' => 'The amount cannot exceed 9,999,999.99.',
    ];
  }
}
