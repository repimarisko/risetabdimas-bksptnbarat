import { type MenuItem } from '@/types';

export const roleMenuSlugs: Record<string, string[]> = {
    'dosen':       ['dashboard', 'pt-penelitian', 'pt-penelitian-perbaikan'],
    'admin-pt':    ['dashboard', 'admin-pt-penelitian', 'pt-skema', 'users-approvals'],
    'ketua-lppm':  ['dashboard', 'admin-pt-penelitian'],
    'reviewer':    ['dashboard', 'reviewer-dashboard', 'penugasan-review', 'penugasan-substansi'],
    'super-admin': ['dashboard', 'pt-skema', 'role-assignment', 'settings-menus'],
};

export const knownSlugs = new Set([
    'dashboard', 'pt-penelitian', 'pt-penelitian-perbaikan',
    'admin-pt-penelitian', 'penugasan-review', 'users-approvals',
    'pt-skema', 'role-assignment', 'settings-menus', 'reviewer-dashboard',
]);

export const dashboardMap: Record<string, string> = {
    'super-admin': '/dashboard/super-admin',
    'ketua-lppm':  '/dashboard/ketua-lppm',
    'admin-pt':    '/dashboard/admin-pt',
    'reviewer':    '/dashboard/reviewer',
    'dosen':       '/dashboard/dosen',
};

export function resolveDashboardUrl(currentRole: string | null, menus: MenuItem[]): string {
    if (currentRole && dashboardMap[currentRole]) return dashboardMap[currentRole];
    const menuHref = menus.find((m) => m.slug === 'dashboard')?.href;
    if (menuHref) return menuHref;
    return '/dashboard/dosen';
}