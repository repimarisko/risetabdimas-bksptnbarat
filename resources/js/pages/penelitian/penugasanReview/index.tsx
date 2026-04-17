import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { CheckCircle2, Search, XCircle, AlertCircle, User2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Breadcrumb = { title: string; href: string };
type User = { id: number; name: string; email: string };

type PenugasanInfo = {
    id_penugasan: number | null;
    id_reviewer: number | null;
    reviewer_name?: string | null;
    reviewer_email?: string | null;
    status_review: string | null;
    batas_waktu: string | null;
    hasil?: string | null;
    tanggal_penugasan?: string | null;
};

type Penelitian = {
    uuid: string;
    title: string;
    tahun: number;
    tahun_pelaksanaan: number;
    status: string;
    user: User | null;
    administrasi: PenugasanInfo[];
    substansi: PenugasanInfo[];
};

type Reviewer = {
    id: number;
    name: string;
    email: string;
};

type Penugasan = {
    id: number;
    id_reviewer: number;
    id_jenis_penugasan: number;
    reviewer_name: string;
    reviewer_email: string;
    tanggal_penugasan: string;
    batas_waktu: string;
    status_review: string;
    jenis_nama: string;
};

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    penelitian?: Penelitian[];
    reviewers?: Reviewer[];
};

type ModalMode = 'create' | 'edit';

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_PENUGASAN: Record<string, { text: string; dot: string }> = {
    Pending: { text: 'text-amber-600', dot: 'bg-amber-400' },
    Selesai: { text: 'text-emerald-600', dot: 'bg-emerald-400' },
};

const FILTER_ADMINISTRASI = [
    { value: '', label: 'Semua Administrasi' },
    { value: 'Lolos', label: 'Lolos' },
    { value: 'Tidak Lolos', label: 'Tidak Lolos' },
    { value: 'belum', label: 'Belum Direview' },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function isLolosAdministrasi(status: string | null | undefined): boolean {
    return status === 'Lolos';
}

function getAdministrasiResult(p: Penelitian): string | null {
    return p.administrasi.find((item) => !!item.hasil)?.hasil ?? null;
}

function getAdministrasiCount(p: Penelitian): number {
    return p.administrasi.length;
}

function getSubstansiCount(p: Penelitian): number {
    return p.substansi.length;
}

// ─── Sub Components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    if (status === 'Disetujui') {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui
            </span>
        );
    }
    if (status === 'Ditolak') {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                <XCircle className="w-3.5 h-3.5" /> Ditolak
            </span>
        );
    }
    return <span className="text-xs text-gray-400">{status || 'Belum Direview'}</span>;
}

function AdministrasiBadge({ status }: { status: string | null | undefined }) {
    if (status === 'Lolos') {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" /> Lolos
            </span>
        );
    }
    if (status === 'Tidak Lolos') {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                <XCircle className="w-3.5 h-3.5" /> Tidak Lolos
            </span>
        );
    }
    return <span className="text-xs text-gray-400">{status || 'Belum Direview'}</span>;
}

// ─── Accordion Row ────────────────────────────────────────────────────────────

