import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useMemo } from 'react';

const breadcrumbs = [
    { title: 'Dashboard Admin PT', href: '/dashboard/admin-pt' },
    { title: 'Persetujuan Akun', href: '/users/approvals' },
];

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

type DosenItem = {
    uuid: string;
    name: string | null;
    email: string | null;
    nidn: string | null;
    created_at?: string | null;
    verified_at?: string | null;
};

type PageProps = SharedData & {
    pending: DosenItem[];
    approved: DosenItem[];
    perguruan: {
        uuid: string;
        nama?: string | null;
        nama_singkat?: string | null;
    } | null;
};

export default function UserApprovals() {
    const { pending = [], approved = [], perguruan } = usePage<PageProps>().props;

    const handleApprove = useCallback((uuid: string) => {
        router.patch(`/users/approvals/${uuid}/approve`, {}, {
            preserveScroll: true,
            preserveState: true,
        });
    }, []);

    const perguruanLabel = useMemo(() => {
        if (!perguruan) {
            return 'Perguruan Tinggi Anda';
        }

        if (perguruan.nama_singkat) {
            return `${perguruan.nama_singkat} – ${perguruan.nama ?? ''}`.trim();
        }

        return perguruan.nama ?? 'Perguruan Tinggi Anda';
    }, [perguruan]);

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Persetujuan Akun" />
            <DashboardNav />

            <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Persetujuan Akun Dosen</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Daftar dosen yang mendaftar pada {perguruanLabel}. Setujui akun untuk
                        mengaktifkan akses pengajuan proposal penelitian.
                    </p>
                </div>

                <section className="mb-10  border border-gray-200 bg-white shadow-sm">
                    <header className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Menunggu Persetujuan</h2>
                        <p className="text-sm text-gray-500">
                            Terdapat {pending.length} akun yang menunggu persetujuan Anda.
                        </p>
                    </header>

                    {pending.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
                                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Nama</th>
                                        <th className="px-6 py-3 text-left">Email</th>
                                        <th className="px-6 py-3 text-left">NIDN</th>
                                        <th className="px-6 py-3 text-left">Terdaftar</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pending.map((item) => (
                                        <tr key={item.uuid} className="bg-white">
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.name ?? '—'}
                                            </td>
                                            <td className="px-6 py-4">{item.email ?? '—'}</td>
                                            <td className="px-6 py-4">{item.nidn ?? '—'}</td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {item.created_at
                                                    ? dateFormatter.format(new Date(item.created_at))
                                                    : '—'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleApprove(item.uuid)}
                                                    className="inline-flex items-center  bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-emerald-600"
                                                >
                                                    Setujui
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="px-6 py-10 text-center text-sm text-gray-500">
                            Tidak ada permintaan persetujuan saat ini.
                        </div>
                    )}
                </section>

                <section className=" border border-gray-200 bg-white shadow-sm">
                    <header className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Riwayat Persetujuan Terbaru</h2>
                        <p className="text-sm text-gray-500">
                            20 akun dosen terakhir yang telah disetujui.
                        </p>
                    </header>
                    {approved.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
                                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Nama</th>
                                        <th className="px-6 py-3 text-left">Email</th>
                                        <th className="px-6 py-3 text-left">NIDN</th>
                                        <th className="px-6 py-3 text-left">Disetujui Pada</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {approved.map((item) => (
                                        <tr key={`${item.uuid}-approved`} className="bg-white">
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.name ?? '—'}
                                            </td>
                                            <td className="px-6 py-4">{item.email ?? '—'}</td>
                                            <td className="px-6 py-4">{item.nidn ?? '—'}</td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {item.verified_at
                                                    ? dateFormatter.format(new Date(item.verified_at))
                                                    : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="px-6 py-8 text-center text-sm text-gray-500">
                            Belum ada akun yang disetujui.
                        </div>
                    )}
                </section>
            </div>
        </AppHeaderLayout>
    );
}
