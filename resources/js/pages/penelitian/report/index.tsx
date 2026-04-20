import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    Clock3,
    Download,
    Filter,
    Search,
    XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type Breadcrumb = {
    title: string;
    href: string;
};

type ReviewerItem = {
    id_penugasan: number;
    id_reviewer: number;
    reviewer_name: string | null;
    reviewer_email: string | null;
    tanggal_penugasan: string | null;
    batas_waktu: string | null;
    status_penugasan: string | null;
    status_review: string | null;
    hasil?: string | null;
    nilai_akhir?: number | null;
    status_penilaian?: string | null;
    komentar?: string | null;
};

type PenelitianItem = {
    uuid: string;
    title: string;
    tahun: number;
    tahun_pelaksanaan: number;
    status: string;
    skema: string | null;
    skema_singkat: string | null;
    status_administrasi: string;
    status_substansi: string;
    jumlah_reviewer_administrasi: number;
    jumlah_reviewer_substansi: number;
    administrasi: ReviewerItem[];
    substansi: ReviewerItem[];
    user: {
        id: number;
        name: string;
        email: string;
        nidn?: string | null;
    } | null;
};

type Filters = {
    search: string;
    status: string;
    status_administrasi: string;
    status_substansi: string;
};

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    penelitian?: PenelitianItem[];
    filters?: Filters;
    statusOptions?: string[];
    statusAdministrasiOptions?: string[];
    statusSubstansiOptions?: string[];
};

function BadgeStatus({ value }: { value: string }) {
    const normalized = (value || '').toLowerCase();

    if (
        value === 'Lolos' ||
        value === 'Rekomendasi' ||
        normalized === 'disetujui' ||
        normalized === 'rekomendasi'
    ) {
        return (
            <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 whitespace-nowrap">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {value}
            </span>
        );
    }

    if (
        value === 'Tidak Lolos' ||
        value === 'Tidak Rekomendasi' ||
        normalized === 'ditolak' ||
        normalized === 'tidak_rekomendasi'
    ) {
        return (
            <span className="inline-flex items-center gap-1 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 whitespace-nowrap">
                <XCircle className="h-3.5 w-3.5" />
                {value === 'tidak_rekomendasi' ? 'Tidak Rekomendasi' : value}
            </span>
        );
    }

    if (
        value === 'Lolos & Tidak Lolos' ||
        value === 'Rekomendasi & Tidak Rekomendasi'
    ) {
        return (
            <span className="inline-flex items-center gap-1 bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 whitespace-nowrap">
                <AlertTriangle className="h-3.5 w-3.5" />
                {value}
            </span>
        );
    }

    if (
        value === 'Proses Review' ||
        value === 'Belum Direview' ||
        value === 'Pending' ||
        value === 'Draft'
    ) {
        return (
            <span className="inline-flex items-center gap-1 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 whitespace-nowrap">
                <Clock3 className="h-3.5 w-3.5" />
                {value}
            </span>
        );
    }

    if (value === 'Selesai') {
        return (
            <span className="inline-flex items-center gap-1 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 whitespace-nowrap">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {value}
            </span>
        );
    }

    return (
        <span className="inline-flex bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 whitespace-nowrap">
            {value || '-'}
        </span>
    );
}

function ProposalBadge({ value }: { value: string }) {
    const normalized = value?.toLowerCase?.() || '';

    if (normalized === 'disetujui') {
        return (
            <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 whitespace-nowrap">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Disetujui
            </span>
        );
    }

    if (normalized === 'ditolak') {
        return (
            <span className="inline-flex items-center gap-1 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 whitespace-nowrap">
                <XCircle className="h-3.5 w-3.5" />
                Ditolak
            </span>
        );
    }

    return (
        <span className="inline-flex bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 whitespace-nowrap">
            {value || '-'}
        </span>
    );
}

