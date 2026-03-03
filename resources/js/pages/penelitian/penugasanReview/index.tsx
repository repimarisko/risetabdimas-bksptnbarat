import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { CheckCircle2, Search, XCircle, AlertCircle, Plus, User2 } from 'lucide-react';
import { useState, useMemo } from 'react';

type Breadcrumb = { title: string; href: string };
type User = { id: number; name: string; email: string };

type Penelitian = {
    uuid: string;
    title: string;
    tahun: number;
    tahun_pelaksanaan: number;
    status: string;
    user: User | null;
    status_review_administrasi: string;
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
    jenis_nama: string;
    reviewer_name: string;
    reviewer_email: string;
    tanggal_penugasan: string;
    batas_waktu: string;
    status_review: string;
};

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    penelitian?: Penelitian[];
    reviewers?: Reviewer[];
    penugasan?: Record<string, Penugasan[]>;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
    Disetujui: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
    Ditolak:   { bg: 'bg-red-50',     text: 'text-red-600'     },
    Pending:   { bg: 'bg-amber-50',   text: 'text-amber-700'   },
    Review:    { bg: 'bg-blue-50',    text: 'text-blue-700'    },
};

const STATUS_PENUGASAN: Record<string, { text: string; dot: string }> = {
    Pending: { text: 'text-amber-600',   dot: 'bg-amber-400'   },
    Selesai: { text: 'text-emerald-600', dot: 'bg-emerald-400' },
};

// Filter opsi untuk status administrasi
const FILTER_ADMINISTRASI = [
    { value: '',            label: 'Semua Administrasi' },
    { value: 'Lolos',       label: 'Lolos' },
    { value: 'Tidak Lolos', label: 'Tidak Lolos' },
    { value: 'belum',       label: 'Belum Direview' },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

/** Cek apakah penelitian sudah lolos administrasi */
function isLolosAdministrasi(status: string): boolean {
    return status === 'Lolos';
}

/** Cek apakah penugasan administrasi sudah ada (selain yang sedang diedit) */
// ✅ Number("1") === 1 → true
function hasAdministrasiReviewer(penugasanList: Penugasan[], editId?: number): boolean {
    return penugasanList.some(
        p => Number(p.id_jenis_penugasan) === 1 && p.id !== editId,
    );
}
 
// ─── Sub Components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const c = STATUS_COLORS[status] ?? { bg: 'bg-gray-100', text: 'text-gray-500' };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${c.bg} ${c.text}`}>
            {status}
        </span>
    );
}

function AdministrasiBadge({ status }: { status: string }) {
    if (status === 'Lolos') {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Lolos
            </span>
        );
    }
    if (status === 'Tidak Lolos') {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                <XCircle className="w-3.5 h-3.5" />
                Tidak Lolos
            </span>
        );
    }
    return <span className="text-xs text-gray-400">{status || '—'}</span>;
}

// ─── Modal ────────────────────────────────────────────────────────────────────

type ModalMode = 'create' | 'edit';

