import DashboardNav from '@/components/DashboardNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Filter, MoreHorizontal, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

type ApprovalSummary = {
    total: number;
    approved: number;
    pending: number;
    missing: number;
    all_approved: boolean;
    latest_approved_at?: string | null;
};

type PenelitianItem = {
    uuid: string;
    title: string;
    status?: string | null;
    tahun?: number | null;
    tahun_pelaksanaan?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    email_pengusul?: string | null;
    biaya_usulan_1?: number | null;
    biaya_usulan_2?: number | null;
    biaya_usulan_3?: number | null;
    biaya_usulan_4?: number | null;
    biaya_disetujui?: number | null;
    proposal_filename?: string | null;
    proposal_file_url?: string | null;
    lampiran_filename?: string | null;
    lampiran_file_url?: string | null;
    ketua_nama?: string | null;
    created_by?: number | null;
    approval_summary?: ApprovalSummary;
};

type PageProps = SharedData & {
    penelitian: { data: PenelitianItem[] };
    submissionLocked?: boolean;
    lockReason?: string | null;
    isAccountVerified?: boolean;
    eligibility?: {
        schemes: Array<{
            uuid: string;
            nama: string | null;
            nama_singkat: string | null;
            anggota_min: number | null;
            anggota_max: number | null;
            biaya_minimal: number | null;
            biaya_maksimal: number | null;
            multi_tahun: boolean;
            mulai: string | null;
            selesai: string | null;
        }>;
        profile: {
            has_profile: boolean;
            verified: boolean;
            profile_complete?: boolean;
            uuid_pt: string | null;
            name: string | null;
        };
    };
};

type FilterKey = 'all' | 'completed' | 'in_review' | 'rejected';

const filterOptions: Array<{ key: FilterKey; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Mengajukan' },
    { key: 'rejected', label: 'Ditolak' },
    { key: 'in_review', label: 'Didanai' },
];

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

