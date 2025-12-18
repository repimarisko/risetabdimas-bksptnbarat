import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { CheckCircle2, Loader2, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type RoleOption = {
    id: number;
    name: string;
};

type UserItem = {
    id: number;
    name: string;
    email: string;
    role?: string | null;
    roles?: string[];
    uuid_pt?: string | null;
    perguruan_tinggi?: {
        uuid: string;
        nama?: string | null;
        nama_singkat?: string | null;
    } | null;
    created_at?: string | null;
};

type PageProps = SharedData & {
    users: UserItem[];
    roles: RoleOption[];
    flash?: { success?: string };
};

export default function RoleAssignment() {
    const { users = [], roles = [], flash } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<Record<number, string[]>>(
        () => initialRoleMap(users),
    );
    const [savingIds, setSavingIds] = useState<number[]>([]);

    useEffect(() => {
        setSelectedRoles(initialRoleMap(users));
    }, [users]);

    const breadcrumbs = useMemo(
        () => [
            { title: 'Dashboard Super Admin', href: '/dashboard/super-admin' },
            { title: 'Role Assignment', href: '/settings/role-assignment' },
        ],
        [],
    );

    const filteredUsers = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) {
            return users;
        }

        return users.filter((user) => {
            const ptLabel = perguruanLabel(user.perguruan_tinggi).toLowerCase();
            return (
                (user.name ?? '').toLowerCase().includes(term) ||
                (user.email ?? '').toLowerCase().includes(term) ||
                (user.role ?? '').toLowerCase().includes(term) ||
                ptLabel.includes(term)
            );
        });
    }, [search, users]);

    const handleSave = (userId: number) => {
        const rolesPayload = selectedRoles[userId]?.filter(Boolean) ?? [];
        if (!rolesPayload.length) return;

        setSavingIds((prev) => [...prev, userId]);
        router.patch(
            `/settings/role-assignment/${userId}`,
            { roles: rolesPayload },
            {
                preserveScroll: true,
                onFinish: () =>
                    setSavingIds((prev) =>
                        prev.filter((current) => current !== userId),
                    ),
            },
        );
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Assignment" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
                    <header className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-gray-700">
                                Akses Pengguna
                            </p>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Assign Role
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Tetapkan role aktif untuk setiap akun dan pastikan aksesnya sesuai.
                            </p>
                            {flash?.success && (
                                <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                                    <CheckCircle2 className="h-4 w-4" />
                                    {flash.success}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                            <Search className="h-4 w-4 text-gray-400" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama, email, atau PT..."
                                className="h-9 border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
                            />
                        </div>
                    </header>

                    <Card className="border-gray-200 shadow-sm">
                        <CardHeader className="flex flex-col gap-2">
                            <CardTitle className="flex items-center justify-between text-lg">
                                <span>Daftar Pengguna</span>
                                <span className="text-sm font-normal text-gray-500">
                                    {filteredUsers.length} pengguna
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {filteredUsers.length ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                                        <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            <tr>
                                                <th className="px-6 py-3">Pengguna</th>
                                                <th className="px-6 py-3">Perguruan Tinggi</th>
                                                <th className="px-6 py-3">Role Aktif</th>
                                                <th className="px-6 py-3 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            {filteredUsers.map((user) => {
                                                const currentRoles =
                                                    selectedRoles[user.id] ?? [];
                                                const isSaving = savingIds.includes(user.id);

                                                return (
                                                    <tr key={user.id} className="align-top">
                                                        <td className="px-6 py-4">
                                                            <div className="font-semibold text-gray-900">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {user.email}
                                                            </div>
                                                <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-gray-500">
                                                    {(user.roles ?? []).map((r) => (
                                                        <Badge
                                                            key={`${user.id}-${r}`}
                                                            variant="outline"
                                                            className="border-gray-200 bg-gray-50 text-gray-600"
                                                        >
                                                            {r}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <Badge variant="outline" className="border-blue-100 bg-blue-50 text-blue-700">
                                                                {perguruanLabel(
                                                                    user.perguruan_tinggi,
                                                                )}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                                    <div className="flex flex-wrap gap-2">
                                                        {roles.map((role) => {
                                                            const checked = currentRoles.includes(role.name);
                                                            return (
                                                                <label
                                                                    key={role.id}
                                                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        checked={checked}
                                                                        onChange={(e) =>
                                                                            setSelectedRoles((prev) => {
                                                                                const existing = prev[user.id] ?? [];
                                                                                const next = e.target.checked
                                                                                    ? [...existing, role.name]
                                                                                    : existing.filter((r) => r !== role.name);
                                                                                return { ...prev, [user.id]: next };
                                                                            })
                                                                        }
                                                                    />
                                                                    <span>{role.name}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                    {user.role &&
                                                        user.role !== (currentRoles[0] ?? '') && (
                                                            <p className="text-xs text-gray-500">
                                                                Primary sebelumnya:{' '}
                                                                <span className="font-semibold">
                                                                    {user.role}
                                                                </span>
                                                            </p>
                                                        )}
                                                </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    disabled={!currentRoles.length || isSaving}
                                                                    onClick={() =>
                                                                        handleSave(user.id)
                                                                    }
                                                                >
                                                                    {isSaving ? (
                                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                                    ) : (
                                                                        'Simpan'
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-6 py-10 text-center text-sm text-gray-500">
                                    Tidak ada pengguna yang cocok dengan pencarian Anda.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

function initialRoleMap(users: UserItem[]): Record<number, string[]> {
    return users.reduce<Record<number, string[]>>((acc, user) => {
        const roles = user.roles && user.roles.length ? user.roles : [];
        acc[user.id] = roles;
        return acc;
    }, {});
}

function perguruanLabel(
    perguruan?: UserItem['perguruan_tinggi'] | null,
): string {
    if (!perguruan) return 'Tidak terikat PT';
    return perguruan.nama_singkat ?? perguruan.nama ?? 'Perguruan Tinggi';
}
