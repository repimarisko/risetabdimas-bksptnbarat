import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

type PenelitianItem = {
    uuid: string;
    title: string;
    status?: string | null;
    email_pengusul?: string | null;
    deleted_at?: string | null;
    created_at?: string | null;
};

type PageProps = SharedData & {
    penelitian: {
        data: PenelitianItem[];
    };
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

export default function DeletedPenelitian() {
    const { penelitian } = usePage<PageProps>().props;

    const handleRestore = (uuid: string) => {
        if (!window.confirm('Pulihkan usulan ini?')) return;
        router.post(`/admin/pt-penelitian/${uuid}/restore`, {}, { preserveScroll: true });
    };

    return (
        <AppHeaderLayout
            breadcrumbs={[
                { title: 'Dashboard Super Admin', href: '/dashboard/super-admin' },
                { title: 'Usulan Dihapus', href: '#' },
            ]}
        >
            <Head title="Usulan Dihapus" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Usulan yang Dihapus
                            </h1>
                            <p className="text-sm text-gray-500">
                                Daftar usulan yang sudah dihapus (soft delete). Hubungi admin
                                untuk pemulihan permanen jika diperlukan.
                            </p>
                        </div>
                        <Link
                            href="/admin/pt-penelitian"
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
                        >
                            Kembali
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                        {penelitian?.data?.length ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm text-gray-900">
                                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                                        <tr>
                                            <th className="px-6 py-4">Usulan</th>
                                            <th className="px-6 py-4">Pengusul</th>
                                            <th className="px-6 py-4">Status Terakhir</th>
                                            <th className="px-6 py-4">Dihapus</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {penelitian.data.map((item) => (
                                            <tr key={item.uuid} className="bg-white transition hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-gray-900">
                                                            {item.title}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            Dibuat:{' '}
                                                            {item.created_at
                                                                ? dateFormatter.format(new Date(item.created_at))
                                                                : '—'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {item.email_pengusul ?? '—'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {item.status ?? '—'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {item.deleted_at
                                                        ? dateFormatter.format(new Date(item.deleted_at))
                                                        : '—'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRestore(item.uuid)}
                                                        className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                                                    >
                                                    Restore
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="px-6 py-10 text-center text-sm text-gray-500">
                                Tidak ada usulan yang dihapus.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
