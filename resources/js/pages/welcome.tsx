import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { login, register } from '@/routes';

export default function WelcomeV2({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="BKS PTN Wilayah Barat - Selamat Datang">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />
            </Head>

            <main className="min-h-screen flex flex-col bg-white">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">BKS</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">BKS PTN Wilayah Barat</h1>
                                <p className="text-xs text-gray-500">Sistem Informasi Riset & Pengabdian Masyarakat</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <section className="flex-1 flex items-center justify-center px-6 py-16">
                    <div className="max-w-6xl w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left - Information */}
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Platform Kolaborasi<br />
                                    Riset & Pengabdian Masyarakat
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Sistem informasi kolaborasi riset dan pengabdian masyarakat antar perguruan tinggi negeri wilayah barat
                                </p>

                                <div className="pt-4">
                                    <Link
                                        href="/panduan"
                                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Lihat Panduan Penggunaan
                                    </Link>
                                </div>
                            </div>

                            {/* Right - Login Buttons */}
                            <div className="flex items-center justify-center lg:justify-end">
                                <div className="w-full max-w-md bg-gray-50 rounded-2xl border border-gray-200 p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang</h3>
                                    <p className="text-gray-600 mb-6">Silakan pilih opsi di bawah untuk melanjutkan</p>

                                    <div className="space-y-3">
                                        <Link
                                            href={login()}
                                            className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-sm"
                                        >
                                            Masuk ke Sistem
                                        </Link>
                                        
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="block w-full text-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-semibold"
                                            >
                                                Daftar Akun Baru
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 py-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-sm text-gray-600">
                            © 2025 <span className="font-semibold text-gray-900">Universitas Andalas</span> - BKS PTN Wilayah Barat
                        </p>
                    </div>
                </footer>
            </main>
        </>
    );
}