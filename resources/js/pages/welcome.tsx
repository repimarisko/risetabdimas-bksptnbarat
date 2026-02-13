import { login, register } from '@/routes';
import { Head, Link } from '@inertiajs/react';

export default function WelcomeV2({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    // Daftar PTN dengan path logo (39 total)
    const ptnList = [
        {
            name: 'USK (UNSYIAH)',
            logo: '/images/logos/unsyiah.png',
            link: 'https://www.usk.ac.id',
        },
        {
            name: 'UIN Ar-Raniry Banda Aceh',
            logo: '/images/logos/uin-ar-raniry.png',
            link: 'https://www.ar-raniry.ac.id',
        },
        {
            name: 'ISBI Aceh',
            logo: '/images/logos/isbi-nad.png',
            link: 'https://www.isbiaceh.ac.id',
        },
        {
            name: 'UTU',
            logo: '/images/logos/utu.png',
            link: 'https://www.utu.ac.id',
        },
        {
            name: 'UM Samudra',
            logo: '/images/logos/umsam.png',
            link: 'https://www.unsam.ac.id',
        },
        {
            name: 'USU',
            logo: '/images/logos/usu.png',
            link: 'https://www.usu.ac.id',
        },
        {
            name: 'UNIMED',
            logo: '/images/logos/unimed.png',
            link: 'https://www.unimed.ac.id',
        },
        {
            name: 'UIN Sumatera Utara',
            logo: '/images/logos/uinsu.png',
            link: 'https://www.uinsu.ac.id',
        },
        {
            name: 'UIN Syekh Ali Hasan Ahmad Addary Padangsidimpuan',
            logo: '/images/logos/uin-padang-sidempuan.png',
            link: 'https://www.uinsidimpuan.ac.id',
        },
        {
            name: 'UNP',
            logo: '/images/logos/unp.png',
            link: 'https://www.unp.ac.id',
        },
        {
            name: 'ISI Padang Panjang',
            logo: '/images/logos/isi-padangpanjang.png',
            link: 'https://www.isi-padangpanjang.ac.id',
        },
        {
            name: 'UNAND',
            logo: '/images/logos/unand.png',
            link: 'https://www.unand.ac.id',
        },
        {
            name: 'IAIN Batusangkar',
            logo: '/images/logos/iain-batusangkar.png',
            link: 'https://www.iainbatusangkar.ac.id',
        },
        {
            name: 'UNRI',
            logo: '/images/logos/unri.png',
            link: 'https://www.unri.ac.id',
        },
        {
            name: 'UIN Sultan Syarif Kasim Riau',
            logo: '/images/logos/uin-pekanbaru.png',
            link: 'https://www.uin-suska.ac.id',
        },
        {
            name: 'UNIB',
            logo: '/images/logos/unib.png',
            link: 'https://www.unib.ac.id',
        },
        {
            name: 'UNJA',
            logo: '/images/logos/unja.png',
            link: 'https://www.unja.ac.id',
        },
        {
            name: 'UMRAH',
            logo: '/images/logos/umrah.png',
            link: 'https://www.umrah.ac.id',
        },
        {
            name: 'UNSRI',
            logo: '/images/logos/unsri.png',
            link: 'https://www.unsri.ac.id',
        },
        {
            name: 'UIN Raden Fatah Palembang',
            logo: '/images/logos/uin-rf-palembang.png',
            link: 'https://www.radenfatah.ac.id',
        },
        {
            name: 'UNILA',
            logo: '/images/logos/unila.png',
            link: 'https://www.unila.ac.id',
        },
        {
            name: 'ITERA',
            logo: '/images/logos/itera.png',
            link: 'https://www.itera.ac.id',
        },
        {
            name: 'UBB',
            logo: '/images/logos/ubb.png',
            link: 'https://www.ubb.ac.id',
        },
        {
            name: 'UNTIRTA',
            logo: '/images/logos/untirta.png',
            link: 'https://www.untirta.ac.id',
        },
        {
            name: 'UIN Syarif Hidayatullah Jakarta',
            logo: '/images/logos/uin-jakarta.png',
            link: 'https://www.uinjkt.ac.id',
        },
        {
            name: 'Universitas Terbuka',
            logo: '/images/logos/ut.png',
            link: 'https://www.ut.ac.id',
        },
        {
            name: 'UPN Veteran Jakarta',
            logo: '/images/logos/upn-veteran-jakarta.png',
            link: 'https://www.upnvj.ac.id',
        },
        {
            name: 'IPB University',
            logo: '/images/logos/ipb.png',
            link: 'https://www.ipb.ac.id',
        },
        {
            name: 'Universitas Indonesia',
            logo: '/images/logos/ui.png',
            link: 'https://www.ui.ac.id',
        },
        {
            name: 'UNJ',
            logo: '/images/logos/unj.png',
            link: 'https://www.unj.ac.id',
        },
        {
            name: 'UNHAN',
            logo: '/images/logos/unhan.png',
            link: 'https://www.idu.ac.id',
        },
        {
            name: 'UNSIKA',
            logo: '/images/logos/unsika.png',
            link: 'https://www.unsika.ac.id',
        },
        {
            name: 'UPI',
            logo: '/images/logos/upi.png',
            link: 'https://www.upi.edu',
        },
        {
            name: 'ISBI Bandung',
            logo: '/images/logos/isbi-bandung.png',
            link: 'https://www.isbi.ac.id',
        },
        {
            name: 'UNPAD',
            logo: '/images/logos/unpad.png',
            link: 'https://www.unpad.ac.id',
        },
        {
            name: 'UNSIL',
            logo: '/images/logos/unsil.png',
            link: 'https://www.unsil.ac.id',
        },
        {
            name: 'UNTAN',
            logo: '/images/logos/untan.png',
            link: 'https://www.untan.ac.id',
        },
        {
            name: 'Universitas Palangka Raya',
            logo: '/images/logos/universitas-palangkaraya.png',
            link: 'https://www.upr.ac.id',
        },
        {
            name: 'UNMUL',
            logo: '/images/logos/unmal.png',
            link: 'https://www.unmul.ac.id',
        },
    ];

    // Basis urutan: tahun berdiri institusi (tertua -> terbaru)
    const ptnFoundedYear: Record<string, number> = {
        'Universitas Indonesia': 1849,
        USU: 1952,
        UNP: 1954,
        UPI: 1954,
        UNAND: 1955,
        'UIN Syarif Hidayatullah Jakarta': 1957,
        UNPAD: 1957,
        UNTAN: 1959,
        UNSRI: 1960,
        'USK (UNSYIAH)': 1961,
        UNMUL: 1962,
        UNRI: 1962,
        IPB: 1963,
        UNIMED: 1963,
        UNJA: 1963,
        'UPN Veteran Jakarta': 1963,
        'Universitas Palangka Raya': 1963,
        'UIN Ar-Raniry Banda Aceh': 1963,
        UNJ: 1964,
        'UIN Raden Fatah Palembang': 1964,
        'ISI Padang Panjang': 1965,
        UNILA: 1965,
        'UIN Syekh Ali Hasan Ahmad Addary Padangsidimpuan': 1968,
        'IAIN Batusangkar': 1968,
        'ISBI Bandung': 1968,
        'UIN Sultan Syarif Kasim Riau': 1970,
        'UIN Sumatera Utara': 1973,
        UNSIL: 1978,
        UNTIRTA: 1981,
        UNIB: 1982,
        UNSIKA: 1982,
        'Universitas Terbuka': 1984,
        'UM Samudra': 1985,
        UBB: 2006,
        UTU: 2006,
        UMRAH: 2007,
        UNHAN: 2009,
        'ISBI Aceh': 2014,
        ITERA: 2014,
    };

    const sortedPtnList = [...ptnList].sort((a, b) => {
        const yearA = ptnFoundedYear[a.name] ?? Number.MAX_SAFE_INTEGER;
        const yearB = ptnFoundedYear[b.name] ?? Number.MAX_SAFE_INTEGER;

        if (yearA !== yearB) {
            return yearA - yearB;
        }

        return a.name.localeCompare(b.name, 'id');
    });

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
                <header className="border-b border-gray-200 bg-[#212146]">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/images/bks-ptn-logo-bulat.png"
                                alt="BKS PTN Wilayah Barat"
                                className="h-14 w-14 object-contain"
                            />
                            <div>
                                <h1 className="text-lg font-semibold text-white">
                                    BKS PTN Wilayah Barat
                                </h1>
                                <p className="text-xs text-white">
                                    Sistem Informasi Penelitian & Pengabdian
                                    Masyarakat
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
                    {/* Background Logo */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-3">
                        <img
                            src="/images/bks-ptn-logo-bulat.png"
                            alt=""
                            className="w-full max-w-md object-contain"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 w-full max-w-6xl">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            {/* Left - Information */}
                            <div className="space-y-5">
                                <h2 className="text-4xl leading-tight font-bold text-gray-900 lg:text-5xl">
                                    Kolaborasi
                                    <br />
                                    Riset & Pengabdian Masyarakat
                                </h2>
                                <p className="text-base leading-relaxed text-gray-600">
                                    Sistem informasi kolaborasi riset dan
                                    pengabdian masyarakat perguruan tinggi
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
                                            className="block w-full rounded-md bg-blue-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
                                        >
                                            Masuk ke Sistem
                                        </Link>

                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="block w-full rounded-md border border-gray-300 px-6 py-3 text-center font-semibold transition hover:border-gray-400"
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
                <section className="border-t border-gray-200 py-12">
                    <div className="mx-auto max-w-7xl px-6">
                        <h3 className="mb-8 text-center text-xl font-semibold text-[#202045]">
                            Keanggotaan BKS PTN Wilayah Barat
                        </h3>

                        <div className="grid grid-cols-3 items-center justify-items-center gap-6 lg:grid-cols-13">
                            {sortedPtnList.map((ptn) => (
                                <div
                                    key={ptn.name}
                                    className="group flex h-16 w-16 items-center justify-center lg:h-14 lg:w-14"
                                    title={ptn.name}
                                    onClick={() =>
                                        window.open(
                                            ptn.link,
                                            '_blank',
                                            'noopener,noreferrer',
                                        )
                                    }
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
                <footer className="border-t border-gray-200 bg-[#212146] px-6 py-4">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <p className="text-sm text-white">
                            © 2025{' '}
                            <span className="font-semibold text-white">
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
