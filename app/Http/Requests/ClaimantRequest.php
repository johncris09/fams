<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ClaimantRequest extends FormRequest
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

      'first_name' => [
        'required',
        'string',
        'max:255',
        Rule::unique('claimants')->where(function ($query) {
          return $query->where('last_name', request('last_name'));
        })->ignore($this->route('claimant')), // Ignore the current record
      ],
      'middle_name' => 'nullable|string|max:255',
      'last_name' => 'required|string|max:255',
      'suffix' => 'nullable|string|max:50',
      'birthdate' => 'required|date',
      'gender' => 'required|in:Male,Female',
      'marital_status' => 'required|in:Single,Married,Divorced,Widowed'
    ];
  }

  public function messages(): array
  {
    return [
      'first_name.unique' => 'The name has already been taken.',
      'first_name.required' => 'First name is required.',
      'last_name.required' => 'Last name is required.',
      'birthdate.required' => 'Birthdate is required.',
      'gender.required' => 'Gender is required.',
      'marital_status.required' => 'Marital status is required.',
    ];
  }
}
