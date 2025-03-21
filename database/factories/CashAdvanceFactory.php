<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=CashAdvance>
 */
class CashAdvanceFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {

    return [
      'amount' => $this->faker->randomFloat(2, 100, 100000),
      'date_added' => $this->faker->date('Y-m-d', '2005-01-01'),
    ];
  }
}
