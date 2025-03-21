<?php

namespace Database\Factories;

use App\Models\Barangay;
use App\Models\Claim;
use App\Models\Claimant;
use App\Models\FinancialType;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Claim>
 */
class ClaimFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      return [
        'patient_id' => Patient::factory(), // Creates a related Patient
        'claimant_id' => Claimant::factory(), // Creates a related Claimant
        'financial_type_id' => FinancialType::factory(), // Creates a related FinancialType
        'barangay_id' => Barangay::factory(), // Creates a related Barangay
        'amount' => $this->faker->randomFloat(2, 1000, 50000), // Random amount between 1,000 and 50,000
        'purpose' => $this->faker->sentence(), // Random purpose text
        'claim_date' => Carbon::now()->subDays(rand(1, 365)), // Random date within the last year
    ];
    }
}
