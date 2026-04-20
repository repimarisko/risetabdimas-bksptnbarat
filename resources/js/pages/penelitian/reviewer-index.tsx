import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { type SharedData } from '@/types';
import { BadgeCheck, BookOpen, Filter, FolderOpen } from 'lucide-react';

type ReviewSummary = {
    rekomendasi?: string | null;
    skor_kualitas?: number | null;
    skor_rab?: number | null;
};

type Item = {
    uuid: string;
    title: string;
    status?: string | null;
    tahun?: number | null;
    tahun_pelaksanaan?: number | null;
    perguruan_tinggi?: string | null;
    assigned_at?: string | null;
    review?: ReviewSummary | null;
    links: {
        preview: string;
        review: string;
    };
};

type Weight = {
    key: string;
    label: string;
    weight: number;
};

type PageProps = SharedData & {
    items: Item[];
    weights?: Weight[];
    breadcrumbs?: Array<{ title: string; href: string }>;
};

export default function ReviewerIndexPage() {
    const { items = [], weights = [], breadcrumbs = [] } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');

    const filteredItems = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return items;
        return items.filter((item) => item.title.toLowerCase().includes(q));
    }, [items, search]);

    const defaultBreadcrumbs = [
        { title: 'Dashboard Reviewer', href: '/dashboard/reviewer' },
        { title: 'Review Proposal', href: '#' },
    ];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs.length ? breadcrumbs : defaultBreadcrumbs}>
            <Head title="Review Proposal" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
                    <header className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                                Reviewer
                            </p>
                            <h1 className="text-3xl font-bold text-gray-900">Review Proposal</h1>
                            <p className="text-sm text-gray-600">
                                Lihat penugasan review yang sudah dipetakan (plotting) oleh admin dan masuk ke
                                halaman review untuk memberi evaluasi substansi dan RAB.
                            </p>
                        </div>

                        <div className="flex items-center gap-2  border border-gray-200 bg-white px-3 py-2 shadow-sm">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul penelitian..."
                                className="bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                            />
                        </div>
                    </header>

                    <section className="grid gap-4 lg:grid-cols-3">
                        <div className="space-y-4 lg:col-span-2">
                            {filteredItems.length ? (
                                filteredItems.map((item) => {
                                    const hasReview =
                                        item.review?.rekomendasi ||
                                        item.review?.skor_kualitas !== null ||
                                        item.review?.skor_rab !== null;

                                    return (
                                        <article
                                            key={item.uuid}
                                            className=" border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className=" bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                            {item.tahun_pelaksanaan ?? item.tahun ?? 'n/a'}
                                                        </span>
                                                        <span className=" bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                                            {formatStatus(item.status)}
                                                        </span>
                                                        <span className=" bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                            {item.perguruan_tinggi ?? 'PT n/a'}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                                                    <p className="text-xs text-gray-500">
                                                        Ditugaskan: {formatDate(item.assigned_at)}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={` px-3 py-1 text-xs font-semibold ${
                                                            hasReview
                                                                ? 'bg-emerald-50 text-emerald-700'
                                                                : 'bg-amber-50 text-amber-700'
                                                        }`}
                                                    >
                                                        {hasReview ? 'Sudah dinilai' : 'Belum dinilai'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                                                <div className=" border border-gray-100 bg-gray-50 px-3 py-2 text-sm">
                                                    <p className="text-xs text-gray-500">Rekomendasi</p>
                                                    <p className="font-semibold text-gray-800">
                                                        {formatRecommendation(item.review?.rekomendasi)}
                                                    </p>
                                                </div>
                                                <div className=" border border-gray-100 bg-gray-50 px-3 py-2 text-sm">
                                                    <p className="text-xs text-gray-500">Skor Substansi</p>
                                                    <p className="font-semibold text-gray-800">
                                                        {item.review?.skor_kualitas ?? '-'}
                                                    </p>
                                                </div>
                                                <div className=" border border-gray-100 bg-gray-50 px-3 py-2 text-sm">
                                                    <p className="text-xs text-gray-500">Skor RAB</p>
                                                    <p className="font-semibold text-gray-800">
                                                        {item.review?.skor_rab ?? '-'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex flex-wrap gap-3">
                                                <Link
                                                    href={item.links.preview}
                                                    className="inline-flex items-center gap-2  border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                                                >
                                                    <FolderOpen className="h-4 w-4" />
                                                    Lihat Proposal &amp; RAB
                                                </Link>
                                                <Link
                                                    href={item.links.review}
                                                    className="inline-flex items-center gap-2  bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                                                >
                                                    <BadgeCheck className="h-4 w-4" />
                                                    Isi Form Review
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })
                            ) : (
                                <div className=" border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                                    Belum ada penugasan review. Pastikan admin sudah melakukan plotting reviewer.
                                </div>
                            )}
                        </div>

                        <aside className="space-y-4">
                            <div className=" border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                    <BookOpen className="h-5 w-5 text-indigo-600" />
                                    Bobot Penilaian (dummy)
                                </div>
                                <div className="mt-3 space-y-2">
                                    {(weights?.length ? weights : defaultWeights).map((item) => (
                                        <div
                                            key={item.key}
                                            className="flex items-center justify-between  bg-gray-50 px-3 py-2 text-sm"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.label}</p>
                                                <p className="text-xs text-gray-500">Aspek {item.key}</p>
                                            </div>
                                            <span className=" bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                {item.weight}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-3 text-xs text-gray-500">
                                    Bobot ini bersifat sementara dan dapat disesuaikan oleh admin.
                                </p>
                            </div>
                        </aside>
                    </section>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

function formatDate(value?: string | null) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

function formatStatus(status?: string | null) {
    if (!status) return 'Status n/a';
    return status;
}

function formatRecommendation(value?: string | null) {
    if (!value) return 'Belum ada rekomendasi';
    switch (value) {
        case 'diterima':
            return 'Direkomendasikan';
        case 'revisi':
            return 'Perlu Revisi';
        case 'ditolak':
            return 'Tidak Direkomendasikan';
        default:
            return value;
    }
}

const defaultWeights: Weight[] = [
    { key: 'substansi', label: 'Evaluasi Substansi', weight: 60 },
    { key: 'rab', label: 'Kelayakan RAB', weight: 40 },
];
