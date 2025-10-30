import { login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function WelcomeV2({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    // Daftar PTN dengan path logo (39 total)
    const ptnList = [
        { name: 'UNAND', logo: '/images/logos/unand.png' },
        { name: 'UNSYIAH', logo: '/images/logos/unsyiah.png' },
        { name: 'USU', logo: '/images/logos/usu.png' },
        { name: 'UNIMED', logo: '/images/logos/unimed.png' },
        { name: 'UNRI', logo: '/images/logos/unri.png' },
        { name: 'UNP', logo: '/images/logos/unp.png' },
        { name: 'UNJA', logo: '/images/logos/unja.png' },
        { name: 'UNSRI', logo: '/images/logos/unsri.jpg' },
        { name: 'UNILA', logo: '/images/logos/unila.png' },
        { name: 'UNTAN', logo: '/images/logos/untan.png' },
        { name: 'UNIB', logo: '/images/logos/unib.png' },
        {
            name: 'ISI PADANG PANJANG',
            logo: '/images/logos/isi-padangpanjang.png',
        },
        {
            name: 'UNIVERSITAS PALANGKARAYA',
            logo: '/images/logos/universitas-palangkaraya.png',
        },
        { name: 'UNJ', logo: '/images/logos/unj.png' },
        { name: 'UNMAL', logo: '/images/logos/unmal.png' },
        { name: 'UNTIRTA', logo: '/images/logos/untirta.png' },
        { name: 'UIN JAKARTA', logo: '/images/logos/uin-jakarta.png' },
        { name: 'IPB', logo: '/images/logos/ipb.png' },
        { name: 'UI', logo: '/images/logos/ui.png' },
        { name: 'UIN PEKANBARU', logo: '/images/logos/uin-pekanbaru.png' },
        { name: 'UMRAH', logo: '/images/logos/umrah.png' },
        { name: 'UBB', logo: '/images/logos/ubb.png' },
        { name: 'UTU', logo: '/images/logos/utu.png' },
        {
            name: 'UIN RF PALEMBANG',
            logo: '/images/logos/uin-rf-palembang.png',
        },
        { name: 'UIN AR RANIRY', logo: '/images/logos/uin-ar-raniry.png' },
        { name: 'ITERA', logo: '/images/logos/itera.png' },
        { name: 'ISBI NAD', logo: '/images/logos/isbi-nad.png' },
        { name: 'UMSAM', logo: '/images/logos/umsam.png' },
        { name: 'UNHAN', logo: '/images/logos/unhan.png' },
        { name: 'UNSIL', logo: '/images/logos/unsil.png' },
        { name: 'UNSIKA', logo: '/images/logos/unsika.png' },
        {
            name: 'UPN VETERAN JAKARTA',
            logo: '/images/logos/upn-veteran-jakarta.png',
        },
        { name: 'UINSU', logo: '/images/logos/uinsu.png' },
        { name: 'UT', logo: '/images/logos/ut.png' },
        {
            name: 'IAIN BATUSANGKAR',
            logo: '/images/logos/iain-batusangkar.png',
        },
        { name: 'UPI', logo: '/images/logos/upi.png' },
        { name: 'ISBI BANDUNG', logo: '/images/logos/isbi-bandung.png' },
        { name: 'UNPAD', logo: '/images/logos/unpad.png' },
        {
            name: 'UIN PADANG SIDEMPUAN',
            logo: '/images/logos/uin-padang-sidempuan.png',
        },
    ];

    return (
        <>
            <Head title="BKS PTN Wilayah Barat - Selamat Datang">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=poppins:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <main className="flex min-h-screen flex-col bg-white">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/images/bks-ptn-logo.png"
                                alt="BKS PTN Wilayah Barat"
                                className="h-12 w-12 object-contain"
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
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <section className="flex flex-1 items-center justify-center px-6 py-16">
                    <div className="w-full max-w-6xl">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            {/* Left - Information */}
                            <div className="space-y-5">
                                <h2 className="text-4xl leading-tight font-bold text-gray-900 lg:text-5xl">
                                    Platform Kolaborasi
                                    <br />
                                    Riset & Pengabdian Masyarakat
                                </h2>
                                <p className="text-base leading-relaxed text-gray-600">
                                    Sistem informasi kolaborasi riset dan
                                    pengabdian masyarakat antar perguruan tinggi
                                    negeri wilayah barat
                                </p>

                                <div className="pt-2">
                                    <Link
                                        href="/panduan"
                                        className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
                                    >
                                        <svg
                                            className="mr-2 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Lihat Panduan Penggunaan
                                    </Link>
                                </div>
                            </div>

                            {/* Right - Login Buttons */}
                            <div className="flex items-center justify-center lg:justify-end">
                                <div className="w-full max-w-md space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Masuk
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Silakan pilih opsi di bawah untuk
                                            melanjutkan
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <Link
                                            href={login()}
                                            className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            Masuk ke Sistem
                                        </Link>

                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="block w-full rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
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

                {/* Supported Universities - Logo Grid */}
                <section className="border-t border-gray-200 bg-gray-50 py-12">
                    <div className="mx-auto max-w-7xl px-6">
                        {/* <h3 className="mb-8 text-center text-lg font-semibold text-gray-700">
                            Didukung oleh 39 Perguruan Tinggi Negeri Wilayah
                            Barat
                        </h3> */}

                        <div className="grid grid-cols-3 items-center justify-items-center gap-6 lg:grid-cols-13">
                            {ptnList.map((ptn) => (
                                <div
                                    key={ptn.name}
                                    className="group flex h-16 w-16 items-center justify-center lg:h-14 lg:w-14"
                                    title={ptn.name}
                                >
                                    <img
                                        src={ptn.logo}
                                        alt={`Logo ${ptn.name}`}
                                        className="hover h-full w-full object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:opacity-100"
                                        onError={(e) => {
                                            // Fallback jika gambar tidak ditemukan
                                            e.currentTarget.style.display =
                                                'none';
                                            const parent =
                                                e.currentTarget.parentElement;
                                            if (parent) {
                                                parent.innerHTML = `<div class="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">${ptn.name}</div>`;
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-6">
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
