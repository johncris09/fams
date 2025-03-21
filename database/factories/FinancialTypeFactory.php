<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FinancialType>
 */
class FinancialTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      return [
        'type' => $this->faker->randomElement(['Medical', 'Educational', 'Housing', 'Food Assistance']),
        'amount' => $this->faker->randomFloat(2, 100, 10000), // Generates a decimal value between 100 and 10,000
        'description' => $this->faker->optional()->sentence(), // Can be null
    ];
    }
}
