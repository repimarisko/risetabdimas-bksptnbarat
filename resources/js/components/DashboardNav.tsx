import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import {  ChevronDown, FlaskConical, Home } from 'lucide-react';
import { type SharedData } from '@/types';

export default function DashboardNav() {
    const { auth } = usePage<SharedData>().props;
    const activeRole = auth.active_role ?? null;

    const isDosen = activeRole === 'dosen';
    const isKetuaLppm = activeRole === 'ketua-lppm';
    const isAdminPt = activeRole === 'admin-pt';
    const isSuperAdmin = activeRole === 'super-admin';

    const menuPermissions = new Set(
        (auth.permissions ?? []).filter((permission) =>
            permission.startsWith('menu:'),
        ),
    );
    const canAccessMenu = (key: string, fallback: boolean) =>
        menuPermissions.size > 0 ? menuPermissions.has(`menu:${key}`) : fallback;

    const dashboardUrl = isSuperAdmin
        ? '/dashboard/super-admin'
        : isKetuaLppm
          ? '/dashboard/ketua-lppm'
          : isAdminPt
            ? '/dashboard/admin-pt'
            : isDosen
              ? '/dashboard/dosen'
              : dashboard().url;

    const showDosenPenelitian = isDosen && canAccessMenu('pt-penelitian-dosen', isDosen);
    const showAdminPenelitian = (isAdminPt || isSuperAdmin) && canAccessMenu('pt-penelitian-admin', isAdminPt || isSuperAdmin);
    const showAssignReviewer = (isAdminPt || isSuperAdmin) && canAccessMenu('assign-reviewer', isAdminPt || isSuperAdmin);
    const showApprovals = isAdminPt && canAccessMenu('user-approvals', isAdminPt);
    const showSkema = isSuperAdmin && canAccessMenu('skema', isSuperAdmin);
    const showSkemaAktif = isAdminPt && canAccessMenu('skema', isAdminPt);
    const showRoleAssignment = isSuperAdmin && canAccessMenu('role-assignment', isSuperAdmin);
    const showRoleMenus = isSuperAdmin && canAccessMenu('role-menus', isSuperAdmin);

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
                    {(showDosenPenelitian || showAdminPenelitian || isKetuaLppm) && (
                        <div className="group relative flex items-center gap-2">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                <FlaskConical className="h-5 w-5 text-white" />
                            </span>
                            <button className="inline-flex items-center gap-1 hover:text-blue-200">
                                Usulan Regular
                                <ChevronDown className="h-3.5 w-3.5" />
                            </button>

                            {/* Mega dropdown */}
                            <div className="invisible absolute top-full left-0 z-50 mt-2 w-[calc(100vw-2rem)] max-w-[1200px] translate-y-1 rounded-xl border border-gray-200 bg-white p-6 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                                    {/* Penelitian - Dosen */}
                                    {showDosenPenelitian && (
                                        <div className="col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                    Penelitian
                                                </h4>
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    {[
                                                        { name: 'Usulan', href: '/pt-penelitian' },
                                                        { name: 'Perbaikan Usulan', href: '/pt-penelitian/perbaikan' },
                                                        { name: 'Laporan Kemajuan', href: '#' },
                                                        { name: 'Catatan Harian', href: '#' },
                                                        { name: 'Laporan Akhir',href: '#' },
                                                        { name: 'Pengkinian Capaian Luaran',href: '#' },
                                                       
                                                    ].map((item) => (
                                                        <li key={item.name}>
                                                            <Link href={item.href} className="hover:text-blue-700">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                    Pengabdian
                                                </h4>
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    {[
                                                        { name: 'Usulan', href: '/pt-pengabdian' },
                                                        { name: 'Perbaikan Usulan', href: '#' },
                                                        { name: 'Laporan Kemajuan',href: '#'},
                                                        { name: 'Catatan Harian', href: '#'},
                                                        { name: 'Laporan Akhir', href: '#' },
                                                        { name: 'Pengkinian Capaian Luaran', href: '#' },
                                                    
                                                    ].map((item) => (
                                                        <li key={item.name}>
                                                            <Link href={item.href} className="hover:text-blue-700">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* Penelitian - Admin PT */}
                                    {(showAdminPenelitian || showAssignReviewer) && (
                                        <>
                                            <div>
                                                <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                    Penelitian
                                                </h4>
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    {[
                                                        { name: 'Usulan Regular', href: '/admin/pt-penelitian', visible: showAdminPenelitian },
                                                        { name: 'Assign Reviewer', href: '/admin/pt-penelitian/assign-reviewer', visible: showAssignReviewer },
                                                        { name: 'Catatan Harian', href: '/admin/pt-penelitian/catatan-harian', visible: true },
                                                        { name: 'Perbaikan Usulan', href: '/admin/pt-penelitian/perbaikan', visible: true },
                                                        { name: 'Laporan Kemajuan', href: '/admin/pt-penelitian/laporan-kemajuan', visible: true },
                                                        { name: 'Laporan Akhir', href: '/admin/pt-penelitian/laporan-akhir', visible: true },
                                                        { name: 'Monitoring Pelaksanaan', href: '/admin/pt-penelitian/monitoring', visible: true },
                                                    ].filter((item) => item.visible !== false).map((item) => (
                                                        <li key={item.name}>
                                                            <Link href={item.href} className="hover:text-blue-700">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                    Pengabdian
                                                </h4>
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    {[
                                                        { name: 'Usulan Regular', href: '/admin/pt-pengabdian' },
                                                        { name: 'Catatan Harian', href: '/admin/pt-pengabdian/catatan-harian' },
                                                        { name: 'Perbaikan Usulan', href: '/admin/pt-pengabdian/perbaikan' },
                                                        { name: 'Laporan Kemajuan', href: '/admin/pt-pengabdian/laporan-kemajuan' },
                                                        { name: 'Laporan Akhir', href: '/admin/pt-pengabdian/laporan-akhir' },
                                                        { name: 'Monitoring Pelaksanaan', href: '/admin/pt-pengabdian/monitoring' },
                                                    ].map((item) => (
                                                        <li key={item.name}>
                                                            <Link href={item.href} className="hover:text-blue-700">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
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

                    {/* Skema Aktif - Admin PT */}
                    {isAdminPt && (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/admin/pt-skema"
                                className="inline-flex items-center gap-1 hover:text-blue-200"
                            >
                                Skema Aktif
                            </Link>
                        </div>
                    )}

                    <div className="ml-auto flex items-center gap-6">
                       

                        {showApprovals && (
                            <Link
                                href="/users/approvals"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Approve Akun Baru
                            </Link>
                        )}

                        {showSkema && (
                            <Link
                                href="/admin/pt-skema"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Skema
                            </Link>
                        )}
                        {showSkemaAktif && (
                            <Link
                                href="/admin/pt-skema"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Skema Aktif
                            </Link>
                        )}

                        {showRoleAssignment && (
                            <Link
                                href="/settings/role-assignment"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Role Assignment
                            </Link>
                        )}
                        {showRoleMenus && (
                            <Link
                                href="/settings/role-menus"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Menu Akses Role
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
