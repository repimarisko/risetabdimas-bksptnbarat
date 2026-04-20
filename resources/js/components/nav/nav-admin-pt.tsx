import { Link } from '@inertiajs/react';
import { ChevronDown, FlaskConical } from 'lucide-react';

interface Props {
    showMenu: (slug: string) => boolean;
}

const penelitianItems = [
    {
        name: 'Usulan Regular',
        href: '/admin/pt-penelitian',
        slug: 'admin-pt-penelitian',
    },
    {
        name: 'Penugasan Review',
        href: '/admin/pt-penelitian/penugasan-review',
        slug: '',
    },
    {
        name: 'Monitoring Penelitian',
        href: '/admin/pt-penelitian/report',
        slug: '',
    },
    // { name: 'Perbaikan Usulan',        href: '/admin/pt-penelitian/perbaikan',        slug: '' },
    // { name: 'Laporan Kemajuan',        href: '/admin/pt-penelitian/laporan-kemajuan', slug: '' },
    // { name: 'Laporan Akhir',           href: '/admin/pt-penelitian/laporan-akhir',    slug: '' },
    // { name: 'Monitoring Pelaksanaan',  href: '/admin/pt-penelitian/monitoring',       slug: '' },
];

const pengabdianItems = [
    { name: 'Usulan Regular', href: '/admin/pt-pengabdian' },
    // { name: 'Catatan Harian',         href: '/admin/pt-pengabdian/catatan-harian' },
    // { name: 'Perbaikan Usulan',       href: '/admin/pt-pengabdian/perbaikan' },
    // { name: 'Laporan Kemajuan',       href: '/admin/pt-pengabdian/laporan-kemajuan' },
    // { name: 'Laporan Akhir',          href: '/admin/pt-pengabdian/laporan-akhir' },
    // { name: 'Monitoring Pelaksanaan', href: '/admin/pt-pengabdian/monitoring' },
];

export function NavAdminPt({ showMenu }: Props) {
    return (
        <>
            <div className="group relative flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center bg-white/10">
                    <FlaskConical className="h-5 w-5 text-white" />
                </span>
                <button className="inline-flex items-center gap-1 hover:text-blue-200">
                    Usulan Regular <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute top-full left-0 z-50 mt-2 w-[calc(100vw-2rem)] max-w-[1200px] translate-y-1 border border-gray-200 bg-white p-6 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        <div>
                            <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                Penelitian
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {penelitianItems
                                    .filter(
                                        (item) =>
                                            !item.slug || showMenu(item.slug),
                                    )
                                    .map((item) => (
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
                        {/* <div>
                            <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">Pengabdian</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {pengabdianItems.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="hover:text-blue-700">{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* TAMBAHAN DARI @file_context_0 */}
            <div className="ml-auto flex items-center gap-6">
                {showMenu('users-approvals') && (
                    <Link
                        href="/users/approvals"
                        className="inline-flex items-center gap-2 hover:text-blue-200"
                    >
                        Approve Akun Baru
                    </Link>
                )}
                {showMenu('pt-skema') && (
                    <Link
                        href="/admin/pt-skema"
                        className="inline-flex items-center gap-2 hover:text-blue-200"
                    >
                        Skema Aktif
                    </Link>
                )}
            </div>
        </>
    );
}
