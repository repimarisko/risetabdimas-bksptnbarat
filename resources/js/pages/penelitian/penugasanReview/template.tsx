import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, usePage } from '@inertiajs/react';

type Breadcrumb = {
    title: string;
    href: string;
};

type PageProps = {
    breadcrumbs?: Breadcrumb[];
};

export default function PenugasanReviewIndex() {
    const { breadcrumbs = [] } = usePage<PageProps>().props;

    return (
        <AppHeaderLayout
            breadcrumbs={
                breadcrumbs.length
                    ? breadcrumbs
                    : [
                          { title: 'Dashboard', href: '/dashboard' },
                          { title: 'Penugasan Review', href: '/admin/pt-penelitian/penugasan-review' },
                      ]
            }
        >
            <Head title="Penugasan Review Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
                    {/* --- Tambahkan konten di sini --- */}
                </div>
            </div>
        </AppHeaderLayout>
    );
}
