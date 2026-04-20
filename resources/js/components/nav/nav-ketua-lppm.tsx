import { Link } from '@inertiajs/react';
import { ChevronDown, FlaskConical } from 'lucide-react';

export function NavKetuaLppm() {
    return (
        <div className="group relative flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center  bg-white/10">
                <FlaskConical className="h-5 w-5 text-white" />
            </span>
            <button className="inline-flex items-center gap-1 hover:text-blue-200">
                Monitoring <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute top-full left-0 z-50 mt-2 w-64 translate-y-1   border border-gray-200 bg-white p-6 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">Monitoring LPPM</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                        <Link href="/admin/pt-penelitian" className="hover:text-blue-700">
                            Persetujuan Penelitian
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}