import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type MenuItem = {
    key: string;
    label: string;
    description?: string | null;
    path?: string | null;
};

type RoleItem = {
    id: number;
    name: string;
    menus: string[];
    user_count?: number;
};

type PageProps = SharedData & {
    menus: MenuItem[];
    roles: RoleItem[];
    flash?: { success?: string };
};

const MENU_PAGE_SIZE = 10;

export default function RoleMenusPage() {
    const { menus = [], roles = [], flash } = usePage<PageProps>().props;
    const [activeRoleId, setActiveRoleId] = useState<number | null>(
        roles[0]?.id ?? null,
    );
    const [roleMenus, setRoleMenus] = useState<Record<number, string[]>>(() =>
        initialRoleMenus(roles),
    );
    const [saving, setSaving] = useState(false);
    const [roleSearch, setRoleSearch] = useState('');
    const [menuSearch, setMenuSearch] = useState('');
    const [menuPage, setMenuPage] = useState(1);

    useEffect(() => {
        setRoleMenus(initialRoleMenus(roles));
    }, [roles]);

    useEffect(() => {
        if (!roles.length) {
            setActiveRoleId(null);
            return;
        }

        if (activeRoleId === null || !roles.some((role) => role.id === activeRoleId)) {
            setActiveRoleId(roles[0].id);
        }
    }, [activeRoleId, roles]);

    const breadcrumbs = useMemo(
        () => [
            { title: 'Dashboard Super Admin', href: '/dashboard/super-admin' },
            { title: 'Menu Role Access', href: '/settings/role-menus' },
        ],
        [],
    );

    const activeRole = useMemo(
        () => roles.find((role) => role.id === activeRoleId),
        [roles, activeRoleId],
    );

    const selectedMenus = useMemo(
        () => (activeRoleId ? roleMenus[activeRoleId] ?? [] : []),
        [roleMenus, activeRoleId],
    );

    const filteredRoles = useMemo(() => {
        const query = roleSearch.trim().toLowerCase();
        if (!query) return roles;

        return roles.filter((role) =>
            role.name.toLowerCase().includes(query),
        );
    }, [roles, roleSearch]);

    const filteredMenus = useMemo(() => {
        const query = menuSearch.trim().toLowerCase();
        if (!query) return menus;

        return menus.filter((menu) =>
            [
                menu.label,
                menu.description ?? '',
                menu.path ?? '',
                menu.key,
            ]
                .join(' ')
                .toLowerCase()
                .includes(query),
        );
    }, [menus, menuSearch]);

    const totalMenuPages = Math.max(
        1,
        Math.ceil(filteredMenus.length / MENU_PAGE_SIZE),
    );

    const paginatedMenus = useMemo(() => {
        const start = (menuPage - 1) * MENU_PAGE_SIZE;
        const end = start + MENU_PAGE_SIZE;
        return filteredMenus.slice(start, end);
    }, [filteredMenus, menuPage]);

    const menuRangeStart =
        filteredMenus.length === 0 ? 0 : (menuPage - 1) * MENU_PAGE_SIZE + 1;
    const menuRangeEnd = Math.min(
        filteredMenus.length,
        menuPage * MENU_PAGE_SIZE,
    );

    useEffect(() => {
        setMenuPage(1);
    }, [menuSearch, menus]);

    useEffect(() => {
        if (menuPage > totalMenuPages) {
            setMenuPage(totalMenuPages);
        }
    }, [menuPage, totalMenuPages]);

    const toggleMenu = (key: string) => {
        if (!activeRoleId) return;

        setRoleMenus((prev) => {
            const current = new Set(prev[activeRoleId] ?? []);
            if (current.has(key)) {
                current.delete(key);
            } else {
                current.add(key);
            }

            return { ...prev, [activeRoleId]: Array.from(current) };
        });
    };

    const handleSave = () => {
        if (!activeRoleId) return;
        setSaving(true);
        router.patch(
            `/settings/role-menus/${activeRoleId}`,
            { menus: roleMenus[activeRoleId] ?? [] },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        );
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Role Access" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-700">
                                Kontrol Akses Menu
                            </p>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Assign Menu ke Role
                            </h1>
                            <p className="max-w-2xl text-sm text-gray-500">
                                Pilih role kemudian centang menu yang boleh diakses. Setiap perubahan langsung diterapkan ke permission role.
                            </p>
                            {flash?.success && (
                                <div className="inline-flex items-center gap-2  bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                                    <CheckCircle2 className="h-4 w-4" />
                                    {flash.success}
                                </div>
                            )}
                        </div>
                        <div className=" border border-blue-100 bg-white px-4 py-3 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">
                                Total Menu
                            </p>
                            <p className="text-2xl font-bold text-blue-900">
                                {menus.length}
                            </p>
                            <p className="text-xs text-blue-700">
                                Siap dikaitkan ke {roles.length} role
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[320px,1fr]">
                        <Card className="h-full border-gray-200 shadow-sm">
                            <CardHeader className="space-y-3 pb-2">
                                <CardTitle className="text-base">Role Pengguna</CardTitle>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        value={roleSearch}
                                        onChange={(event) => {
                                            setRoleSearch(event.target.value);
                                        }}
                                        placeholder="Cari role..."
                                        className="pl-9 text-sm"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {filteredRoles.map((role) => {
                                    const isActive = role.id === activeRoleId;
                                    return (
                                        <button
                                            key={role.id}
                                            type="button"
                                            onClick={() => setActiveRoleId(role.id)}
                                            className={`flex w-full items-center justify-between  border px-3 py-3 text-left transition ${isActive ? 'border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                        >
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {role.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {roleMenus[role.id]?.length ?? 0} menu dipilih
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {typeof role.user_count === 'number' && (
                                                    <Badge
                                                        variant="outline"
                                                        className="border-gray-200 bg-gray-50 text-gray-700"
                                                    >
                                                        {role.user_count} user
                                                    </Badge>
                                                )}
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </button>
                                    );
                                })}
                                {filteredRoles.length === 0 && (
                                    <p className="text-sm text-gray-500">
                                        {roles.length === 0
                                            ? 'Belum ada role terdaftar.'
                                            : 'Role tidak ditemukan untuk pencarian ini.'}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">
                                            {activeRole
                                                ? `Menu untuk ${activeRole.name}`
                                                : 'Pilih role terlebih dahulu'}
                                        </CardTitle>
                                        <p className="text-sm text-gray-500">
                                            Centang menu yang diperbolehkan. Perubahan ini akan langsung mempengaruhi permission pengguna dengan role terkait.
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-64">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                value={menuSearch}
                                                onChange={(event) => {
                                                    setMenuSearch(event.target.value);
                                                }}
                                                placeholder="Cari menu..."
                                                className="pl-9 text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs text-gray-500">
                                        {filteredMenus.length
                                            ? `Menampilkan ${menuRangeStart}–${menuRangeEnd} dari ${filteredMenus.length} menu`
                                            : menus.length === 0
                                                ? 'Belum ada menu yang dapat dikaitkan.'
                                                : 'Menu tidak ditemukan untuk pencarian ini.'}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setMenuPage((prev) => Math.max(1, prev - 1))
                                            }
                                            disabled={menuPage <= 1 || filteredMenus.length === 0}
                                            aria-label="Sebelumnya"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <span className="text-xs font-medium text-gray-600">
                                            Halaman{' '}
                                            {filteredMenus.length ? menuPage : 0} /{' '}
                                            {filteredMenus.length ? totalMenuPages : 0}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setMenuPage((prev) =>
                                                    Math.min(totalMenuPages, prev + 1),
                                                )
                                            }
                                            disabled={
                                                filteredMenus.length === 0 ||
                                                menuPage >= totalMenuPages
                                            }
                                            aria-label="Berikutnya"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {paginatedMenus.map((menu) => {
                                    const checked = selectedMenus.includes(menu.key);
                                    return (
                                        <label
                                            key={menu.key}
                                            className="flex items-start gap-3  border border-gray-200 bg-white px-4 py-3 shadow-xs transition hover:border-indigo-200"
                                        >
                                            <Checkbox
                                                checked={checked}
                                                onCheckedChange={() => toggleMenu(menu.key)}
                                                disabled={!activeRole}
                                                className="mt-0.5"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {menu.label}
                                                    </p>
                                                    {menu.path && (
                                                        <Badge
                                                            variant="outline"
                                                            className="border-gray-200 bg-gray-50 text-gray-600"
                                                        >
                                                            {menu.path}
                                                        </Badge>
                                                    )}
                                                </div>
                                                {menu.description && (
                                                    <p className="text-xs text-gray-500">
                                                        {menu.description}
                                                    </p>
                                                )}
                                            </div>
                                        </label>
                                    );
                                })}

                                {paginatedMenus.length === 0 && (
                                    <p className="text-sm text-gray-500">
                                        {menus.length === 0
                                            ? 'Belum ada menu yang dapat dikaitkan.'
                                            : 'Menu tidak ditemukan untuk pencarian ini.'}
                                    </p>
                                )}

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <p className="text-xs text-gray-500">
                                        {selectedMenus.length} menu dipilih untuk role ini.
                                    </p>
                                    <Button
                                        onClick={handleSave}
                                        disabled={!activeRole || saving}
                                    >
                                        {saving ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            'Simpan Perubahan'
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

function initialRoleMenus(roles: RoleItem[]): Record<number, string[]> {
    return roles.reduce<Record<number, string[]>>((acc, role) => {
        acc[role.id] = role.menus ?? [];
        return acc;
    }, {});
}
