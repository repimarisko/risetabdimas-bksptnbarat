import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type JenisPertanyaanOption = {
    id: string;
    jenis: string;
};

export type PertanyaanSkema = {
    id: string;
    uuid_skema: string;
    uuid_jenis: string;
    jenis_label: string; // joined dari ref_jenis_pertanyaan.jenis
    pertanyaan: string;
    bobot: string | number;
    created_at: string;
    updated_at: string;
};

// ─────────────────────────────────────────────
// Shared Modal
// ─────────────────────────────────────────────

function Modal({
    open,
    onClose,
    title,
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg overflow-hidden  border border-gray-200 bg-white "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
                    <h2 className="text-base font-semibold text-gray-900">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className=" p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Tutup"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="px-6 py-5">{children}</div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Delete Confirm Modal
// ─────────────────────────────────────────────

function DeleteConfirmModal({
    open,
    onClose,
    onConfirm,
    label,
    processing,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    label: string;
    processing: boolean;
}) {
    return (
        <Modal open={open} onClose={onClose} title="Konfirmasi Hapus">
            <div className="space-y-5">
                <p className="text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus pertanyaan{' '}
                    <span className="font-semibold text-gray-900">"{label}"</span>?{' '}
                    Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className=" border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700  transition hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className=" bg-red-600 px-4 py-2 text-sm font-semibold text-white  transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? 'Menghapus...' : 'Ya, Hapus'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

// ─────────────────────────────────────────────
// Shared Form Fields
// ─────────────────────────────────────────────

function PertanyaanFormFields({
    data,
    errors,
    jenisList,
    onChange,
}: {
    data: { uuid_jenis: string; pertanyaan: string; bobot: string };
    errors: Partial<Record<'uuid_jenis' | 'pertanyaan' | 'bobot', string>>;
    jenisList: JenisPertanyaanOption[];
    onChange: (field: 'uuid_jenis' | 'pertanyaan' | 'bobot', value: string) => void;
}) {
    return (
        <div className="space-y-4">
            {/* Jenis Pertanyaan */}
            <div className="space-y-2">
                <Label htmlFor="uuid_jenis">
                    Jenis Pertanyaan <span className="text-red-500">*</span>
                </Label>
                <select
                    id="uuid_jenis"
                    className="h-10 w-full  border border-gray-300 bg-white px-3 text-sm text-gray-900  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={data.uuid_jenis}
                    onChange={(e) => onChange('uuid_jenis', e.target.value)}
                    required
                >
                    <option value="">-- Pilih Jenis --</option>
                    {jenisList.map((j) => (
                        <option key={j.id} value={j.id}>
                            {j.jenis}
                        </option>
                    ))}
                </select>
                {errors.uuid_jenis ? (
                    <p className="text-sm text-red-600">{errors.uuid_jenis}</p>
                ) : null}
            </div>

            {/* Pertanyaan */}
            <div className="space-y-2">
                <Label htmlFor="pertanyaan">
                    Pertanyaan <span className="text-red-500">*</span>
                </Label>
                <textarea
                    id="pertanyaan"
                    rows={3}
                    className="w-full  border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tulis isi pertanyaan di sini..."
                    value={data.pertanyaan}
                    onChange={(e) => onChange('pertanyaan', e.target.value)}
                    required
                />
                {errors.pertanyaan ? (
                    <p className="text-sm text-red-600">{errors.pertanyaan}</p>
                ) : null}
            </div>

            {/* Bobot */}
            <div className="space-y-2">
                <Label htmlFor="bobot">
                    Bobot <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="bobot"
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    placeholder="Contoh: 10"
                    value={data.bobot}
                    onChange={(e) => onChange('bobot', e.target.value)}
                    required
                />
                {errors.bobot ? (
                    <p className="text-sm text-red-600">{errors.bobot}</p>
                ) : null}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Create Form
// ─────────────────────────────────────────────

function CreateForm({
    uuid,
    jenisList,
    onSuccess,
}: {
    uuid: string;
    jenisList: JenisPertanyaanOption[];
    onSuccess: () => void;
}) {
    const form = useForm({ uuid_jenis: '', pertanyaan: '', bobot: '' });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(`/admin/pt-skema/${uuid}/konfigurasi/pertanyaan`, {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <PertanyaanFormFields
                data={form.data}
                errors={form.errors}
                jenisList={jenisList}
                onChange={(field, value) => form.setData(field, value)}
            />
            <div className="flex justify-end pt-1">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="inline-flex items-center  bg-blue-600 px-5 py-2 text-sm font-semibold text-white  transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {form.processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
}

// ─────────────────────────────────────────────
// Edit Form
// ─────────────────────────────────────────────

function EditForm({
    uuid,
    item,
    jenisList,
    onSuccess,
}: {
    uuid: string;
    item: PertanyaanSkema;
    jenisList: JenisPertanyaanOption[];
    onSuccess: () => void;
}) {
    const form = useForm({
        uuid_jenis:  item.uuid_jenis,
        pertanyaan:  item.pertanyaan,
        bobot:       String(item.bobot),
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.put(`/admin/pt-skema/${uuid}/konfigurasi/pertanyaan/${item.id}`, {
            preserveScroll: true,
            onSuccess: () => onSuccess(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <PertanyaanFormFields
                data={form.data}
                errors={form.errors}
                jenisList={jenisList}
                onChange={(field, value) => form.setData(field, value)}
            />
            <div className="flex justify-end pt-1">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="inline-flex items-center  bg-blue-600 px-5 py-2 text-sm font-semibold text-white  transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {form.processing ? 'Menyimpan...' : 'Perbarui'}
                </button>
            </div>
        </form>
    );
}

// ─────────────────────────────────────────────
// Main Section Component (exported)
// ─────────────────────────────────────────────

export default function PertanyaanSkemaSection({
    uuid,
    pertanyaanList,
    jenisList,
}: {
    uuid: string;
    pertanyaanList: PertanyaanSkema[];
    jenisList: JenisPertanyaanOption[];
}) {
    const [showCreateModal, setShowCreateModal]   = useState(false);
    const [editItem, setEditItem]                 = useState<PertanyaanSkema | null>(null);
    const [deleteItem, setDeleteItem]             = useState<PertanyaanSkema | null>(null);
    const [deleteProcessing, setDeleteProcessing] = useState(false);

    const handleDelete = () => {
        if (!deleteItem) return;
        setDeleteProcessing(true);
        router.delete(`/admin/pt-skema/${uuid}/konfigurasi/pertanyaan/${deleteItem.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleteProcessing(false);
                setDeleteItem(null);
            },
        });
    };

    const formatDate = (dateStr: string) =>
        new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
            .format(new Date(dateStr));

    return (
        <>
            {/* ── Modals ─────────────────────────────────────────────── */}
            <Modal
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Tambah Pertanyaan"
            >
                <CreateForm
                    uuid={uuid}
                    jenisList={jenisList}
                    onSuccess={() => setShowCreateModal(false)}
                />
            </Modal>

            <Modal
                open={editItem !== null}
                onClose={() => setEditItem(null)}
                title="Edit Pertanyaan"
            >
                {editItem ? (
                    <EditForm
                        uuid={uuid}
                        item={editItem}
                        jenisList={jenisList}
                        onSuccess={() => setEditItem(null)}
                    />
                ) : null}
            </Modal>

            <DeleteConfirmModal
                open={deleteItem !== null}
                onClose={() => setDeleteItem(null)}
                onConfirm={handleDelete}
                label={deleteItem ? String(deleteItem.pertanyaan).slice(0, 60) + (deleteItem.pertanyaan.length > 60 ? '...' : '') : ''}
                processing={deleteProcessing}
            />

            {/* ── Card ───────────────────────────────────────────────── */}
            <div className="overflow-hidden  border border-gray-200 bg-white ">

                {/* Card header */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Daftar Pertanyaan</h2>
                        <p className="text-sm text-gray-500">
                            Pertanyaan yang terdaftar pada skema ini beserta bobot penilaiannya.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center gap-2  bg-blue-600 px-4 py-2 text-sm font-semibold text-white  transition hover:bg-blue-500"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah
                    </button>
                </div>

                {/* Table / Empty state */}
                {pertanyaanList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                        <div className="flex h-14 w-14 items-center justify-center  bg-gray-100">
                            <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-600">Belum ada pertanyaan</p>
                        <p className="text-sm text-gray-400">
                            Klik tombol <span className="font-semibold">Tambah</span> untuk menambahkan pertanyaan baru.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/60 text-left">
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">#</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Jenis</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Pertanyaan</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Bobot</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Dibuat</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pertanyaanList.map((item, index) => (
                                    <tr key={item.id} className="transition hover:bg-blue-50/30">
                                        <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center  bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                {item.jenis_label}
                                            </span>
                                        </td>
                                        <td className="max-w-xs px-6 py-4">
                                            <p className="line-clamp-2 text-gray-900">{item.pertanyaan}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-900">{Number(item.bobot).toFixed(0)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                            {formatDate(item.created_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditItem(item)}
                                                    className="inline-flex items-center gap-1.5  border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700  transition hover:bg-gray-50 hover:text-blue-600"
                                                >
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 112.97 2.97L7.5 19.79l-4 1 1-4 12.362-12.303z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeleteItem(item)}
                                                    className="inline-flex items-center gap-1.5  border border-red-100 bg-white px-3 py-1.5 text-xs font-medium text-red-600  transition hover:bg-red-50"
                                                >
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                                                    </svg>
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Card footer */}
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <p className="text-sm text-gray-500">
                        Total{' '}
                        <span className="font-semibold text-gray-700">{pertanyaanList.length}</span>{' '}
                        pertanyaan terdaftar.
                        {pertanyaanList.length > 0 && (
                            <span className="ml-3 text-gray-400">
                                Total bobot:{' '}
                                <span className="font-semibold text-gray-700">
                                    {pertanyaanList.reduce((sum, p) => sum + Number(p.bobot), 0).toFixed(0)}
                                </span>
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </>
    );
}