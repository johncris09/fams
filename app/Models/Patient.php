<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
  use HasFactory;

  protected $fillable = ['first_name', 'middle_name', 'last_name', 'suffix'];

  public function claims()
  {
    return $this->hasMany(Claim::class);
  }
}
