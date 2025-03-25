<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'email', 'max:255', 'unique:users,email'],
      'password' => ['required', 'confirmed', 'min:8'],
      'role' => ['required'], // Adjust roles accordingly
      'avatar' => ['nullable', 'image', 'max:2048'], // 2MB max file size
    ];

  }

  public function messages(): array
  {
    return [
      'name.required' => 'The name field is required.',
      'email.required' => 'The email field is required.',
      'email.unique' => 'This email is already in use.',
      'password.required' => 'The password field is required.',
      'password.confirmed' => 'Passwords do not match.',
      'role.required' => 'Please select a role.',
      'avatar.image' => 'The avatar must be an image file.',
      'avatar.max' => 'The avatar file size must not exceed 2MB.',
    ];
  }
}
