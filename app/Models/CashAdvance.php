<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashAdvance extends Model
{


  use HasFactory;
  protected $fillable = ['amount', 'date_added' ];

}