function DetailReviewerSection({
    title,
    items,
    type,
}: {
    title: string;
    items: ReviewerItem[];
    type: 'administrasi' | 'substansi';
}) {
    return (
        <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {title}
            </p>

            {items.length === 0 ? (
                <div className="border border-dashed border-gray-200 bg-white px-4 py-3 text-sm text-gray-400">
                    Belum ada reviewer {type}
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item, idx) => (
                        <div
                            key={item.id_penugasan}
                            className="border border-gray-200 bg-white px-4 py-4"
                        >
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                                <div className="min-w-0 md:col-span-3">
                                    <p className="text-xs text-gray-400">Reviewer {idx + 1}</p>
                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        {item.reviewer_name || '-'}
                                    </p>
                                    <p className="truncate text-xs text-gray-500">
                                        {item.reviewer_email || '-'}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-400">Tanggal</p>
                                    <p className="text-sm text-gray-700">
                                        {item.tanggal_penugasan || '-'}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-400">Batas Waktu</p>
                                    <p className="text-sm text-gray-700">
                                        {item.batas_waktu || '-'}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-400">Status Penugasan</p>
                                    <div className="mt-1">
                                        <BadgeStatus value={item.status_penugasan || 'Pending'} />
                                    </div>
                                </div>

                                <div className="md:col-span-3">
                                    <p className="text-xs text-gray-400">Status Review</p>
                                    <div className="mt-1">
                                        <BadgeStatus value={item.status_review || 'Belum Direview'} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
                                {type === 'administrasi' ? (
                                    <div className="md:col-span-4">
                                        <p className="text-xs text-gray-400">Hasil Administrasi</p>
                                        <div className="mt-1">
                                            <BadgeStatus value={item.hasil || 'Belum Direview'} />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="md:col-span-3">
                                            <p className="text-xs text-gray-400">Nilai Akhir</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {item.nilai_akhir ?? '-'}
                                            </p>
                                        </div>

                                        <div className="md:col-span-4">
                                            <p className="text-xs text-gray-400">Status Penilaian</p>
                                            <div className="mt-1">
                                                <BadgeStatus
                                                    value={
                                                        item.status_penilaian === 'rekomendasi'
                                                            ? 'Rekomendasi'
                                                            : item.status_penilaian === 'tidak_rekomendasi'
                                                              ? 'Tidak Rekomendasi'
                                                              : item.status_penilaian || 'Belum Direview'
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div
                                    className={
                                        type === 'administrasi'
                                            ? 'md:col-span-8'
                                            : 'md:col-span-5'
                                    }
                                >
                                    <p className="text-xs text-gray-400">Komentar Reviewer</p>
                                    <div className="mt-1 min-h-[44px] bg-gray-50 px-3 py-2 text-sm text-gray-700 whitespace-pre-wrap break-words">
                                        {item.komentar && item.komentar.trim() !== ''
                                            ? item.komentar
                                            : '-'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function DetailReview({
    administrasi,
    substansi,
}: {
    administrasi: ReviewerItem[];
    substansi: ReviewerItem[];
}) {
    return (
        <tr>
            <td colSpan={9} className="border-b border-gray-100 bg-gray-50">
                <div className="space-y-5 px-5 py-4">
                    <DetailReviewerSection
                        title="Reviewer Administrasi"
                        items={administrasi}
                        type="administrasi"
                    />
                    <DetailReviewerSection
                        title="Reviewer Substansi"
                        items={substansi}
                        type="substansi"
                    />
                </div>
            </td>
        </tr>
    );
}

export default function ReportPenelitianIndex() {
    const {
        breadcrumbs = [],
        penelitian = [],
        filters = {
            search: '',
            status: '',
            status_administrasi: '',
            status_substansi: '',
        },
        statusOptions = [],
        statusAdministrasiOptions = [],
        statusSubstansiOptions = [],
    } = usePage<PageProps>().props;

    const [expanded, setExpanded] = useState<string | null>(null);
    const [form, setForm] = useState<Filters>({
        search: filters.search || '',
        status: filters.status || '',
        status_administrasi: filters.status_administrasi || '',
        status_substansi: filters.status_substansi || '',
    });

    const total = penelitian.length;
    const totalLolosAdmin = penelitian.filter((p) => p.status_administrasi === 'Lolos').length;
    const totalRekomendasi = penelitian.filter((p) => p.status_substansi === 'Rekomendasi').length;
    const totalMix = penelitian.filter(
        (p) => p.status_substansi === 'Rekomendasi & Tidak Rekomendasi'
    ).length;

    const hasFilter = useMemo(() => {
        return !!(
            form.search ||
            form.status ||
            form.status_administrasi ||
            form.status_substansi
        );
    }, [form]);

    const exportUrl = useMemo(() => {
        const params = new URLSearchParams();

        if (form.search) params.set('search', form.search);
        if (form.status) params.set('status', form.status);
        if (form.status_administrasi) params.set('status_administrasi', form.status_administrasi);
        if (form.status_substansi) params.set('status_substansi', form.status_substansi);

        const query = params.toString();
        return `/admin/pt-penelitian/report/export${query ? `?${query}` : ''}`;
    }, [form]);

    const applyFilters = () => {
        router.get('/admin/pt-penelitian/report', form, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        const cleared = {
            search: '',
            status: '',
            status_administrasi: '',
            status_substansi: '',
        };

        setForm(cleared);

        router.get('/admin/pt-penelitian/report', cleared, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length
                    ? breadcrumbs
                    : [
                          { title: 'Dashboard', href: '/dashboard' },
                          { title: 'Laporan Penelitian', href: '/admin/pt-penelitian/report' },
                      ]
            }
        >
            <Head title="Laporan Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Laporan Penelitian
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Ringkasan status proposal, review administrasi, dan review substansi.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 border border-gray-200 bg-white px-5 py-3">
                            <div>
                                <span className="text-xs uppercase tracking-wide text-gray-400">
                                    Total
                                </span>
                                <p className="mt-0.5 text-xl font-bold text-gray-900">{total}</p>
                            </div>

                            <div className="hidden h-8 w-px bg-gray-200 md:block" />

                            <div>
                                <span className="text-xs uppercase tracking-wide text-gray-400">
                                    Lolos Admin
                                </span>
                                <p className="mt-0.5 text-xl font-bold text-emerald-600">
                                    {totalLolosAdmin}
                                </p>
                            </div>

                            <div className="hidden h-8 w-px bg-gray-200 md:block" />

                            <div>
                                <span className="text-xs uppercase tracking-wide text-gray-400">
                                    Rekomendasi
                                </span>
                                <p className="mt-0.5 text-xl font-bold text-blue-600">
                                    {totalRekomendasi}
                                </p>
                            </div>

                            <div className="hidden h-8 w-px bg-gray-200 md:block" />

                            <div>
                                <span className="text-xs uppercase tracking-wide text-gray-400">
                                    Status Campuran
                                </span>
                                <p className="mt-0.5 text-xl font-bold text-orange-600">
                                    {totalMix}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 bg-white px-4 py-4">
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                            <div className="lg:col-span-4">
                                <label className="mb-1 block text-xs font-medium text-gray-500">
                                    Cari
                                </label>
                                <div className="flex items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-2">
                                    <Search className="h-4 w-4 shrink-0 text-gray-400" />
                                    <input
                                        type="text"
                                        value={form.search}
                                        onChange={(e) =>
                                            setForm((prev) => ({ ...prev, search: e.target.value }))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') applyFilters();
                                        }}
                                        placeholder="Cari judul, peneliti, atau skema..."
                                        className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                <label className="mb-1 block text-xs font-medium text-gray-500">
                                    Status Proposal
                                </label>
                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm((prev) => ({ ...prev, status: e.target.value }))
                                    }
                                    className="w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                                >
                                    <option value="">Semua</option>
                                    {statusOptions.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="lg:col-span-2">
                                <label className="mb-1 block text-xs font-medium text-gray-500">
                                    Status Administrasi
                                </label>
                                <select
                                    value={form.status_administrasi}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            status_administrasi: e.target.value,
                                        }))
                                    }
                                    className="w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                                >
                                    <option value="">Semua</option>
                                    {statusAdministrasiOptions.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="lg:col-span-2">
                                <label className="mb-1 block text-xs font-medium text-gray-500">
                                    Status Substansi
                                </label>
                                <select
                                    value={form.status_substansi}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            status_substansi: e.target.value,
                                        }))
                                    }
                                    className="w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                                >
                                    <option value="">Semua</option>
                                    {statusSubstansiOptions.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-end gap-2 lg:col-span-2">
                                <button
                                    type="button"
                                    onClick={applyFilters}
                                    className="inline-flex items-center gap-2 border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    <Filter className="h-4 w-4" />
                                    Filter
                                </button>

                                <a
                                    href={exportUrl}
                                    className="inline-flex items-center gap-2 border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                                >
                                    <Download className="h-4 w-4" />
                                    Export
                                </a>
                            </div>
                        </div>

                        {hasFilter && (
                            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                                <span className="text-xs text-gray-500">Filter aktif</span>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="text-xs font-medium text-gray-500 hover:text-gray-700"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="overflow-hidden border border-gray-200 bg-white">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h2 className="text-sm font-semibold text-gray-800">
                                Daftar Status Penelitian
                            </h2>
                            <p className="mt-1 text-xs text-gray-500">
                                Klik baris untuk melihat detail reviewer administrasi dan substansi.
                            </p>
                        </div>

                        {penelitian.length === 0 ? (
                            <div className="py-16 text-center text-sm text-gray-400">
                                Tidak ada data penelitian.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-[1320px] table-fixed text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                                            <th className="w-[330px] px-5 py-3">Judul</th>
                                            <th className="w-[220px] px-5 py-3">Ketua</th>
                                            <th className="w-[180px] px-5 py-3">Skema</th>
                                            <th className="w-[90px] px-5 py-3 text-center">Tahun</th>
                                            <th className="w-[140px] px-5 py-3 text-center">Proposal</th>
                                          
                                            <th className="w-[180px] px-5 py-3 text-center">Status Adm</th>
                                     
                                            <th className="w-[220px] px-5 py-3 text-center">
                                                Status Substansi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {penelitian.map((item) => {
                                            const isOpen = expanded === item.uuid;

                                            return (
                                                <>
                                                    <tr
                                                        key={item.uuid}
                                                        className="cursor-pointer border-b border-gray-100 align-top hover:bg-gray-50 transition-colors"
                                                        onClick={() =>
                                                            setExpanded(isOpen ? null : item.uuid)
                                                        }
                                                    >
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-start gap-2">
                                                                <ChevronRight
                                                                    className={`mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                                                                        isOpen ? 'rotate-90' : ''
                                                                    }`}
                                                                />
                                                                <div className="min-w-0">
                                                                    <p className="line-clamp-2 font-medium text-gray-800">
                                                                        {item.title}
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-gray-400">
                                                                        Pelaksanaan: {item.tahun_pelaksanaan}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <div className="min-w-0">
                                                                <p className="truncate font-medium text-gray-700">
                                                                    {item.user?.name ?? '-'}
                                                                </p>
                                                                <p className="truncate text-xs text-gray-400">
                                                                    {item.user?.email ?? '-'}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <div className="min-w-0">
                                                                <p className="line-clamp-2 text-gray-700">
                                                                    {item.skema_singkat || item.skema || '-'}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        <td className="px-5 py-4 text-center text-gray-600">
                                                            {item.tahun}
                                                        </td>

                                                        <td className="px-5 py-4 text-center">
                                                            <ProposalBadge value={item.status} />
                                                        </td>
 

                                                        <td className="px-5 py-4 text-center">
                                                            <BadgeStatus value={item.status_administrasi} />
                                                        </td>

                                               
                                                        <td className="px-5 py-4 text-center">
                                                            <BadgeStatus value={item.status_substansi} />
                                                        </td>
                                                    </tr>

                                                    {isOpen && (
                                                        <DetailReview
                                                            administrasi={item.administrasi}
                                                            substansi={item.substansi}
                                                        />
                                                    )}
                                                </>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}