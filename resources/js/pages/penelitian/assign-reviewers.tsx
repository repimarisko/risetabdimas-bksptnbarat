import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useMemo, useState } from 'react';
import { Search, Users } from 'lucide-react';

type ReviewerOption = {
    id: number;
    name: string;
    email?: string | null;
};

type Item = {
    uuid: string;
    title: string;
    status?: string | null;
    created_at?: string | null;
    reviewers: ReviewerOption[];
};

type PageProps = SharedData & {
    items: Item[];
    reviewers: ReviewerOption[];
    breadcrumbs?: Array<{ title: string; href: string }>;
};

export default function AssignReviewersPage() {
    const { items = [], reviewers = [], breadcrumbs = [] } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');
    const [selectedReviewer, setSelectedReviewer] = useState<Record<string, number | ''>>({});

    const filteredItems = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) {
            return items;
        }
        return items.filter(
            (item) =>
                item.title.toLowerCase().includes(q) ||
                (item.status ?? '').toLowerCase().includes(q),
        );
    }, [items, search]);

    const handleAssign = (uuid: string) => {
        const reviewerId = selectedReviewer[uuid];
        if (!reviewerId) return;

        router.post(
            `/admin/pt-penelitian/${uuid}/assign-reviewer`,
            { reviewer_id: reviewerId },
            { preserveScroll: true },
        );
    };

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length
                    ? breadcrumbs
                    : [
                          { title: 'Dashboard', href: '/dashboard' },
                          { title: 'Plotting Reviewer', href: '/admin/pt-penelitian/assign-reviewer' },
                      ]
            }
        >
            <Head title="Plotting Reviewer Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-gray-700">
                                Usulan Disetujui Admin PT
                            </p>
                            <h1 className="text-2xl font-bold text-gray-900">Plotting Reviewer</h1>
                            <p className="text-sm text-gray-500">
                                Tetapkan reviewer agar judul muncul pada akun reviewer terkait.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                            <Search className="h-4 w-4 text-gray-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul atau status..."
                                className="bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        {filteredItems.length ? (
                            <div className="divide-y divide-gray-100">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item.uuid}
                                        className="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div>
                                            <p className="text-base font-semibold text-gray-900">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Status: {item.status ?? '-'}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Dibuat: {formatDate(item.created_at)}
                                            </p>
                                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                                                <Users className="h-4 w-4 text-indigo-600" />
                                                <span>Reviewer saat ini:</span>
                                                {item.reviewers.length ? (
                                                    item.reviewers.map((rev) => (
                                                        <span
                                                            key={rev.id}
                                                            className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700"
                                                        >
                                                            {rev.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400">Belum ada</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 md:items-end">
                                            <select
                                                value={selectedReviewer[item.uuid] ?? ''}
                                                onChange={(e) =>
                                                    setSelectedReviewer((prev) => ({
                                                        ...prev,
                                                        [item.uuid]: e.target.value
                                                            ? Number(e.target.value)
                                                            : '',
                                                    }))
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 md:w-64"
                                            >
                                                <option value="">Pilih reviewer...</option>
                                                {reviewers.map((rev) => (
                                                    <option key={rev.id} value={rev.id}>
                                                        {rev.name} {rev.email ? `(${rev.email})` : ''}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => handleAssign(item.uuid)}
                                                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                                            >
                                                Assign Reviewer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-14 text-center text-sm text-gray-500">
                                Tidak ada usulan disetujui untuk ditugaskan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

function formatDate(value?: string | null) {
    if (!value) return '-';

    // Ubah format MySQL -> ISO
    const isoString = value.replace(' ', 'T');

    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '-';

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

