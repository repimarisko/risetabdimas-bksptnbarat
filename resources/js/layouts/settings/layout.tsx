import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profil',
        href: edit(),
        icon: null,
    },
    {
        title: 'Kata Sandi',
        href: editPassword(),
        icon: null,
    },
    {
        title: 'Autentikasi 2 Langkah',
        href: show(),
        icon: null,
    },
    {
        title: 'Tampilan',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <Heading
                title="Pengaturan Akun"
                description="Kelola profil, keamanan, dan preferensi tampilan"
            />

            <div className="mt-6 space-y-6">
                <nav className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
                    {sidebarNavItems.map((item, index) => (
                        <Button
                            key={`${resolveUrl(item.href)}-${index}`}
                            size="sm"
                            variant={isSameUrl(currentPath, item.href) ? 'secondary' : 'ghost'}
                            asChild
                            className={cn(
                                'rounded-full border px-4 py-2 text-sm font-semibold',
                                isSameUrl(currentPath, item.href)
                                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                                    : 'border-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-50',
                            )}
                        >
                            <Link href={item.href}>
                                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </nav>

                <Separator />

                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    {children}
                </section>
            </div>
        </div>
    );
}
