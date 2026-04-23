import DashboardNav from '@/components/DashboardNav';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import type { SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { MoreHorizontal, PenLine, Settings } from 'lucide-react';
import { useCallback, useMemo } from 'react';

type SkemaItem = {
    uuid: string;
    jenis_skema: string | null;
    nama: string | null;
    nama_singkat: string | null;
    multi_tahun: boolean | null;
    biaya_minimal: number | null;
    biaya_maksimal: number | null;
    sumber_dana: string | null;
    anggota_min: number | null;
    anggota_max: number | null;
    mulai: string | null;
    selesai: string | null;
    status: string | null;
    created_at: string | null;
    updated_at: string | null;
};

type Option = {
    value: string;
    label: string;
};

type PageProps = SharedData & {
    breadcrumbs?: { title: string; href: string }[];
    skema: SkemaItem[];
    jenisOptions: Option[];
    selectedJenis?: string | null;
    flash?: {
        success?: string;
    };
};

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

export default function AdminPtSkemaIndex() {
    const page = usePage<PageProps>();
    const {
        breadcrumbs = [],
        skema = [],
        jenisOptions = [],
        selectedJenis,
        flash,
        auth,
    } = page.props;
    const roles = auth?.roles ?? [];
    const canCreate = roles.includes('super-admin');
    const canKonfigurasi = roles.includes('super-admin');

    const handleFilter = useCallback((value: string | null) => {
        const query = value ? { jenis: value } : {};

        router.get('/admin/pt-skema', query, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, []);

    const filterChips = useMemo(() => {
        const options: Option[] = [
            { value: '', label: 'Semua' },
            ...jenisOptions,
        ];

        return options.map((option) => {
            const isActive =
                option.value === ''
                    ? !selectedJenis
                    : option.value === selectedJenis;

            return (
                <button
                    key={option.value || 'all'}
                    type="button"
                    onClick={() => handleFilter(option.value || null)}
                    className={[
                        'border px-4 py-1.5 text-sm transition',
                        isActive
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600',
                    ].join(' ')}
                >
                    {option.label}
                </button>
            );
        });
    }, [handleFilter, jenisOptions, selectedJenis]);

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Skema" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Daftar Skema Pendanaan
                        </h1>
                        <p className="text-sm text-gray-500">
                            Pantau semua skema penelitian/pengabdian yang
                            tersedia dan kelola sesuai kebutuhan.
                        </p>
                    </div>

                    {flash?.success ? (
                        <div className="mb-6 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {flash.success}
                        </div>
                    ) : null}

                    <div className="mb-6 flex flex-wrap items-center gap-2">
                        {filterChips.length ? (
                            filterChips
                        ) : (
                            <span className="text-sm text-gray-500">
                                Belum ada jenis skema yang terdaftar.
                            </span>
                        )}
                    </div>

                    <div className="overflow-hidden border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm text-gray-900">
                                <thead className="bg-gray-50 text-xs tracking-wide text-gray-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-4">
                                            Nama Skema
                                        </th>
                                        <th className="px-6 py-4">Jenis</th>
                                        <th className="px-6 py-4">
                                            Sumber Dana
                                        </th>
                                        <th className="px-6 py-4">Periode</th>
                                        <th className="px-6 py-4">
                                            Multi Tahun
                                        </th>
                                        <th className="px-6 py-4">
                                            Rentang Biaya
                                        </th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skema.length ? (
                                        skema.map((item) => {
                                            const biayaMinimal =
                                                typeof item.biaya_minimal ===
                                                'number'
                                                    ? currencyFormatter.format(
                                                          item.biaya_minimal,
                                                      )
                                                    : null;
                                            const biayaMaksimal =
                                                typeof item.biaya_maksimal ===
                                                'number'
                                                    ? currencyFormatter.format(
                                                          item.biaya_maksimal,
                                                      )
                                                    : null;
                                            const rentangBiaya =
                                                biayaMinimal && biayaMaksimal
                                                    ? `${biayaMinimal} - ${biayaMaksimal}`
                                                    : (biayaMinimal ??
                                                      biayaMaksimal ??
                                                      '-');

                                            const periode =
                                                item.mulai && item.selesai
                                                    ? `${item.mulai} s.d ${item.selesai}`
                                                    : (item.mulai ??
                                                      item.selesai ??
                                                      '-');

                                            return (
                                                <tr
                                                    key={item.uuid}
                                                    className="border-t border-gray-100"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-gray-900">
                                                            {item.nama ?? '-'}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {item.nama_singkat
                                                                ? `Alias: ${item.nama_singkat}`
                                                                : null}
                                                            {item.anggota_min ||
                                                            item.anggota_max ? (
                                                                <span>
                                                                    {item.nama_singkat
                                                                        ? ' • '
                                                                        : ''}
                                                                    Anggota:
                                                                    {item.anggota_min
                                                                        ? ` ${item.anggota_min}`
                                                                        : ' -'}
                                                                    {item.anggota_max
                                                                        ? ` - ${item.anggota_max}`
                                                                        : ''}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {item.jenis_skema ??
                                                            '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {item.sumber_dana ??
                                                            '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {periode}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {item.multi_tahun
                                                            ? 'Ya'
                                                            : 'Tidak'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        {rentangBiaya}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={[
                                                                'inline-flex px-3 py-1 text-xs font-semibold',
                                                                (
                                                                    item.status ??
                                                                    ''
                                                                ).toLowerCase() ===
                                                                'aktif'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-gray-100 text-gray-500',
                                                            ].join(' ')}
                                                        >
                                                            {item.status ??
                                                                'Tidak Diketahui'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {canKonfigurasi && (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger
                                                                    asChild
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                                                        aria-label="Aksi cepat"
                                                                    >
                                                                        <MoreHorizontal className="h-5 w-5" />
                                                                    </button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="min-w-[180px] border border-gray-200 bg-white p-1 text-sm text-gray-700 focus:outline-none">
                                                                    <DropdownMenuItem
                                                                        className="cursor-pointer rounded px-3 py-2 text-gray-700 outline-none hover:bg-gray-100"
                                                                        onSelect={() =>
                                                                            router.visit(
                                                                                `/admin/pt-skema/${item.uuid}/konfigurasi`,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Settings />{' '}
                                                                        Konfigurasi
                                                                        Pertanyaan
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        className="cursor-pointer rounded px-3 py-2 text-gray-700 outline-none hover:bg-gray-100"
                                                                        onSelect={() =>
                                                                            router.visit(
                                                                                `/admin/pt-skema/${item.uuid}/update`,
                                                                            )
                                                                        }
                                                                    >
                                                                        <PenLine />{' '}
                                                                        Update
                                                                        Skema
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-10 text-center text-sm text-gray-500"
                                            >
                                                Belum ada skema yang terdaftar.
                                                Tambahkan skema baru untuk
                                                memulai.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {canCreate ? (
                        <div className="mt-6 flex justify-end">
                            <Link
                                href="/admin/pt-skema/create"
                                className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                            >
                                + Tambah Skema
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </AppHeaderLayout>
    );
}
