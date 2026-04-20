import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { CheckCircle2, Clock, Eye, PenLine, Search, XCircle } from 'lucide-react';
import { useState, useMemo } from 'react';

type Breadcrumb = { title: string; href: string };

type Penelitian = {
    id_penelitian: string;
    id_penugasan: string;
    status_review: string;
    hasil: string;
    id_skema: string;
    reviewer_id: number;
    reviewer_user_id: number;
    title: string;
    tahun: number;
    tahun_pelaksanaan: number;
    skema_nama: string;
    skema_nama_singkat: string;
    peneliti_nama_lengkap: string;
    nuptk: string;
    reviewer_nama_lengkap: string;
    reviewer_nuptk: string;
};

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    penelitian?: Penelitian[];
};

export default function PenugasanReviewShow() {
    const { breadcrumbs = [], penelitian = [] } = usePage<PageProps>().props;

    const [search, setSearch] = useState('');
    const [filterTahun, setFilterTahun] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const tahunOptions = useMemo(() =>
        [...new Set(penelitian.map(p => p.tahun))].sort((a, b) => b - a),
    [penelitian]);

    // Kumpulkan semua status unik dari data
    const statusOptions = useMemo(() =>
        [...new Set(penelitian.map(p => p.status_review).filter(Boolean))].sort(),
    [penelitian]);

    const filtered = useMemo(() =>
        penelitian.filter(p => {
            const q = search.toLowerCase();
            const matchSearch = !q ||
                p.title.toLowerCase().includes(q) ||
                p.peneliti_nama_lengkap.toLowerCase().includes(q) ||
                p.reviewer_nama_lengkap.toLowerCase().includes(q);
            const matchTahun  = !filterTahun  || String(p.tahun) === filterTahun;
            const matchStatus = !filterStatus || p.status_review === filterStatus;
            return matchSearch && matchTahun && matchStatus;
        }),
    [penelitian, search, filterTahun, filterStatus]);

    const hasFilter = search || filterTahun || filterStatus;

    const skemaNama    = penelitian[0]?.skema_nama ?? '';
    const skemaSingkat = penelitian[0]?.skema_nama_singkat ?? '';

    const totalPending = penelitian.filter(p => p.status_review !== 'Selesai').length;
    const totalSelesai = penelitian.filter(p => p.status_review === 'Selesai').length;
    const totalLolos   = penelitian.filter(p => p.hasil === 'Lolos').length;

    // Label & style per status
    const statusMeta: Record<string, { icon: React.ReactNode; className: string }> = {
        Selesai: {
            icon: <CheckCircle2 className="w-3.5 h-3.5" />,
            className: 'text-emerald-600',
        },
        Draft: {
            icon: <Clock className="w-3.5 h-3.5" />,
            className: 'text-amber-600',
        },
    };

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length ? breadcrumbs : [
                    { title: 'Dashboard', href: '/dashboard' },
                    { title: 'Penugasan Review', href: '/reviewer/pt-penelitian/penugasan' },
                    { title: skemaSingkat || 'Detail', href: '#' },
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
                            <div className="flex items-center gap-2.5 mb-1">
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 border border-blue-100 shrink-0">
                                    {skemaSingkat}
                                </span>
                                <h1 className="text-2xl font-semibold text-gray-900">{skemaNama}</h1>
                            </div>
                            <p className="text-sm text-gray-500">
                                Daftar penelitian yang ditugaskan untuk direview pada skema ini.
                            </p>
                        </div>

                        <div className="flex items-center gap-6 text-sm border border-gray-200 bg-white px-5 py-3">
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Total</span>
                                <p className="text-xl font-bold text-gray-900 mt-0.5">{penelitian.length}</p>
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
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Lolos</span>
                                <p className="text-xl font-bold text-blue-600 mt-0.5">{totalLolos}</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Filter Bar ── */}
                    <div className="flex flex-wrap items-center gap-3 border border-gray-200 bg-white px-4 py-3">
                        {/* Search */}
                        <div className="flex flex-1 items-center gap-3 border border-gray-200 bg-gray-50 px-3 py-2 min-w-[200px]">
                            <Search className="h-4 w-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Cari judul, peneliti, atau reviewer..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                            />
                        </div>

                        {/* Filter tahun */}
                        <select
                            value={filterTahun}
                            onChange={e => setFilterTahun(e.target.value)}
                            className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                        >
                            <option value="">Semua Tahun</option>
                            {tahunOptions.map(t => (
                                <option key={t} value={String(t)}>{t}</option>
                            ))}
                        </select>

                        {/* Filter status */}
                        <select
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                            className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                        >
                            <option value="">Semua Status</option>
                            {statusOptions.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>

                        {/* Shortcut status pill */}
       

                        {hasFilter && (
                            <button
                                onClick={() => { setSearch(''); setFilterTahun(''); setFilterStatus(''); }}
                                className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors shrink-0"
                            >
                                Reset
                            </button>
                        )}

                        <span className="text-xs font-semibold text-gray-500 shrink-0">
                            {filtered.length} penelitian
                        </span>
                    </div>

                    {/* ── Tabel ── */}
                    <div className="overflow-hidden border border-gray-200 bg-white">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-800">Daftar Penugasan</h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Klik &quot;Nilai&quot; untuk mengisi penilaian substansi.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200">
                                        <th className="px-6 py-3 w-10">No</th>
                                        <th className="px-6 py-3">Judul <br /> Penelitian</th>
                                        <th className="px-6 py-3 text-center">Tahun</th>
                                        <th className="px-6 py-3">Peneliti</th>
                                        <th className="px-6 py-3">Reviewer</th>
                                        <th className="px-6 py-3 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                Status Review
                                                {filterStatus && (
                                                    <button
                                                        onClick={() => setFilterStatus('')}
                                                        className="text-blue-400 hover:text-blue-600"
                                                        title="Hapus filter status"
                                                    >
                                                        <XCircle className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-center">Hasil <br /> Administrasi</th>
                                        <th className="px-6 py-3" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filtered.length > 0 ? (
                                        filtered.map((item, index) => {
                                            const meta = statusMeta[item.status_review];
                                            return (
                                                <tr key={item.id_penelitian} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-xs text-gray-400">{index + 1}</td>

                                                    <td className="px-6 py-4 max-w-xs">
                                                        <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                                                    </td>

                                                    <td className="px-6 py-4 text-center text-sm text-gray-500">{item.tahun}</td>

                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-700">{item.peneliti_nama_lengkap}</p>
                                                        <p className="text-xs text-gray-400">NUPTK: {item.nuptk}</p>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-700">{item.reviewer_nama_lengkap}</p>
                                                        <p className="text-xs text-gray-400">NUPTK: {item.reviewer_nuptk}</p>
                                                    </td>

                                                    {/* Status Review */}
                                                    <td className="px-6 py-4 text-center">
                                                        {meta ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => setFilterStatus(
                                                                    filterStatus === item.status_review ? '' : item.status_review
                                                                )}
                                                                className={`inline-flex items-center gap-1 text-xs font-semibold ${meta.className} hover:opacity-70 transition-opacity`}
                                                                title={`Filter: ${item.status_review}`}
                                                            >
                                                                {meta.icon}
                                                                {item.status_review}
                                                            </button>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">
                                                                {item.status_review || '—'}
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Hasil Administrasi */}
                                                    <td className="px-6 py-4 text-center">
                                                        {item.hasil === 'Lolos' ? (
                                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                                                <CheckCircle2 className="w-3.5 h-3.5" /> Lolos
                                                            </span>
                                                        ) : item.hasil === 'Tidak Lolos' ? (
                                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                                                                <XCircle className="w-3.5 h-3.5" /> Tidak Lolos
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">{item.hasil || '—'}</span>
                                                        )}
                                                    </td>

                                                    {/* Aksi */}
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                href={`/reviewer/pt-penelitian/penugasan/${item.id_penugasan}/nilai-substansi`}
                                                                className="inline-flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                                                            >
                                                                <PenLine className="w-3.5 h-3.5" />
                                                                Nilai
                                                            </Link>
                                                            <Link
                                                                href={`/reviewer/pt-penelitian/penugasan/${item.id_penelitian}/detail`}
                                                                className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                                                            >
                                                                <Eye className="w-3.5 h-3.5" />
                                                                Detail
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-16 text-center text-sm text-gray-400">
                                                {hasFilter
                                                    ? 'Tidak ada penelitian yang cocok dengan filter.'
                                                    : 'Belum ada data penelitian.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AppHeaderLayout>
    );
}