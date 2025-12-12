import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ClipboardEdit, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type PerbaikanItem = {
    uuid: string;
    title: string;
    status?: string | null;
    created_at?: string | null;
    tahun?: number | null;
    tahun_pelaksanaan?: number | null;
    total_usulan?: number;
};

type PageProps = SharedData & {
    items: PerbaikanItem[];
};

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

export default function PenelitianPerbaikan() {
    const { items = [] } = usePage<PageProps>().props;
    const [query, setQuery] = useState('');

    const filteredItems = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) {
            return items;
        }

        return items.filter((item) => {
            return (
                item.title.toLowerCase().includes(normalized) ||
                (item.status ?? '').toLowerCase().includes(normalized)
            );
        });
    }, [items, query]);

    return (
        <AppHeaderLayout
            breadcrumbs={[
                { title: 'Dashboard Dosen', href: '/dashboard/dosen' },
                { title: 'Perbaikan Usulan', href: '/pt-penelitian/perbaikan' },
            ]}
        >
            <Head title="Perbaikan Usulan Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10">
                    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-start gap-3">
                        <Search className="h-5 w-5 mt-0.5 text-amber-500" />
                        <div>
                            <p className="font-semibold">Perbaikan Usulan</p>
                            <p>
                                Silakan perbaiki RAB sesuai catatan reviewer pada usulan berikut. Klik
                                &quot;Perbaiki RAB&quot; untuk menuju halaman edit.
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                            <Search className="h-4 w-4 text-gray-400" />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Cari judul atau status..."
                                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                            />
                        </div>
                        <span className="text-xs font-semibold text-gray-500">
                            {filteredItems.length} usulan perlu perbaikan
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                        {filteredItems.length ? (
                            <div className="divide-y divide-gray-100">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item.uuid}
                                        className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-base font-semibold text-gray-900">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Status: {item.status ?? 'Perlu perbaikan'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Dibuat: {formatDate(item.created_at)} ·{' '}
                                                {item.tahun_pelaksanaan ?? item.tahun ?? 'Tahun tidak tersedia'}
                                            </p>
                                            <p className="text-sm font-semibold text-indigo-600">
                                                Total Usulan:{' '}
                                                {typeof item.total_usulan === 'number'
                                                    ? currencyFormatter.format(item.total_usulan)
                                                    : 'Rp 0'}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2 md:items-end">
                                            <Link
                                                href={`/pt-penelitian/${item.uuid}/edit#rab`}
                                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
                                            >
                                                <ClipboardEdit className="h-4 w-4" />
                                                Perbaiki RAB
                                            </Link>
                                            <Link
                                                href={`/pt-penelitian/${item.uuid}/preview`}
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Lihat Detail Usulan
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-14 text-center text-sm text-gray-500">
                                Tidak ada usulan yang membutuhkan perbaikan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

function formatDate(value?: string | null) {
    if (!value) {
        return '—';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '—';
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}
