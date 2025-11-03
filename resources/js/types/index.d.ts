import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    roles: string[];
    permissions: string[];
    pendingApprovals?: PendingApproval[];
    pendingApprovalsCount?: number;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface PendingApproval {
    id: number;
    anggota_id: number;
    penelitian_uuid: string;
    title: string | null;
    status?: string | null;
    approval_status?: string | null;
    created_at?: string | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    uuid_pt?: string | null;
    dosen?: {
        uuid?: string;
        uuid_pt?: string | null;
        verified_at?: string | null;
    } | null;
    [key: string]: unknown; // This allows for additional properties...
}
