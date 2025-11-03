import DashboardNav from '@/components/DashboardNav';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Super Admin',
        href: '/dashboard/super-admin',
    },
];

export default function DashboardSuperAdmin() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Super Admin" />
            <DashboardNav />

            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Panel Super Admin
                </h1>
                <p className="text-sm text-gray-500">
                    Monitor aktivitas sistem dan kelola role pengguna lintas PT.
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <DashboardCard title="Total Pengguna" value="--">
                        Jumlah akun aktif di seluruh sistem.
                    </DashboardCard>
                    <DashboardCard title="Admin PT Aktif" value="--">
                        Perguruan tinggi yang sudah memiliki admin aktif.
                    </DashboardCard>
                    <DashboardCard title="Permintaan Role" value="--">
                        Tiket perubahan role yang menunggu persetujuan.
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
