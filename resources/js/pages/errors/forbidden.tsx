import { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { ShieldAlert } from 'lucide-react';

type PageProps = {
    redirectTo: string;
};

export default function Forbidden() {
    const { redirectTo } = usePage<PageProps>().props;
    const [count, setCount] = useState(20);

    useEffect(() => {
        if (count <= 0) {
            window.location.href = redirectTo;
            return;
        }

        const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [count, redirectTo]);

    return (
        <>
            <Head title="Akses Ditolak" />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white border border-gray-200 p-10 max-w-md w-full text-center space-y-6">

                    <div className="flex justify-center">
                        <div className="bg-red-50 p-4 rounded-full">
                            <ShieldAlert className="w-10 h-10 text-red-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-xl font-bold text-gray-800">Akses Ditolak</h1>
                        <p className="text-sm text-gray-500">
                            Role aktif Anda tidak sesuai untuk mengakses halaman tersebut.
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className="relative flex items-center justify-center">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                            <circle
                                cx="18" cy="18" r="15.9"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="2"
                            />
                            <circle
                                cx="18" cy="18" r="15.9"
                                fill="none"
                                stroke="#1d3b8b"
                                strokeWidth="2"
                                strokeDasharray="100"
                                strokeDashoffset={100 - (count / 20) * 100}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 1s linear' }}
                            />
                        </svg>
                        <span className="absolute text-xl font-bold text-[#1d3b8b]">{count}</span>
                    </div>

                    <p className="text-sm text-gray-500">
                        Anda akan diarahkan ke dashboard dalam{' '}
                        <span className="font-semibold text-[#1d3b8b]">{count} detik</span>
                    </p>

                    <button
                        onClick={() => (window.location.href = redirectTo)}
                        className="w-full bg-[#1d3b8b] text-white py-2.5 text-sm font-semibold hover:bg-[#162d6e] transition-colors"
                    >
                        Kembali ke Dashboard Sekarang
                    </button>

                </div>
            </div>
        </>
    );
}