import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ClipboardList, FlaskConical, Home } from 'lucide-react';
import { type SharedData, type MenuItem } from '@/types';

export default function DashboardNav() {
    const { auth } = usePage<SharedData>().props;
    const roles = auth.roles ?? [];
    const activeRole = auth.activeRole ?? roles[0] ?? null;
    const menus = auth.menus ?? [];
    const allowedSlugs = menus.map((menu) => menu.slug);
    const knownSlugs = new Set([
        'dashboard',
        'pt-penelitian',
        'pt-penelitian-perbaikan',
        'admin-pt-penelitian',
        'assign-reviewer',
        'users-approvals',
        'pt-skema',
        'role-assignment',
        'settings-menus',
        'reviewer-dashboard',
    ]);
    const extraMenus = menus.filter(
        (menu) => menu.href && !knownSlugs.has(menu.slug),
    );

    const currentRole = activeRole ?? roles[0] ?? null;

    const isDosen = currentRole === 'dosen';
    const isKetuaLppm = currentRole === 'ketua-lppm';
    const isAdminPt = currentRole === 'admin-pt';
    const isSuperAdmin = currentRole === 'super-admin';
    const isReviewer = currentRole === 'reviewer';

    const dashboardUrl = resolveDashboardUrl(currentRole, menus);

    const showMenu = (slug: string) => allowedSlugs.includes(slug);

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
                                Usulan Regular
                                <ChevronDown className="h-3.5 w-3.5" />
                            </button>

                            {/* Mega dropdown */}
                            <div className="invisible absolute top-full left-0 z-50 mt-2 w-[calc(100vw-2rem)] max-w-[1200px] translate-y-1 rounded-xl border border-gray-200 bg-white p-6 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                                    {/* Penelitian - Dosen */}
                                    {isDosen && (
                                        <div className="col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                    Penelitian
                                                </h4>
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    {[
                                                        { name: 'Usulan', href: '/pt-penelitian', slug: 'pt-penelitian' },
                                                        { name: 'Perbaikan Usulan', href: '/pt-penelitian/perbaikan', slug: 'pt-penelitian-perbaikan' },
                                                    ]
                                                        .filter((item) => showMenu(item.slug))
                                                        .map((item) => (
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
                                                {/* Placeholder pengabdian; adjust when menus tersedia */}
                                                {[
                                                    { name: 'Usulan', href: '/pt-pengabdian' },
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
                                    {(isAdminPt || isSuperAdmin || isKetuaLppm) && (
                                        <>
                                            <div>
                                                <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                                    Penelitian
                                                </h4>
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    {[
                                                        { name: 'Usulan Regular', href: '/admin/pt-penelitian', slug: 'admin-pt-penelitian' },
                                                        { name: 'Plotting Reviewer', href: '/admin/pt-penelitian/assign-reviewer', slug: 'assign-reviewer' },
                                                    ]
                                                        .filter((item) => showMenu(item.slug))
                                                        .map((item) => (
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
                                    {isKetuaLppm && showMenu('admin-pt-penelitian') && (
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

                    {isReviewer && showMenu('reviewer-dashboard') && (
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                <ClipboardList className="h-5 w-5 text-white" />
                            </span>
                            <Link
                                href="/reviewer/pt-penelitian"
                                className="inline-flex items-center gap-1 hover:text-blue-200"
                            >
                                Review Proposal
                            </Link>
                        </div>
                    )}

                    <div className="ml-auto flex items-center gap-6">
                       

                    {isAdminPt && showMenu('users-approvals') && (
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
                        {isAdminPt && showMenu('pt-skema') && (
                            <Link
                                href="/admin/pt-skema"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Skema Aktif
                            </Link>
                        )}

                        {isSuperAdmin && showMenu('role-assignment') && (
                            <Link
                                href="/settings/role-assignment"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Role Assignment
                            </Link>
                        )}
                        {isSuperAdmin && showMenu('settings-menus') && (
                            <Link
                                href="/settings/menus"
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                Menu Settings
                            </Link>
                        )}

                        {extraMenus.map((menu) => (
                            <Link
                                key={menu.id}
                                href={menu.href ?? '#'}
                                className="inline-flex items-center gap-2 hover:text-blue-200"
                            >
                                {menu.name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}

function resolveDashboardUrl(currentRole: string | null, menus: MenuItem[]): string {
    const prioritized = [
        { role: 'super-admin', href: '/dashboard/super-admin' },
        { role: 'ketua-lppm', href: '/dashboard/ketua-lppm' },
        { role: 'admin-pt', href: '/dashboard/admin-pt' },
        { role: 'reviewer', href: '/dashboard/reviewer' },
        { role: 'dosen', href: '/dashboard/dosen' },
    ];

    const menuHref = menus.find((menu) => menu.slug === 'dashboard')?.href;

    if (currentRole) {
        const match = prioritized.find((item) => item.role === currentRole);
        if (match) {
            return match.href;
        }
    }

    if (menuHref) {
        return menuHref;
    }

    const fallback = prioritized[prioritized.length - 1];
    return fallback.href;
}
