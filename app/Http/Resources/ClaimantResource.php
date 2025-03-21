<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClaimantResource extends JsonResource
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
      'lastName' => $this->last_name,
      'middleName' => $this->middle_name,
      'suffix' => $this->suffix,
      'birthdate' => Carbon::parse($this->birthdate)->format('Y-m-d'),
      'gender' => $this->gender,
      'maritalStatus' => $this->marital_status,

      // 'medical_records' => MedicalRecordResource::collection($this->medicalRecords),
    ];
  }
}