function Modal({
    open, mode, onClose, penelitian, reviewers, onSubmit, loading, editData, penugasanList,
}: {
    open: boolean;
    mode: ModalMode;
    onClose: () => void;
    penelitian: Penelitian | null;
    reviewers: Reviewer[];
    onSubmit: (data: Record<string, string>) => void;
    loading: boolean;
    editData?: Penugasan | null;
    penugasanList: Penugasan[];
}) {
    const [form, setForm] = useState({
        id_reviewer: editData ? String(editData.id_reviewer) : '',
        id_jenis_penugasan: editData ? String(editData.id_jenis_penugasan) : '',
        tanggal_penugasan: editData?.tanggal_penugasan ?? '',
        batas_waktu: editData?.batas_waktu ?? '',
    });

    // Sync form ketika editData berubah
    const [prev, setPrev] = useState<typeof editData>(null);
    if (editData !== prev) {
        setPrev(editData);
        setForm({
            id_reviewer: editData ? String(editData.id_reviewer) : '',
            id_jenis_penugasan: editData ? String(editData.id_jenis_penugasan) : '',
            tanggal_penugasan: editData?.tanggal_penugasan ?? '',
            batas_waktu: editData?.batas_waktu ?? '',
        });
    }

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    // ── Validasi logika ──────────────────────────────────────────────────────

    // Administrasi: maksimal 1 reviewer
    const administrasiSudahAda = hasAdministrasiReviewer(penugasanList, editData?.id);
    const administrasiBlocked  = form.id_jenis_penugasan === '1' && administrasiSudahAda && mode === 'create';

    // Substansi: hanya bisa jika sudah lolos administrasi
    const substansiBlocked = form.id_jenis_penugasan === '2' && !isLolosAdministrasi(penelitian?.status_review_administrasi ?? '');

    const valid =
        !!form.id_reviewer &&
        !!form.id_jenis_penugasan &&
        !!form.tanggal_penugasan &&
        !!form.batas_waktu &&
        !administrasiBlocked &&
        !substansiBlocked;

    if (!open || !penelitian) return null;

    const lolosAdministrasi = isLolosAdministrasi(penelitian.status_review_administrasi);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative bg-white w-full max-w-md border border-gray-200 z-10">

                {/* Header modal */}
                <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                            {mode === 'edit' ? 'Edit Penugasan' : 'Penugasan Review'}
                        </p>
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{penelitian.title}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 mt-0.5 ml-4 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Body modal */}
                <div className="px-5 py-4 space-y-4">

                    {/* Jenis Penugasan */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Jenis Penugasan</label>
                        <div className="flex gap-3">
                            {[
                                { id: '1', label: 'Administrasi', hint: administrasiSudahAda && mode === 'create' ? 'Sudah ditugaskan' : 'Maks. 1 reviewer' },
                                { id: '2', label: 'Substansi',    hint: !lolosAdministrasi ? 'Belum Lolos Administrasi' : 'Sudah Lolos Administrasi' },
                            ].map(j => {
                                const isAdminLocked = j.id === '1' && administrasiSudahAda && mode === 'create';

                                const isSubstansiLocked = j.id === '2' && !lolosAdministrasi;
                                const isLocked          = isAdminLocked || isSubstansiLocked;
                                const isSelected        = form.id_jenis_penugasan === j.id;

                                return (
                                    <button
                                    key={j.id}
                                    type="button"
                                    onClick={() => !isLocked && set('id_jenis_penugasan', j.id)}
                                    disabled={isLocked}
                                    title={isLocked ? j.hint : undefined}
                                    className={`flex-1 py-2 px-3 text-sm border transition-colors ${
                                        isLocked
                                            ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                                            : isSelected
                                            ? 'border-green-700 bg-green-600 text-white'
                                            : 'border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700'
                                    }`}
                                >
                                    <span className="block font-medium">{j.label}</span>
                                    <span className={`block text-[10px] mt-0.5 ${
                                        isLocked
                                            ? 'text-gray-300'
                                            : isSelected
                                            ? 'text-green-100'
                                            : 'text-gray-400'
                                    }`}>
                                        {j.hint}
                                    </span>
                                </button>
                                );
                            })}
                        </div>

                        {/* Warning administrasi sudah ada */}
                        {administrasiBlocked && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-600">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>Reviewer administrasi sudah ditugaskan. Edit penugasan yang ada jika ingin mengubah.</span>
                            </div>
                        )}

                        {/* Warning substansi belum lolos */}
                        {form.id_jenis_penugasan === '2' && !lolosAdministrasi && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-600">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>Penugasan substansi hanya bisa dilakukan setelah penelitian dinyatakan <strong>Lolos</strong> administrasi.</span>
                            </div>
                        )}
                    </div>

                    {/* Reviewer */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-1.5">Reviewer</label>
                        <select
                            value={form.id_reviewer}
                            onChange={e => set('id_reviewer', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 text-gray-700 focus:outline-none focus:border-gray-500 transition-colors bg-white"
                        >
                            <option value="">Pilih reviewer…</option>
                            {reviewers.map(r => (
                                <option key={r.id} value={r.id}>{r.name} — {r.email}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tanggal */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">Tanggal Penugasan</label>
                            <input
                                type="date"
                                value={form.tanggal_penugasan}
                                onChange={e => set('tanggal_penugasan', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 text-gray-700 focus:outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">Batas Waktu</label>
                            <input
                                type="date"
                                value={form.batas_waktu}
                                onChange={e => set('batas_waktu', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 text-gray-700 focus:outline-none focus:border-gray-500 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer modal */}
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

// ─── Accordion Row ────────────────────────────────────────────────────────────

function AccordionRow({
    penugasanList, onEdit, onDelete,
}: {
    penugasanList: Penugasan[];
    onEdit: (p: Penugasan) => void;
    onDelete: (id: number) => void;
}) {
    if (penugasanList.length === 0) {
        return (
            <tr>
                <td colSpan={8} className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 italic">Belum ada penugasan reviewer</p>
                </td>
            </tr>
        );
    }

    const grouped = penugasanList.reduce<Record<string, Penugasan[]>>((acc, p) => {
        if (!acc[p.jenis_nama]) acc[p.jenis_nama] = [];
        acc[p.jenis_nama].push(p);
        return acc;
    }, {});

    return (
        <tr>
            <td colSpan={8} className="bg-gray-50 border-b border-gray-100">
                <div className="px-6 py-3 space-y-3">
                    {Object.entries(grouped).map(([jenis, list], gi) => (
                        <div key={jenis}>
                            {gi > 0 && <div className="border-t border-gray-200 mb-3" />}
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                {jenis}
                            </p>
                            <div className="space-y-1">
                                {list.map(p => {
                                    const sc = STATUS_PENUGASAN[p.status_review] ?? { text: 'text-gray-500', dot: 'bg-gray-400' };
                                    return (
                                        <div
                                            key={p.id}
                                            className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
                                        >
                                            <div>
                                                <p className="text-xs font-medium text-gray-700">{p.reviewer_name}</p>
                                                <p className="text-xs text-gray-400">{p.reviewer_email}</p>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-400">Batas</p>
                                                    <p className="text-xs text-gray-600">{p.batas_waktu}</p>
                                                </div>
                                                <div className={`flex items-center gap-1.5 text-xs ${sc.text}`}>
                                                    <span className={`w-1.5 h-1.5 shrink-0 ${sc.dot}`} />
                                                    {p.status_review || '—'}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => onEdit(p)}
                                                        className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => onDelete(p.id)}
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
                    ))}
                </div>
            </td>
        </tr>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PenugasanReviewIndex() {
    const { breadcrumbs = [], penelitian = [], reviewers = [], penugasan = {} } = usePage<PageProps>().props;

    const [search, setSearch]               = useState('');
    const [filterStatus, setStatus]         = useState('');
    const [filterTahun, setTahun]           = useState('');
    const [filterAdministrasi, setAdminFilter] = useState('');
    const [expandedRow, setExpanded]        = useState<string | null>(null);
    const [modalTarget, setModal]           = useState<Penelitian | null>(null);
    const [editTarget, setEditTarget]       = useState<Penugasan | null>(null);
    const [modalMode, setModalMode]         = useState<ModalMode>('create');
    const [loading, setLoading]             = useState(false);

    const tahunOptions = useMemo(() =>
        [...new Set(penelitian.map(p => p.tahun))].sort((a, b) => b - a),
    [penelitian]);

    const statusOptions = useMemo(() =>
        [...new Set(penelitian.map(p => p.status))],
    [penelitian]);

    const filtered = useMemo(() =>
        penelitian.filter(p => {
            const q = search.toLowerCase();
            const matchSearch = !q ||
                p.title.toLowerCase().includes(q) ||
                (p.user?.name ?? '').toLowerCase().includes(q);
            const matchStatus = !filterStatus || p.status === filterStatus;
            const matchTahun  = !filterTahun  || String(p.tahun) === filterTahun;

            // Filter administrasi: 'belum' = status kosong/null, sisanya exact match
            const matchAdmin = !filterAdministrasi ||
                (filterAdministrasi === 'belum'
                    ? !p.status_review_administrasi
                    : p.status_review_administrasi === filterAdministrasi);

            return matchSearch && matchStatus && matchTahun && matchAdmin;
        }),
    [penelitian, search, filterStatus, filterTahun, filterAdministrasi]);

    const hasFilter = search || filterStatus || filterTahun || filterAdministrasi;

    // Summary counts
    const totalBelumDitugaskan = penelitian.filter(p => !(penugasan[p.uuid]?.length)).length;
    const totalSudahDitugaskan = penelitian.filter(p => (penugasan[p.uuid]?.length ?? 0) > 0).length;
    const totalLolos           = penelitian.filter(p => p.status_review_administrasi === 'Lolos').length;

    const toggleRow = (uuid: string) => setExpanded(prev => prev === uuid ? null : uuid);

    const openCreate = (p: Penelitian) => {
        setEditTarget(null);
        setModalMode('create');
        setModal(p);
    };

    const openEdit = (penelitianUuid: string, p: Penugasan) => {
        const target = penelitian.find(x => x.uuid === penelitianUuid) ?? null;
        setEditTarget(p);
        setModalMode('edit');
        setModal(target);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus penugasan ini?')) return;
        router.delete(`/admin/pt-penelitian/penugasan-review/${id}`, { preserveScroll: true });
    };

    const handleSubmit = (data: Record<string, string>) => {
        setLoading(true);
        if (modalMode === 'edit' && editTarget) {
            router.put(`/admin/pt-penelitian/penugasan-review/${editTarget.id}`, data, {
                preserveScroll: true,
                onFinish: () => { setLoading(false); setModal(null); setEditTarget(null); },
            });
        } else {
            router.post('/admin/pt-penelitian/penugasan-review/store', data, {
                preserveScroll: true,
                onFinish: () => { setLoading(false); setModal(null); },
            });
        }
    };

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length ? breadcrumbs : [
                    { title: 'Dashboard', href: '/dashboard' },
                    { title: 'Penugasan Review', href: '/admin/pt-penelitian/penugasan-review' },
                ]
            }
        >
            <Head title="Penugasan Review Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">

                    {/* ── Header + Summary ── */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Penugasan Review</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Kelola penugasan reviewer untuk setiap usulan penelitian.
                            </p>
                        </div>

                        {/* Summary stats */}
                        <div className="flex items-center gap-6 border border-gray-200 bg-white px-5 py-3 ">
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

                    {/* ── Search Bar ── */}
                    <div className="flex flex-wrap items-center gap-3 border border-gray-200 bg-white px-4 py-3 ">
                        {/* Input search */}
                        <div className="flex flex-1 items-center gap-3 border border-gray-200 bg-gray-50 px-3 py-2">
                            <Search className="h-4 w-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Cari judul atau nama peneliti..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                            />
                        </div>

                        {/* Filter status penelitian */}
                        <select
                            value={filterStatus}
                            onChange={e => setStatus(e.target.value)}
                            className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                        >
                            <option value="">Semua Status</option>
                            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>

                        {/* Filter tahun */}
                        <select
                            value={filterTahun}
                            onChange={e => setTahun(e.target.value)}
                            className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                        >
                            <option value="">Semua Tahun</option>
                            {tahunOptions.map(t => <option key={t} value={String(t)}>{t}</option>)}
                        </select>

                        {/* Filter status administrasi */}
                        <select
                            value={filterAdministrasi}
                            onChange={e => setAdminFilter(e.target.value)}
                            className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                        >
                            {FILTER_ADMINISTRASI.map(f => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                        </select>

                        {hasFilter && (
                            <button
                                type="button"
                                onClick={() => { setSearch(''); setStatus(''); setTahun(''); setAdminFilter(''); }}
                                className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors shrink-0"
                            >
                                Reset
                            </button>
                        )}

                        <span className="text-xs font-semibold text-gray-500 shrink-0">
                            {filtered.length} penelitian ditemukan
                        </span>
                    </div>

                    {/* ── Tabel ── */}
                    <div className="overflow-hidden border border-gray-200 bg-white  ">
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
                                        <th className="px-6 py-3">Status <br /> Proposal</th>
                                        <th className="px-6 py-3">Status <br /> Administrasi</th>
                                        <th className="px-6 py-3">Reviewer <br /> Administrasi</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(p => {
                                        const isOpen  = expandedRow === p.uuid;
                                        const pList   = penugasan[p.uuid] ?? [];
                                        const lolos   = isLolosAdministrasi(p.status_review_administrasi);

                                        return (
                                            <>
                                                <tr
                                                    key={p.uuid}
                                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    onClick={() => toggleRow(p.uuid)}
                                                >
                                                    {/* Judul + chevron */}
                                                    <td className="px-6 py-4 max-w-xs">
                                                        <div className="flex items-center gap-2">
                                                            <svg
                                                                className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`}
                                                                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                                                            >
                                                                <path d="m9 18 6-6-6-6"/>
                                                            </svg>
                                                            <p className="font-medium text-gray-800 truncate">{p.title}</p>
                                                        </div>
                                                    </td>

                                                    {/* Peneliti */}
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

                                                    {/* Tahun */}
                                                    <td className="px-6 py-4 text-center text-gray-500">{p.tahun}</td>

                                                    {/* Pelaksanaan */}
                                                    <td className="px-6 py-4 text-center text-gray-500">{p.tahun_pelaksanaan}</td>

                                                    {/* Status penelitian */}
                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={p.status} />
                                                    </td>

                                                    {/* Status administrasi */}
                                                    <td className="px-6 py-4">
                                                        <AdministrasiBadge status={p.status_review_administrasi} />
                                            
                                                       
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {pList
                                                            .filter(penugasan => Number(penugasan.id_jenis_penugasan) === 1)
                                                            .map(penugasan => penugasan.reviewer_name)
                                                            .join(', ')
                                                        }
                                                    </td>
                                                    {/* Aksi — stopPropagation agar tidak toggle accordion */}
                                                    <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => openCreate(p)}
                                                                className="inline-flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                                                            >
                                                                <User2 className="w-3.5 h-3.5" />
                                                            Tugaskan
                                                            </button>
                                                            {/* Hint jika substansi belum bisa */}
                                                         
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Accordion penugasan */}
                                                {isOpen && (
                                                    <AccordionRow
                                                        penugasanList={pList}
                                                        onEdit={(pg) => openEdit(p.uuid, pg)}
                                                        onDelete={handleDelete}
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

            {/* Modal penugasan */}
            <Modal
                open={!!modalTarget}
                mode={modalMode}
                onClose={() => { setModal(null); setEditTarget(null); }}
                penelitian={modalTarget}
                reviewers={reviewers}
                onSubmit={handleSubmit}
                loading={loading}
                editData={editTarget}
                penugasanList={modalTarget ? (penugasan[modalTarget.uuid] ?? []) : []}
            />
        </AppHeaderLayout>
    );
}