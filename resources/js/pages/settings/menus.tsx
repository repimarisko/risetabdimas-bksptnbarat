import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { type SharedData } from '@/types';
import { Plus, Save, Trash, Edit2 } from 'lucide-react';

type MenuItem = {
    id: number;
    name: string;
    slug: string;
    href?: string | null;
    icon?: string | null;
    parent_id?: number | null;
    sort?: number | null;
    roles: string[];
};

type PageProps = SharedData & {
    menus: MenuItem[];
    roles: string[];
};

export default function MenuSettingsPage() {
    const { menus = [], roles = [] } = usePage<PageProps>().props;
    const breadcrumbs = useMemo(
        () => [
            { title: 'Dashboard', href: '/dashboard/super-admin' },
            { title: 'Menu Settings', href: '/settings/menus' },
        ],
        [],
    );

    const [form, setForm] = useState<Partial<MenuItem>>({
        name: '',
        slug: '',
        href: '',
        icon: '',
        sort: (menus.at(-1)?.sort ?? 0) + 1,
        roles: [],
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleToggleRole = (role: string) => {
        setForm((prev) => {
            const current = new Set(prev.roles ?? []);
            current.has(role) ? current.delete(role) : current.add(role);
            return { ...prev, roles: Array.from(current) };
        });
    };

    const handleSubmit = () => {
        const payload = { ...form };
        if (editingId) {
            router.put(`/settings/menus/${editingId}`, payload, { preserveScroll: true });
        } else {
            router.post('/settings/menus', payload, { preserveScroll: true });
        }
        resetForm();
    };

    const resetForm = () => {
        setForm({
            name: '',
            slug: '',
            href: '',
            icon: '',
            sort: (menus.at(-1)?.sort ?? 0) + 1,
            roles: [],
        });
        setEditingId(null);
    };

    const startEdit = (menu: MenuItem) => {
        setEditingId(menu.id);
        setForm({
            name: menu.name,
            slug: menu.slug,
            href: menu.href ?? '',
            icon: menu.icon ?? '',
            sort: menu.sort ?? 0,
            roles: menu.roles ?? [],
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus menu ini?')) return;
        router.delete(`/settings/menus/${id}`, { preserveScroll: true });
        if (editingId === id) resetForm();
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Settings" />
            <DashboardNav />

            <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-indigo-700">
                            Super Admin
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900">Menu Settings</h1>
                        <p className="text-sm text-gray-600">
                            Kelola menu yang terhubung dengan permission per role.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="grid grid-cols-5 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <div className="col-span-2">Menu</div>
                            <div>Slug</div>
                            <div>Roles</div>
                            <div className="text-right">Aksi</div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {menus.map((menu) => (
                                <div
                                    key={menu.id}
                                    className="grid grid-cols-5 items-center px-4 py-3 text-sm"
                                >
                                    <div className="col-span-2 space-y-0.5">
                                        <p className="font-semibold text-gray-900">{menu.name}</p>
                                        <p className="text-xs text-gray-500">{menu.href ?? '-'}</p>
                                    </div>
                                    <div className="text-xs text-gray-600">{menu.slug}</div>
                                    <div className="flex flex-wrap gap-1 text-xs text-gray-700">
                                        {menu.roles.length ? (
                                            menu.roles.map((role) => (
                                                <span
                                                    key={role}
                                                    className="rounded-full bg-indigo-50 px-2 py-1 font-semibold text-indigo-700"
                                                >
                                                    {role}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => startEdit(menu)}
                                            className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 hover:border-indigo-200 hover:text-indigo-700"
                                            title="Edit"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(menu.id)}
                                            className="rounded-lg border border-rose-200 bg-white p-2 text-rose-500 hover:bg-rose-50"
                                            title="Hapus"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {menus.length === 0 && (
                                <div className="px-4 py-6 text-center text-sm text-gray-500">
                                    Belum ada menu.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                            <Plus className="h-5 w-5 text-indigo-600" />
                            {editingId ? 'Edit Menu' : 'Tambah Menu'}
                        </div>
                        <div className="space-y-3">
                            <Input label="Nama" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                            <Input label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
                            <Input label="Href" value={form.href ?? ''} onChange={(v) => setForm({ ...form, href: v })} />
                            <Input label="Icon" value={form.icon ?? ''} onChange={(v) => setForm({ ...form, icon: v })} />
                            <Input
                                label="Sort"
                                type="number"
                                value={form.sort ?? 0}
                                onChange={(v) => setForm({ ...form, sort: Number(v) })}
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Roles</p>
                                <div className="flex flex-wrap gap-2">
                                    {roles.map((role) => {
                                        const selected = form.roles?.includes(role);
                                        return (
                                            <button
                                                key={role}
                                                type="button"
                                                onClick={() => handleToggleRole(role)}
                                                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                                    selected
                                                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                                                }`}
                                            >
                                                {role}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                            >
                                <Save className="h-4 w-4" />
                                {editingId ? 'Update Menu' : 'Simpan Menu'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

type InputProps = {
    label: string;
    value: string | number | undefined;
    onChange: (value: string) => void;
    type?: string;
};

function Input({ label, value, onChange, type = 'text' }: InputProps) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
        </div>
    );
}
