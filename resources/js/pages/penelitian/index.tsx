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
import {
    Filter,
    MoreHorizontal,
   
    Search
} from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

type PenelitianItem = {
    uuid: string;
    title: string;
    status?: string | null;
    tahun?: number | null;
    tahun_pelaksanaan?: number | null;
    created_at?: string | null;
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
};

type PageProps = SharedData & {
    penelitian: {
        data: PenelitianItem[];
    };
    submissionLocked?: boolean;
    lockReason?: string | null;
    isAccountVerified?: boolean;
};

type FilterKey = 'all' | 'completed' |  'in_review' | 'rejected';

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
    const { penelitian, auth, submissionLocked = false, lockReason } = usePage<PageProps>().props;
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<FilterKey>('all');

    const handleDelete = useCallback((uuid: string) => {
        if (
            !window.confirm(
                'Hapus usulan penelitian ini? Tindakan ini tidak dapat dibatalkan.',
            )
        ) {
            return;
        }

        router.delete(`/pt-penelitian/${uuid}`);
    }, []);

    const rows = useMemo(() => penelitian?.data ?? [], [penelitian]);

    const filterCounts = useMemo(() => {
        return rows.reduce(
            (acc, item) => {
                const bucket = mapStatusToFilter(item.status);
                acc[bucket] = (acc[bucket] ?? 0) + 1;
                acc.all += 1;
                return acc;
            },
            {
                all: 0,
                completed: 0,
               
                rejected: 0,
                in_review: 0,
            } as Record<FilterKey, number> & { all: number },
        );
    }, [rows]);

    const filteredRows = useMemo(() => {
        return rows.filter((item) => {
            const normalizedQuery = query.trim().toLowerCase();
            const matchesQuery =
                !normalizedQuery ||
                item.title.toLowerCase().includes(normalizedQuery) ||
                (item.status ?? '').toLowerCase().includes(normalizedQuery) ||
                (item.email_pengusul ?? '').toLowerCase().includes(
                    normalizedQuery,
                );

            const bucket = mapStatusToFilter(item.status);
            const matchesStatus =
                statusFilter === 'all' || statusFilter === bucket;

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

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10">
                    {submissionLocked ? (
                        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                            {lockReason ??
                                'Akun Anda belum disetujui oleh admin PT. Silakan menunggu persetujuan sebelum mengajukan usulan.'}
                        </div>
                    ) : null}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Usulan Penelitian Saya
                            </h1>
                            <p className="text-sm text-gray-500">
                                Tinjau dan kelola seluruh usulan penelitian yang
                                Anda ajukan.
                            </p>
                        </div>
                        {submissionLocked ? (
                            <button
                                type="button"
                                disabled
                                className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 shadow-sm"
                                title={
                                    lockReason ??
                                    'Akun Anda belum disetujui oleh admin PT.'
                                }
                            >
                                + Tambah Usulan
                            </button>
                        ) : (
                            <Link
                                href="/pt-penelitian/create"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
                            >
                                + Tambah Usulan
                            </Link>
                        )}
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                        <div className="border-b border-gray-200 px-6 py-5">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                                    <Search className="h-4 w-4 text-gray-400" />
                                    <input
                                        value={query}
                                        onChange={(event) =>
                                            setQuery(event.target.value)
                                        }
                                        placeholder="Cari judul, status, atau email pengusul..."
                                        className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                    />
                                    <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-500">
                                        Search
                                    </button>
                                </div>

                                <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100">
                                    <Filter className="h-4 w-4 text-gray-500" />
                                    Filter
                                </button>

                             
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500">
                                <span className="uppercase tracking-wide text-gray-400">
                                    Show only:
                                </span>
                                {filterOptions.map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setStatusFilter(key)}
                                        className={cn(
                                            'inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-1.5',
                                            statusFilter === key
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                                        )}
                                    >
                                        <span>{label}</span>
                                        <span className="text-xs text-gray-400">
                                            {filterCounts[key] ?? 0}
                                        </span>
                                    </button>
                                ))}
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
                                            return (
                                                <tr
                                                    key={item.uuid}
                                                    className="bg-white transition hover:bg-gray-50"
                                                >
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
                                                                Dibuat:{' '}
                                                                {formatDate(item.created_at)}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 align-top">
                                                        <span
                                                            className={cn(
                                                                'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase',
                                                                statusMeta.badgeClass,
                                                            )}
                                                        >
                                                            {statusMeta.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8 border border-gray-200">
                                                                <AvatarImage
                                                                    src={undefined}
                                                                    alt={
                                                                        item.ketua_nama ??
                                                                        'Ketua'
                                                                    }
                                                                />
                                                                <AvatarFallback className="bg-gray-100 text-xs font-semibold text-gray-700">
                                                                    {getInitials(
                                                                        item.ketua_nama ??
                                                                        item.email_pengusul ??
                                                                        'User',
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {item.ketua_nama ??
                                                                        item.email_pengusul ??
                                                                        'Ketua'}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {item.email_pengusul ?? '—'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
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
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {item.tahun_pelaksanaan ??
                                                            item.tahun ??
                                                            '—'}
                                                    </td>
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="space-y-1 text-sm">
                                                            {item.proposal_file_url ? (
                                                                <a
                                                                    href={item.proposal_file_url}
                                                                    className="inline-flex items-center gap-1 font-semibold text-indigo-600 transition hover:text-indigo-500"
                                                                >
                                                                    Proposal
                                                                    {item.proposal_filename ? (
                                                                        <span className="text-xs font-normal text-gray-500">
                                                                            ({item.proposal_filename})
                                                                        </span>
                                                                    ) : null}
                                                                </a>
                                                            ) : (
                                                                <span className="text-xs text-gray-400">
                                                                    Proposal belum diunggah
                                                                </span>
                                                            )}
                                                            {item.lampiran_file_url ? (
                                                                <a
                                                                    href={item.lampiran_file_url}
                                                                    className="inline-flex items-center gap-1 text-indigo-500 transition hover:text-indigo-400"
                                                                >
                                                                    Lampiran
                                                                    {item.lampiran_filename ? (
                                                                        <span className="text-xs font-normal text-gray-500">
                                                                            ({item.lampiran_filename})
                                                                        </span>
                                                                    ) : null}
                                                                </a>
                                                            ) : (
                                                                <span className="text-xs text-gray-400">
                                                                    Lampiran tidak tersedia
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            href={`/pt-penelitian/${item.uuid}/preview`}
                                                            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                                                        >
                                                            Detail
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                                                    aria-label="Aksi cepat"
                                                                >
                                                                    <MoreHorizontal className="h-5 w-5" />
                                                                </button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className="min-w-[180px] rounded-lg border border-gray-200 bg-white p-1 text-sm text-gray-700 shadow-lg focus:outline-none">
                                                                <DropdownMenuItem
                                                                    className="cursor-pointer rounded px-3 py-2 text-gray-700 outline-none hover:bg-gray-100"
                                                                    onSelect={() =>
                                                                        router.visit(
                                                                            `/pt-penelitian/${item.uuid}/edit`,
                                                                        )
                                                                    }
                                                                >
                                                                    Ubah
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="cursor-pointer rounded px-3 py-2 text-rose-500 outline-none hover:bg-rose-100"
                                                                    onSelect={() =>
                                                                        handleDelete(
                                                                            item.uuid,
                                                                        )
                                                                    }
                                                                >
                                                                    Hapus
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
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

function mapStatusToFilter(status?: string | null): FilterKey {
    const normalized = (status ?? '').toLowerCase();

    if (
        ['selesai', 'completed', 'disetujui', 'approved', 'mengajukan', 'mengaju'].some((keyword) =>
            normalized.includes(keyword),
        )
    ) {
        return 'completed';
    }

    if (
        ['ditolak', 'rejected', 'tolak'].some((keyword) =>
            normalized.includes(keyword),
        )
    ) {
        return 'rejected';
    }

    if (
        ['revisi', 'perbaikan', 'review', 'koreksi'].some((keyword) =>
            normalized.includes(keyword),
        )
    ) {
        return 'in_review';
    }

  
}

function getStatusMeta(
    status?: string | null,
    progressOverride?: number,
) {
    const bucket = mapStatusToFilter(status);
    const normalizedStatus = (status ?? '').toLowerCase();

    if (normalizedStatus.includes('menunggu') && normalizedStatus.includes('anggota')) {
        return {
            label: status ?? 'Menunggu Persetujuan Anggota',
            badgeClass: 'bg-amber-500/15 text-amber-400',
            progress: 20,
            progressLabel: 'Menunggu Persetujuan',
            progressBarClass: 'bg-amber-500',
        };
    }

    if (bucket === 'rejected') {
        return {
            label: status ?? 'Ditolak',
            badgeClass: 'bg-rose-500/15 text-rose-300',
            progress: 0,
            progressLabel: 'Ditolak',
            progressBarClass: 'bg-rose-500',
        };
    }

    const baseProgress =
        typeof progressOverride === 'number'
            ? progressOverride
            : bucket === 'completed'
              ? 100
              : bucket === 'in_review'
                ? 35
                : 60;

    const label =
        status ??
        (bucket === 'completed'
            ? 'Completed'
            : bucket === 'in_review'
              ? 'Needs Review'
              : 'In Progress');

    const progressLabel =
        typeof progressOverride === 'number'
            ? 'Terealisasi'
            : bucket === 'completed'
              ? 'Selesai'
              : bucket === 'in_review'
                ? 'Dalam review'
                : 'Berlangsung';

    return {
        label,
        badgeClass:
            bucket === 'completed'
                ? 'bg-emerald-500/15 text-emerald-300'
                : bucket === 'in_review'
                  ? 'bg-amber-500/15 text-amber-300'
                  : 'bg-blue-500/15 text-blue-300',
        progress: baseProgress,
        progressLabel,
        progressBarClass:
            bucket === 'completed'
                ? 'bg-emerald-400'
                : bucket === 'in_review'
                  ? 'bg-amber-400'
                  : 'bg-blue-500',
    };
}

function getBudgetSummary(item: PenelitianItem) {
    const spent = item.biaya_disetujui ?? 0;
    const proposals = [
        item.biaya_usulan_1,
        item.biaya_usulan_2,
        item.biaya_usulan_3,
        item.biaya_usulan_4,
    ]
        .filter((value): value is number => typeof value === 'number')
        .reduce((total, value) => total + value, 0);

    const progress =
        proposals > 0
            ? Math.max(
                  0,
                  Math.min(100, Math.round((spent / proposals) * 100)),
              )
            : spent > 0
              ? 100
              : undefined;

    return {
        displayValue: spent > 0 ? currencyFormatter.format(spent) : 'Rp 0',
        targetValue:
            proposals > 0 ? currencyFormatter.format(proposals) : undefined,
        progress,
    };
}

function formatDate(value?: string | null) {
    if (!value) {
        return '—';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '—';
    }

    return dateFormatter.format(date);
}

function getInitials(name: string) {
    return name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}
