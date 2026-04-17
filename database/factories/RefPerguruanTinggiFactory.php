<?php

namespace Database\Factories;

use App\Models\RefPerguruanTinggi;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class RefPerguruanTinggiFactory extends Factory
{
    protected $model = RefPerguruanTinggi::class;

    public function definition(): array
    {
        return [
            'uuid' => (string) Str::uuid(),
            'nama' => $this->faker->company().' University',
            'nama_singkat' => strtoupper($this->faker->lexify('UNI-??')),
            'id_pt' => strtoupper($this->faker->bothify('PT-###')),
            'alamat' => $this->faker->address(),
        ];
    }
}