function AccordionRow({
    administrasi,
    substansi,
    onEdit,
    onDelete,
}: {
    administrasi: PenugasanInfo[];
    substansi: PenugasanInfo[];
    onEdit: (item: PenugasanInfo, jenis: number) => void;
    onDelete: (item: PenugasanInfo, jenis: number) => void;
}) {
    const hasAny = administrasi.length > 0 || substansi.length > 0;

    if (!hasAny) {
        return (
            <tr>
                <td colSpan={7} className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 italic">Belum ada penugasan reviewer</p>
                </td>
            </tr>
        );
    }

    const groups = [
        { label: 'Administrasi', jenis: 1, items: administrasi },
        { label: 'Substansi', jenis: 2, items: substansi },
    ];

    return (
        <tr>
            <td colSpan={7} className="bg-gray-50 border-b border-gray-100">
                <div className="px-6 py-3 space-y-3">
                    {groups.map(({ label, jenis, items }, gi) => {
                        if (!items.length) return null;

                        return (
                            <div key={jenis}>
                                {gi > 0 && <div className="border-t border-gray-200 mb-3" />}
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    {label}
                                </p>

                                <div className="space-y-2">
                                    {items.map((data) => {
                                        const sc =
                                            STATUS_PENUGASAN[data.status_review ?? ''] ?? {
                                                text: 'text-gray-500',
                                                dot: 'bg-gray-400',
                                            };

                                        return (
                                            <div
                                                key={data.id_penugasan ?? `${jenis}-${data.id_reviewer}`}
                                                className="flex items-center justify-between py-1.5"
                                            >
                                                <div>
                                                    <p className="text-xs font-medium text-gray-700">
                                                        {data.reviewer_name ?? '—'}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {data.reviewer_email ?? '—'}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-5">
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-400">Batas</p>
                                                        <p className="text-xs text-gray-600">
                                                            {data.batas_waktu ?? '—'}
                                                        </p>
                                                    </div>

                                                    <div className={`flex items-center gap-1.5 text-xs ${sc.text}`}>
                                                        <span className={`w-1.5 h-1.5 shrink-0 ${sc.dot}`} />
                                                        {data.status_review || '—'}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => onEdit(data, jenis)}
                                                            className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => onDelete(data, jenis)}
                                                            className="inline-flex items-center gap-1 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </td>
        </tr>
    );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
    open,
    mode,
    onClose,
    penelitian,
    reviewers,
    onSubmit,
    loading,
    editData,
}: {
    open: boolean;
    mode: ModalMode;
    onClose: () => void;
    penelitian: Penelitian | null;
    reviewers: Reviewer[];
    onSubmit: (data: Record<string, string>) => void;
    loading: boolean;
    editData?: Penugasan | null;
}) {
    const [form, setForm] = useState({
        id_reviewer: '',
        id_jenis_penugasan: '',
        tanggal_penugasan: '',
        batas_waktu: '',
    });

    useEffect(() => {
        if (mode === 'edit' && editData) {
            setForm({
                id_reviewer: String(editData.id_reviewer),
                id_jenis_penugasan: String(editData.id_jenis_penugasan),
                tanggal_penugasan: editData.tanggal_penugasan ?? '',
                batas_waktu: editData.batas_waktu ?? '',
            });
            return;
        }

        setForm({
            id_reviewer: '',
            id_jenis_penugasan: '',
            tanggal_penugasan: '',
            batas_waktu: '',
        });
    }, [editData, mode, open]);

    const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    if (!open || !penelitian) return null;

    const hasilAdministrasi = getAdministrasiResult(penelitian);
    const lolosAdministrasi = isLolosAdministrasi(hasilAdministrasi);

    const jumlahAdministrasi = penelitian.administrasi.length;
    const jumlahSubstansi = penelitian.substansi.length;

    const administrasiSudahPenuh = jumlahAdministrasi >= 1;
    const substansiSudahPenuh = jumlahSubstansi >= 2;

    const selectedJenis = form.id_jenis_penugasan;
    const reviewerSudahDipakaiPadaJenis =
        selectedJenis === '1'
            ? penelitian.administrasi.some((item) => String(item.id_reviewer) === form.id_reviewer && item.id_penugasan !== editData?.id)
            : selectedJenis === '2'
              ? penelitian.substansi.some((item) => String(item.id_reviewer) === form.id_reviewer && item.id_penugasan !== editData?.id)
              : false;

    const administrasiBlocked =
        form.id_jenis_penugasan === '1' && administrasiSudahPenuh && mode === 'create';

    const substansiBlockedByAdmin =
        form.id_jenis_penugasan === '2' && !lolosAdministrasi;

    const substansiBlockedByLimit =
        form.id_jenis_penugasan === '2' && substansiSudahPenuh && mode === 'create';

    const valid =
        !!form.id_reviewer &&
        !!form.id_jenis_penugasan &&
        !!form.tanggal_penugasan &&
        !!form.batas_waktu &&
        !administrasiBlocked &&
        !substansiBlockedByAdmin &&
        !substansiBlockedByLimit &&
        !reviewerSudahDipakaiPadaJenis;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative bg-white w-full max-w-md border border-gray-200 z-10">
                <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                            {mode === 'edit' ? 'Edit Penugasan' : 'Penugasan Review'}
                        </p>
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{penelitian.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 mt-0.5 ml-4 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-5 py-4 space-y-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Jenis Penugasan</label>
                        <div className="flex gap-3">
                            {[
                                {
                                    id: '1',
                                    label: 'Administrasi',
                                    hint:
                                        mode === 'create'
                                            ? administrasiSudahPenuh
                                                ? 'Kuota reviewer penuh'
                                                : `Terisi ${jumlahAdministrasi}/1 reviewer`
                                            : `Terisi ${jumlahAdministrasi}/1 reviewer`,
                                },
                                {
                                    id: '2',
                                    label: 'Substansi',
                                    hint: !lolosAdministrasi
                                        ? 'Belum Lolos Administrasi'
                                        : mode === 'create'
                                          ? substansiSudahPenuh
                                              ? 'Kuota reviewer penuh'
                                              : `Terisi ${jumlahSubstansi}/2 reviewer`
                                          : `Terisi ${jumlahSubstansi}/2 reviewer`,
                                },
                            ].map((j) => {
                                const isLocked =
                                    (j.id === '1' && administrasiSudahPenuh && mode === 'create') ||
                                    (j.id === '2' && !lolosAdministrasi) ||
                                    (j.id === '2' && substansiSudahPenuh && mode === 'create');

                                const isSelected = form.id_jenis_penugasan === j.id;

                                return (
                                    <button
                                        key={j.id}
                                        type="button"
                                        onClick={() => !isLocked && set('id_jenis_penugasan', j.id)}
                                        disabled={isLocked || mode === 'edit'}
                                        className={`flex-1 py-2 px-3 text-sm border transition-colors ${
                                            isLocked || mode === 'edit'
                                                ? isSelected
                                                    ? 'border-green-700 bg-green-600 text-white'
                                                    : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                                                : isSelected
                                                  ? 'border-green-700 bg-green-600 text-white'
                                                  : 'border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700'
                                        }`}
                                    >
                                        <span className="block font-medium">{j.label}</span>
                                        <span
                                            className={`block text-[10px] mt-0.5 ${
                                                isLocked || mode === 'edit'
                                                    ? isSelected
                                                        ? 'text-green-100'
                                                        : 'text-gray-300'
                                                    : isSelected
                                                      ? 'text-green-100'
                                                      : 'text-gray-400'
                                            }`}
                                        >
                                            {j.hint}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {administrasiBlocked && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-600">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>Reviewer administrasi sudah mencapai batas maksimal 2 orang.</span>
                            </div>
                        )}

                        {substansiBlockedByAdmin && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-600">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>
                                    Penugasan substansi hanya bisa dilakukan setelah penelitian dinyatakan <strong>Lolos</strong> administrasi.
                                </span>
                            </div>
                        )}

                        {substansiBlockedByLimit && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-600">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>Reviewer substansi sudah mencapai batas maksimal 2 orang.</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Reviewer</label>
                        <select
                            value={form.id_reviewer}
                            onChange={(e) => set('id_reviewer', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 text-gray-700 focus:outline-none focus:border-gray-500 transition-colors bg-white"
                        >
                            <option value="">Pilih reviewer…</option>
                            {reviewers.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.name} — {r.email}
                                </option>
                            ))}
                        </select>

                        {reviewerSudahDipakaiPadaJenis && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-600">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>Reviewer tersebut sudah ditugaskan pada jenis penugasan ini.</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">Tanggal Penugasan</label>
                            <input
                                type="date"
                                value={form.tanggal_penugasan}
                                onChange={(e) => set('tanggal_penugasan', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 text-gray-700 focus:outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">Batas Waktu</label>
                            <input
                                type="date"
                                value={form.batas_waktu}
                                onChange={(e) => set('batas_waktu', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 text-gray-700 focus:outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        disabled={!valid || loading}
                        onClick={() => onSubmit({ ...form, id_penelitian: penelitian.uuid })}
                        className="px-4 py-1.5 text-sm bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Menyimpan…' : mode === 'edit' ? 'Simpan Perubahan' : 'Tugaskan'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PenugasanReviewIndex() {
    const { breadcrumbs = [], penelitian = [], reviewers = [] } = usePage<PageProps>().props;

    const [search, setSearch] = useState('');
    const [filterStatus, setStatus] = useState('');
    const [filterTahun, setTahun] = useState('');
    const [filterAdministrasi, setAdminFilter] = useState('');
    const [expandedRow, setExpanded] = useState<string | null>(null);
    const [modalTarget, setModal] = useState<Penelitian | null>(null);
    const [editTarget, setEditTarget] = useState<Penugasan | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>('create');
    const [loading, setLoading] = useState(false);

    const tahunOptions = useMemo(
        () => [...new Set(penelitian.map((p) => p.tahun))].sort((a, b) => b - a),
        [penelitian]
    );

    const statusOptions = useMemo(
        () => [...new Set(penelitian.map((p) => p.status))],
        [penelitian]
    );

    const filtered = useMemo(
        () =>
            penelitian.filter((p) => {
                const q = search.toLowerCase();
                const administrasiHasil = getAdministrasiResult(p);

                const matchSearch =
                    !q ||
                    p.title.toLowerCase().includes(q) ||
                    (p.user?.name ?? '').toLowerCase().includes(q);

                const matchStatus = !filterStatus || p.status === filterStatus;
                const matchTahun = !filterTahun || String(p.tahun) === filterTahun;
                const matchAdmin =
                    !filterAdministrasi ||
                    (filterAdministrasi === 'belum'
                        ? !administrasiHasil
                        : administrasiHasil === filterAdministrasi);

                return matchSearch && matchStatus && matchTahun && matchAdmin;
            }),
        [penelitian, search, filterStatus, filterTahun, filterAdministrasi]
    );

    const hasFilter = search || filterStatus || filterTahun || filterAdministrasi;

    const totalBelumDitugaskan = penelitian.filter((p) => getAdministrasiCount(p) === 0).length;
    const totalSudahDitugaskan = penelitian.filter((p) => getAdministrasiCount(p) > 0).length;
    const totalLolos = penelitian.filter((p) => getAdministrasiResult(p) === 'Lolos').length;

    const toggleRow = (uuid: string) => setExpanded((prev) => (prev === uuid ? null : uuid));

    const openCreate = (p: Penelitian) => {
        setEditTarget(null);
        setModalMode('create');
        setModal(p);
    };

    const openEdit = (p: Penelitian, item: PenugasanInfo, jenis: number) => {
        if (!item.id_penugasan || !item.id_reviewer) return;

        setEditTarget({
            id: item.id_penugasan,
            id_reviewer: item.id_reviewer,
            id_jenis_penugasan: jenis,
            batas_waktu: item.batas_waktu ?? '',
            status_review: item.status_review ?? '',
            reviewer_name: item.reviewer_name ?? '',
            reviewer_email: item.reviewer_email ?? '',
            tanggal_penugasan: item.tanggal_penugasan ?? '',
            jenis_nama: jenis === 1 ? 'Administrasi' : 'Substansi',
        });

        setModalMode('edit');
        setModal(p);
    };

    const handleDelete = (item: PenugasanInfo) => {
        if (!item.id_penugasan) return;
        if (!confirm('Hapus penugasan ini?')) return;

        router.delete(`/admin/pt-penelitian/penugasan-review/${item.id_penugasan}`, {
            preserveScroll: true,
        });
    };

    const handleSubmit = (data: Record<string, string>) => {
        setLoading(true);

        if (modalMode === 'edit' && editTarget) {
            router.put(`/admin/pt-penelitian/penugasan-review/${editTarget.id}`, data, {
                preserveScroll: true,
                onFinish: () => {
                    setLoading(false);
                    setModal(null);
                    setEditTarget(null);
                },
            });
        } else {
            router.post('/admin/pt-penelitian/penugasan-review/store', data, {
                preserveScroll: true,
                onFinish: () => {
                    setLoading(false);
                    setModal(null);
                },
            });
        }
    };

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length
                    ? breadcrumbs
                    : [
                          { title: 'Dashboard', href: '/dashboard' },
                          { title: 'Penugasan Review', href: '/admin/pt-penelitian/penugasan-review' },
                      ]
            }
        >
            <Head title="Penugasan Review Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Penugasan Review</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Kelola penugasan reviewer untuk setiap usulan penelitian.
                            </p>
                        </div>

                        <div className="flex items-center gap-6 border border-gray-200 bg-white px-5 py-3">
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Total</span>
                                <p className="text-xl font-bold text-gray-900 mt-0.5">{penelitian.length}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Belum Ditugaskan</span>
                                <p className="text-xl font-bold text-amber-500 mt-0.5">{totalBelumDitugaskan}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Sudah Ditugaskan</span>
                                <p className="text-xl font-bold text-emerald-600 mt-0.5">{totalSudahDitugaskan}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wide">Lolos Admin</span>
                                <p className="text-xl font-bold text-blue-600 mt-0.5">{totalLolos}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 border border-gray-200 bg-white px-4 py-3">
                        <div className="flex flex-1 items-center gap-3 border border-gray-200 bg-gray-50 px-3 py-2">
                            <Search className="h-4 w-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Cari judul atau nama peneliti..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                            />
                        </div>

                        <select
                            value={filterStatus}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                        >
                            <option value="">Semua Status</option>
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filterTahun}
                            onChange={(e) => setTahun(e.target.value)}
                            className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                        >
                            <option value="">Semua Tahun</option>
                            {tahunOptions.map((t) => (
                                <option key={t} value={String(t)}>
                                    {t}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filterAdministrasi}
                            onChange={(e) => setAdminFilter(e.target.value)}
                            className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                        >
                            {FILTER_ADMINISTRASI.map((f) => (
                                <option key={f.value} value={f.value}>
                                    {f.label}
                                </option>
                            ))}
                        </select>

                        {hasFilter && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    setStatus('');
                                    setTahun('');
                                    setAdminFilter('');
                                }}
                                className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors shrink-0"
                            >
                                Reset
                            </button>
                        )}

                        <span className="text-xs font-semibold text-gray-500 shrink-0">
                            {filtered.length} penelitian ditemukan
                        </span>
                    </div>

                    <div className="overflow-hidden border border-gray-200 bg-white">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-800">Daftar Penelitian</h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Klik baris untuk melihat penugasan. Substansi hanya bisa ditugaskan jika administrasi sudah <strong>Lolos</strong>.
                            </p>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="py-16 text-center">
                                <p className="text-sm text-gray-400">
                                    {hasFilter ? 'Tidak ada penelitian yang cocok dengan filter.' : 'Belum ada data penelitian.'}
                                </p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200">
                                        <th className="px-6 py-3">Judul</th>
                                        <th className="px-6 py-3">Peneliti</th>
                                        <th className="px-6 py-3 text-center">Tahun</th>
                                        <th className="px-6 py-3 text-center">Pelaksanaan</th>
                                        <th className="px-6 py-3">Status<br />Proposal</th>
                                        <th className="px-6 py-3">Status<br />Administrasi</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((p) => {
                                        const isOpen = expandedRow === p.uuid;
                                        const administrasiHasil = getAdministrasiResult(p);

                                        return (
                                            <>
                                                <tr
                                                    key={p.uuid}
                                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    onClick={() => toggleRow(p.uuid)}
                                                >
                                                    <td className="px-6 py-4 max-w-xs">
                                                        <div className="flex items-center gap-2">
                                                            <svg
                                                                className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="m9 18 6-6-6-6" />
                                                            </svg>
                                                            <p className="font-medium text-gray-800 truncate">{p.title}</p>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        {p.user ? (
                                                            <div>
                                                                <p className="text-gray-700">{p.user.name}</p>
                                                                <p className="text-xs text-gray-400">{p.user.email}</p>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-300">—</span>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-center text-gray-500">{p.tahun}</td>
                                                    <td className="px-6 py-4 text-center text-gray-500">{p.tahun_pelaksanaan}</td>

                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={p.status} />
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <AdministrasiBadge status={administrasiHasil} />
                                                    </td>

                                                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            type="button"
                                                            onClick={() => openCreate(p)}
                                                            className="inline-flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                                                        >
                                                            <User2 className="w-3.5 h-3.5" />
                                                            Tugaskan
                                                        </button>
                                                    </td>
                                                </tr>

                                                {isOpen && (
                                                    <AccordionRow
                                                        administrasi={p.administrasi}
                                                        substansi={p.substansi}
                                                        onEdit={(item, jenis) => openEdit(p, item, jenis)}
                                                        onDelete={(item) => handleDelete(item)}
                                                    />
                                                )}
                                            </>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                open={!!modalTarget}
                mode={modalMode}
                onClose={() => {
                    setModal(null);
                    setEditTarget(null);
                }}
                penelitian={modalTarget}
                reviewers={reviewers}
                onSubmit={handleSubmit}
                loading={loading}
                editData={editTarget}
            />
        </AppHeaderLayout>
    );
}