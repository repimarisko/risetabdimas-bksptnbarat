import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { ChevronDown, Monitor, Home } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {/* Blue navigation bar */}
            <div className="w-full bg-[#182e6b] text-white">
                <div className="mx-auto max-w-7xl px-4">
                    <nav className="flex items-center gap-6 py-3 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                                <Home className="h-3.5 w-3.5 text-white" />
                            </span>
                            <button className="inline-flex items-center gap-1 hover:text-blue-200">
                                Dashboard
                              
                            </button>
                        </div>
                        <div className="relative group flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                                <Monitor className="h-3.5 w-3.5 text-white" />
                            </span>
                            <button className="inline-flex items-center gap-1 hover:text-blue-200">
                                Monitoring & Data
                                <ChevronDown className="h-3.5 w-3.5" />
                            </button>

                            {/* Mega dropdown */}
                            <div className="invisible absolute left-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-[1200px] translate-y-1 rounded-xl border border-gray-200 bg-white p-6 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                                    <div>
                                        <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">Monitoring</h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li><Link href="#" className="hover:text-blue-700">Usulan Regular</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Perbaikan usulan</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Perbaikan Usulan Prototipe</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Laporan Kemajuan</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Laporan Akhir</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Monitoring Pelaksanaan</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Catatan Harian</Link></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">Monitoring Program Lainnya</h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li><Link href="#" className="hover:text-blue-700">Usulan Prototipe</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Usulan Kosabangsa</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Usulan Mahasiswa Berdampak</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Usulan Inovasi Seni Nusantara</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Usulan Transformasi Teknologi dan Inovasi</Link></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">Monitoring Minat Katalis</h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li><Link href="#" className="hover:text-blue-700">Minat Katalis</Link></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">Monev</h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li><Link href="#" className="hover:text-blue-700">Monev Internal PT</Link></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">Data Pendukung</h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li><Link href="#" className="hover:text-blue-700">Profile Lembaga</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Cari Akun</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Sinkronasi Prodi</Link></li>
                                            <li><Link href="#" className="hover:text-blue-700">Sinkronasi Dosen</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Page title */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Riset dan Pengabdian Masyarakat Kolaborasi BKS PTN Wilayah Barat
                </h1>
            </div>

            {/* Content placeholders */}
            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10" />
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
