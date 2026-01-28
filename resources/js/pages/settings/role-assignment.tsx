import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { type SharedData } from '@/types';
import { CheckSquare, Save, Search, Shield, UserCog } from 'lucide-react';

type UserRow = {
    id: number;
    name: string;
    email: string;
    roles: string[];
    active_role?: string | null;
};

type PageProps = SharedData & {
    users: UserRow[];
    roles: string[];
};

export default function RoleAssignment() {
    const { users = [], roles = [] } = usePage<PageProps>().props;
    const breadcrumbs = useMemo(
        () => [
            { title: 'Dashboard', href: '/dashboard/super-admin' },
            { title: 'Role Assignment', href: '/settings/role-assignment' },
        ],
        [],
    );

    const [assignments, setAssignments] = useState<Record<number, string[]>>(() =>
        Object.fromEntries(users.map((u) => [u.id, u.roles])),
    );
    const [search, setSearch] = useState('');

    const filteredUsers = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return users;
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(q) ||
                (user.email ?? '').toLowerCase().includes(q),
        );
    }, [search, users]);

    const handleToggle = (userId: number, role: string) => {
        setAssignments((prev) => {
            const current = new Set(prev[userId] ?? []);
            if (current.has(role)) {
                current.delete(role);
            } else {
                current.add(role);
            }
            return { ...prev, [userId]: Array.from(current) };
        });
    };

    const handleSave = (userId: number) => {
        const selected = assignments[userId] ?? [];
        router.post(
            `/settings/role-assignment/${userId}`,
            { roles: selected },
            { preserveScroll: true },
        );
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Assignment" />
            <DashboardNav />

            <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
                <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wide text-indigo-700">
                            Super Admin
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Role Assignment
                        </h1>
                        <p className="text-sm text-gray-600">
                            Tambahkan lebih dari satu role ke akun pengguna. Pengguna dapat memilih role aktifnya lewat menu profil di pojok kanan atas.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama atau email..."
                            className="bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>
                </header>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 bg-gray-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid-cols-4">
                        <div className="md:col-span-2">User</div>
                        <div>Roles</div>
                        <div className="text-right">Aksi</div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="grid grid-cols-1 gap-3 px-6 py-4 md:grid-cols-4 md:items-center"
                            >
                                <div className="md:col-span-2 space-y-1">
                                    <p className="text-base font-semibold text-gray-900">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                    {user.active_role && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700">
                                            <Shield className="h-3 w-3" />
                                            Active: {user.active_role}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {roles.map((role) => {
                                        const checked = assignments[user.id]?.includes(role) ?? false;
                                        return (
                                            <button
                                                key={role}
                                                type="button"
                                                onClick={() => handleToggle(user.id, role)}
                                                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                                                    checked
                                                        ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                <CheckSquare
                                                    className={`h-4 w-4 ${
                                                        checked ? 'text-indigo-600' : 'text-gray-400'
                                                    }`}
                                                />
                                                {role}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleSave(user.id)}
                                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                                    >
                                        <Save className="h-4 w-4" />
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="px-6 py-10 text-center text-sm text-gray-500">
                            Tidak ada pengguna.
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <div className="flex items-start gap-2">
                        <UserCog className="h-4 w-4 flex-shrink-0" />
                        <p>
                            Pengguna dengan lebih dari satu role dapat memilih role aktif melalui menu profil di pojok kanan atas.
                        </p>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
