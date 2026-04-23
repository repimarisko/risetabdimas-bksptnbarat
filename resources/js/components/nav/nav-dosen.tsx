import { Link } from '@inertiajs/react';
import { ChevronDown, FlaskConical } from 'lucide-react';

interface Props {
    showMenu: (slug: string) => boolean;
}

export function NavDosen({ showMenu }: Props) {
    return (
        <div className="group relative flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center bg-white/10">
                <FlaskConical className="h-5 w-5 text-white" />
            </span>
            <button className="inline-flex items-center gap-1 hover:text-blue-200">
                Usulan Regular <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute top-full left-0 z-50 mt-2 w-[calc(100vw-2rem)] max-w-[1200px] translate-y-1 border border-gray-200 bg-white p-6 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">
                                Penelitian
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {[
                                    {
                                        name: 'Usulan',
                                        href: '/pt-penelitian',
                                        slug: 'pt-penelitian',
                                    },
                                    {
                                        name: 'Perbaikan Usulan',
                                        href: '/pt-penelitian/perbaikan',
                                        slug: 'pt-penelitian-perbaikan',
                                    },
                                ]
                                    .filter((item) => showMenu(item.slug))
                                    .map((item) => (
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
                        {/* <div>
                            <h4 className="mb-3 text-base font-semibold text-[#1f3a8a]">Pengabdian</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>
                                    <Link href="/pt-pengabdian" className="hover:text-blue-700">Usulan</Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
