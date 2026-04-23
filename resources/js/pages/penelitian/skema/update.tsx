import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

type Breadcrumb = { title: string; href: string };

type Skema = {
    uuid: string;
    jenis_skema: string;
    nama: string;
    nama_singkat: string;
    multi_tahun: number;
    lama_tahun_max: number | null;
    biaya_minimal: number;
    biaya_maksimal: number;
    sumber_dana: string;
    anggota_min: number;
    anggota_max: number;
    kewajiban_luaran: string | null;
    status_aktif: string | null;
    mulai: string;
    selesai: string;
    status: string;
};

type Periode = {
    id: string;
    uuid_skema: string;
    periode: string;
    nama_periode: string;
    tahun: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    tanggal_akhir_acc: string;
    tanggal_akhir_submit: string;
    is_active: boolean | number;
};

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    skema: Skema;
    periodeList: Periode[];
    flash?: { success?: string };
};

// ─── Reusable Field Components ────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
            {children}
        </label>
    );
}

function InputField(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="block w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 transition focus:border-indigo-400 focus:bg-white focus:ring-1 focus:ring-indigo-300 focus:outline-none"
        />
    );
}

function SelectField(
    props: React.SelectHTMLAttributes<HTMLSelectElement> & {
        children: React.ReactNode;
    },
) {
    const { children, ...rest } = props;
    return (
        <select
            {...rest}
            className="block w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 transition focus:border-indigo-400 focus:bg-white focus:ring-1 focus:ring-indigo-300 focus:outline-none"
        >
            {children}
        </select>
    );
}

