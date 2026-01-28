import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { type SharedData } from '@/types';
import { ClipboardList, CheckCircle, MessageSquare, XCircle } from 'lucide-react';

type PreviewProps = {
    penelitian: {
        uuid: string;
        title: string;
        status?: string | null;
        tahun?: number | null;
        tahun_pelaksanaan?: number | null;
    };
    owner?: {
        name?: string | null;
        email?: string | null;
        perguruan_tinggi?: string | null;
    };
};

type ReviewPayload = {
    rekomendasi?: string | null;
    skor_kualitas?: number | null;
    skor_rab?: number | null;
    catatan_umum?: string | null;
    catatan_rab?: string | null;
};

type ReviewWeight = {
    key: string;
    label: string;
    weight: number;
};

type PageProps = SharedData &
    PreviewProps & {
        review?: ReviewPayload | null;
        recommendationOptions: Record<string, string>;
        weights?: ReviewWeight[];
        breadcrumbs?: Array<{ title: string; href: string }>;
    };

export default function PenelitianReviewPage() {
    const { penelitian, owner, review, recommendationOptions, breadcrumbs = [], weights = [] } =
        usePage<PageProps>().props;

    const [form, setForm] = useState<ReviewPayload>({
        rekomendasi: review?.rekomendasi ?? '',
        skor_kualitas: review?.skor_kualitas ?? null,
        skor_rab: review?.skor_rab ?? null,
        catatan_umum: review?.catatan_umum ?? '',
        catatan_rab: review?.catatan_rab ?? '',
    });

    const recommendationList = useMemo(
        () => Object.entries(recommendationOptions ?? {}),
        [recommendationOptions],
    );
    const weightList = useMemo(
        () => (weights.length ? weights : defaultWeights),
        [weights],
    );

    const handleChange = (field: keyof ReviewPayload, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]:
                field === 'skor_kualitas' || field === 'skor_rab'
                    ? value === ''
                        ? null
                        : Number(value)
                    : value,
        }));
    };

    const handleSubmit = () => {
        router.post(
            `/reviewer/pt-penelitian/${penelitian.uuid}/review`,
            {
                ...form,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length
                    ? breadcrumbs
                    : [
                          { title: 'Dashboard Reviewer', href: '/dashboard/reviewer' },
                          { title: 'Review Usulan', href: '#' },
                      ]
            }
        >
            <Head title="Form Review Usulan" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
                    <header className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Form Review Usulan
                                </p>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {penelitian.title}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {penelitian.tahun_pelaksanaan ?? penelitian.tahun ?? 'Tahun n/a'}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Ketua: {owner?.name ?? '-'} ({owner?.email ?? '-'})
                                </p>
                            </div>
                            <Link
                                href={`/pt-penelitian/${penelitian.uuid}/preview`}
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                            >
                                Lihat Proposal
                            </Link>
                        </div>
                    </header>

                    <div className="grid gap-6 lg:grid-cols-3">
                        <section className="lg:col-span-2 space-y-6">
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                    <ClipboardList className="h-5 w-5 text-indigo-600" />
                                    Penilaian
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            Skor Kualitas (0-100)
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={form.skor_kualitas ?? ''}
                                            onChange={(e) => handleChange('skor_kualitas', e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                            placeholder="Contoh: 85"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            Skor Kelayakan RAB (0-100)
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={form.skor_rab ?? ''}
                                            onChange={(e) => handleChange('skor_rab', e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                            placeholder="Contoh: 80"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                    <ClipboardList className="h-5 w-5 text-indigo-600" />
                                    Bobot Penilaian (dummy)
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {weightList.map((item) => (
                                        <div
                                            key={item.key}
                                            className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                                        >
                                            <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                            <p className="text-xs text-gray-500">Bobot: {item.weight}%</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500">
                                    Bobot saat ini bersifat placeholder dan dapat diubah oleh admin kemudian.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                                    Catatan Reviewer
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            Catatan Umum
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.catatan_umum ?? ''}
                                            onChange={(e) => handleChange('catatan_umum', e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                            placeholder="Tuliskan evaluasi umum proposal..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            Catatan / Rekomendasi RAB
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.catatan_rab ?? ''}
                                            onChange={(e) => handleChange('catatan_rab', e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                            placeholder="Sorot revisi atau penyesuaian RAB..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="space-y-4">
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                    <CheckCircle className="h-5 w-5 text-indigo-600" />
                                    Rekomendasi
                                </div>
                                <div className="space-y-2">
                                    {recommendationList.map(([value, label]) => (
                                        <label
                                            key={value}
                                            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 hover:border-indigo-400"
                                        >
                                            <input
                                                type="radio"
                                                name="rekomendasi"
                                                value={value}
                                                checked={form.rekomendasi === value}
                                                onChange={(e) => handleChange('rekomendasi', e.target.value)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-800">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                    <XCircle className="h-5 w-5 text-rose-500" />
                                    Aksi
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                                >
                                    Simpan Review
                                </button>
                                <Link
                                    href="/dashboard/reviewer"
                                    className="block text-center text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    Kembali ke Dashboard
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

const defaultWeights: ReviewWeight[] = [
    { key: 'substansi', label: 'Evaluasi Substansi', weight: 60 },
    { key: 'rab', label: 'Kelayakan RAB', weight: 40 },
];
