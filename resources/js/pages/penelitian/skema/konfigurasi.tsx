import DashboardNav from '@/components/DashboardNav';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import type { SharedData } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PertanyaanSkemaSection from './PertanyaanSkemaSection';
import type { JenisPertanyaanOption, PertanyaanSkema } from './PertanyaanSkemaSection';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type JenisPertanyaan = {
    id: string;
    nomor_urut: number;
    jenis: string;
    created_at: string;
    updated_at: string;
};

type PageProps = SharedData & {
    breadcrumbs?: { title: string; href: string }[];
    uuid: string;
    jenisPertanyaanList: JenisPertanyaan[];
    pertanyaanSkemaList: PertanyaanSkema[];
    redirectBackUrl?: string;
    flash?: {
        success?: string;
        error?: string;
    };
};

// ─────────────────────────────────────────────
// Modal
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
                className="w-full max-w-md overflow-hidden  border border-gray-200 bg-white "
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

function DeleteConfirmModal({
    open,
    onClose,
    onConfirm,
    jenisLabel,
    processing,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    jenisLabel: string;
    processing: boolean;
}) {
    return (
        <Modal open={open} onClose={onClose} title="Konfirmasi Hapus">
            <div className="space-y-5">
                <p className="text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus jenis pertanyaan{' '}
                    <span className="font-semibold text-gray-900">"{jenisLabel}"</span>? Tindakan ini
                    tidak dapat dibatalkan.
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
// Create Form – Jenis Pertanyaan
// ─────────────────────────────────────────────

function CreateForm({ uuid, onSuccess }: { uuid: string; onSuccess: () => void }) {
    const form = useForm({ nomor_urut: '', jenis: '' });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(`/admin/pt-skema/${uuid}/konfigurasi/jenis-pertanyaan`, {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="create_nomor_urut">Nomor Urut</Label>
                <Input
                    id="create_nomor_urut"
                    type="number"
                    min={0}
                    value={form.data.nomor_urut}
                    onChange={(e) => form.setData('nomor_urut', e.target.value)}
                    placeholder="Contoh: 1"
                />
                {form.errors.nomor_urut ? (
                    <p className="text-sm text-red-600">{form.errors.nomor_urut}</p>
                ) : null}
            </div>
            <div className="space-y-2">
                <Label htmlFor="create_jenis">
                    Jenis Pertanyaan <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="create_jenis"
                    value={form.data.jenis}
                    onChange={(e) => form.setData('jenis', e.target.value)}
                    placeholder="Contoh: Pilihan Ganda, Isian, Essay"
                    required
                    autoFocus
                />
                {form.errors.jenis ? (
                    <p className="text-sm text-red-600">{form.errors.jenis}</p>
                ) : null}
            </div>
            <div className="flex justify-end gap-3 pt-1">
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
// Edit Form – Jenis Pertanyaan
// ─────────────────────────────────────────────

function EditForm({
    uuid,
    item,
    onSuccess,
}: {
    uuid: string;
    item: JenisPertanyaan;
    onSuccess: () => void;
}) {
    const form = useForm({ nomor_urut: String(item.nomor_urut), jenis: item.jenis });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.put(`/admin/pt-skema/${uuid}/konfigurasi/jenis-pertanyaan/${item.id}`, {
            preserveScroll: true,
            onSuccess: () => onSuccess(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="edit_nomor_urut">Nomor Urut</Label>
                <Input
                    id="edit_nomor_urut"
                    type="number"
                    min={0}
                    value={form.data.nomor_urut}
                    onChange={(e) => form.setData('nomor_urut', e.target.value)}
                    placeholder="Contoh: 1"
                />
                {form.errors.nomor_urut ? (
                    <p className="text-sm text-red-600">{form.errors.nomor_urut}</p>
                ) : null}
            </div>
            <div className="space-y-2">
                <Label htmlFor="edit_jenis">
                    Jenis Pertanyaan <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="edit_jenis"
                    value={form.data.jenis}
                    onChange={(e) => form.setData('jenis', e.target.value)}
                    placeholder="Contoh: Pilihan Ganda, Isian, Essay"
                    required
                    autoFocus
                />
                {form.errors.jenis ? (
                    <p className="text-sm text-red-600">{form.errors.jenis}</p>
                ) : null}
            </div>
            <div className="flex justify-end gap-3 pt-1">
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
// Main Page
// ─────────────────────────────────────────────

export default function KonfigurasiSkema() {
    const {
        breadcrumbs = [],
        uuid,
        jenisPertanyaanList = [],
        pertanyaanSkemaList = [],
        redirectBackUrl,
        flash,
    } = usePage<PageProps>().props;

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editItem, setEditItem]               = useState<JenisPertanyaan | null>(null);
    const [deleteItem, setDeleteItem]           = useState<JenisPertanyaan | null>(null);
    const [deleteProcessing, setDeleteProcessing] = useState(false);

    const handleDelete = () => {
        if (!deleteItem) return;
        setDeleteProcessing(true);
        router.delete(`/admin/pt-skema/${uuid}/konfigurasi/jenis-pertanyaan/${deleteItem.id}`, {
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

    // Konversi jenisPertanyaanList → format option untuk PertanyaanSkemaSection
    const jenisPertanyaanOptions: JenisPertanyaanOption[] = jenisPertanyaanList.map((j) => ({
        id:    j.id,
        jenis: j.jenis,
    }));

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Konfigurasi Skema" />
            <DashboardNav />

            {/* ── Modals – Jenis Pertanyaan ──────────────────────────── */}
            <Modal
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Tambah Jenis Pertanyaan"
            >
                <CreateForm uuid={uuid} onSuccess={() => setShowCreateModal(false)} />
            </Modal>

            <Modal
                open={editItem !== null}
                onClose={() => setEditItem(null)}
                title="Edit Jenis Pertanyaan"
            >
                {editItem ? (
                    <EditForm uuid={uuid} item={editItem} onSuccess={() => setEditItem(null)} />
                ) : null}
            </Modal>

            <DeleteConfirmModal
                open={deleteItem !== null}
                onClose={() => setDeleteItem(null)}
                onConfirm={handleDelete}
                jenisLabel={deleteItem?.jenis ?? ''}
                processing={deleteProcessing}
            />

            {/* ── Page body ──────────────────────────────────────────── */}
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto px-4 py-10">

                    {/* Page header */}
                    <div className="mb-6 flex items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Pertanyaan Skema</h1>
                            <p className="text-sm text-gray-500">
                                Kelola jenis pertanyaan dan daftar pertanyaan untuk skema ini.
                            </p>
                        </div>
                        {redirectBackUrl ? (
                            <Link
                                href={redirectBackUrl}
                                className="inline-flex items-center  border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700  transition hover:bg-gray-100"
                            >
                                Kembali
                            </Link>
                        ) : null}
                    </div>

                    {/* Flash messages */}
                    {flash?.success ? (
                        <div className="mb-6">
                            <Alert className="border-green-200 bg-green-50 text-green-800">
                                <AlertTitle>Berhasil</AlertTitle>
                                <AlertDescription>{flash.success}</AlertDescription>
                            </Alert>
                        </div>
                    ) : null}

                    {flash?.error ? (
                        <div className="mb-6">
                            <Alert className="border-red-200 bg-red-50 text-red-800">
                                <AlertTitle>Gagal</AlertTitle>
                                <AlertDescription>{flash.error}</AlertDescription>
                            </Alert>
                        </div>
                    ) : null}
 

                    {/* ── Section 1: Jenis Pertanyaan ───────────────────── */}
                    <div className="mb-8 overflow-hidden  border border-gray-200 bg-white ">

                        {/* Card header */}
                        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Jenis Pertanyaan</h2>
                                <p className="text-sm text-gray-500">
                                    Referensi tipe pertanyaan yang tersedia pada skema ini.
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

                        {/* Table */}
                        {jenisPertanyaanList.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                                <div className="flex h-14 w-14 items-center justify-center  bg-gray-100">
                                    <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M3 12a9 9 0 1118 0A9 9 0 013 12z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Belum ada jenis pertanyaan</p>
                                <p className="text-sm text-gray-400">
                                    Tambahkan jenis pertanyaan terlebih dahulu sebelum membuat pertanyaan.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/60 text-left">
                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">#</th>
                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">No. Urut</th>
                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Jenis Pertanyaan</th>
                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Dibuat</th>
                                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Diperbarui</th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {jenisPertanyaanList.map((item, index) => (
                                            <tr key={item.id} className="transition hover:bg-blue-50/30">
                                                <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                                                <td className="px-6 py-4 text-gray-600">{item.nomor_urut}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.jenis}</td>
                                                <td className="px-6 py-4 text-gray-500">{formatDate(item.created_at)}</td>
                                                <td className="px-6 py-4 text-gray-500">{formatDate(item.updated_at)}</td>
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

                        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Total{' '}
                                <span className="font-semibold text-gray-700">{jenisPertanyaanList.length}</span>{' '}
                                jenis pertanyaan terdaftar.
                            </p>
                        </div>
                    </div>

                    {/* ── Section 2: Pertanyaan Skema (komponen terpisah) ─── */}
                    <PertanyaanSkemaSection
                        uuid={uuid}
                        pertanyaanList={pertanyaanSkemaList}
                        jenisList={jenisPertanyaanOptions}
                    />

                </div>
            </div>
        </AppHeaderLayout>
    );
}