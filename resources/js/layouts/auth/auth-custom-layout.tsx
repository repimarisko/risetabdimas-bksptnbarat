import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { home } from '@/routes';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthCustomLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
            <main className="min-h-screen flex flex-col bg-white">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href={home()} className="flex items-center gap-3">
                            <img
                                src="/images/bks-ptn-logo.png"
                                alt="BKS PTN Wilayah Barat"
                                className="w-12 h-12 object-contain"
                            />
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">BKS PTN Wilayah Barat</h1>
                                <p className="text-xs text-gray-500">Sistem Informasi Riset & Pengabdian Masyarakat</p>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Content Section */}
                <section className="flex-1 flex items-center justify-center px-6 py-16">
                    <div className="max-w-md w-full">
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
                            <div className="space-y-2 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                                <p className="text-gray-600">{description}</p>
                            </div>
                            {children}
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

