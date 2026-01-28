<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Menu Definitions
    |--------------------------------------------------------------------------
    |
    | Daftar menu yang dapat dikaitkan dengan role. Nilai "key" akan
    | dikonversi menjadi permission "menu:{key}" sehingga setiap role dapat
    | diberi izin akses menu secara fleksibel.
    |
    */
    'menus' => [
        [
            'key' => 'dashboard',
            'label' => 'Dashboard',
            'description' => 'Akses ke dashboard utama sesuai peran pengguna.',
            'path' => '/dashboard',
        ],
        [
            'key' => 'role-assignment',
            'label' => 'Assign Role',
            'description' => 'Kelola dan tetapkan role untuk akun pengguna.',
            'path' => '/settings/role-assignment',
        ],
        [
            'key' => 'role-menus',
            'label' => 'Menu Role Access',
            'description' => 'Atur menu apa saja yang dapat diakses oleh setiap role.',
            'path' => '/settings/role-menus',
        ],
        [
            'key' => 'pt-penelitian-admin',
            'label' => 'Usulan Penelitian (Admin PT)',
            'description' => 'Kelola usulan penelitian di lingkungan perguruan tinggi.',
            'path' => '/admin/pt-penelitian',
        ],
        [
            'key' => 'assign-reviewer',
            'label' => 'Assign Reviewer',
            'description' => 'Tetapkan reviewer untuk usulan penelitian yang disetujui.',
            'path' => '/admin/pt-penelitian/assign-reviewer',
        ],
        [
            'key' => 'user-approvals',
            'label' => 'Persetujuan Akun Dosen',
            'description' => 'Persetujuan akun dosen baru oleh admin PT.',
            'path' => '/users/approvals',
        ],
        [
            'key' => 'skema',
            'label' => 'Pengelolaan Skema',
            'description' => 'Kelola skema pendanaan penelitian dan pengabdian.',
            'path' => '/admin/pt-skema',
        ],
        [
            'key' => 'pt-penelitian-dosen',
            'label' => 'Pengajuan Penelitian (Dosen)',
            'description' => 'Akses pengajuan usulan penelitian sebagai dosen.',
            'path' => '/pt-penelitian',
        ],
    ],
];
