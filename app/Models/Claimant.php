<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claimant extends Model
{

  use HasFactory;
  protected $fillable = ['first_name', 'middle_name', 'last_name', 'suffix', 'birthdate', 'gender', 'marital_status'];


  public function claims() {
    return $this->hasMany(Claim::class);
}
}
