import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, FlaskConical, Home } from 'lucide-react';
import { type SharedData } from '@/types';

export default function DashboardNav() {
    const { auth } = usePage<SharedData>().props;
    const roles = auth.roles ?? [];

    const isDosen = roles.includes('dosen');
    const isAdminPt = roles.includes('admin-pt');
    const isSuperAdmin = roles.includes('super-admin');

    const dashboardUrl = isSuperAdmin
        ? '/dashboard/super-admin'
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
                    {(isDosen || isAdminPt) && (
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
                                </div>
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
                </nav>
            </div>
        </div>
    );
}
