<?php

namespace Database\Seeders;

use App\Models\FinancialType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FinancialTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      FinancialType::factory()->count(100)->create();
    }
}
