import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import { type User } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const { auth } = usePage<{ auth: any }>().props;
    const roles: string[] = auth?.roles ?? [];
    const activeRole: string | null | undefined = auth?.active_role;

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const handleSwitchRole = (role: string) => {
        if (role === activeRole) {
            return;
        }
        router.post('/settings/active-role', { role }, { preserveScroll: false });
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roles.length > 1 && (
                <>
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
                        Role Aktif
                    </DropdownMenuLabel>
                    <DropdownMenuGroup>
                        {roles.map((role) => {
                            const isActive = role === activeRole;
                            return (
                                <DropdownMenuItem
                                    key={role}
                                    className="flex items-center justify-between"
                                    onSelect={() => handleSwitchRole(role)}
                                >
                                    <span className="text-sm capitalize">{role}</span>
                                    {isActive ? (
                                        <span className="text-[10px] font-semibold text-emerald-600">
                                            Aktif
                                        </span>
                                    ) : null}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                </>
            )}
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={edit()}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
