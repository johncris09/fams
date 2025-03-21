<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
  use HasFactory;

  protected $fillable = [
    'patient_id',
    'claimant_id',
    'financial_type_id',
    'barangay_id',
    'amount',
    'purpose',
    'claim_date'
  ];

  public function patient()
  {
    return $this->belongsTo(Patient::class);
  }

  public function claimant()
  {
    return $this->belongsTo(Claimant::class);
  }
  public function financialType()
  {
    return $this->belongsTo(FinancialType::class);
  }
  public function barangay()
  {
    return $this->belongsTo(Barangay::class);
  }
}
