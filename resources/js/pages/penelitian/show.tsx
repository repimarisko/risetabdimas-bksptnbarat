import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { type ReactNode, useCallback } from 'react';

type PenelitianItem = {
    uuid: string;
    title: string;
    status?: string | null;
    email_pengusul?: string | null;
    tahun?: number | null;
    tahun_pelaksanaan?: number | null;
    biaya_usulan_1?: number | null;
    biaya_usulan_2?: number | null;
    biaya_usulan_3?: number | null;
    biaya_usulan_4?: number | null;
    biaya_disetujui?: number | null;
};

type PageProps = SharedData & {
    penelitian: PenelitianItem;
};

export default function PenelitianShow() {
    const { penelitian, auth } = usePage<PageProps>().props;
    const roles = auth?.roles ?? [];
    const isKetuaLppm = roles.includes('ketua-lppm');

    const dashboardBreadcrumb = isKetuaLppm
        ? { title: 'Dashboard Ketua LPPM', href: '/dashboard/ketua-lppm' }
        : { title: 'Dashboard Admin PT', href: '/dashboard/admin-pt' };
    const sectionBreadcrumb = {
        title: isKetuaLppm ? 'Persetujuan Penelitian' : 'Index Semua Usulan',
        href: '/admin/pt-penelitian',
    };

    const statusNormalized = (penelitian.status ?? '').toLowerCase();

    const handleStatusChange = useCallback(
        (action: 'approve' | 'reject') => {
            if (
                action === 'reject' &&
                !window.confirm(
                    'Tolak usulan penelitian ini? Tindakan ini dapat diberitahukan ke pengusul.',
                )
            ) {
                return;
            }

            router.patch(
                `/admin/pt-penelitian/${penelitian.uuid}/${action}`,
                {},
                { preserveScroll: true, preserveState: true },
            );
        },
        [penelitian.uuid],
    );

    return (
        <AppHeaderLayout
            breadcrumbs={[
                dashboardBreadcrumb,
                sectionBreadcrumb,
                {
                    title: 'Detail Usulan',
                    href: `/admin/pt-penelitian/${penelitian.uuid}`,
                },
            ]}
        >
            <Head title="Detail Usulan Penelitian" />
            <DashboardNav />

            <div className="mx-auto max-w-4xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    {penelitian.title}
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Status: {penelitian.status ?? 'Draft'}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => handleStatusChange('approve')}
                        className=" bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
                        disabled={statusNormalized.includes('disetujui')}
                    >
                        Setujui Usulan
                    </button>
                    <button
                        onClick={() => handleStatusChange('reject')}
                        className=" bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-300"
                        disabled={statusNormalized.includes('ditolak')}
                    >
                        Tolak Usulan
                    </button>
                </div>

                <div className="mt-8 grid gap-6  border border-gray-200 bg-white p-6 shadow-sm">
                    <DetailRow label="Pengusul">
                        {penelitian.email_pengusul ?? '-'}
                    </DetailRow>
                    <DetailRow label="Tahun Usulan">
                        {penelitian.tahun ?? '-'}
                    </DetailRow>
                    <DetailRow label="Tahun Pelaksanaan">
                        {penelitian.tahun_pelaksanaan ?? '-'}
                    </DetailRow>
                    <DetailRow label="Biaya Usulan Tahap 1">
                        {formatCurrency(penelitian.biaya_usulan_1)}
                    </DetailRow>
                    <DetailRow label="Biaya Usulan Tahap 2">
                        {formatCurrency(penelitian.biaya_usulan_2)}
                    </DetailRow>
                    <DetailRow label="Biaya Usulan Tahap 3">
                        {formatCurrency(penelitian.biaya_usulan_3)}
                    </DetailRow>
                    <DetailRow label="Biaya Usulan Tahap 4">
                        {formatCurrency(penelitian.biaya_usulan_4)}
                    </DetailRow>
                    <DetailRow label="Biaya Disetujui">
                        {formatCurrency(penelitian.biaya_disetujui)}
                    </DetailRow>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

function DetailRow({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="grid gap-2 sm:grid-cols-3">
            <span className="text-sm font-semibold text-gray-700">
                {label}
            </span>
            <span className="sm:col-span-2 text-sm text-gray-600">
                {children}
            </span>
        </div>
    );
}

function formatCurrency(value?: number | null) {
    if (typeof value !== 'number') {
        return '-';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
}
