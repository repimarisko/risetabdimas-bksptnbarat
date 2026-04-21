import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Breadcrumb = {
    title: string;
    href: string;
};

// Sesuaikan tipe data dengan hasil var_dump
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

type PageProps = {
    breadcrumbs?: Breadcrumb[];
    skema: Skema;
};

export default function UpdateSkemaIndex() {
    const { breadcrumbs = [], skema } = usePage<PageProps>().props;

    // Inisialisasi useForm dengan data dari props
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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Ganti URL route di bawah ini sesuai dengan route Laravel Anda
        put(`/admin/pt-skema/${skema.uuid}/update-skema`); 
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

            <div className="bg-gray-50 ">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
                    <div className="bg-white p-6  ">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Form Update Skema</h2>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nama */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nama Skema</label>
                                    <input
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                    {errors.nama && <span className="text-red-500 text-xs">{errors.nama}</span>}
                                </div>

                                {/* Nama Singkat */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nama Singkat</label>
                                    <input
                                        type="text"
                                        value={data.nama_singkat}
                                        onChange={(e) => setData('nama_singkat', e.target.value)}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>

                                {/* Jenis Skema & Sumber Dana */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Jenis Skema</label>
                                    <select
                                        value={data.jenis_skema}
                                        onChange={(e) => setData('jenis_skema', e.target.value)}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white"
                                    >
                                        <option value="Penelitian">Penelitian</option>
                                        <option value="Pengabdian">Pengabdian</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sumber Dana</label>
                                    <input
                                        type="text"
                                        value={data.sumber_dana}
                                        onChange={(e) => setData('sumber_dana', e.target.value)}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>

                                {/* Biaya */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Biaya Minimal (Rp)</label>
                                    <input
                                        type="number"
                                        value={data.biaya_minimal}
                                        onChange={(e) => setData('biaya_minimal', Number(e.target.value))}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Biaya Maksimal (Rp)</label>
                                    <input
                                        type="number"
                                        value={data.biaya_maksimal}
                                        onChange={(e) => setData('biaya_maksimal', Number(e.target.value))}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>

                                {/* Anggota */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Anggota Min</label>
                                    <input
                                        type="number"
                                        value={data.anggota_min}
                                        onChange={(e) => setData('anggota_min', Number(e.target.value))}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Anggota Max</label>
                                    <input
                                        type="number"
                                        value={data.anggota_max}
                                        onChange={(e) => setData('anggota_max', Number(e.target.value))}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>

                                {/* Tanggal */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                    <input
                                        type="date"
                                        value={data.mulai}
                                        onChange={(e) => setData('mulai', e.target.value)}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                    <input
                                        type="date"
                                        value={data.selesai}
                                        onChange={(e) => setData('selesai', e.target.value)}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    />
                                </div>

                                {/* Multi Tahun & Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Multi Tahun</label>
                                    <select
                                        value={data.multi_tahun}
                                        onChange={(e) => setData('multi_tahun', Number(e.target.value))}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white"
                                    >
                                        <option value={1}>Ya</option>
                                        <option value={0}>Tidak</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border bg-white"
                                    >
                                        <option value="aktif">Aktif</option>
                                        <option value="tidak aktif">Tidak Aktif</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 disabled:opacity-50 transition"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}