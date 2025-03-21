<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientCreateRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true ;
  }

  /**
   * Get the validation rules that apply to the request.
   */
  public function rules(): array
  {
    return [
      'first_name' => 'required|string|max:255',
      'middle_name' => 'nullable|string|max:255',
      'last_name' => 'required|string|max:255',
      'suffix' => 'nullable|string|max:50',
    ];
  }

  /**
   * Custom error messages (optional).
   */
  public function messages(): array
  {
    return [
      'first_name.required' => 'First name is required.',
      'last_name.required' => 'Last name is required.',
    ];
  }
}
