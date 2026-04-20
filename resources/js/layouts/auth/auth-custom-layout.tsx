import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

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
            <main className="flex min-h-screen flex-col bg-white">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href={home()} className="flex items-center gap-3">
                            <img
                                src="/images/bks-ptn-logo-bulat.png"
                                alt="BKS PTN Wilayah Barat"
                                className="h-14 w-14 object-contain"
                            />
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">
                                    BKS PTN Wilayah Barat
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Sistem Informasi Penelitian & Pengabdian
                                    Masyarakat
                                </p>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Content Section */}
                <section className="flex flex-1 items-center justify-center px-6 py-16">
                    <div className="w-full max-w-md">
                        <div className=" border border-gray-200 bg-gray-50 p-8">
                            <div className="mb-6 space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {title}
                                </h2>
                                <p className="text-gray-600">{description}</p>
                            </div>
                            {children}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-gray-50 py-6">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <p className="text-sm text-gray-600">
                            © 2025{' '}
                            <span className="font-semibold text-gray-900">
                                Universitas Andalas
                            </span>{' '}
                            - BKS PTN Wilayah Barat
                        </p>
                    </div>
                </footer>
            </main>
        </>
    );
}
