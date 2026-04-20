import DashboardNav from '@/components/DashboardNav';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import type { SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

type StatusOption = {
    value: string;
    label: string;
};

type SkemaData = {
    uuid: string;
    jenis_skema: string | null;
    nama: string | null;
    nama_singkat: string | null;
    multi_tahun: boolean;
    biaya_minimal: number | null;
    biaya_maksimal: number | null;
    sumber_dana: string | null;
    anggota_min: number | null;
    anggota_max: number | null;
    mulai: string | null;
    selesai: string | null;
    status: string | null;
};

type PageProps = SharedData & {
    breadcrumbs?: { title: string; href: string }[];
    skema: SkemaData;
    statusOptions: StatusOption[];
    redirectBackUrl?: string;
    flash?: {
        success?: string;
    };
};

export default function AdminPtSkemaEdit() {
    const { breadcrumbs = [], skema, statusOptions = [], redirectBackUrl, flash } =
        usePage<PageProps>().props;

    const form = useForm({
        jenis_skema:   skema.jenis_skema   ?? '',
        nama:          skema.nama           ?? '',
        nama_singkat:  skema.nama_singkat   ?? '',
        multi_tahun:   skema.multi_tahun,
        biaya_minimal: skema.biaya_minimal  != null ? String(skema.biaya_minimal)  : '',
        biaya_maksimal:skema.biaya_maksimal != null ? String(skema.biaya_maksimal) : '',
        sumber_dana:   skema.sumber_dana    ?? '',
        anggota_min:   skema.anggota_min    != null ? String(skema.anggota_min)    : '',
        anggota_max:   skema.anggota_max    != null ? String(skema.anggota_max)    : '',
        mulai:         skema.mulai          ?? '',
        selesai:       skema.selesai        ?? '',
        status:        skema.status         ?? (statusOptions[0]?.value ?? 'aktif'),
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(`/admin/pt-skema/${skema.uuid}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Skema Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto px-4 py-10">
                    <div className="mb-6 flex items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Edit Skema Penelitian
                            </h1>
                            <p className="text-sm text-gray-500">
                                Perbarui informasi skema sesuai kebutuhan.
                            </p>
                        </div>

                        {redirectBackUrl ? (
                            <Link
                                href={redirectBackUrl}
                                className="inline-flex items-center border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Kembali
                            </Link>
                        ) : null}
                    </div>

                    {flash?.success ? (
                        <div className="mb-6">
                            <Alert className="border-green-200 bg-green-50 text-green-800">
                                <AlertTitle>Berhasil</AlertTitle>
                                <AlertDescription>{flash.success}</AlertDescription>
                            </Alert>
                        </div>
                    ) : null}

                    <form
                        onSubmit={handleSubmit}
                        className="overflow-hidden border border-gray-200 bg-white"
                    >
                        <div className="border-b border-gray-100 bg-gray-50 px-6 py-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Utama
                            </h2>
                            <p className="text-sm text-gray-500">
                                Data dasar skema yang dapat diubah oleh Super Admin.
                            </p>
                        </div>

                        <div className="space-y-8 px-6 py-6">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="jenis_skema">
                                        Jenis Skema <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="jenis_skema"
                                        value={form.data.jenis_skema}
                                        onChange={(event) =>
                                            form.setData('jenis_skema', event.target.value)
                                        }
                                        placeholder="Contoh: Penelitian, Pengabdian"
                                        required
                                    />
                                    {form.errors.jenis_skema ? (
                                        <p className="text-sm text-red-600">
                                            {form.errors.jenis_skema}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        className="h-10 w-full border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        value={form.data.status}
                                        onChange={(event) => form.setData('status', event.target.value)}
                                    >
                                        {statusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.status ? (
                                        <p className="text-sm text-red-600">{form.errors.status}</p>
                                    ) : null}
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="nama">
                                        Nama Skema <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nama"
                                        value={form.data.nama}
                                        onChange={(event) => form.setData('nama', event.target.value)}
                                        placeholder="Masukkan nama lengkap skema"
                                        required
                                    />
                                    {form.errors.nama ? (
                                        <p className="text-sm text-red-600">{form.errors.nama}</p>
                                    ) : null}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nama_singkat">Nama Singkat</Label>
                                    <Input
                                        id="nama_singkat"
                                        value={form.data.nama_singkat}
                                        onChange={(event) =>
                                            form.setData('nama_singkat', event.target.value)
                                        }
                                        placeholder="Contoh: PDU, PTN"
                                    />
                                    {form.errors.nama_singkat ? (
                                        <p className="text-sm text-red-600">
                                            {form.errors.nama_singkat}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sumber_dana">Sumber Dana</Label>
                                    <Input
                                        id="sumber_dana"
                                        value={form.data.sumber_dana}
                                        onChange={(event) =>
                                            form.setData('sumber_dana', event.target.value)
                                        }
                                        placeholder="Contoh: Internal, LPDP"
                                    />
                                    {form.errors.sumber_dana ? (
                                        <p className="text-sm text-red-600">
                                            {form.errors.sumber_dana}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="space-y-4 border border-gray-100 bg-gray-50 px-4 py-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">
                                            Pengaturan Durasi
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Tentukan apakah skema berjalan lebih dari satu tahun serta periode pelaksanaannya.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="multi_tahun"
                                            checked={form.data.multi_tahun}
                                            onCheckedChange={(checked) =>
                                                form.setData('multi_tahun', Boolean(checked))
                                            }
                                        />
                                        <Label
                                            htmlFor="multi_tahun"
                                            className="cursor-pointer text-sm font-medium text-gray-800"
                                        >
                                            Skema Multi Tahun
                                        </Label>
                                    </div>
                                </div>
                                {form.errors.multi_tahun ? (
                                    <p className="text-sm text-red-600">{form.errors.multi_tahun}</p>
                                ) : null}

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="mulai">Tanggal Mulai</Label>
                                        <Input
                                            id="mulai"
                                            type="date"
                                            value={form.data.mulai}
                                            onChange={(event) => form.setData('mulai', event.target.value)}
                                        />
                                        {form.errors.mulai ? (
                                            <p className="text-sm text-red-600">{form.errors.mulai}</p>
                                        ) : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="selesai">Tanggal Selesai</Label>
                                        <Input
                                            id="selesai"
                                            type="date"
                                            value={form.data.selesai}
                                            onChange={(event) =>
                                                form.setData('selesai', event.target.value)
                                            }
                                        />
                                        {form.errors.selesai ? (
                                            <p className="text-sm text-red-600">{form.errors.selesai}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border border-gray-100 bg-gray-50 px-4 py-4">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">
                                        Ketentuan Pendanaan
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Isi rentang anggaran yang diperbolehkan untuk skema ini.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="biaya_minimal">Biaya Minimal (IDR)</Label>
                                        <Input
                                            id="biaya_minimal"
                                            type="number"
                                            min={0}
                                            step="1000"
                                            value={form.data.biaya_minimal}
                                            onChange={(event) =>
                                                form.setData('biaya_minimal', event.target.value)
                                            }
                                            placeholder="Contoh: 50000000"
                                        />
                                        {form.errors.biaya_minimal ? (
                                            <p className="text-sm text-red-600">
                                                {form.errors.biaya_minimal}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="biaya_maksimal">Biaya Maksimal (IDR)</Label>
                                        <Input
                                            id="biaya_maksimal"
                                            type="number"
                                            min={0}
                                            step="1000"
                                            value={form.data.biaya_maksimal}
                                            onChange={(event) =>
                                                form.setData('biaya_maksimal', event.target.value)
                                            }
                                            placeholder="Contoh: 150000000"
                                        />
                                        {form.errors.biaya_maksimal ? (
                                            <p className="text-sm text-red-600">
                                                {form.errors.biaya_maksimal}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border border-gray-100 bg-gray-50 px-4 py-4">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">
                                        Komposisi Tim
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Tentukan batas minimal dan maksimal anggota tim penelitian.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="anggota_min">Anggota Minimal</Label>
                                        <Input
                                            id="anggota_min"
                                            type="number"
                                            min={1}
                                            value={form.data.anggota_min}
                                            onChange={(event) =>
                                                form.setData('anggota_min', event.target.value)
                                            }
                                            placeholder="Contoh: 3"
                                        />
                                        {form.errors.anggota_min ? (
                                            <p className="text-sm text-red-600">
                                                {form.errors.anggota_min}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="anggota_max">Anggota Maksimal</Label>
                                        <Input
                                            id="anggota_max"
                                            type="number"
                                            min={1}
                                            value={form.data.anggota_max}
                                            onChange={(event) =>
                                                form.setData('anggota_max', event.target.value)
                                            }
                                            placeholder="Contoh: 5"
                                        />
                                        {form.errors.anggota_max ? (
                                            <p className="text-sm text-red-600">
                                                {form.errors.anggota_max}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Pastikan data yang dimasukkan sudah sesuai sebelum menyimpan perubahan.
                            </p>
                            <button
                                type="submit"
                                className="inline-flex items-center bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={form.processing}
                            >
                                {form.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
