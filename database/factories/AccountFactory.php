<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Account;
use Database\Factories\Faker\EthereumProvider;

class AccountFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Account::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker->addProvider(new EthereumProvider($this->faker));

        return [
            'twitter_id' => $this->faker->unique()->numerify('twitter_id_###'),
            'twitter_token' => $this->faker->sha256,
            'address' => $this->faker->unique()->ethereumAddress(),
            'staked_amount' => $this->faker->randomFloat(2, 0, 100),
            'tier' => $this->faker->randomElement(['Bronze', 'Silver', 'Gold']),
            'isSpecial' => $this->faker->boolean,
            'isSpotted' => $this->faker->boolean,
            'code' => $this->faker->unique()->bothify('##??##??'),
        ];
    }
}
