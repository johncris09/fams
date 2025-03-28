<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class PatientRequest extends FormRequest
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
   */
  public function rules(): array
  {
    return [
      'first_name' => [
        'required',
        'string',
        'max:255',
        Rule::unique('patients')->where(function ($query) {
          return $query->where('last_name', request('last_name'));
        })->ignore($this->route('patient')), // Ignore the current record
      ],
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
      'first_name.unique' => 'The name has already been taken.',
      'first_name.required' => 'First name is required.',
      'last_name.required' => 'Last name is required.',
    ];
  }
}