export default function PenelitianIndex() {
    const { penelitian, auth, submissionLocked = false, lockReason, eligibility } = usePage<PageProps>().props;
    const currentUserId = auth?.user?.id;
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<FilterKey>('all');
    const [showEligibility, setShowEligibility] = useState(false);
    const profileComplete = eligibility?.profile?.profile_complete ?? false;

    const handleDelete = useCallback((uuid: string) => {
        if (!window.confirm('Hapus usulan penelitian ini? Tindakan ini tidak dapat dibatalkan.')) return;
        router.delete(`/pt-penelitian/${uuid}`);
    }, []);

    const handleSubmitProposal = useCallback((uuid: string) => {
        if (!window.confirm('Ajukan usulan penelitian ini? Pastikan semua anggota sudah menyetujui.')) return;
        router.patch(`/pt-penelitian/${uuid}/submit`, {}, { preserveScroll: true });
    }, []);

    const canSubmitProposal = useCallback(
        (item: PenelitianItem) => {
            if (!currentUserId || item.created_by !== currentUserId) return false;
            if (!item.approval_summary?.all_approved) return false;
            return isAwaitingAnggotaApproval(item.status);
        },
        [currentUserId],
    );

    const rows = useMemo(() => penelitian?.data ?? [], [penelitian]);

    const filteredRows = useMemo(() => {
        return rows.filter((item) => {
            const normalizedQuery = query.trim().toLowerCase();
            const matchesQuery =
                !normalizedQuery ||
                item.title.toLowerCase().includes(normalizedQuery) ||
                (item.status ?? '').toLowerCase().includes(normalizedQuery) ||
                (item.email_pengusul ?? '').toLowerCase().includes(normalizedQuery);
            const bucket = mapStatusToFilter(item.status);
            const matchesStatus = statusFilter === 'all' || statusFilter === bucket;
            return matchesQuery && matchesStatus;
        });
    }, [rows, query, statusFilter]);

    return (
        <AppHeaderLayout
            breadcrumbs={[
                { title: 'Dashboard Dosen', href: '/dashboard/dosen' },
                { title: 'Penelitian', href: '/pt-penelitian' },
            ]}
        >
            <Head title="Penelitian" />
            <DashboardNav />

            {showEligibility && (
                <EligibilityModal
                    onClose={() => setShowEligibility(false)}
                    schemes={eligibility?.schemes ?? []}
                    profile={eligibility?.profile}
                />
            )}

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10">

                    {/* Banner locked */}
                    {submissionLocked && (
                        <div className="mb-6 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                            {lockReason ?? 'Akun Anda belum disetujui oleh admin PT. Silakan menunggu persetujuan sebelum mengajukan usulan.'}
                        </div>
                    )}

                    {/* Header */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Usulan Penelitian Saya</h1>
                            <p className="text-sm text-gray-500">Tinjau dan kelola seluruh usulan penelitian yang Anda ajukan.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setShowEligibility(true)}
                                className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold  transition ${
                                    profileComplete
                                        ? 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                                        : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                                }`}
                            >
                                <AlertCircle className="h-4 w-4" />
                                Cek Eligibilitas
                            </button>
                            {submissionLocked ? (
                                <button
                                    type="button"
                                    disabled
                                    className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 "
                                >
                                    + Tambah Usulan
                                </button>
                            ) : (
                                <Link
                                    href="/pt-penelitian/create"
                                    className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 text-sm font-semibold text-white  transition hover:bg-blue-500"
                                >
                                    + Tambah Usulan
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Tabel */}
                    <div className="overflow-hidden border border-gray-200 bg-white ">

                        {/* Search bar */}
                        <div className="border-b border-gray-200 px-6 py-5">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex flex-1 items-center gap-3 border border-gray-200 bg-gray-50 px-3 py-2">
                                    <Search className="h-4 w-4 text-gray-400" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Cari judul, status, atau email pengusul..."
                                        className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                    />
                                </div>
                                <button className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100">
                                    <Filter className="h-4 w-4 text-gray-500" />
                                    Filter
                                </button>
                            </div>
                        </div>

                        {filteredRows.length ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-fixed text-left text-sm text-gray-900">
                                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                                        <tr>
                                            <th className="w-72 px-6 py-4">Usulan</th>
                                            <th className="w-40 px-6 py-4">Status</th>
                                            <th className="w-60 px-6 py-4">Pengusul</th>
                                            <th className="w-56 px-6 py-4">Biaya Usulan</th>
                                            <th className="w-20 px-6 py-4">Tahun</th>
                                            <th className="w-64 px-6 py-4">Berkas</th>
                                            <th className="w-32 px-6 py-4">Preview</th>
                                            <th className="w-32 px-6 py-4">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredRows.map((item) => {
                                            const budget = getBudgetSummary(item);
                                            const statusMeta = getStatusMeta(item.status, budget.progress);
                                            const isOwner =
                                                currentUserId !== undefined &&
                                                currentUserId !== null &&
                                                item.created_by === currentUserId;
                                            return (
                                                <tr key={item.uuid} className="bg-white transition hover:bg-gray-50">

                                                    {/* Judul */}
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="flex flex-col gap-1">
                                                            <span
                                                                className="font-semibold text-gray-900 break-words max-h-12 overflow-hidden"
                                                                title={item.title}
                                                                style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                                                            >
                                                                {item.title}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                Dibuat: {formatDate(item.created_at)}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-4 align-top">
                                                    <td className="px-6 py-4 align-top">
    {/* Badge status */}
    <span className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
        statusMeta.badgeClass,
    )}>
        {statusMeta.label}
    </span>

    {/* Timeline */}
    <div className="mt-2 space-y-1.5">
        {buildStatusTimeline(item).map((entry) => (
            <div key={entry.key} className="flex items-start gap-2">
                {/* Dot */}
                <span className={cn('mt-1 h-1.5 w-1.5 shrink-0', entry.dotClass)} />
                {/* Label + value baris terpisah agar tidak sempit */}
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-gray-700 leading-tight">
                        {entry.label}
                    </p>
                    <p className="text-[11px] text-gray-400 leading-tight">
                        {entry.value ?? 'Belum'}
                    </p>
                </div>
            </div>
        ))}
    </div>
</td>
                                                    </td>

                                                    {/* Pengusul */}
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8 border border-gray-200">
                                                                <AvatarImage src={undefined} alt={item.ketua_nama ?? 'Ketua'} />
                                                                <AvatarFallback className="bg-gray-100 text-xs font-semibold text-gray-700">
                                                                    {getInitials(item.ketua_nama ?? item.email_pengusul ?? 'User')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {item.ketua_nama ?? item.email_pengusul ?? 'Ketua'}
                                                                </p>
                                                                <p className="text-xs text-gray-500">{item.email_pengusul ?? '—'}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Biaya */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col text-sm text-gray-700">
                                                            {[
                                                                { label: 'Tahun 1', value: item.biaya_usulan_1 },
                                                                { label: 'Tahun 2', value: item.biaya_usulan_2 },
                                                                { label: 'Tahun 3', value: item.biaya_usulan_3 },
                                                                { label: 'Tahun 4', value: item.biaya_usulan_4 },
                                                            ]
                                                                .filter((e) => e.value && e.value > 0)
                                                                .map((e, i) => (
                                                                    <div key={i}>{e.label}: {currencyFormatter.format(e.value ?? 0)}</div>
                                                                ))}
                                                            {![item.biaya_usulan_1, item.biaya_usulan_2, item.biaya_usulan_3, item.biaya_usulan_4].some(v => v && v > 0) && <div>—</div>}
                                                        </div>
                                                    </td>

                                                    {/* Tahun */}
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {item.tahun_pelaksanaan ?? item.tahun ?? '—'}
                                                    </td>

                                                    {/* Berkas */}
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="space-y-1 text-sm">
                                                            {item.proposal_file_url ? (
                                                                <a href={item.proposal_file_url} className="inline-flex items-center gap-1 font-semibold text-indigo-600 transition hover:text-indigo-500">
                                                                    Proposal
                                                                    {item.proposal_filename && <span className="text-xs font-normal text-gray-500"> </span>}
                                                                </a>
                                                            ) : (
                                                                <span className="text-xs text-gray-400">Proposal belum diunggah</span>
                                                            )}
                                                            <br />
                                                            {item.lampiran_file_url ? (
                                                                <a href={item.lampiran_file_url} className="inline-flex items-center gap-1 text-indigo-500 transition hover:text-indigo-400">
                                                                    Lampiran
                                                                    {item.lampiran_filename && <span className="text-xs font-normal text-gray-500"></span>}
                                                                </a>
                                                            ) : (
                                                                <span className="text-xs text-gray-400">Lampiran tidak tersedia</span>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Preview */}
                                                    <td className="px-6 py-4">
                                                        <Link href={`/pt-penelitian/${item.uuid}/preview`} className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500">
                                                            Detail
                                                        </Link>
                                                    </td>

                                                    {/* Aksi */}
                                                    <td className="px-6 py-4 text-right">
                                                        {isOwner && canSubmitProposal(item) && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSubmitProposal(item.uuid)}
                                                                className="mb-2 inline-flex w-full items-center justify-center bg-emerald-600 px-3 py-2 text-xs font-semibold text-white  transition hover:bg-emerald-500 sm:w-auto"
                                                            >
                                                                Ajukan
                                                            </button>
                                                        )}
                                                        {isOwner && !hasBeenSubmitted(item.status) ? (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                                                        aria-label="Aksi cepat"
                                                                    >
                                                                        <MoreHorizontal className="h-5 w-5" />
                                                                    </button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="min-w-[180px] border border-gray-200 bg-white p-1 text-sm text-gray-700  focus:outline-none">
                                                                    <DropdownMenuItem
                                                                        className="cursor-pointer px-3 py-2 text-gray-700 outline-none hover:bg-gray-100"
                                                                        onSelect={() => router.visit(`/pt-penelitian/${item.uuid}/edit`)}
                                                                    >
                                                                        Ubah
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        className="cursor-pointer px-3 py-2 text-rose-500 outline-none hover:bg-rose-100"
                                                                        onSelect={() => handleDelete(item.uuid)}
                                                                    >
                                                                        Hapus
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">—</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="px-6 py-16 text-center text-sm text-gray-500">
                                Tidak ada usulan yang sesuai dengan filter.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isAwaitingAnggotaApproval(status?: string | null): boolean {
    const normalized = (status ?? '').toLowerCase();
    return normalized.includes('anggota') || normalized.includes('menunggu');
}

function hasBeenSubmitted(status?: string | null): boolean {
    return (status ?? '').toLowerCase().includes('mengaju');
}

type StatusTimelineEntry = {
    key: string;
    label: string;
    value?: string | null;
    dotClass: string;
};

function buildStatusTimeline(item: PenelitianItem): StatusTimelineEntry[] {
    const approvalSummary = item.approval_summary;
    const submitted = hasBeenSubmitted(item.status) || (item.status ?? '').toLowerCase().includes('disetujui');
    const allApproved = approvalSummary?.all_approved ?? false;
    const approvedAt = allApproved && approvalSummary?.latest_approved_at ? formatDate(approvalSummary.latest_approved_at) : null;
    const approvedValue = approvedAt
        ? approvedAt
        : approvalSummary
        ? `${approvalSummary.approved ?? 0}/${approvalSummary.total ?? 0} setuju`
        : null;

    return [
        { key: 'created', label: 'Dibuat', value: formatDate(item.created_at), dotClass: 'bg-gray-400' },
        { key: 'submitted', label: 'Mengajukan', value: submitted ? formatDate(item.updated_at ?? item.created_at) : null, dotClass: submitted ? 'bg-blue-500' : 'bg-gray-300' },
        { key: 'approved', label: 'Disetujui Anggota', value: approvedValue, dotClass: allApproved ? 'bg-emerald-500' : (approvalSummary?.approved ?? 0) > 0 ? 'bg-amber-500' : 'bg-gray-300' },
    ];
}

function mapStatusToFilter(status?: string | null): FilterKey {
    const normalized = (status ?? '').toLowerCase();
    if (['selesai', 'completed', 'disetujui', 'approved', 'mengajukan'].some((k) => normalized.includes(k))) return 'completed';
    if (['ditolak', 'rejected', 'tolak'].some((k) => normalized.includes(k))) return 'rejected';
    return 'in_review';
}

function getStatusMeta(status?: string | null, progressOverride?: number) {
    const bucket = mapStatusToFilter(status);
    const normalizedStatus = (status ?? '').toLowerCase();

    if (normalizedStatus.includes('menunggu') && normalizedStatus.includes('anggota')) {
        return { label: status ?? 'Menunggu Persetujuan Anggota', badgeClass: 'bg-amber-500/15 text-amber-400', progress: 20, progressLabel: 'Menunggu Persetujuan', progressBarClass: 'bg-amber-500' };
    }
    if (bucket === 'rejected') {
        return { label: status ?? 'Ditolak', badgeClass: 'bg-rose-500/15 text-rose-300', progress: 0, progressLabel: 'Ditolak', progressBarClass: 'bg-rose-500' };
    }

    const baseProgress = typeof progressOverride === 'number' ? progressOverride : bucket === 'completed' ? 100 : 35;
    return {
        label: status ?? (bucket === 'completed' ? 'Completed' : 'In Progress'),
        badgeClass: bucket === 'completed' ? 'bg-emerald-500/15 text-emerald-300' : bucket === 'in_review' ? 'bg-amber-500/15 text-amber-300' : 'bg-blue-500/15 text-blue-300',
        progress: baseProgress,
        progressLabel: typeof progressOverride === 'number' ? 'Terealisasi' : bucket === 'completed' ? 'Selesai' : 'Dalam review',
        progressBarClass: bucket === 'completed' ? 'bg-emerald-400' : bucket === 'in_review' ? 'bg-amber-400' : 'bg-blue-500',
    };
}

function getBudgetSummary(item: PenelitianItem) {
    const spent = item.biaya_disetujui ?? 0;
    const proposals = [item.biaya_usulan_1, item.biaya_usulan_2, item.biaya_usulan_3, item.biaya_usulan_4]
        .filter((v): v is number => typeof v === 'number')
        .reduce((t, v) => t + v, 0);
    const progress = proposals > 0 ? Math.max(0, Math.min(100, Math.round((spent / proposals) * 100))) : spent > 0 ? 100 : undefined;
    return {
        displayValue: spent > 0 ? currencyFormatter.format(spent) : 'Rp 0',
        targetValue: proposals > 0 ? currencyFormatter.format(proposals) : undefined,
        progress,
    };
}

function formatDate(value?: string | null) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return dateFormatter.format(date);
}

function getInitials(name: string) {
    return name.split(' ').map((p) => p.charAt(0).toUpperCase()).slice(0, 2).join('');
}

type EligibilityModalProps = {
    onClose: () => void;
    schemes: NonNullable<PageProps['eligibility']>['schemes'];
    profile?: PageProps['eligibility'] extends { profile: infer P } ? P : undefined;
};

function EligibilityModal({ onClose, schemes, profile }: EligibilityModalProps) {
    const requirements = [
        { label: 'Profil Dosen tersedia', fulfilled: profile?.has_profile ?? false },
        { label: 'Akun terverifikasi', fulfilled: profile?.verified ?? false },
        { label: 'Data profil lengkap', fulfilled: profile?.profile_complete ?? false },
    ];

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl">

                {/* Header modal */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Cek Eligibilitas Skema</h3>
                        <p className="text-sm text-gray-600">Periksa kecocokan profil pengusul dengan skema yang terbuka.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-100 px-3 py-1 text-gray-500 hover:text-gray-700"
                    >
                        Tutup
                    </button>
                </div>

                {/* Requirements */}
                <div className="grid gap-4 md:grid-cols-3 px-6 py-4 border-b">
                    {requirements.map((req) => (
                        <div
                            key={req.label}
                            className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold ${
                                req.fulfilled ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-700'
                            }`}
                        >
                            {req.fulfilled ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                            <span>{req.label}</span>
                        </div>
                    ))}
                </div>

                {/* Skema list */}
                <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                    {schemes.length === 0 ? (
                        <p className="text-sm text-gray-600">Tidak ada skema terbuka saat ini.</p>
                    ) : (
                        <div className="space-y-3">
                            {schemes.map((skema) => (
                                <div key={skema.uuid} className="border border-gray-200 p-4 ">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <h4 className="text-base font-semibold text-gray-900">{skema.nama ?? 'Skema tanpa nama'}</h4>
                                            <p className="text-xs text-gray-500">{skema.nama_singkat ?? '-'}</p>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {skema.mulai && skema.selesai ? `Periode: ${skema.mulai} s.d. ${skema.selesai}` : 'Periode tidak dicantumkan'}
                                        </div>
                                    </div>
                                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                                        <div className="bg-gray-50 p-3 text-sm text-gray-700">
                                            <p className="font-semibold text-gray-900">Persyaratan Minimum</p>
                                            <ul className="mt-2 space-y-1 text-xs text-gray-600">
                                                <li>Anggota minimal: <span className="font-semibold">{skema.anggota_min ?? '-'}</span></li>
                                                <li>Anggota maksimal: <span className="font-semibold">{skema.anggota_max ?? '-'}</span></li>
                                                <li>Multi tahun: <span className="font-semibold">{skema.multi_tahun ? 'Ya' : 'Tidak'}</span></li>
                                                <li>
                                                    Batas biaya:{' '}
                                                    <span className="font-semibold">
                                                        {skema.biaya_minimal !== null ? `Rp ${skema.biaya_minimal.toLocaleString('id-ID')}` : '-'}
                                                        {' - '}
                                                        {skema.biaya_maksimal !== null ? `Rp ${skema.biaya_maksimal.toLocaleString('id-ID')}` : '-'}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bg-white p-3 text-sm text-gray-700 border border-gray-200">
                                            <p className="font-semibold text-gray-900">Kecocokan Profil Pengusul</p>
                                            <ul className="mt-2 space-y-2 text-xs text-gray-600">
                                                {requirements.map((req) => (
                                                    <li
                                                        key={req.label}
                                                        className={`inline-flex items-center gap-2 px-3 py-1 ${
                                                            req.fulfilled ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-700'
                                                        }`}
                                                    >
                                                        {req.fulfilled ? <CheckCircle className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                                                        <span>{req.label}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="mt-3 text-xs text-gray-500">Akan Eligible jika semua persyaratan di atas terpenuhi.</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer modal */}
                <div className="flex justify-end gap-3 border-t px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Tutup
                    </button>
                    <Link
                        href="/pt-penelitian/create"
                        className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 text-sm font-semibold text-white  transition hover:bg-blue-500"
                    >
                        Buat Usulan
                    </Link>
                </div>
            </div>
        </div>
    );
}