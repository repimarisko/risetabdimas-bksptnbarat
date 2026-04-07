import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    CheckCircleIcon,
    CheckSquare,
    Clock,
    Loader2,
    RefreshCw,
    Save,
    XCircle,
    XCircleIcon,
    XSquare,
} from 'lucide-react';
import { useState } from 'react';

type Breadcrumb = { title: string; href: string };
type Penugasan = {
    id: string;
    id_penelitian: string;
    id_jenis_penugasan: number;
    id_reviewer: number;
    tanggal_penugasan: string;
    batas_waktu: string;
    status_review: string;
    created_at: string;
    updated_at: string;
};
type Pertanyaan = {
    id: string;
    nomor_urut: number;
    pertanyaan: string;
};

type ReviewDetail = {
    id_pertanyaan: string;
    jawaban: boolean | number;
};

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    pertanyaans?: Pertanyaan[];

    review?: {
        id: string;
        hasil: string | null;
        komentar: string | null;
        status_review: string;
    } | null;
    detail?: Record<string, ReviewDetail>;
    id_penugasan?: string;
    penugasan?: Penugasan | null; // ← tambahkan ini
    
};

const toggleBtnClass = (active: boolean, activeColor: 'green' | 'red', disabled: boolean): string => {
    if (disabled) {
        return active
            ? `${activeColor === 'green' ? 'bg-green-500 border-green-500' : 'bg-red-500 border-red-500'} text-white opacity-60 cursor-not-allowed`
            : 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed';
    }
    if (active) {
        return activeColor === 'green'
            ? 'bg-green-500 border-green-500 text-white'
            : 'bg-red-500 border-red-500 text-white';
    }
    return activeColor === 'green'
        ? 'bg-white border-gray-200 text-gray-400 hover:border-green-400 hover:text-green-600 hover:bg-green-50'
        : 'bg-white border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-600 hover:bg-red-50';
};

