<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Claimant>
 */
class ClaimantFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'first_name' => $this->faker->firstName,
      'middle_name' => $this->faker->optional()->firstName,
      'last_name' => $this->faker->lastName,
      'suffix' => $this->faker->optional()->randomElement(['Jr.', 'Sr.', 'II', 'III']),
      'birthdate' => $this->faker->date('Y-m-d', '2005-01-01'), // Ensures they're adults
      'gender' => $this->faker->randomElement(['male', 'female', 'other']),
      'marital_status' => $this->faker->randomElement(['single', 'married', 'divorced', 'widowed']),
    ];
  }
}
