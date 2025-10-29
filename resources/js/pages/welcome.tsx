import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { login, register } from '@/routes';

export default function WelcomeV2({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    // Daftar PTN dengan path logo (39 total)
    const ptnList = [
        { name: "UNAND", logo: "/images/logos/unand.png" },
        { name: "UI", logo: "/images/logos/ui.png" },
        { name: "ITB", logo: "/images/logos/itb.png" },
        { name: "IPB", logo: "/images/logos/ipb.png" },
        { name: "UGM", logo: "/images/logos/ugm.png" },
        { name: "USU", logo: "/images/logos/usu.png" },
        { name: "UNSRI", logo: "/images/logos/unsri.png" },
        { name: "UNJA", logo: "/images/logos/unja.png" },
        { name: "UNTIRTA", logo: "/images/logos/untirta.png" },
        { name: "UNRI", logo: "/images/logos/unri.png" },
        { name: "UNIB", logo: "/images/logos/unib.png" },
        { name: "UNP", logo: "/images/logos/unp.png" },
        { name: "UNILA", logo: "/images/logos/unila.png" },
        { name: "UNJ", logo: "/images/logos/unj.png" },
        { name: "UNY", logo: "/images/logos/uny.png" },
        { name: "UNNES", logo: "/images/logos/unnes.png" },
        { name: "UNDIP", logo: "/images/logos/undip.png" },
        { name: "UB", logo: "/images/logos/ub.png" },
        { name: "UNEJ", logo: "/images/logos/unej.png" },
        { name: "UM", logo: "/images/logos/um.png" },
        { name: "UNS", logo: "/images/logos/uns.png" },
        { name: "UPI", logo: "/images/logos/upi.png" },
        { name: "POLBAN", logo: "/images/logos/polban.png" },
        { name: "POLINUS", logo: "/images/logos/polinus.png" },
        { name: "POLNEP", logo: "/images/logos/polnep.png" },
        { name: "POLMED", logo: "/images/logos/polmed.png" },
        { name: "POLINDEL", logo: "/images/logos/polindel.png" },
        { name: "POLTEK JAKARTA", logo: "/images/logos/poltek-jakarta.png" },
        { name: "POLTEK PADANG", logo: "/images/logos/poltek-padang.png" },
        { name: "POLTEK SRIWIJAYA", logo: "/images/logos/poltek-sriwijaya.png" },
        { name: "POLTEK BATAM", logo: "/images/logos/poltek-batam.png" },
        { name: "POLTEK BENGKALIS", logo: "/images/logos/poltek-bengkalis.png" },
        { name: "POLTEK LAMPUNG", logo: "/images/logos/poltek-lampung.png" },
        { name: "POLTEK TANJUNG BALAI", logo: "/images/logos/poltek-tanjungbalai.png" },
        { name: "POLTEK JEMBER", logo: "/images/logos/poltek-jember.png" },
        { name: "POLTEK SEMARANG", logo: "/images/logos/poltek-semarang.png" },
        { name: "POLTEK BANDUNG", logo: "/images/logos/poltek-bandung.png" },
        { name: "POLTEK BANYUWANGI", logo: "/images/logos/poltek-banyuwangi.png" },
        { name: "POLTEK SUBANG", logo: "/images/logos/poltek-subang.png" }
    ];

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
                            <img
                                src="/images/bks-ptn-logo.png"
                                alt="BKS PTN Wilayah Barat"
                                className="w-12 h-12 object-contain"
                            />
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">BKS PTN Wilayah Barat</h1>
                                <p className="text-xs text-gray-500">Sistem Informasi Penelitian & Pengabdian Masyarakat</p>
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
                                <div className="w-full max-w-md bg-gray-50 rounded-2xl border border-gray-200 p-8 shadow-sm">
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

                {/* Supported Universities - Logo Grid */}
                <section className="bg-gray-50 border-t border-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-8 text-center">
                            Didukung oleh 39 Perguruan Tinggi Negeri Wilayah Barat
                        </h3>

                        <div className="grid grid-cols-3 lg:grid-cols-13 gap-6 items-center justify-items-center">
                            {ptnList.map((ptn) => (
                                <div
                                    key={ptn.name}
                                    className="flex items-center justify-center w-16 h-16 lg:w-14 lg:h-14 group"
                                    title={ptn.name}
                                >
                                    <img
                                        src={ptn.logo}
                                        alt={`Logo ${ptn.name}`}
                                        className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                                        onError={(e) => {
                                            // Fallback jika gambar tidak ditemukan
                                            e.currentTarget.style.display = 'none';
                                            const parent = e.currentTarget.parentElement;
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
                <footer className="border-t border-gray-200 py-6 bg-white">
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