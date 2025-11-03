
import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import DashboardNav from '@/components/DashboardNav';
import { Download, FileText, FolderOpen, Users } from 'lucide-react';
import { type BreadcrumbItem, type SharedData } from '@/types';

type Penelitian = {
    uuid: string;
    title: string;
    id_skema: string | null;
    id_fokus: string | null;
    id_tkt: string | null;
    id_sdg: string | null;
    tahun: number | null;
    tahun_pelaksanaan: number | null;
    biaya_usulan_1: number | null;
    biaya_usulan_2: number | null;
    biaya_usulan_3: number | null;
    biaya_usulan_4: number | null;
    biaya_disetujui: number | null;
    target_luaran: string | null;
    status: string | null;
    email_pengusul?: string | null;
    proposal_filename?: string | null;
    proposal_file_url?: string | null;
    lampiran_filename?: string | null;
    lampiran_file_url?: string | null;
    created_at?: string | null;
};

type ReferenceRecord = {
    uuid: string;
    nama?: string | null;
    nama_singkat?: string | null;
    jenis_skema?: string | null;
    sumber_dana?: string | null;
    anggota_min?: number | null;
    anggota_max?: number | null;
    fokus?: string | null;
    sdg?: string | null;
    level?: number | null;
    tkt?: string | null;
};

type BudgetItem = {
    label: string;
    value: number | null;
};

type RabDetailItem = {
    id_komponen: number | null;
    komponen: string | null;
    nama_item: string | null;
    jumlah_item: number | null;
    harga_satuan: number | null;
    total_biaya: number | null;
};

type BudgetSummary = {
    items: BudgetItem[];
    total_usulan: number;
    biaya_disetujui: number | null;
    detail?: Record<string, RabDetailItem[]> | null;
};

type DokumenInfo = {
    filename: string | null;
    url: string | null;
};

type OwnerInfo = {
    id: number;
    name: string;
    email: string;
} | null;

type AnggotaItem = {
    id: number;
    peran: string | null;
    tugas: string | null;
    dosen: {
        uuid: string | null;
        nama: string | null;
        nidn: string | null;
        email: string | null;
    };
    approval?: {
        status: string | null;
        approved_at: string | null;
    } | null;
};

type PenelitianPreviewProps = {
    penelitian: Penelitian;
    references: {
        skema: ReferenceRecord | null;
        fokus: ReferenceRecord | null;
        sdg: ReferenceRecord | null;
        tkt: ReferenceRecord | null;
    };
    budget: BudgetSummary;
    dokumen: {
        proposal: DokumenInfo;
        lampiran: DokumenInfo;
    };
    owner: OwnerInfo;
    anggota: AnggotaItem[];
    breadcrumbs?: BreadcrumbItem[];
    backLink?: {
        href: string;
        label?: string;
    };
    canManageStatus?: boolean;
    statusUrls?: {
        approve: string | null;
        reject: string | null;
    } | null;
    currentStatus?: string | null;
};

const TABS = [
    { key: 'data-penelitian', label: 'Data Penelitian' },
    { key: 'bidang-luaran', label: 'Bidang dan Luaran' },
    { key: 'anggota', label: 'Anggota' },
    { key: 'dokumen', label: 'Dokumen' },
    { key: 'dokumen-luaran', label: 'Dokumen Luaran' },
] as const;

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

