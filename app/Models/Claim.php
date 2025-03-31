<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
  use HasFactory;

  protected $fillable = [
    'control_number',
    'app_year',
    'app_month',
    'patient_id',
    'claimant_id',
    'financial_type_id',
    'barangay_id',
    'amount',
    'purok',
    'purpose',
    'claim_date'
  ];

  public static function generateControlNumber()
  {

    $year = now()->year;
    $lastControlNumber = self::where('app_year', $year)->max('control_number');
    return $lastControlNumber ? $lastControlNumber + 1 : 1;

  }
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
