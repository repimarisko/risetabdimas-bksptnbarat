import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type FormEvent, useMemo } from 'react';

type PenelitianItem = {
    uuid: string;
    title: string;
    tahun?: number | null;
    status?: string | null;
};

type PageProps = SharedData & {
    penelitian: PenelitianItem;
};

export default function PenelitianEdit() {
    const { penelitian } = usePage<PageProps>().props;

    const form = useForm({
        title: penelitian.title ?? '',
        tahun: penelitian.tahun ? String(penelitian.tahun) : '',
        status: penelitian.status ?? '',
    });

    const breadcrumbs = useMemo(
        () => [
            { title: 'Dashboard Dosen', href: '/dashboard/dosen' },
            { title: 'Penelitian', href: '/pt-penelitian' },
            {
                title: 'Ubah Usulan',
                href: `/pt-penelitian/${penelitian.uuid}/edit`,
            },
        ],
        [penelitian.uuid],
    );

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(`/pt-penelitian/${penelitian.uuid}`);
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Usulan Penelitian" />
            <DashboardNav />

            <div className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Ubah Usulan Penelitian
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Perbarui informasi usulan penelitian Anda.
                </p>

                <form onSubmit={onSubmit} className="mt-8 space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Judul
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={form.data.title}
                            onChange={(event) =>
                                form.setData('title', event.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#182e6b] focus:ring-[#182e6b]"
                        />
                        {form.errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.errors.title}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="tahun"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Tahun Usulan
                            </label>
                            <input
                                id="tahun"
                                name="tahun"
                                type="number"
                                value={form.data.tahun}
                                onChange={(event) =>
                                    form.setData('tahun', event.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#182e6b] focus:ring-[#182e6b]"
                            />
                            {form.errors.tahun && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.tahun}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <input
                                id="status"
                                name="status"
                                type="text"
                                value={form.data.status}
                                onChange={(event) =>
                                    form.setData('status', event.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#182e6b] focus:ring-[#182e6b]"
                            />
                            {form.errors.status && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.status}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => history.back()}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-md bg-[#182e6b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#304690] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </AppHeaderLayout>
    );
}
