<?php

namespace Database\Seeders;

use App\Models\Claimant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClaimantSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Claimant::factory()->count(100)->create();
  }
}
