<?php

namespace Database\Seeders;

use App\Models\CashAdvance;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CashAdvanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      CashAdvance::factory()->count(10)->create();
    }
}
