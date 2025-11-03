import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head } from '@inertiajs/react';
import { useMemo } from 'react';

export default function RoleAssignment() {
    const breadcrumbs = useMemo(
        () => [
            { title: 'Dashboard', href: '/dashboard/super-admin' },
            { title: 'Role Assignment', href: '/settings/role-assignment' },
        ],
        [],
    );

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Assignment" />
            <DashboardNav />

            <div className="mx-auto max-w-4xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Manajemen Role Pengguna
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Fitur penugasan role akan dikembangkan di tahap berikutnya.
                    Untuk sementara, gunakan perintah artisan atau tinker untuk
                    mengelola role pengguna.
                </p>
            </div>
        </AppHeaderLayout>
    );
}