export default function PenugasanReviewNilai() {
    const {
        breadcrumbs = [],
        pertanyaans = [],
        review = null,
        detail = {},
        id_penugasan,
        penugasan = null, // ← tambahkan ini
    } = usePage<PageProps>().props;
// true jika batas_waktu sudah lewat
const isDeadlinePassed = penugasan?.batas_waktu
    ? (() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // reset ke awal hari ini

        const deadline = new Date(penugasan.batas_waktu);
        deadline.setHours(0, 0, 0, 0); // reset ke awal hari deadline

        return today > deadline; // lewat hanya jika SETELAH tanggal deadline
    })()
    : false;

    const options = [...pertanyaans].sort((a, b) => a.nomor_urut - b.nomor_urut);

    const [answers, setAnswers] = useState<Record<string, boolean | null>>(
        Object.fromEntries(
            options.map((item) => [
                item.id,
                item.id in detail ? Boolean(detail[item.id].jawaban) : null,
            ]),
        ),
    );

    const [hasil, setHasil]       = useState<string>(review?.hasil ?? '');
    const [komentar, setKomentar] = useState<string>(review?.komentar ?? '');
    const [processing, setProcessing] = useState(false);

    // ── State modal konfirmasi ────────────────────────────────────────────
    const [showConfirm, setShowConfirm] = useState(false);

    const semuaYa     = options.length > 0 && options.every((item) => answers[item.id] === true);
    const adaYangTidak = options.some((item) => answers[item.id] === false);
    const allAnswered  = options.every((item) => answers[item.id] !== null);
    const answeredCount = Object.values(answers).filter((v) => v !== null).length;
    const isSelesai    = review?.status_review === 'Selesai';

    const toggle = (id: string, value: boolean) => {
        if (isSelesai) return;
        const newAnswers = { ...answers, [id]: answers[id] === value ? null : value };
        setAnswers(newAnswers);

        const allYa    = options.every((item) => newAnswers[item.id] === true);
        const anyTidak = options.some((item) => newAnswers[item.id] === false);
        if (allYa) setHasil('Lolos');
        else if (anyTidak) setHasil('Tidak Lolos');
        else setHasil('');
    };

    const handleSimpan = () => {
        setProcessing(true);
        router.post(
            `/reviewer/pt-penelitian/penugasan/${id_penugasan}/simpan-nilai`,
            { jawaban: answers, hasil, komentar, status: 'Draft' },
            { onFinish: () => setProcessing(false) },
        );
    };

    // ── Eksekusi setelah konfirmasi ───────────────────────────────────────
    const handleSelesaikan = () => {
        setProcessing(true);
        router.post(
            `/reviewer/pt-penelitian/penugasan/${id_penugasan}/selesaikan`,
            {},
            {
                onFinish: () => {
                    setProcessing(false);
                    setShowConfirm(false);
                },
            },
        );
    };

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length ? breadcrumbs : [
                    { title: 'Dashboard', href: '/dashboard' },
                    { title: 'Penugasan Review', href: '/reviewer/pt-penelitian/penugasan' },
                    { title: 'Penilaian Administrasi', href: '#' },
                ]
            }
        >
            <Head title="Penilaian Administrasi" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto space-y-4 px-3 py-6 sm:px-6 sm:py-10">

                    {/* ── Badge Status ── */}
                    {review && (
                        <div className={`flex items-start gap-2 px-3 py-2.5 sm:px-4 text-xs sm:text-sm font-medium border w-full sm:w-fit
                            ${isSelesai
                                ? 'bg-green-50 border-green-200 text-green-700'
                                : 'bg-amber-50 border-amber-200 text-amber-700'
                            }`}
                        >
                            {isSelesai
                                ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                                : <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                            }
                            {isSelesai
                                ? 'Review telah diselesaikan dan tidak dapat diubah lagi.'
                                : 'Draft tersimpan — lanjutkan mengisi dan selesaikan review.'}
                        </div>
                    )}
                    {isDeadlinePassed && !isSelesai && (
                        <div className="flex items-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-medium border bg-red-50 border-red-200 text-red-700 w-full sm:w-fit">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            Batas waktu review telah habis — penilaian tidak dapat diubah.
                        </div>
                    )}
                    {/* ── Checklist Administrasi ── */}
                    <div className="border border-gray-200 bg-white overflow-hidden">
                        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100">
                            <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                                Kriteria Penilaian Administrasi
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                {isSelesai
                                    ? 'Review sudah selesai — data tidak dapat diubah.'
                                    : 'Silahkan pilih jawaban untuk setiap kriteria penilaian'}
                            </p>
                        </div>

                        {/* Desktop */}
                        <div className="hidden sm:block">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                                        <th className="px-6 py-3 w-10">No</th>
                                        <th className="px-6 py-3">Kriteria</th>
                                        <th className="px-6 py-3 text-center w-64">Penilaian</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {options.map((item) => {
                                        const val = answers[item.id];
                                        return (
                                            <tr key={item.id} className={`transition-colors duration-200 ${
                                                isSelesai
                                                    ? val === true ? 'bg-green-50/40' : val === false ? 'bg-red-50/40' : ''
                                                    : val === true ? 'bg-green-50/60' : val === false ? 'bg-red-50/60' : 'hover:bg-gray-50'
                                            }`}>
                                                <td className="px-6 py-4 text-gray-400 font-medium">{item.nomor_urut}</td>
                                                <td className="px-6 py-4 text-gray-700 leading-snug">{item.pertanyaan}</td>
                                                <td className="px-6 py-4">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button onClick={() => toggle(item.id, true)} disabled={isSelesai}
                                                            className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold border transition-all duration-150 ${toggleBtnClass(val === true, 'green', isSelesai)}`}>
                                                            <CheckSquare className="w-3.5 h-3.5 shrink-0" /> Sesuai
                                                        </button>
                                                        <button onClick={() => toggle(item.id, false)} disabled={isSelesai}
                                                            className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold border transition-all duration-150 ${toggleBtnClass(val === false, 'red', isSelesai)}`}>
                                                            <XSquare className="w-3.5 h-3.5 shrink-0" /> Tidak Sesuai
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile */}
                        <div className="sm:hidden divide-y divide-gray-100">
                            {options.map((item) => {
                                const val = answers[item.id];
                                return (
                                    <div key={item.id} className={`px-4 py-3 transition-colors duration-200 ${
                                        isSelesai
                                            ? val === true ? 'bg-green-50/40' : val === false ? 'bg-red-50/40' : ''
                                            : val === true ? 'bg-green-50/60' : val === false ? 'bg-red-50/60' : ''
                                    }`}>
                                        <div className="flex gap-2 mb-2.5">
                                            <span className="text-xs font-medium text-gray-400 shrink-0 mt-0.5">{item.nomor_urut}.</span>
                                            <p className="text-xs text-gray-700 leading-snug">{item.pertanyaan}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 ml-4">
                                            <button onClick={() => toggle(item.id, true)} disabled={isSelesai}
                                                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold border transition-all duration-150 ${toggleBtnClass(val === true, 'green', isSelesai)}`}>
                                                <CheckSquare className="w-3.5 h-3.5 shrink-0" /> Sesuai
                                            </button>
                                            <button onClick={() => toggle(item.id, false)} disabled={isSelesai}
                                                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold border transition-all duration-150 ${toggleBtnClass(val === false, 'red', isSelesai)}`}>
                                                <XSquare className="w-3.5 h-3.5 shrink-0" /> Tidak Sesuai
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Progress bar */}
                        <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-gray-200 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${
                                        allAnswered ? semuaYa ? 'bg-green-500' : 'bg-red-400' : 'bg-blue-400'
                                    }`}
                                    style={{ width: `${options.length ? (answeredCount / options.length) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-400 tabular-nums shrink-0">
                                {answeredCount}/{options.length} terjawab
                            </span>
                        </div>
                    </div>

                    {/* ── Kesimpulan Review ── */}
                    <div className="border border-gray-200 bg-white p-4 sm:p-6 space-y-4 sm:space-y-5">
                        <h2 className="text-sm sm:text-base font-semibold text-gray-800">Kesimpulan Review</h2>

                        <div className="space-y-2">
                            {!isSelesai && (
                                <div className={`px-3 py-2 text-xs font-medium flex items-start gap-2 ${
                                    semuaYa ? 'bg-green-50 text-green-700 border border-green-100'
                                    : adaYangTidak ? 'bg-red-50 text-red-700 border border-red-100'
                                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                                }`}>
                                    {semuaYa ? (
                                        <><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /><span>Semua kriteria terpenuhi — hasil otomatis <strong>Lolos</strong></span></>
                                    ) : adaYangTidak ? (
                                        <><XCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>Ada kriteria tidak terpenuhi — hasil otomatis <strong>Tidak Lolos</strong></span></>
                                    ) : (
                                        <><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>Jawab semua pertanyaan untuk menentukan hasil review</span></>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                <button onClick={() => setHasil('Lolos')} disabled={!semuaYa || isSelesai}
                                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 border text-xs sm:text-sm font-semibold transition-all duration-150 ${toggleBtnClass(hasil === 'Lolos', 'green', !semuaYa || isSelesai)}`}>
                                    <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> Lolos
                                </button>
                                <button onClick={() => setHasil('Tidak Lolos')} disabled={semuaYa || !allAnswered || isSelesai}
                                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 border text-xs sm:text-sm font-semibold transition-all duration-150 ${toggleBtnClass(hasil === 'Tidak Lolos', 'red', semuaYa || !allAnswered || isSelesai)}`}>
                                    <XCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> Tidak Lolos
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Komentar / Catatan <span className="text-gray-400 font-normal ml-1">(opsional)</span>
                            </label>
                            <textarea
                                rows={4}
                                value={komentar}
                                disabled={isSelesai}
                                onChange={(e) => setKomentar(e.target.value)}
                                placeholder="Tuliskan catatan atau komentar untuk pengusul..."
                                className={`w-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition resize-none ${isSelesai ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}`}
                            />
                        </div>

                        {!isSelesai && (!allAnswered || !hasil) && (
                            <div className="text-xs text-amber-600 space-y-0.5">
                                {!allAnswered && (
                                    <p className="flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                        Semua kriteria penilaian harus dijawab sebelum menyimpan.
                                    </p>
                                )}
                                {allAnswered && !hasil && (
                                    <p className="flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                        Pilih hasil review terlebih dahulu.
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ── Action Buttons ── */}
                        <div className={`flex gap-2 sm:gap-3 pt-2 border-t border-gray-100 ${
                            !review || isSelesai ? 'justify-end' : 'flex-col sm:flex-row sm:justify-end'
                        }`}>
                            {!review ? (
                                <button onClick={handleSimpan}   disabled={processing || isDeadlinePassed}  // ← tambahkan
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-sm font-semibold text-white hover:bg-green-700 transition disabled:opacity-40 disabled:cursor-not-allowed">
                                    {processing
                                        ? <><Loader2 className="w-4 h-4 animate-spin shrink-0" /> Menyimpan...</>
                                        : <><Save className="w-4 h-4 shrink-0" /> Simpan Draft</>}
                                </button>
                            ) : isSelesai ? (
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    Review telah diselesaikan
                                </div>
                            ) : (
                                <>
                                    <button onClick={handleSimpan}   disabled={processing || isDeadlinePassed}  // ← tambahkan
                                        className="flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50">
                                        {processing
                                            ? <><Loader2 className="w-4 h-4 animate-spin shrink-0" /> Memperbarui...</>
                                            : <><RefreshCw className="w-4 h-4 shrink-0" /> Perbarui Review</>}
                                    </button>

                                    {/* ── Selesaikan → buka modal konfirmasi ── */}
                                    <button
                                        onClick={() => setShowConfirm(true)}
                                        disabled={processing || !allAnswered || !hasil || isDeadlinePassed}  // ← tambahkan
                                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        Selesaikan Review
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
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Selesaikan Review?</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Setelah ditandai <strong>Selesai</strong>, review ini <strong>tidak dapat diubah</strong> lagi. Pastikan semua jawaban dan hasil sudah benar.
                                </p>
                                {/* Ringkasan hasil */}
                                <div className={`mt-3 flex items-center gap-2 px-3 py-2 text-xs font-semibold border ${
                                    hasil === 'Lolos'
                                        ? 'bg-green-50 border-green-200 text-green-700'
                                        : 'bg-red-50 border-red-200 text-red-700'
                                }`}>
                                    {hasil === 'Lolos'
                                        ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                        : <XCircle className="w-3.5 h-3.5 shrink-0" />
                                    }
                                    Hasil: {hasil}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                disabled={processing}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleSelesaikan}
                                disabled={processing}
                                className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Ya, Selesaikan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppHeaderLayout>
    );
}