// ─── Main Component ───────────────────────────────────────────
export default function UpdateSkemaIndex() {
    const {
        breadcrumbs = [],
        skema,
        periodeList = [],
        flash,
    } = usePage<PageProps>().props;
    const [showFormPeriode, setShowFormPeriode] = useState(false);
    // Tambah di bawah useState showFormPeriode yang sudah ada
    const ITEMS_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);

    // Reset ke hal 1 setiap kali list berubah
    const totalPages = Math.ceil(periodeList.length / ITEMS_PER_PAGE);
    const pagedPeriode = periodeList.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );
    // Form Skema
    const { data, setData, put, processing, errors } = useForm({
        jenis_skema: skema.jenis_skema || '',
        nama: skema.nama || '',
        nama_singkat: skema.nama_singkat || '',
        multi_tahun: skema.multi_tahun || 0,
        lama_tahun_max: skema.lama_tahun_max || '',
        biaya_minimal: skema.biaya_minimal || 0,
        biaya_maksimal: skema.biaya_maksimal || 0,
        sumber_dana: skema.sumber_dana || '',
        anggota_min: skema.anggota_min || 0,
        anggota_max: skema.anggota_max || 0,
        kewajiban_luaran: skema.kewajiban_luaran || '',
        mulai: skema.mulai || '',
        selesai: skema.selesai || '',
        status: skema.status || 'aktif',
    });

    const submitSkema: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/pt-skema/${skema.uuid}/update-skema`);
    };

    // Form Periode
    const {
        data: pData,
        setData: setPData,
        post: postPeriode,
        processing: pProcessing,
        errors: pErrors,
        reset: resetPeriode,
    } = useForm({
        periode: '',
        nama_periode: '',
        tahun: new Date().getFullYear(),
        tanggal_mulai: '',
        tanggal_selesai: '',
        tanggal_akhir_acc: '',
        tanggal_akhir_submit: '',
        is_active: false,
    });

    const submitPeriode: FormEventHandler = (e) => {
        e.preventDefault();
        postPeriode(`/admin/pt-skema/${skema.uuid}/periode`, {
            onSuccess: () => {
                resetPeriode();
                setShowFormPeriode(false);
                setCurrentPage(1); // ← tambah ini
            },
        });
    };

    const handleAktifkan = (periodeId: string) => {
        router.patch(
            `/admin/pt-skema/${skema.uuid}/periode/${periodeId}/aktif`,
            {},
            {
                onSuccess: () => setCurrentPage(1),
            },
        );
    };

    const handleHapus = (periodeId: string) => {
        if (!confirm('Yakin ingin menghapus periode ini?')) return;
        router.delete(`/admin/pt-skema/${skema.uuid}/periode/${periodeId}`, {
            onSuccess: () => setCurrentPage(1),
        });
    };

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length
                    ? breadcrumbs
                    : [
                          { title: 'Dashboard', href: '/dashboard' },
                          { title: 'Skema', href: '/admin/skema' },
                          { title: 'Update Skema', href: '#' },
                      ]
            }
        >
            <Head title="Update Skema" />
            <DashboardNav />

            <div className="bg-gray-50 px-4 py-8">
                <div className="mx-auto max-w-7xl">
                    {/* Flash */}
                    {flash?.success && (
                        <div className="mb-4 flex items-center gap-2 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                            <span className="text-base">✓</span>
                            {flash.success}
                        </div>
                    )}

                    {/* ── Split Layout ── */}
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                        {/* ── KIRI: Form Skema (flex-grow lebih besar) ── */}
                        <div className="w-full border border-gray-200 bg-white shadow-sm lg:flex-[3]">
                            {/* Header */}
                            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                                <div className="flex h-8 w-8 items-center justify-center bg-indigo-100 text-indigo-600">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-800">
                                        Data Skema
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        {skema.nama_singkat || skema.nama}
                                    </p>
                                </div>
                            </div>

                            {/* Body Form */}
                            <form onSubmit={submitSkema} className="p-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <FieldLabel>Nama Skema</FieldLabel>
                                        <InputField
                                            type="text"
                                            value={data.nama}
                                            onChange={(e) =>
                                                setData('nama', e.target.value)
                                            }
                                        />
                                        {errors.nama && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.nama}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <FieldLabel>Nama Singkat</FieldLabel>
                                        <InputField
                                            type="text"
                                            value={data.nama_singkat}
                                            onChange={(e) =>
                                                setData(
                                                    'nama_singkat',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel>Jenis Skema</FieldLabel>
                                        <SelectField
                                            value={data.jenis_skema}
                                            onChange={(e) =>
                                                setData(
                                                    'jenis_skema',
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="Penelitian">
                                                Penelitian
                                            </option>
                                            <option value="Pengabdian">
                                                Pengabdian
                                            </option>
                                        </SelectField>
                                    </div>

                                    <div>
                                        <FieldLabel>Sumber Dana</FieldLabel>
                                        <InputField
                                            type="text"
                                            value={data.sumber_dana}
                                            onChange={(e) =>
                                                setData(
                                                    'sumber_dana',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel>Multi Tahun</FieldLabel>
                                        <SelectField
                                            value={data.multi_tahun}
                                            onChange={(e) =>
                                                setData(
                                                    'multi_tahun',
                                                    Number(e.target.value),
                                                )
                                            }
                                        >
                                            <option value={1}>Ya</option>
                                            <option value={0}>Tidak</option>
                                        </SelectField>
                                    </div>

                                    {/* Biaya */}
                                    <div>
                                        <FieldLabel>
                                            Biaya Minimal (Rp)
                                        </FieldLabel>
                                        <InputField
                                            type="number"
                                            value={data.biaya_minimal}
                                            onChange={(e) =>
                                                setData(
                                                    'biaya_minimal',
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel>
                                            Biaya Maksimal (Rp)
                                        </FieldLabel>
                                        <InputField
                                            type="number"
                                            value={data.biaya_maksimal}
                                            onChange={(e) =>
                                                setData(
                                                    'biaya_maksimal',
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                    </div>

                                    {/* Anggota */}
                                    <div>
                                        <FieldLabel>Anggota Min</FieldLabel>
                                        <InputField
                                            type="number"
                                            value={data.anggota_min}
                                            onChange={(e) =>
                                                setData(
                                                    'anggota_min',
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel>Anggota Max</FieldLabel>
                                        <InputField
                                            type="number"
                                            value={data.anggota_max}
                                            onChange={(e) =>
                                                setData(
                                                    'anggota_max',
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                    </div>

                                    {/* Tanggal */}
                                    <div>
                                        <FieldLabel>Tanggal Mulai</FieldLabel>
                                        <InputField
                                            type="date"
                                            value={data.mulai}
                                            onChange={(e) =>
                                                setData('mulai', e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel>Tanggal Selesai</FieldLabel>
                                        <InputField
                                            type="date"
                                            value={data.selesai}
                                            onChange={(e) =>
                                                setData(
                                                    'selesai',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel>Status</FieldLabel>
                                        <SelectField
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    'status',
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="aktif">Aktif</option>
                                            <option value="tidak aktif">
                                                Tidak Aktif
                                            </option>
                                        </SelectField>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end border-t border-gray-100 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* ── KANAN: Periode (flex sedikit lebih kecil, sticky) ── */}
                        <div className="w-full lg:sticky lg:top-6 lg:flex-[2]">
                            <div className="border border-gray-200 bg-white shadow-sm">
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center bg-emerald-100 text-emerald-600">
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-semibold text-gray-800">
                                                Periode
                                            </h2>
                                            <p className="text-xs text-gray-400">
                                                {periodeList.length} periode
                                                terdaftar
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setShowFormPeriode((v) => !v)
                                        }
                                        className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold transition ${
                                            showFormPeriode
                                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                        }`}
                                    >
                                        {showFormPeriode
                                            ? '✕ Batal'
                                            : '+ Tambah'}
                                    </button>
                                </div>

                                {/* Form Tambah Periode */}
                                {showFormPeriode && (
                                    <form
                                        onSubmit={submitPeriode}
                                        className="border-b border-dashed border-emerald-200 bg-emerald-50 px-5 py-4"
                                    >
                                        <p className="mb-3 text-xs font-semibold tracking-wide text-emerald-700 uppercase">
                                            Tambah Periode Baru
                                        </p>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <FieldLabel>
                                                        Kode
                                                    </FieldLabel>
                                                    <InputField
                                                        type="text"
                                                        placeholder="I, II, A1"
                                                        value={pData.periode}
                                                        onChange={(e) =>
                                                            setPData(
                                                                'periode',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    {pErrors.periode && (
                                                        <p className="mt-0.5 text-xs text-red-500">
                                                            {pErrors.periode}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <FieldLabel>
                                                        Tahun
                                                    </FieldLabel>
                                                    <InputField
                                                        type="number"
                                                        value={pData.tahun}
                                                        onChange={(e) =>
                                                            setPData(
                                                                'tahun',
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <FieldLabel>
                                                    Nama Periode
                                                </FieldLabel>
                                                <InputField
                                                    type="text"
                                                    placeholder="cth: Periode I 2025"
                                                    value={pData.nama_periode}
                                                    onChange={(e) =>
                                                        setPData(
                                                            'nama_periode',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {pErrors.nama_periode && (
                                                    <p className="mt-0.5 text-xs text-red-500">
                                                        {pErrors.nama_periode}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <FieldLabel>
                                                        Tgl Mulai
                                                    </FieldLabel>
                                                    <InputField
                                                        type="datetime-local"
                                                        value={
                                                            pData.tanggal_mulai
                                                        }
                                                        onChange={(e) =>
                                                            setPData(
                                                                'tanggal_mulai',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <FieldLabel>
                                                        Tgl Selesai
                                                    </FieldLabel>
                                                    <InputField
                                                        type="datetime-local"
                                                        value={
                                                            pData.tanggal_selesai
                                                        }
                                                        onChange={(e) =>
                                                            setPData(
                                                                'tanggal_selesai',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <FieldLabel>
                                                        Batas Acc
                                                    </FieldLabel>
                                                    <InputField
                                                        type="datetime-local"
                                                        value={
                                                            pData.tanggal_akhir_acc
                                                        }
                                                        onChange={(e) =>
                                                            setPData(
                                                                'tanggal_akhir_acc',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <FieldLabel>
                                                        Batas Submit
                                                    </FieldLabel>
                                                    <InputField
                                                        type="datetime-local"
                                                        value={
                                                            pData.tanggal_akhir_submit
                                                        }
                                                        onChange={(e) =>
                                                            setPData(
                                                                'tanggal_akhir_submit',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    checked={pData.is_active}
                                                    onChange={(e) =>
                                                        setPData(
                                                            'is_active',
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="h-3.5 w-3.5 accent-emerald-600"
                                                />
                                                <span>Langsung aktifkan</span>
                                                <span className="text-gray-400">
                                                    (nonaktifkan yang lain)
                                                </span>
                                            </label>

                                            <button
                                                type="submit"
                                                disabled={pProcessing}
                                                className="w-full bg-emerald-600 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                                            >
                                                {pProcessing
                                                    ? 'Menyimpan...'
                                                    : 'Simpan Periode'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Daftar Periode */}
                                {/* Daftar Periode */}
                                <div className="divide-y divide-gray-50">
                                    {periodeList.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                            <div className="mb-2 text-3xl text-gray-200">
                                                📅
                                            </div>
                                            <p className="text-xs text-gray-400">
                                                Belum ada periode
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            {pagedPeriode.map((p) => (
                                                <div
                                                    key={p.id}
                                                    className="px-5 py-3 transition hover:bg-gray-50"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        {/* Info kiri */}
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="bg-gray-100 px-1.5 py-0.5 font-mono text-xs font-bold text-gray-600">
                                                                    {p.periode}
                                                                </span>
                                                                {p.is_active ? (
                                                                    <span className="bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                                                        ● Aktif
                                                                    </span>
                                                                ) : (
                                                                    <span className="bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
                                                                        Non-aktif
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="mt-1 truncate text-xs font-medium text-gray-700">
                                                                {p.nama_periode}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                {p.tahun}
                                                            </p>
                                                            <div className="mt-1 space-y-0.5 text-xs text-gray-400">
                                                                <p>
                                                                    Mulai:{' '}
                                                                    {
                                                                        p.tanggal_mulai
                                                                    }
                                                                </p>
                                                                <p>
                                                                    Submit:{' '}
                                                                    {
                                                                        p.tanggal_akhir_submit
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Aksi kanan */}
                                                        <div className="flex flex-shrink-0 flex-col gap-1.5 pt-0.5">
                                                            {!p.is_active && (
                                                                <button
                                                                    onClick={() =>
                                                                        handleAktifkan(
                                                                            p.id,
                                                                        )
                                                                    }
                                                                    className="bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                                                                >
                                                                    Aktifkan
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() =>
                                                                    handleHapus(
                                                                        p.id,
                                                                    )
                                                                }
                                                                className="bg-red-50 px-2 py-1 text-xs font-medium text-red-500 transition hover:bg-red-100"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* ── Pagination ── */}
                                            {totalPages > 1 && (
                                                <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
                                                    {/* Info */}
                                                    <p className="text-xs text-gray-400">
                                                        {(currentPage - 1) *
                                                            ITEMS_PER_PAGE +
                                                            1}
                                                        –
                                                        {Math.min(
                                                            currentPage *
                                                                ITEMS_PER_PAGE,
                                                            periodeList.length,
                                                        )}{' '}
                                                        dari{' '}
                                                        {periodeList.length}
                                                    </p>

                                                    {/* Tombol navigasi */}
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    (p) =>
                                                                        Math.max(
                                                                            1,
                                                                            p -
                                                                                1,
                                                                        ),
                                                                )
                                                            }
                                                            disabled={
                                                                currentPage ===
                                                                1
                                                            }
                                                            className="flex h-6 w-6 items-center justify-center text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                                                            title="Halaman sebelumnya"
                                                        >
                                                            ‹
                                                        </button>

                                                        {/* Nomor halaman */}
                                                        {Array.from(
                                                            {
                                                                length: totalPages,
                                                            },
                                                            (_, i) => i + 1,
                                                        ).map((page) => {
                                                            // Tampilkan: halaman pertama, terakhir, aktif, dan ±1 dari aktif
                                                            const show =
                                                                page === 1 ||
                                                                page ===
                                                                    totalPages ||
                                                                Math.abs(
                                                                    page -
                                                                        currentPage,
                                                                ) <= 1;

                                                            // Titik-titik ellipsis
                                                            const showEllipsisBefore =
                                                                page ===
                                                                    currentPage -
                                                                        2 &&
                                                                currentPage > 3;
                                                            const showEllipsisAfter =
                                                                page ===
                                                                    currentPage +
                                                                        2 &&
                                                                currentPage <
                                                                    totalPages -
                                                                        2;

                                                            if (
                                                                showEllipsisBefore ||
                                                                showEllipsisAfter
                                                            ) {
                                                                return (
                                                                    <span
                                                                        key={`ellipsis-${page}`}
                                                                        className="px-0.5 text-xs text-gray-300"
                                                                    >
                                                                        …
                                                                    </span>
                                                                );
                                                            }

                                                            if (!show)
                                                                return null;

                                                            return (
                                                                <button
                                                                    key={page}
                                                                    onClick={() =>
                                                                        setCurrentPage(
                                                                            page,
                                                                        )
                                                                    }
                                                                    className={`flex h-6 w-6 items-center justify-center text-xs transition ${
                                                                        currentPage ===
                                                                        page
                                                                            ? 'bg-emerald-600 font-semibold text-white'
                                                                            : 'text-gray-500 hover:bg-gray-100'
                                                                    }`}
                                                                >
                                                                    {page}
                                                                </button>
                                                            );
                                                        })}

                                                        <button
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    (p) =>
                                                                        Math.min(
                                                                            totalPages,
                                                                            p +
                                                                                1,
                                                                        ),
                                                                )
                                                            }
                                                            disabled={
                                                                currentPage ===
                                                                totalPages
                                                            }
                                                            className="flex h-6 w-6 items-center justify-center text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                                                            title="Halaman berikutnya"
                                                        >
                                                            ›
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* CONTEN BARU */}
                            {/* ── Placeholder Box ── */}
                            <div className="mt-3 mb-5 border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center shadow-md">
                                <div className="mb-3 flex justify-center">
                                    <div className="flex h-12 w-12 items-center justify-center bg-gray-100">
                                        <svg
                                            className="h-6 w-6 text-gray-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-400">
                                    SETTING LUARAN WAJIB
                                </p>
                                <div className="mt-4 space-y-2">
                                    {/* Skeleton placeholder bars */}
                                    <div className="mx-auto h-2 w-3/4 bg-gray-200" />
                                    <div className="mx-auto h-2 w-1/2 bg-gray-200" />
                                    <div className="mx-auto h-2 w-2/3 bg-gray-200" />
                                </div>
                            </div>
                            {/* ── Placeholder Box ── */}
                            <div className="mt-3 mb-5 border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center shadow-md">
                                <div className="mb-3 flex justify-center">
                                    <div className="flex h-12 w-12 items-center justify-center bg-gray-100">
                                        <svg
                                            className="h-6 w-6 text-gray-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-400">
                                    SETTING LUARAN AKTUAL
                                </p>

                                <div className="mt-4 space-y-2">
                                    {/* Skeleton placeholder bars */}
                                    <div className="mx-auto h-2 w-3/4 bg-gray-200" />
                                    <div className="mx-auto h-2 w-1/2 bg-gray-200" />
                                    <div className="mx-auto h-2 w-2/3 bg-gray-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end split */}
                </div>
            </div>
        </AppHeaderLayout>
    );
}
