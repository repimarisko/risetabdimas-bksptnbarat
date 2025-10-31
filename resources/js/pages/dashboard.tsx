import DashboardNav from '@/components/DashboardNav';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <DashboardNav />

            {/* Page title */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Riset dan Pengabdian Masyarakat Kolaborasi BKS PTN Wilayah
                    Barat
                </h1>
                <p className="text-sm text-gray-500">
                    Sistem Informasi Penelitian & Pengabdian Masyarakat
                </p>
            </div>

            {/* Content placeholders */}
            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
