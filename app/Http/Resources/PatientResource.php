<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'firstName' => $this->first_name,
      'middleName' => $this->middle_name,
      'lastName' => $this->last_name,
      'suffix' => $this->suffix,
    ];
  }
}
