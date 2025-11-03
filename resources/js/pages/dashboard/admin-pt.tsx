import DashboardNav from '@/components/DashboardNav';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin PT',
        href: '/dashboard/admin-pt',
    },
];

export default function DashboardAdminPt() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin PT" />
            <DashboardNav />

            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Panel Admin Perguruan Tinggi
                </h1>
                <p className="text-sm text-gray-500">
                    Supervisi seluruh usulan penelitian, pantau progres, dan
                    kelola persetujuan akun dosen.
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <DashboardCard title="Usulan Masuk" value="--">
                        Jumlah usulan baru dari dosen PT Anda.
                    </DashboardCard>
                    <DashboardCard title="Menunggu Review" value="--">
                        Usulan yang membutuhkan tindak lanjut dari admin PT.
                    </DashboardCard>
                    <DashboardCard title="Akun Pending" value="--">
                        Permintaan aktivasi akun dosen yang belum disetujui.
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
        <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-white p-6">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                        {value}
                    </p>
                </div>
                <p className="text-sm text-gray-600">{children}</p>
            </div>
        </div>
    );
}
