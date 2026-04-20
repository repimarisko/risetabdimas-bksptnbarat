import { Link, usePage } from '@inertiajs/react';
import { Home } from 'lucide-react';
import { type SharedData, type MenuItem } from '@/types';
import { NavDosen } from './nav/nav-dosen';
import { NavAdminPt } from './nav/nav-admin-pt';
import { NavKetuaLppm } from './nav/nav-ketua-lppm';
import { NavReviewer } from './nav/nav-reviewer';
import { NavSuperAdmin } from './nav/nav-super-admin';
import { knownSlugs, resolveDashboardUrl, roleMenuSlugs } from './nav/nav-config';
 
export default function DashboardNav() {
    const { auth } = usePage<SharedData>().props;
    const roles   = auth.roles ?? [];
    const menus   = auth.menus ?? [];
    const currentRole = auth.active_role ?? roles[0] ?? null;

    const allowedSlugs = currentRole ? (roleMenuSlugs[currentRole] ?? []) : [];
    const showMenu = (slug: string) => allowedSlugs.includes(slug);

    const extraMenus = menus.filter(
        (menu: MenuItem) => menu.href && !knownSlugs.has(menu.slug) && showMenu(menu.slug),
    );

    return (
        <div className="w-full bg-[#182e6b] text-white">
            <div className="mx-auto max-w-7xl px-4">
                <nav className="flex items-center gap-6 py-3 text-sm font-medium">

                    {/* Dashboard */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center  bg-white/10">
                            <Home className="h-5 w-5 text-white" />
                        </span>
                        <Link href={resolveDashboardUrl(currentRole, menus)} className="inline-flex items-center gap-1 hover:text-blue-200">
                            Dashboard
                        </Link>
                    </div>

                    {currentRole === 'dosen'       && <NavDosen showMenu={showMenu} />}
                    {currentRole === 'admin-pt'    && <NavAdminPt showMenu={showMenu} />}
                    {currentRole === 'ketua-lppm'  && <NavKetuaLppm />}
                    {currentRole === 'reviewer'    && <NavReviewer showMenu={showMenu}/>}
                    {currentRole === 'super-admin' && <NavSuperAdmin showMenu={showMenu} />}

                    {/* Admin PT right menu */}
         
                    {/* Extra Menus */}
                    {/* {extraMenus.length > 0 && (
                        <div className="ml-auto flex items-center gap-6">
                            {extraMenus.map((menu: MenuItem) => (
                                <Link key={menu.id} href={menu.href ?? '#'} className="inline-flex items-center gap-2 hover:text-blue-200">
                                    {menu.name}
                                </Link>
                            ))}
                        </div>
                    )} */}

                </nav>
            </div>
        </div>
    );
}
 