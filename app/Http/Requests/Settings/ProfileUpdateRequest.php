<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'nama_lengkap' => ['required', 'string', 'max:150'],
            'tanggal_lahir' => ['required', 'date'],
            'tempat_lahir' => ['required', 'string', 'max:100'],
            'alamat' => ['required', 'string'],
            'nik' => ['required', 'string', 'max:16'],
            'nip' => ['nullable', 'string', 'max:18'],
            'nuptk' => ['nullable', 'string', 'max:16'],
            'hp' => ['required', 'string', 'max:20'],
            'sinta_id' => ['nullable', 'string', 'max:50'],
            'scopus_id' => ['nullable', 'string', 'max:50'],
            'sinta_link' => ['nullable', 'url', 'max:255'],
            'scopus_link' => ['nullable', 'url', 'max:255'],
        ];
    }
}
