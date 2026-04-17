import DashboardNav from '@/components/DashboardNav';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Ketua LPPM',
        href: '/dashboard/ketua-lppm',
    },
];

export default function DashboardKetuaLppm() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Ketua LPPM" />
            <DashboardNav />

            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">Panel Ketua LPPM</h1>
                <p className="text-sm text-gray-500">
                    Supervisi usulan penelitian lintas perguruan tinggi, pantau status persetujuan
                    dan tindak lanjuti rekomendasi pendanaan.
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <DashboardCard title="Usulan Masuk" value="--">
                        Total usulan penelitian yang memerlukan persetujuan LPPM.
                    </DashboardCard>
                    <DashboardCard title="Menunggu Persetujuan" value="--">
                        Usulan yang sedang menunggu persetujuan Ketua LPPM.
                    </DashboardCard>
                    <DashboardCard title="Ditindaklanjuti" value="--">
                        Usulan yang telah diberikan keputusan oleh LPPM.
                    </DashboardCard>
                </div>
            </div>
        </AppHeaderLayout>
    );
}

function DashboardCard({
    title,
    value,
    children,
}: {
    title: string;
    value: string;
    children: ReactNode;
}) {
    return (
        <div className="relative aspect-video overflow-hidden  border border-gray-200 bg-white p-6">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
                </div>
                <p className="text-sm text-gray-600">{children}</p>
            </div>
        </div>
    );
}

