import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search, Bell } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';


//navbar properties
const mainNavItems: NavItem[] = [];


const activeItemStyles =
    'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const pendingApprovals = auth.pendingApprovals ?? [];
    const pendingApprovalsCount =
        typeof auth.pendingApprovalsCount === 'number'
            ? auth.pendingApprovalsCount
            : pendingApprovals.length;

    const handleApprovalAction = (penelitianUuid: string, action: 'approve' | 'reject') => {
        const confirmText =
            action === 'approve'
                ? 'Setujui keikutsertaan pada penelitian ini?'
                : 'Tolak keikutsertaan pada penelitian ini?';

        if (!window.confirm(confirmText)) {
            return;
        }

        const url =
            action === 'approve'
                ? `/pt-penelitian/${penelitianUuid}/anggota-approve`
                : `/pt-penelitian/${penelitianUuid}/anggota-reject`;

        router.post(url, {}, { preserveScroll: true });
    };

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-[34px] w-[34px]"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation Menu
                                </SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && (
                                                        <Icon
                                                            iconNode={item.icon}
                                                            className="h-5 w-5"
                                                        />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center space-x-2"
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="relative flex h-full items-center"
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                isSameUrl(
                                                    page.url,
                                                    item.href,
                                                ) && activeItemStyles,
                                                'h-9 cursor-pointer px-3',
                                            )}
                                        >
                                            {item.icon && (
                                                <Icon
                                                    iconNode={item.icon}
                                                    className="mr-2 h-4 w-4"
                                                />
                                            )}
                                            {item.title}
                                        </Link>
                                        {isSameUrl(page.url, item.href) && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative size-10  p-0"
                                    aria-label="Notifikasi persetujuan anggota"
                                >
                                    <Bell className="h-5 w-5" />
                                    {pendingApprovalsCount > 0 ? (
                                        <span className="absolute -right-0.5 -top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center  bg-amber-500 px-1.5 text-xs font-semibold text-white">
                                            {pendingApprovalsCount}
                                        </span>
                                    ) : null}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-80 p-0"
                                align="end"
                                side="bottom"
                            >
                                <div className="border-b px-4 py-3 text-sm font-semibold text-neutral-800">
                                    Persetujuan Anggota
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {pendingApprovals.length === 0 ? (
                                        <div className="px-4 py-3 text-sm text-neutral-500">
                                            Tidak ada permintaan persetujuan anggota.
                                        </div>
                                    ) : (
                                        pendingApprovals.map((item) => (
                                            <div
                                                key={`${item.id}-${item.penelitian_uuid}`}
                                                className="flex flex-col gap-2 px-4 py-3 text-sm transition hover:bg-neutral-50"
                                            >
                                                <Link
                                                    href={`/pt-penelitian/${item.penelitian_uuid}/edit`}
                                                    className="flex flex-col gap-1"
                                                >
                                                    <span className="font-semibold text-neutral-900 line-clamp-2">
                                                        {item.title ?? 'Usulan tanpa judul'}
                                                    </span>
                                                    <span className="text-xs text-neutral-500">
                                                        Status: {item.status ?? 'Menunggu'}
                                                    </span>
                                                </Link>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleApprovalAction(
                                                                item.penelitian_uuid,
                                                                'approve',
                                                            )
                                                        }
                                                        className="flex-1  bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
                                                    >
                                                        Setujui
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleApprovalAction(
                                                                item.penelitian_uuid,
                                                                'reject',
                                                            )
                                                        }
                                                        className="flex-1  border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                                                    >
                                                        Tolak
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10  p-1"
                                >
                                    <Avatar className="size-8 overflow-hidden ">
                                        <AvatarImage
                                            src={auth.user.avatar}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className=" bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 0 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
