import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';
import { ChevronDown, FlaskConical, Home } from 'lucide-react';

export default function DashboardNav() {
    return (
        <div className="w-full bg-[#182e6b] text-white">
            <div className="mx-auto max-w-7xl px-4">
                <nav className="flex items-center gap-6 py-3 text-sm font-medium">
                    {/* Dashboard */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                            <Home className="h-5 w-5 text-white" />
                        </span>
                        <Link
                            href={dashboard().url}
                            className="inline-flex items-center gap-1 hover:text-blue-200"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Penelitian */}
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
                                {/* Pengusulan Penelitian */}
                                <div>
                                    <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                        Penelitian
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        {[
                                            {
                                                name: 'Usulan Regular',
                                                href: '/penelitian',
                                            },
                                            // {
                                            //     name: 'Perbaikan Usulan',
                                            //     href: '/penelitian/perbaikan-usulan',
                                            // },
                                            // {
                                            //     name: 'Perbaikan Usulan Prototipe',
                                            //     href: '/penelitian/perbaikan-prototipe',
                                            // },
                                            // {
                                            //     name: 'Laporan Kemajuan',
                                            //     href: '/penelitian/laporan-kemajuan',
                                            // },
                                            // {
                                            //     name: 'Laporan Akhir',
                                            //     href: '/penelitian/laporan-akhir',
                                            // },
                                            // {
                                            //     name: 'Monitoring Pelaksanaan',
                                            //     href: '/penelitian/monitoring',
                                            // },
                                            // {
                                            //     name: 'Catatan Harian',
                                            //     href: '/penelitian/catatan-harian',
                                            // },
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

                                {/* Monev */}
                                <div>
                                    <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                        Monev
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li>
                                            <Link
                                                href="/penelitian/monev-internal"
                                                className="hover:text-blue-700"
                                            >
                                                Monev Internal PT
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Data Pendukung */}
                                <div>
                                    <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                        Data Pendukung
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        {[
                                            {
                                                name: 'Profile Lembaga',
                                                href: '/penelitian/profile-lembaga',
                                            },
                                            {
                                                name: 'Cari Akun',
                                                href: '/penelitian/cari-akun',
                                            },
                                            {
                                                name: 'Sinkronasi Prodi',
                                                href: '/penelitian/sinkron-prodi',
                                            },
                                            {
                                                name: 'Sinkronasi Dosen',
                                                href: '/penelitian/sinkron-dosen',
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
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
