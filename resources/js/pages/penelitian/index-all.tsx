import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useCallback } from 'react';

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
    created_at?: string | null;
};

type PageProps = SharedData & {
    penelitian: {
        data: PenelitianItem[];
    };
};

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});
const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

function getStatusMeta(status?: string | null) {
    const normalized = (status ?? '').toLowerCase();
    switch (normalized) {
        case 'draft':
            return { label: 'Draft', badgeClass: 'bg-gray-200 text-gray-700' };
        case 'mengajukan':
            return { label: 'Mengajukan', badgeClass: 'bg-blue-100 text-blue-700' };
        case 'disetujui':
        case 'didanai':
            return { label: 'Didanai', badgeClass: 'bg-green-100 text-green-700' };
        case 'ditolak':
            return { label: 'Ditolak', badgeClass: 'bg-rose-100 text-rose-700' };
        case 'dalam review':
        case 'review':
            return { label: 'Dalam Review', badgeClass: 'bg-amber-100 text-amber-700' };
        default:
            return { label: status ?? 'Tidak Diketahui', badgeClass: 'bg-gray-100 text-gray-500' };
    }
}

export default function PenelitianIndexAll() {
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

    const pageTitle = isKetuaLppm ? 'Persetujuan Usulan Penelitian' : 'Semua Usulan Penelitian';
    const pageDescription = isKetuaLppm
        ? 'Review dan tindak lanjuti usulan penelitian lintas perguruan tinggi sebelum diajukan ke pendanaan.'
        : 'Pantau dan kelola seluruh usulan penelitian dari dosen Perguruan Tinggi Anda.';
    const exportLabel = isKetuaLppm ? 'Unduh Rekap' : 'Export ke Excel';

    const handleDelete = useCallback((uuid: string) => {
        if (
            !window.confirm(
                'Hapus usulan penelitian ini? Tindakan ini tidak dapat dibatalkan.',
            )
        ) {
            return;
        }
        router.delete(`/admin/pt-penelitian/${uuid}`);
    }, []);

    const handleStatusChange = useCallback(
        (uuid: string, action: 'approve' | 'reject') => {
            if (
                action === 'reject' &&
                !window.confirm(
                    'Tolak usulan penelitian ini? Tindakan ini dapat diberitahukan ke pengusul.',
                )
            ) {
                return;
            }

            router.patch(`/admin/pt-penelitian/${uuid}/${action}`, {}, { preserveScroll: true, preserveState: true });
        },
        [],
    );

    return (
        <AppHeaderLayout breadcrumbs={[dashboardBreadcrumb, sectionBreadcrumb]}>
            <Head title={sectionBreadcrumb.title} />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {pageTitle}
                            </h1>
                            <p className="text-sm text-gray-500">{pageDescription}</p>
                        </div>
                        <a
                            href="/admin/pt-penelitian/export"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
                        >
                            {exportLabel}
                        </a>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                        {penelitian?.data?.length ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm text-gray-900">
                                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                                        <tr>
                                            <th className="px-6 py-4">Usulan</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Pengusul</th>
                                            <th className="px-6 py-4">Biaya Usulan</th>
                                            <th className="px-6 py-4">Tahun</th>
                                            <th className="px-6 py-4">Detail</th>
                                            <th className="px-6 py-4">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {penelitian.data.map((item) => {
                                            const statusMeta = getStatusMeta(item.status);
                                            return (
                                                <tr key={item.uuid} className="bg-white transition hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-gray-900">{item.title}</span>
                                                            <span className="text-xs text-gray-500">{item.email_pengusul ?? '-'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusMeta.badgeClass}`}>
                                                            {statusMeta.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{item.email_pengusul ?? '—'}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col text-sm text-gray-700">
                                                            {[
                                                                { label: 'Tahun 1', value: item.biaya_usulan_1 },
                                                                { label: 'Tahun 2', value: item.biaya_usulan_2 },
                                                                { label: 'Tahun 3', value: item.biaya_usulan_3 },
                                                                { label: 'Tahun 4', value: item.biaya_usulan_4 },
                                                            ]
                                                                .filter((entry) => entry.value && entry.value > 0)
                                                                .map((entry, i) => (
                                                                    <div key={i}>
                                                                        {entry.label}: {currencyFormatter.format(entry.value ?? 0)}
                                                                    </div>
                                                                ))}
                                                            {![item.biaya_usulan_1, item.biaya_usulan_2, item.biaya_usulan_3, item.biaya_usulan_4].some(v => v && v > 0) && (
                                                                <div>—</div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{item.tahun ?? '—'}</td>
                                                    <td className="px-6 py-4">
                                                        <Link href={`/admin/pt-penelitian/${item.uuid}`} className="text-indigo-600 hover:text-indigo-500">
                                                            Detail
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex flex-wrap items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleStatusChange(item.uuid, 'approve')}
                                                                className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
                                                                disabled={item.status?.toLowerCase().includes('disetujui')}
                                                            >
                                                                Setujui
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(item.uuid, 'reject')}
                                                                className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-300"
                                                                disabled={item.status?.toLowerCase().includes('ditolak')}
                                                            >
                                                                Tolak
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.uuid)}
                                                                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="px-6 py-16 text-center text-sm text-gray-500">
                                Belum ada usulan penelitian yang dapat ditampilkan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
