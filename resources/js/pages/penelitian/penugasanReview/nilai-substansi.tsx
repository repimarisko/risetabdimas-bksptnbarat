import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

type Breadcrumb = { title: string; href: string };

type Pertanyaan = {
    id_pertanyaan: string;
    jenis: string;
    pertanyaan: string;
    bobot: number;
    nilai: number | null;
    komentar: string;
};

type StatusPenilaian = 'rekomendasi' | 'tidak_rekomendasi';

type ExistingReview = {
    id: string;
    komentar: string;
    nilai_akhir: number;
    status_review: string;
    status_penilaian: StatusPenilaian;
} | null;

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    pertanyaans: Pertanyaan[];
    id_penugasan: string;
    existing_review: ExistingReview;
};

type PenilaianItem = {
    id_pertanyaan: string;
    bobot: number;
    nilai: number;
    komentar: string;
};

const SKOR_OPTIONS = [
    { value: 1, label: '1 - Buruk' },
    { value: 2, label: '2 - Sangat Kurang' },
    { value: 3, label: '3 - Kurang' },
    { value: 4, label: '4 - Sedang' },
    { value: 5, label: '5 - Cukup' },
    { value: 6, label: '6 - Baik' },
    { value: 7, label: '7 - Sangat Baik' },
];

export default function NilaiSubstansi() {
    const {
        breadcrumbs = [],
        pertanyaans = [],
        id_penugasan,
        existing_review,
    } = usePage<PageProps>().props;

    const isLocked = existing_review?.status_review === 'Selesai';

    const [processing, setProcessing] = useState(false);
    const [processingFinalize, setProcessingFinalize] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [komentar, setKomentar] = useState(existing_review?.komentar ?? '');
    const [nilaiAkhir, setNilaiAkhir] = useState(
        existing_review?.nilai_akhir ?? 0,
    );
    const [statusPenilaian, setStatusPenilaian] = useState<StatusPenilaian>(
        existing_review?.status_penilaian ?? 'tidak_rekomendasi',
    );

    const [penilaian, setPenilaian] = useState<PenilaianItem[]>(
        pertanyaans.map((p) => ({
            id_pertanyaan: p.id_pertanyaan,
            bobot: p.bobot,
            nilai: p.nilai ?? 1,
            komentar: p.komentar ?? '',
        })),
    );

    const groupedPertanyaans = useMemo(() => {
        const groups: {
            jenis: string;
            items: { item: Pertanyaan; originalIdx: number }[];
        }[] = [];
        pertanyaans.forEach((item, idx) => {
            const last = groups[groups.length - 1];
            if (last && last.jenis === item.jenis) {
                last.items.push({ item, originalIdx: idx });
            } else {
                groups.push({
                    jenis: item.jenis,
                    items: [{ item, originalIdx: idx }],
                });
            }
        });
        return groups;
    }, [pertanyaans]);

    useEffect(() => {
        const total = penilaian.reduce(
            (sum, item) => sum + item.bobot * item.nilai,
            0,
        );
        setNilaiAkhir(total);
    }, [penilaian]);

    const updatePenilaian = (
        index: number,
        field: keyof PenilaianItem,
        value: unknown,
    ) => {
        if (isLocked) return;
        setPenilaian((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item,
            ),
        );
    };

    const handleSimpan = () => {
        setProcessing(true);
        router.post(
            `/reviewer/pt-penelitian/penugasan/${id_penugasan}/simpan-nilai-substansi`,
            {
                komentar,
                nilai_akhir: nilaiAkhir,
                status_penilaian: statusPenilaian,
                penilaian,
            },
            {
                onFinish: () => setProcessing(false),
            },
        );
    };

    const handleSelesai = () => {
        setProcessingFinalize(true);
        router.post(
            `/reviewer/pt-penelitian/penugasan/${id_penugasan}/selesai-substansi`,
            {
                komentar,
                nilai_akhir: nilaiAkhir,
                status_penilaian: statusPenilaian,
                penilaian,
            },
            {
                onFinish: () => {
                    setProcessingFinalize(false);
                    setShowConfirm(false);
                },
            },
        );
    };

    const defaultBreadcrumbs: Breadcrumb[] = [
        { title: 'Dashboard', href: '/dashboard' },
        {
            title: 'Penugasan Review',
            href: '/admin/pt-penelitian/penugasan-review',
        },
        { title: 'Penilaian Substansi', href: '#' },
    ];

    return (
        <AppHeaderLayout
            breadcrumbs={breadcrumbs.length ? breadcrumbs : defaultBreadcrumbs}
        >
            <Head title="Penilaian Substansi" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto space-y-6 px-4 py-10">
                    {isLocked && (
                        <div className="flex items-center gap-3 border border-emerald-200 bg-emerald-50 px-5 py-3">
                            <svg
                                className="h-4 w-4 shrink-0 text-emerald-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-sm text-emerald-700">
                                Penilaian ini telah{' '}
                                <strong>ditandai Selesai</strong> dan tidak
                                dapat diubah lagi.
                            </p>
                        </div>
                    )}

                    <div className="overflow-hidden border border-gray-200 bg-white">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="h-4 w-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                                <h1 className="text-sm font-semibold text-gray-800">
                                    Penilaian Substansi
                                </h1>
                            </div>

                            {existing_review && (
                                <span
                                    className={`border px-2 py-0.5 text-xs font-semibold ${
                                        isLocked
                                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                            : 'border-amber-200 bg-amber-50 text-amber-700'
                                    }`}
                                >
                                    {existing_review.status_review}
                                </span>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        <th className="w-12 px-6 py-3">No</th>
                                        <th className="px-4 py-3" colSpan={2}>
                                            Kriteria
                                        </th>
                                        <th className="w-24 px-4 py-3 text-center">
                                            Bobot%
                                        </th>
                                        <th className="w-48 px-4 py-3">Skor</th>
                                        <th className="px-4 py-3">Komentar</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {groupedPertanyaans.map((group) => (
                                        <>
                                            <tr
                                                key={`group-${group.jenis}`}
                                                className="border-t border-b border-gray-200 bg-gray-100"
                                            >
                                                <td
                                                    colSpan={6}
                                                    className="px-4 py-2 text-xs font-bold tracking-wider text-gray-600 uppercase"
                                                >
                                                    {group.jenis}
                                                </td>
                                            </tr>

                                            {group.items.map(
                                                ({ item, originalIdx }) => (
                                                    <tr
                                                        key={originalIdx}
                                                        className={`border-b border-gray-100 transition-colors ${
                                                            isLocked
                                                                ? 'bg-gray-50/50'
                                                                : 'hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <td className="px-6 py-3 text-xs text-gray-400">
                                                            {originalIdx + 1}
                                                        </td>

                                                        <td
                                                            className="px-4 py-3 leading-snug text-gray-700"
                                                            colSpan={2}
                                                        >
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.pertanyaan,
                                                                }}
                                                            />
                                                        </td>

                                                        <td className="px-4 py-3 text-center font-medium text-gray-600">
                                                            {item.bobot}
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {isLocked ? (
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {SKOR_OPTIONS.find(
                                                                        (o) =>
                                                                            o.value ===
                                                                            penilaian[
                                                                                originalIdx
                                                                            ]
                                                                                ?.nilai,
                                                                    )?.label ??
                                                                        '—'}
                                                                </span>
                                                            ) : (
                                                                <select
                                                                    value={
                                                                        penilaian[
                                                                            originalIdx
                                                                        ]
                                                                            ?.nilai ??
                                                                        1
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updatePenilaian(
                                                                            originalIdx,
                                                                            'nilai',
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            ),
                                                                        )
                                                                    }
                                                                    className="w-full border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 transition focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                                >
                                                                    {SKOR_OPTIONS.map(
                                                                        (
                                                                            opt,
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    opt.value
                                                                                }
                                                                                value={
                                                                                    opt.value
                                                                                }
                                                                            >
                                                                                {
                                                                                    opt.label
                                                                                }
                                                                            </option>
                                                                        ),
                                                                    )}
                                                                </select>
                                                            )}
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {isLocked ? (
                                                                <span className="text-sm text-gray-500">
                                                                    {penilaian[
                                                                        originalIdx
                                                                    ]
                                                                        ?.komentar ||
                                                                        '—'}
                                                                </span>
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        penilaian[
                                                                            originalIdx
                                                                        ]
                                                                            ?.komentar ??
                                                                        ''
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updatePenilaian(
                                                                            originalIdx,
                                                                            'komentar',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="Tulis komentar..."
                                                                    className="w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-700 placeholder-gray-300 transition focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </>
                                    ))}
                                </tbody>

                                <tfoot>
                                    <tr className="border-t border-green-200 bg-green-50">
                                        <td colSpan={3} />
                                        <td className="px-4 py-3 text-right text-xs font-bold tracking-wide whitespace-nowrap text-gray-600 uppercase">
                                            Nilai Saat Ini
                                        </td>
                                        <td className="px-4 py-3 text-xs font-semibold text-gray-500">
                                            :
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-block min-w-[80px] border border-green-200 bg-white px-4 py-1.5 text-sm font-bold text-gray-800">
                                                {nilaiAkhir}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="overflow-hidden border border-gray-200 bg-white">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h2 className="text-sm font-semibold text-gray-800">
                                Status Penilaian
                            </h2>
                            <p className="mt-0.5 text-xs text-gray-400">
                                Pilih hasil rekomendasi reviewer terhadap
                                proposal penelitian ini.
                            </p>
                        </div>
                        <div className="px-6 py-5">
                            {isLocked ? (
                                <p className="text-sm text-gray-600">
                                    {statusPenilaian === 'rekomendasi'
                                        ? 'Rekomendasi'
                                        : 'Tidak Rekomendasi'}
                                </p>
                            ) : (
                                <select
                                    value={statusPenilaian}
                                    onChange={(e) =>
                                        setStatusPenilaian(
                                            e.target.value as StatusPenilaian,
                                        )
                                    }
                                    className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                >
                                    <option value="rekomendasi">
                                        Rekomendasi
                                    </option>
                                    <option value="tidak_rekomendasi">
                                        Tidak Rekomendasi
                                    </option>
                                </select>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden border border-gray-200 bg-white">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h2 className="text-sm font-semibold text-gray-800">
                                Komentar Keseluruhan
                            </h2>
                            <p className="mt-0.5 text-xs text-gray-400">
                                Kesimpulan atau rekomendasi umum terhadap
                                proposal penelitian ini.
                            </p>
                        </div>
                        <div className="px-6 py-5">
                            {isLocked ? (
                                <p className="text-sm whitespace-pre-wrap text-gray-600">
                                    {komentar || '—'}
                                </p>
                            ) : (
                                <textarea
                                    rows={4}
                                    value={komentar}
                                    onChange={(e) =>
                                        setKomentar(e.target.value)
                                    }
                                    placeholder="Tuliskan komentar dan rekomendasi Anda secara keseluruhan..."
                                    className="w-full resize-none border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 transition focus:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>
                                Nilai akhir dihitung dari{' '}
                                <strong>bobot × skor</strong> setiap kriteria.
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            >
                                Kembali
                            </button>

                            {!isLocked && (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleSimpan}
                                        disabled={processing}
                                        className="border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Simpan Draft'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(true)}
                                        disabled={
                                            processingFinalize ||
                                            !existing_review
                                        }
                                        className="bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                        title={
                                            !existing_review
                                                ? 'Simpan draft dulu sebelum menandai Selesai'
                                                : ''
                                        }
                                    >
                                        Tandai Selesai
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="mx-4 w-full max-w-md space-y-4 border border-gray-200 bg-white p-6 shadow-xl">
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 bg-amber-100 p-2">
                                <svg
                                    className="h-5 w-5 text-amber-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">
                                    Tandai Penilaian Selesai?
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Setelah ditandai <strong>Selesai</strong>,
                                    penilaian ini{' '}
                                    <strong>tidak dapat diubah</strong> lagi.
                                    Pastikan semua nilai dan komentar sudah
                                    benar.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleSelesai}
                                disabled={processingFinalize}
                                className="bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {processingFinalize
                                    ? 'Memproses...'
                                    : 'Ya, Tandai Selesai'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppHeaderLayout>
    );
}
