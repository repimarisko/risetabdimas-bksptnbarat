import { useEffect, useMemo, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import DashboardNav from '@/components/DashboardNav';

type Breadcrumb = { title: string; href: string };

type Pertanyaan = {
    id_pertanyaan: string;
    jenis: string;
    pertanyaan: string;
    bobot: number;
    nilai: number | null;
    komentar: string;
};

type ExistingReview = {
    id: string;
    komentar: string;
    nilai_akhir: number;
    status_review: string; // 'Draft' | 'Selesai'
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

    // Jika status Selesai → semua input di-lock
    const isLocked = existing_review?.status_review === 'Selesai';

    const [processing, setProcessing]         = useState(false);
    const [processingFinalize, setProcessingFinalize] = useState(false);
    const [showConfirm, setShowConfirm]       = useState(false);
    const [komentar, setKomentar]             = useState(existing_review?.komentar ?? '');
    const [nilaiAkhir, setNilaiAkhir]         = useState(existing_review?.nilai_akhir ?? 0);

    const [penilaian, setPenilaian] = useState<PenilaianItem[]>(
        pertanyaans.map((p) => ({
            id_pertanyaan: p.id_pertanyaan,
            bobot: p.bobot,
            nilai: p.nilai ?? 1,
            komentar: p.komentar ?? '',
        })),
    );

    const groupedPertanyaans = useMemo(() => {
        const groups: { jenis: string; items: { item: Pertanyaan; originalIdx: number }[] }[] = [];
        pertanyaans.forEach((item, idx) => {
            const last = groups[groups.length - 1];
            if (last && last.jenis === item.jenis) {
                last.items.push({ item, originalIdx: idx });
            } else {
                groups.push({ jenis: item.jenis, items: [{ item, originalIdx: idx }] });
            }
        });
        return groups;
    }, [pertanyaans]);

    useEffect(() => {
        const total = penilaian.reduce((sum, item) => sum + item.bobot * item.nilai, 0);
        setNilaiAkhir(total);
    }, [penilaian]);

    const updatePenilaian = (index: number, field: keyof PenilaianItem, value: unknown) => {
        if (isLocked) return;
        setPenilaian((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
        );
    };

    // ── Simpan sebagai Draft ──────────────────────────────────────────────
    const handleSimpan = () => {
        setProcessing(true);
        router.post(
            `/reviewer/pt-penelitian/penugasan/${id_penugasan}/simpan-nilai-substansi`,
            { komentar, nilai_akhir: nilaiAkhir, penilaian },
            { onFinish: () => setProcessing(false) },
        );
    };

    // ── Tandai Selesai ───────────────────────────────────────────────────
    const handleSelesai = () => {
        setProcessingFinalize(true);
        router.post(
            `/reviewer/pt-penelitian/penugasan/${id_penugasan}/selesai-substansi`,
            { komentar, nilai_akhir: nilaiAkhir, penilaian },
            { onFinish: () => { setProcessingFinalize(false); setShowConfirm(false); } },
        );
    };

    const defaultBreadcrumbs: Breadcrumb[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Penugasan Review', href: '/admin/pt-penelitian/penugasan-review' },
        { title: 'Penilaian Substansi', href: '#' },
    ];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs.length ? breadcrumbs : defaultBreadcrumbs}>
            <Head title="Penilaian Substansi" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto px-4 py-10 space-y-6">

                    {/* ── Banner locked ── */}
                    {isLocked && (
                        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-3">
                            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-emerald-700">
                                Penilaian ini telah <strong>ditandai Selesai</strong> dan tidak dapat diubah lagi.
                            </p>
                        </div>
                    )}

                    {/* ── Tabel Penilaian ── */}
                    <div className="bg-white border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                <h1 className="text-sm font-semibold text-gray-800">Penilaian Substansi</h1>
                            </div>
                            {/* Status badge */}
                            {existing_review && (
                                <span className={`text-xs font-semibold px-2 py-0.5 border ${
                                    isLocked
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                        : 'bg-amber-50 border-amber-200 text-amber-700'
                                }`}>
                                    {existing_review.status_review}
                                </span>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        <th className="px-6 py-3 w-12">No</th>
                                        <th className="px-4 py-3" colSpan={2}>Kriteria</th>
                                        <th className="px-4 py-3 w-24 text-center">Bobot%</th>
                                        <th className="px-4 py-3 w-48">Skor</th>
                                        <th className="px-4 py-3">Komentar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedPertanyaans.map((group) => (
                                        <>
                                            <tr key={`group-${group.jenis}`} className="bg-gray-100 border-t border-b border-gray-200">
                                                <td colSpan={6} className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                    {group.jenis}
                                                </td>
                                            </tr>
                                            {group.items.map(({ item, originalIdx }) => (
                                                <tr key={originalIdx} className={`border-b border-gray-100 transition-colors ${isLocked ? 'bg-gray-50/50' : 'hover:bg-gray-50'}`}>
                                                    <td className="px-6 py-3 text-gray-400 text-xs">{originalIdx + 1}</td>

                                                    <td className="px-4 py-3 text-gray-700 leading-snug" colSpan={2}>
                                                        <span dangerouslySetInnerHTML={{ __html: item.pertanyaan }} />
                                                    </td>

                                                    <td className="px-4 py-3 text-center text-gray-600 font-medium">{item.bobot}</td>

                                                    <td className="px-4 py-3">
                                                        {isLocked ? (
                                                            <span className="text-sm text-gray-700 font-medium">
                                                                {SKOR_OPTIONS.find(o => o.value === penilaian[originalIdx]?.nilai)?.label ?? '—'}
                                                            </span>
                                                        ) : (
                                                            <select
                                                                value={penilaian[originalIdx]?.nilai ?? 1}
                                                                onChange={(e) => updatePenilaian(originalIdx, 'nilai', Number(e.target.value))}
                                                                className="w-full text-sm border border-gray-300 px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                                            >
                                                                {SKOR_OPTIONS.map((opt) => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        {isLocked ? (
                                                            <span className="text-sm text-gray-500">{penilaian[originalIdx]?.komentar || '—'}</span>
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                value={penilaian[originalIdx]?.komentar ?? ''}
                                                                onChange={(e) => updatePenilaian(originalIdx, 'komentar', e.target.value)}
                                                                placeholder="Tulis komentar..."
                                                                className="w-full text-sm border border-gray-300 px-2 py-1.5 text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                                            />
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>

                                <tfoot>
                                    <tr className="bg-green-50 border-t border-green-200">
                                        <td colSpan={3} />
                                        <td className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                                            Nilai Saat Ini
                                        </td>
                                        <td className="px-4 py-3 text-xs font-semibold text-gray-500">:</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-block bg-white border border-green-200 px-4 py-1.5 text-sm font-bold text-gray-800 min-w-[80px]">
                                                {nilaiAkhir}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* ── Komentar Keseluruhan ── */}
                    <div className="bg-white border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-800">Komentar Keseluruhan</h2>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Kesimpulan atau rekomendasi umum terhadap proposal penelitian ini.
                            </p>
                        </div>
                        <div className="px-6 py-5">
                            {isLocked ? (
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">{komentar || '—'}</p>
                            ) : (
                                <textarea
                                    rows={4}
                                    value={komentar}
                                    onChange={(e) => setKomentar(e.target.value)}
                                    placeholder="Tuliskan komentar dan rekomendasi Anda secara keseluruhan..."
                                    className="w-full text-sm border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition"
                                />
                            )}
                        </div>
                    </div>

                    {/* ── Actions ── */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span>Nilai akhir dihitung dari <strong>bobot × skor</strong> setiap kriteria.</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                Kembali
                            </button>

                            {!isLocked && (
                                <>
                                    {/* Simpan Draft */}
                                    <button
                                        type="button"
                                        onClick={handleSimpan}
                                        disabled={processing}
                                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Draft'}
                                    </button>

                                    {/* Tandai Selesai */}
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(true)}
                                        disabled={processingFinalize || !existing_review}
                                        className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all hover:shadow active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title={!existing_review ? 'Simpan draft dulu sebelum menandai Selesai' : ''}
                                    >
                                        Tandai Selesai
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Modal Konfirmasi Selesai ── */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white border border-gray-200 shadow-xl w-full max-w-md mx-4 p-6 space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-amber-100 p-2 shrink-0">
                                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Tandai Penilaian Selesai?</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Setelah ditandai <strong>Selesai</strong>, penilaian ini <strong>tidak dapat diubah</strong> lagi. Pastikan semua nilai dan komentar sudah benar.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleSelesai}
                                disabled={processingFinalize}
                                className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                                {processingFinalize ? 'Memproses...' : 'Ya, Tandai Selesai'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppHeaderLayout>
    );
}