export default function PenelitianPreview({
    penelitian,
    references,
    budget,
    dokumen,
    owner,
    anggota,
    breadcrumbs,
    backLink,
    canManageStatus = false,
    statusUrls = null,
    currentStatus,
}: PenelitianPreviewProps) {
    const { auth } = usePage<SharedData>().props;
    const currentDosenUuid = auth?.user?.dosen?.uuid ?? null;
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['key']>('data-penelitian');
    const [isApproving, setIsApproving] = useState(false);

    const formattedCreatedAt = useMemo(() => {
        if (!penelitian.created_at) {
            return null;
        }

        const date = new Date(penelitian.created_at);
        return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
    }, [penelitian.created_at]);

    const hasBudgetItems = budget.items.length > 0;
    const budgetDetailEntries = useMemo(() => {
        if (!budget?.detail) {
            return [] as Array<{ year: string; label: string; items: RabDetailItem[] }>;
        }

        return Object.entries(budget.detail)
            .map(([year, items]) => ({
                year,
                label: `Tahun ${year}`,
                items: items ?? [],
            }))
            .sort((a, b) => Number(a.year) - Number(b.year));
    }, [budget.detail]);
    const hasBudgetDetail = budgetDetailEntries.length > 0;

    const normalizedStatus = (currentStatus ?? penelitian.status ?? '').toLowerCase();
    const isApproved = normalizedStatus.includes('setuj');
    const isRejected = normalizedStatus.includes('tolak');

    const resolvedBreadcrumbs =
        breadcrumbs ??
        [
            { title: 'Dashboard Dosen', href: '/dashboard/dosen' },
            { title: 'Penelitian', href: '/pt-penelitian' },
            { title: 'Preview', href: '#' },
        ];

    const resolvedBackLink =
        backLink ?? {
            href: '/pt-penelitian',
            label: 'Kembali',
        };

    const pendingApprovalForUser = useMemo(() => {
        if (!currentDosenUuid) {
            return null;
        }

        return (
            anggota.find((item) => {
                const status = (item.approval?.status ?? 'pending').toLowerCase();
                const peran = (item.peran ?? '').toLowerCase();

                return (
                    item.dosen?.uuid === currentDosenUuid &&
                    status === 'pending' &&
                    !peran.includes('ketua')
                );
            }) ?? null
        );
    }, [anggota, currentDosenUuid]);

    const handleApproveMembership = useCallback(() => {
        if (!pendingApprovalForUser) {
            return;
        }

        setIsApproving(true);
        router.post(
            `/pt-penelitian/${penelitian.uuid}/anggota-approve`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setIsApproving(false),
            },
        );
    }, [pendingApprovalForUser, penelitian.uuid]);

    const handleStatusChange = (action: 'approve' | 'reject') => {
        if (!canManageStatus || !statusUrls) {
            return;
        }

        const targetUrl = action === 'approve' ? statusUrls.approve : statusUrls.reject;
        if (!targetUrl) {
            return;
        }

        if (
            action === 'reject' &&
            !window.confirm(
                'Tolak usulan penelitian ini? Tindakan ini dapat diberitahukan ke pengusul.',
            )
        ) {
            return;
        }

        router.patch(targetUrl, {}, { preserveScroll: true, preserveState: true });
    };

    return (
        <AppHeaderLayout
            breadcrumbs={resolvedBreadcrumbs}
        >
            <Head title="Preview Penelitian" />
            <DashboardNav />
            <div className="bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-5xl px-4 py-10">
                    {pendingApprovalForUser ? (
                        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="font-semibold">Persetujuan Anda dibutuhkan.</p>
                                    <p className="text-amber-700/90">
                                        Anda tercatat sebagai anggota penelitian ini dan perlu menyetujui keikutsertaan sebelum proposal dapat diajukan.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleApproveMembership}
                                    disabled={isApproving}
                                    className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-amber-400"
                                >
                                    {isApproving ? 'Memproses...' : 'Setujui Keikutsertaan'}
                                </button>
                            </div>
                        </div>
                    ) : null}

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Detail Penelitian</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Tinjau kembali seluruh informasi sebelum melanjutkan proses berikutnya.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {canManageStatus ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleStatusChange('approve')}
                                        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
                                        disabled={isApproved}
                                    >
                                        Setujui Usulan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleStatusChange('reject')}
                                        className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-300"
                                        disabled={isRejected}
                                    >
                                        Tolak Usulan
                                    </button>
                                </>
                            ) : null}
                            <Link
                                href={resolvedBackLink.href}
                                className="inline-flex items-center rounded-lg bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300"
                            >
                                {resolvedBackLink.label ?? 'Kembali'}
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                        <div className="flex gap-2 border-b border-gray-200 px-6 pt-6">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                                        activeTab === tab.key
                                            ? 'border-b-2 border-indigo-600 text-indigo-700'
                                            : 'border-b-2 border-transparent text-gray-500 hover:text-indigo-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="p-8">
                            {activeTab === 'data-penelitian' && (
                                <div className="space-y-6">
                                    <section>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Informasi Umum
                                        </h2>
                                        <div className="mt-4 grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700 md:grid-cols-2">
                                            <DetailItem label="Judul">
                                                {penelitian.title || '—'}
                                            </DetailItem>
                                            <DetailItem label="Status">
                                                {penelitian.status ?? '—'}
                                            </DetailItem>
                                            <DetailItem label="Tahun Pengajuan">
                                                {penelitian.tahun ?? '—'}
                                            </DetailItem>
                                            <DetailItem label="Tahun Pelaksanaan">
                                                {penelitian.tahun_pelaksanaan ?? '—'}
                                            </DetailItem>
                                            <DetailItem label="Tanggal Dibuat">
                                                {formattedCreatedAt ?? '—'}
                                            </DetailItem>
                                            <DetailItem label="Email Pengusul">
                                                {penelitian.email_pengusul ??
                                                    owner?.email ??
                                                    '—'}
                                            </DetailItem>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Ringkasan Anggaran
                                        </h2>
                                        <div className="mt-4 grid gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
                                            <div>
                                                <span className="text-sm font-medium text-gray-500">
                                                    Total Biaya Usulan
                                                </span>
                                                <p className="mt-1 text-2xl font-semibold text-indigo-600">
                                                    {hasBudgetItems
                                                        ? currencyFormatter.format(budget.total_usulan)
                                                        : 'Rp 0'}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500">
                                                    Biaya Disetujui
                                                </span>
                                                <p className="mt-1 text-2xl font-semibold text-emerald-600">
                                                    {budget.biaya_disetujui
                                                        ? currencyFormatter.format(budget.biaya_disetujui)
                                                        : 'Belum ada'}
                                                </p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="text-sm font-medium text-gray-500">
                                                    Rincian Per Tahun
                                                </span>
                                                <div className="mt-3 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
                                                    {hasBudgetItems ? (
                                                        budget.items.map((item) => (
                                                            <div
                                                                key={item.label}
                                                                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                                                            >
                                                                <span>{item.label}</span>
                                                                <span className="font-semibold text-gray-900">
                                                                    {currencyFormatter.format(item.value ?? 0)}
                                                                </span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="rounded-lg border border-dashed border-gray-200 px-4 py-3 text-gray-400">
                                                            Belum ada rincian anggaran.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {hasBudgetDetail ? (
                                                <div className="md:col-span-2">
                                                    <span className="text-sm font-medium text-gray-500">
                                                        Rincian Komponen Biaya
                                                    </span>
                                                    <div className="mt-4 space-y-4">
                                                        {budgetDetailEntries.map(({ year, label, items }) => (
                                                            <div key={year} className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                                                                <div className="border-b border-gray-200 bg-white px-4 py-3">
                                                                    <div className="flex items-center justify-between text-sm">
                                                                        <span className="font-semibold text-gray-900">
                                                                            {label}
                                                                        </span>
                                                                        <span className="text-indigo-600">
                                                                            Total: {currencyFormatter.format(
                                                                                items.reduce(
                                                                                    (sum, item) =>
                                                                                        sum + (item.total_biaya !== null
                                                                                            ? Number(item.total_biaya)
                                                                                            : 0),
                                                                                    0,
                                                                                ),
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="overflow-x-auto">
                                                                    <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-900">
                                                                        <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                                                                            <tr>
                                                                                <th className="px-4 py-3 text-left">Komponen</th>
                                                                                <th className="px-4 py-3 text-left">Nama Item</th>
                                                                                <th className="px-4 py-3 text-left">Jumlah</th>
                                                                                <th className="px-4 py-3 text-left">Harga Satuan</th>
                                                                                <th className="px-4 py-3 text-left">Total Biaya</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                                            {items.map((detail, index) => (
                                                                                <tr key={`${year}-${index}`}>
                                                                                    <td className="px-4 py-3">
                                                                                        {detail.komponen || '—'}
                                                                                    </td>
                                                                                    <td className="px-4 py-3">
                                                                                        {detail.nama_item || '—'}
                                                                                    </td>
                                                                                    <td className="px-4 py-3">
                                                                                        {detail.jumlah_item !== null && !Number.isNaN(Number(detail.jumlah_item))
                                                                                            ? numberFormatter.format(Number(detail.jumlah_item))
                                                                                            : '—'}
                                                                                    </td>
                                                                                    <td className="px-4 py-3">
                                                                                        {detail.harga_satuan !== null && !Number.isNaN(Number(detail.harga_satuan))
                                                                                            ? currencyFormatter.format(Number(detail.harga_satuan))
                                                                                            : '—'}
                                                                                    </td>
                                                                                    <td className="px-4 py-3 font-semibold text-gray-900">
                                                                                        {detail.total_biaya !== null && !Number.isNaN(Number(detail.total_biaya))
                                                                                            ? currencyFormatter.format(Number(detail.total_biaya))
                                                                                            : '—'}
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'bidang-luaran' && (
                                <div className="space-y-6">
                                    <SectionCard
                                        title="Skema Pendanaan"
                                        icon={<FolderOpen className="h-5 w-5 text-indigo-500" />}
                                    >
                                        {references.skema ? (
                                            <div className="space-y-2 text-sm text-gray-700">
                                                <p className="text-base font-semibold text-gray-900">
                                                    {references.skema.nama_singkat ?? references.skema.nama}
                                                </p>
                                                <DetailLine
                                                    label="Jenis Skema"
                                                    value={references.skema.jenis_skema ?? '—'}
                                                />
                                                <DetailLine
                                                    label="Sumber Dana"
                                                    value={references.skema.sumber_dana ?? '—'}
                                                />
                                                <DetailLine
                                                    label="Kebutuhan Anggota"
                                                    value={
                                                        references.skema.anggota_min || references.skema.anggota_max
                                                            ? `${references.skema.anggota_min ?? '-'} - ${
                                                                  references.skema.anggota_max ?? '-'
                                                              } orang`
                                                            : '—'
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <EmptyState message="Skema belum ditentukan." />
                                        )}
                                    </SectionCard>

                                    <SectionCard
                                        title="Bidang Fokus"
                                        icon={<FileText className="h-5 w-5 text-indigo-500" />}
                                    >
                                        <DetailLine
                                            label="Fokus"
                                            value={references.fokus?.fokus ?? 'Belum dipilih'}
                                        />
                                        <DetailLine
                                            label="SDG Terkait"
                                            value={
                                                references.sdg
                                                    ? `${references.sdg.sdg} (Level ${references.sdg.level ?? '—'})`
                                                    : 'Belum ditentukan'
                                            }
                                        />
                                        <DetailLine
                                            label="TKT"
                                            value={
                                                references.tkt
                                                    ? `${references.tkt.tkt} (Level ${references.tkt.level ?? '—'})`
                                                    : 'Belum ditentukan'
                                            }
                                        />
                                    </SectionCard>

                                    <SectionCard
                                        title="Target Luaran"
                                        icon={<FileText className="h-5 w-5 text-indigo-500" />}
                                    >
                                        {penelitian.target_luaran ? (
                                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                                {penelitian.target_luaran}
                                            </p>
                                        ) : (
                                            <EmptyState message="Target luaran belum dijelaskan." />
                                        )}
                                    </SectionCard>
                                </div>
                            )}

                            {activeTab === 'anggota' && (
                                <div className="space-y-6">
                                    <SectionCard
                                        title="Ketua Pengusul"
                                        icon={<Users className="h-5 w-5 text-indigo-500" />}
                                    >
                                        {owner ? (
                                            <div className="text-sm text-gray-700">
                                                <p className="text-base font-semibold text-gray-900">
                                                    {owner.name}
                                                </p>
                                                <p className="mt-1">{owner.email}</p>
                                            </div>
                                        ) : (
                                            <EmptyState message="Data ketua pengusul tidak ditemukan." />
                                        )}
                                    </SectionCard>

                                    <SectionCard
                                        title="Anggota Tim Penelitian"
                                        icon={<Users className="h-5 w-5 text-indigo-500" />}
                                    >
                                        {anggota.length > 0 ? (
                                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
                                                    <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left">No</th>
                                                            <th className="px-4 py-3 text-left">Nama</th>
                                                            <th className="px-4 py-3 text-left">NIDN</th>
                                                            <th className="px-4 py-3 text-left">Email</th>
                                                            <th className="px-4 py-3 text-left">Peran</th>
                                                            <th className="px-4 py-3 text-left">Tugas</th>
                                                            <th className="px-4 py-3 text-left">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {anggota.map((item, index) => (
                                                            <tr key={item.id} className="bg-white">
                                                                <td className="px-4 py-3 text-gray-900">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="px-4 py-3 text-gray-900">
                                                                    {item.dosen.nama?.trim().length
                                                                        ? item.dosen.nama
                                                                        : item.dosen.email ?? '—'}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {item.dosen.nidn ?? '—'}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {item.dosen.email ?? '—'}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {item.peran ?? '—'}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {item.tugas ?? '—'}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <ApprovalBadge
                                                                        status={
                                                                            (item.peran ?? '')
                                                                                .toLowerCase()
                                                                                .includes('ketua')
                                                                                ? 'approved'
                                                                                : item.approval?.status ?? 'pending'
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <EmptyState message="Belum ada anggota tim yang terdaftar." />
                                        )}
                                    </SectionCard>
                                </div>
                            )}

                            {activeTab === 'dokumen' && (
                                <div className="space-y-6">
                                    <SectionCard
                                        title="Berkas Proposal"
                                        icon={<FileText className="h-5 w-5 text-indigo-500" />}
                                    >
                                        <DocumentRow
                                            label="Proposal"
                                            dokumen={dokumen.proposal}
                                            fallback="Proposal belum diunggah."
                                        />
                                    </SectionCard>

                                    <SectionCard
                                        title="Lampiran Pendukung"
                                        icon={<FolderOpen className="h-5 w-5 text-indigo-500" />}
                                    >
                                        <DocumentRow
                                            label="Lampiran"
                                            dokumen={dokumen.lampiran}
                                            fallback="Tidak ada lampiran tambahan."
                                        />
                                    </SectionCard>
                                </div>
                            )}

                            {activeTab === 'dokumen-luaran' && (
                                <div className="space-y-6">
                                    <SectionCard
                                        title="Rencana Luaran"
                                        icon={<FileText className="h-5 w-5 text-indigo-500" />}
                                    >
                                        {penelitian.target_luaran ? (
                                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                                {penelitian.target_luaran}
                                            </p>
                                        ) : (
                                            <EmptyState message="Belum ada dokumen luaran yang direncanakan." />
                                        )}
                                    </SectionCard>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

type ApprovalBadgeProps = {
    status?: string | null;
};

function ApprovalBadge({ status }: ApprovalBadgeProps) {
    const normalized = (status ?? 'pending').toLowerCase();

    if (normalized === 'approved') {
        return (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Disetujui
            </span>
        );
    }

    return (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            Menunggu Persetujuan
        </span>
    );
}

type DetailItemProps = {
    label: string;
    children: ReactNode;
};

function DetailItem({ label, children }: DetailItemProps) {
    return (
        <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {label}
            </span>
            <p className="mt-1 text-sm text-gray-900">{children}</p>
        </div>
    );
}

type SectionCardProps = {
    title: string;
    icon: ReactNode;
    children: ReactNode;
};

function SectionCard({ title, icon, children }: SectionCardProps) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                    {icon}
                </span>
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
}

type DetailLineProps = {
    label: string;
    value: string;
};

function DetailLine({ label, value }: DetailLineProps) {
    return (
        <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-600">{label}: </span>
            {value}
        </p>
    );
}

type DocumentRowProps = {
    label: string;
    dokumen: DokumenInfo;
    fallback: string;
};

function DocumentRow({ label, dokumen, fallback }: DocumentRowProps) {
    return dokumen.url ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <div>
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{dokumen.filename ?? 'Tanpa nama'}</p>
            </div>
            <a
                href={dokumen.url}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
                <Download className="h-4 w-4" />
                Unduh
            </a>
        </div>
    ) : (
        <EmptyState message={fallback} />
    );
}

type EmptyStateProps = {
    message: string;
};

function EmptyState({ message }: EmptyStateProps) {
    return (
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
            {message}
        </div>
    );
}
