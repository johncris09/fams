<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
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
      'middle_name' => $this->faker->lastName,
      'last_name' => $this->faker->lastName,
      'suffix' => $this->faker->randomElement(['Jr.', 'Sr.', 'III', null]),
    ];
  }
}
