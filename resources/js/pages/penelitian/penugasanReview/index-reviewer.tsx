import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { ListCheck, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

type Breadcrumb = { title: string; href: string };

type Skema = {
    id_skema: string;
    nama: string;
    nama_singkat: string;
    total_penugasan: number;
    pending: number;
    selesai: number;
};

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    skema: Skema[];
};

export default function PenugasanReviewIndex() {
    const { breadcrumbs = [], skema } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');

    const filtered = useMemo(() =>
        (skema ?? []).filter(s =>
            !search ||
            s.nama.toLowerCase().includes(search.toLowerCase()) ||
            s.nama_singkat.toLowerCase().includes(search.toLowerCase()),
        ),
    [skema, search]);

    const totalPending = filtered.reduce((acc, s) => acc + Number(s.pending), 0);
    const totalSelesai = filtered.reduce((acc, s) => acc + Number(s.selesai), 0);

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length
                    ? breadcrumbs
                    : [
                          { title: 'Dashboard', href: '/dashboard' },
                          { title: 'Penugasan Review', href: '/reviewer/pt-penelitian/penugasan' },
                      ]
            }
        >
            <Head title="Penugasan Review Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">

                    {/* ── Header + Summary ── */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Penugasan Review Administrasi
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Daftar skema penelitian beserta status penugasan reviewer.
                            </p>
                        </div>

                        {/* Summary stats */}
                        <div className="flex items-center gap-6 text-sm border border-gray-200 bg-white px-5 py-3 ">
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Total Skema</span>
                                <p className="text-xl font-bold text-gray-900 mt-0.5">{filtered.length}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Pending</span>
                                <p className="text-xl font-bold text-amber-500 mt-0.5">{totalPending}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Selesai</span>
                                <p className="text-xl font-bold text-emerald-600 mt-0.5">{totalSelesai}</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Search Bar ── */}
                    <div className="flex flex-wrap items-center gap-3 border border-gray-200 bg-white px-4 py-3 ">
                        <div className="flex flex-1 items-center gap-3 border border-gray-200 bg-gray-50 px-3 py-2">
                            <Search className="h-4 w-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama skema..."
                                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors shrink-0"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                        <span className="text-xs font-semibold text-gray-500 shrink-0">
                            {filtered.length} skema ditemukan
                        </span>
                    </div>

                    {/* ── Tabel ── */}
                    <div className="overflow-hidden border border-gray-200 bg-white  ">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-800">Daftar Skema</h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Klik &quot;Penugasan&quot; untuk melihat daftar penugasan reviewer per skema.
                            </p>
                        </div>

                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200">
                                    <th className="px-6 py-3 w-10">No</th>
                                    <th className="px-6 py-3">Nama Skema</th>
                                    <th className="px-6 py-3 text-center">Total</th>
                                    <th className="px-6 py-3 text-center">Pending</th>
                                    <th className="px-6 py-3 text-center">Selesai</th>
                                    <th className="px-6 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.length > 0 ? (
                                    filtered.map((item, index) => (
                                        <tr key={item.id_skema} className="hover:bg-gray-50 transition-colors">

                                            {/* No */}
                                            <td className="px-6 py-4 text-gray-400 text-xs">
                                                {index + 1}
                                            </td>

                                            {/* Nama Skema */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 border border-blue-100 shrink-0">
                                                        {item.nama_singkat}
                                                    </span>
                                                    <span className="text-sm text-gray-800">{item.nama}</span>
                                                </div>
                                            </td>

                                            {/* Total */}
                                            <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                                                {item.total_penugasan}
                                            </td>

                                            {/* Pending */}
                                            <td className="px-6 py-4 text-center">
                                                {Number(item.pending) > 0
                                                    ? <span className="text-xs font-semibold text-amber-600">{item.pending}</span>
                                                    : <span className="text-gray-300">—</span>
                                                }
                                            </td>

                                            {/* Selesai */}
                                            <td className="px-6 py-4 text-center">
                                                {Number(item.selesai) > 0
                                                    ? <span className="text-xs font-semibold text-emerald-600">{item.selesai}</span>
                                                    : <span className="text-gray-300">—</span>
                                                }
                                            </td>

                                            {/* Aksi */}
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/reviewer/pt-penelitian/penugasan/${item.id_skema}`}
                                                    className="inline-flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                                                >
                                                    <ListCheck className="w-3.5 h-3.5" />
                                                    Penugasan
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center text-sm text-gray-400">
                                            {search
                                                ? `Tidak ada skema yang cocok dengan "${search}"`
                                                : 'Belum ada data skema.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AppHeaderLayout>
    );
}