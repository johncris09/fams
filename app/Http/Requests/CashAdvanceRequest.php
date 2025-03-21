<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CashAdvanceRequest extends FormRequest
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
          'amount' => 'required|numeric|min:0|max:9999999.99', // Required, numeric, min 0, max 9,999,999.99
          'date_added' => 'required|date',
        ];
    }
    public function messages(): array
    {
      return [
        'amount.required' => 'The amount field is required.',
        'amount.numeric' => 'The amount must be a valid number.',
        'amount.min' => 'The amount must be at least 0.',
        'amount.max' => 'The amount cannot exceed 9,999,999.99.',
        'date_added.required' => 'Date Added is required.',
      ];
    }
}
