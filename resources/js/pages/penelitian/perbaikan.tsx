import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlertTriangle, ClipboardEdit, ListCheck, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type PerbaikanItem = {
    uuid: string;
    title: string;
    status?: string | null;
    created_at?: string | null;
    tahun?: number | null;
    tahun_pelaksanaan?: number | null;
    total_usulan?: number;
    rekomendasi?: string | null;
};

type PageProps = SharedData & {
    items: PerbaikanItem[];
};

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

function formatDate(value?: string | null) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export default function PenelitianPerbaikan() {
    const { items = [] } = usePage<PageProps>().props;
    const [query, setQuery] = useState('');

    const filteredItems = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return items;
        return items.filter(
            (item) =>
                item.title.toLowerCase().includes(normalized) ||
                (item.status ?? '').toLowerCase().includes(normalized),
        );
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

                    {/* ── Amber notice banner ── */}
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                        <div>
                            <p className="font-semibold">Perbaikan Usulan</p>
                            <p className="mt-0.5 text-amber-700">
                                Silakan perbaiki RAB sesuai catatan reviewer pada usulan berikut.
                                Klik &quot;Perbaiki RAB&quot; untuk menuju halaman edit.
                            </p>
                        </div>
                    </div>

                    {/* ── Main card ── */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                        {/* ── Card header: search bar ── */}
                        <div className="border-b border-gray-200 px-6 py-5">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                                    <Search className="h-4 w-4 text-gray-400" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Cari judul atau status..."
                                        className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                    />
                                    <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-500">
                                        Search
                                    </button>
                                </div>

                                {/* Count pill */}
                                <span className="inline-flex items-center gap-2 rounded-full border border-transparent bg-amber-100 px-4 py-1.5 text-xs font-medium text-amber-700">
                                    {filteredItems.length} perlu perbaikan
                                </span>
                            </div>
                        </div>

                        {/* ── List body ── */}
                        {filteredItems.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item.uuid}
                                        className="flex flex-col gap-5 px-6 py-5 transition hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
                                    >
                                        {/* ── Left: info ── */}
                                        <div className="min-w-0 flex-1 space-y-2">
                                            <p className="truncate text-base font-semibold text-gray-900">
                                                {item.title}
                                            </p>

                                            {/* Meta chips — mirrors the "Dibuat / Tahun" pattern from doc 1 */}
                                            <div className="flex flex-wrap gap-2">
                                                {[
                                                    { label: 'Status', value: item.status ?? 'Perlu perbaikan' },
                                                    { label: 'Review', value: item.rekomendasi ?? 'Perlu perbaikan' },
                                                    { label: 'Dibuat', value: formatDate(item.created_at) },
                                                    { label: 'Tahun', value: item.tahun_pelaksanaan ?? item.tahun ?? 'Tidak tersedia' },
                                                ].map(({ label, value }) => (
                                                    <span
                                                        key={label}
                                                        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                                                    >
                                                        <span className="font-semibold text-gray-700">{label}:</span>
                                                        {String(value)}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Total budget */}
                                            <p className="text-sm font-semibold text-indigo-600">
                                                Total Usulan:{' '}
                                                {typeof item.total_usulan === 'number'
                                                    ? currencyFormatter.format(item.total_usulan)
                                                    : 'Rp 0'}
                                            </p>
                                        </div>

                                        {/* ── Right: actions ── */}
                                        <div className="flex min-w-[200px] flex-col gap-2 md:items-end">
                                            <Link
                                                href={`/pt-penelitian/${item.uuid}/edit#rab`}
                                                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-400 focus:ring-2 focus:ring-amber-300"
                                            >
                                                <ClipboardEdit className="h-4 w-4" />
                                                Perbaiki RAB
                                            </Link>
                                            <Link
                                                href={`/pt-penelitian/${item.uuid}/hasilreview`}
                                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus:ring-2 focus:ring-blue-300"
                                            >
                                                <ListCheck className="h-4 w-4" />
                                                Hasil Review
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-16 text-center text-sm text-gray-500">
                                Tidak ada usulan yang membutuhkan perbaikan.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AppHeaderLayout>
    );
}