import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { Bell, ChevronDown, FlaskConical, Home } from 'lucide-react';
import { type SharedData } from '@/types';

export default function DashboardNav() {
    const { auth } = usePage<SharedData>().props;
    const roles = auth.roles ?? [];

    const isDosen = roles.includes('dosen');
    const isKetuaLppm = roles.includes('ketua-lppm');
    const isAdminPt = roles.includes('admin-pt');
    const isSuperAdmin = roles.includes('super-admin');

    const pendingApprovals = auth.pendingApprovals ?? [];
    const pendingApprovalsCount = auth.pendingApprovalsCount ?? pendingApprovals.length;

    const formatNotificationDate = (value?: string | null): string => {
        if (!value) {
            return '-';
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return '-';
        }

        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const dashboardUrl = isSuperAdmin
        ? '/dashboard/super-admin'
        : isKetuaLppm
          ? '/dashboard/ketua-lppm'
          : isAdminPt
            ? '/dashboard/admin-pt'
            : isDosen
              ? '/dashboard/dosen'
              : dashboard().url;

    return (
        <div className="w-full bg-[#182e6b] text-white">
            <div className="mx-auto max-w-7xl px-4">
                <nav className="flex items-center gap-6 py-3 text-sm font-medium">
                    {/* Dashboard */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                            <Home className="h-5 w-5 text-white" />
                        </span>
                        <Link href={dashboardUrl} className="inline-flex items-center gap-1 hover:text-blue-200">
                            Dashboard
                        </Link>
                    </div>

                    {/* Penelitian */}
                    {(isDosen || isAdminPt || isKetuaLppm) && (
                        <div className="group relative flex items-center gap-2">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                <FlaskConical className="h-5 w-5 text-white" />
                            </span>
                            <button className="inline-flex items-center gap-1 hover:text-blue-200">
                                Penelitian
                                <ChevronDown className="h-3.5 w-3.5" />
                            </button>

                            {/* Mega dropdown */}
                            <div className="invisible absolute top-full left-0 z-50 mt-2 w-[calc(100vw-2rem)] max-w-[1200px] translate-y-1 rounded-xl border border-gray-200 bg-white p-6 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                                    {/* Penelitian - Dosen */}
                                    {isDosen && (
                                        <div>
                                            <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                Penelitian Dosen
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                {[
                                                    {
                                                        name: 'Usulan Regular',
                                                        href: '/pt-penelitian',
                                                    },
                                                    {
                                                        name: 'Buat Usulan',
                                                        href: '/pt-penelitian/create',
                                                    },
                                                ].map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className="hover:text-blue-700"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Penelitian - Admin PT */}
                                    {isAdminPt && (
                                        <div>
                                            <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                Monitoring PT
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                {[
                                                    {
                                                        name: 'Usulan Penelitian',
                                                        href: '/admin/pt-penelitian',
                                                    },
                                                    {
                                                        name: 'Daftar Skema',
                                                        href: '/admin/pt-skema',
                                                    },
                                                ].map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className="hover:text-blue-700"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {isKetuaLppm && (
                                        <div>
                                            <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                Monitoring LPPM
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                {[
                                                    {
                                                        name: 'Persetujuan Penelitian',
                                                        href: '/admin/pt-penelitian',
                                                    },
                                                ].map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className="hover:text-blue-700"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="ml-auto flex items-center gap-6">
                        {isDosen && (
                            <div className="group relative">
                                <button
                                    type="button"
                                    className="flex items-center gap-2 text-sm hover:text-blue-200 focus:outline-none"
                                >
                                    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                        <Bell className="h-5 w-5 text-white" />
                                        {pendingApprovalsCount > 0 ? (
                                            <span className="absolute -top-1 -right-1 inline-flex min-h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[0.625rem] font-semibold leading-none text-white">
                                                {pendingApprovalsCount}
                                            </span>
                                        ) : null}
                                    </span>
                                    <span className="hidden sm:inline">Persetujuan</span>
                                </button>

                                <div className="invisible absolute right-0 top-full z-50 mt-3 w-80 translate-y-1 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <h4 className="mb-3 text-sm font-semibold text-gray-900">
                                        Menunggu Persetujuan Anggota
                                    </h4>
                                    {pendingApprovalsCount > 0 ? (
                                        <ul className="space-y-3">
                                            {pendingApprovals.map((approval) => (
                                                <li key={approval.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                                                    <div className="font-semibold text-gray-900 line-clamp-2" title={approval.title ?? 'Usulan Penelitian'}>
                                                        {approval.title ?? 'Usulan Penelitian'}
                                                    </div>
                                                    <div className="mt-1 text-xs text-gray-500">
                                                        Dibuat: {formatNotificationDate(approval.created_at)}
                                                    </div>
                                                    <Link
                                                        href={`/pt-penelitian/${approval.penelitian_uuid}/preview`}
                                                        className="mt-2 inline-flex items-center text-xs font-semibold text-indigo-600 transition hover:text-indigo-500"
                                                    >
                                                        Lihat Detail
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-xs text-gray-500">Tidak ada persetujuan yang menunggu.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {isAdminPt && (
                            <Link
                                href="/users/approvals"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Approve Akun Baru
                            </Link>
                        )}

                        {isSuperAdmin && (
                            <Link
                                href="/admin/pt-skema"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Skema
                            </Link>
                        )}

                        {isSuperAdmin && (
                            <Link
                                href="/settings/role-assignment"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Role Assignment
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
