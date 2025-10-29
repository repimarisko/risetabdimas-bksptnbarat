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

            <div className="mt-6 flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-64">
                    <nav className="flex flex-col space-y-2">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${resolveUrl(item.href)}-${index}`}
                                size="sm"
                                variant={isSameUrl(currentPath, item.href) ? 'secondary' : 'ghost'}
                                asChild
                                className={cn('w-full justify-start rounded-lg', {
                                    'bg-blue-50 text-blue-700 hover:bg-blue-100': isSameUrl(
                                        currentPath,
                                        item.href,
                                    ),
                                })}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="mr-2 h-4 w-4" />
                                    )}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1">
                    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
