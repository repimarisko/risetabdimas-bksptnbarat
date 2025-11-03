<?php

namespace App\Actions\Fortify;

use App\Models\Dosen;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Spatie\Permission\Models\Role;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'nidn' => ['nullable', 'string', 'max:50'],
            'uuid_pt' => ['required', 'string', 'max:100', 'exists:ref_perguruan_tinggi,uuid'],
        ])->validate();

        return DB::transaction(function () use ($input) {
            Role::findOrCreate(User::ROLE_DOSEN, 'web');

            $user = User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $input['password'],
                'role' => User::ROLE_DOSEN,
                'uuid_pt' => $input['uuid_pt'],
            ]);

            $user->assignRole(User::ROLE_DOSEN);

            Dosen::create([
                'nidn' => $input['nidn'] ?? null,
                'id_user' => $user->id,
                'email' => $user->email,
                'uuid_pt' => $input['uuid_pt'],
                'created_by' => $user->id,
            ]);

            return $user;
        });
    }
}
