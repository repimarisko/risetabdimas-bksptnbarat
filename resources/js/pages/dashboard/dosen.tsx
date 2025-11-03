import DashboardNav from '@/components/DashboardNav';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

type DashboardStats = {
    total: number;
    needs_revision: number;
    in_progress: number;
};

type LatestPenelitianItem = {
    uuid: string;
    title: string;
    status?: string | null;
    created_at?: string | null;
    tahun?: number | null;
    tahun_pelaksanaan?: number | null;
};

type PageProps = SharedData & {
    stats: DashboardStats;
    latestPenelitian: LatestPenelitianItem[];
};

const numberFormatter = new Intl.NumberFormat('id-ID');
const dateFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' });

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Dosen',
        href: '/dashboard/dosen',
    },
];

export default function DashboardDosen() {
    const { stats, latestPenelitian } = usePage<PageProps>().props;

    const total = stats?.total ?? 0;
    const needsRevision = stats?.needs_revision ?? 0;
    const inProgress = stats?.in_progress ?? 0;
    const recent = latestPenelitian ?? [];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Dosen" />
            <DashboardNav />

            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard Dosen Peneliti
                </h1>
                <p className="text-sm text-gray-500">
                    Pantau status usulan dan progres penelitian yang Anda ajukan.
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <DashboardCard
                        title="Total Usulan"
                        value={numberFormatter.format(total)}
                    >
                        Jumlah keseluruhan usulan penelitian Anda.
                    </DashboardCard>
                    <DashboardCard
                        title="Perlu Perbaikan"
                        value={numberFormatter.format(needsRevision)}
                    >
                        Usulan yang membutuhkan revisi sebelum disetujui.
                    </DashboardCard>
                    <DashboardCard
                        title="Sedang Berjalan"
                        value={numberFormatter.format(inProgress)}
                    >
                        Penelitian yang saat ini dalam fase pelaksanaan.
                    </DashboardCard>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-6 py-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Aktivitas Terbaru
                            </h2>
                            <p className="text-sm text-gray-500">
                                Ringkasan update terakhir dari usulan penelitian Anda.
                            </p>
                        </div>
                        <Link
                            href="/pt-penelitian"
                            className="text-sm font-semibold text-[#182e6b] hover:text-[#304690]"
                        >
                            Lihat Semua
                        </Link>
                    </div>

                    {recent.length ? (
                        <ul className="divide-y divide-gray-200">
                            {recent.map((item) => (
                                <li
                                    key={item.uuid}
                                    className="px-6 py-4"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {item.title}
                                            </p>
                                            <div className="mt-1 flex flex-wrap items-center gap-x-4 text-xs text-gray-500">
                                                <span>
                                                    Diajukan:{' '}
                                                    {formatDate(item.created_at)}
                                                </span>
                                                {item.tahun ? (
                                                    <span>
                                                        Tahun Usulan:{' '}
                                                        {item.tahun}
                                                    </span>
                                                ) : null}
                                                {item.tahun_pelaksanaan ? (
                                                    <span>
                                                        Pelaksanaan:{' '}
                                                        {item.tahun_pelaksanaan}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {formatStatus(item.status)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-6 py-10 text-sm text-gray-500">
                            Belum ada aktivitas terbaru. Mulai dengan membuat
                            usulan penelitian terlebih dahulu.
                        </div>
                    )}
                </div>
            </div>
        </AppHeaderLayout>
    );
}

function DashboardCard({
    title,
    value,
    children,
}: {
    title: string;
    value: string;
    children: ReactNode;
}) {
    return (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-white p-6">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                        {value}
                    </p>
                </div>
                <p className="text-sm text-gray-600">{children}</p>
            </div>
        </div>
    );
}

function formatDate(value?: string | null): string {
    if (!value) {
        return '-';
    }

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return '-';
    }

    return dateFormatter.format(parsed);
}

function formatStatus(value?: string | null): string {
    return value ?? 'Draft';
}
