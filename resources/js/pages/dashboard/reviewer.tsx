import DashboardNav from '@/components/DashboardNav';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Reviewer',
        href: '/dashboard/reviewer',
    },
];

export default function DashboardReviewer() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Reviewer" />
            <DashboardNav />

            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">Panel Reviewer</h1>
                <p className="text-sm text-gray-500">
                    Tinjau dan evaluasi proposal penelitian yang ditugaskan, berikan penilaian dan
                    rekomendasi secara objektif sesuai kriteria yang ditetapkan.
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10 space-y-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <DashboardCard title="Proposal Ditugaskan" value="--">
                        Total proposal penelitian yang ditugaskan kepada Anda untuk direview.
                    </DashboardCard>
                    <DashboardCard title="Menunggu Review" value="--">
                        Proposal yang belum selesai ditinjau dan memerlukan tindakan segera.
                    </DashboardCard>
                    <DashboardCard title="Selesai Direview" value="--">
                        Proposal yang telah selesai Anda tinjau dan berikan penilaian.
                    </DashboardCard>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <DashboardCard title="Direkomendasikan Didanai" value="--">
                        Proposal yang Anda rekomendasikan untuk mendapatkan pendanaan.
                    </DashboardCard>
                    <DashboardCard title="Tidak Direkomendasikan" value="--">
                        Proposal yang tidak Anda rekomendasikan untuk didanai berdasarkan evaluasi.
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