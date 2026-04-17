import { useCallback, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { AxiosResponse } from 'axios';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type InvalidEvent = CustomEvent<{ response: AxiosResponse }>;

const DEFAULT_MESSAGE =
    'Anda tidak memiliki akses untuk melakukan aksi ini.';

export default function UnauthorizedModalProvider({
    children,
}: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);

    const closeAndGoBack = useCallback(() => {
        setIsOpen(false);
        setTimeout(() => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }

            router.visit('/');
        }, 150);
    }, []);

    useEffect(() => {
        const handleInvalid = (event: Event) => {
            const invalidEvent = event as InvalidEvent;
            const { response } = invalidEvent.detail;

            if (response.status !== 403) {
                return;
            }

            invalidEvent.preventDefault();

            const responseData = response.data;
            const nextMessage =
                typeof responseData === 'object' &&
                responseData !== null &&
                typeof responseData.message === 'string'
                    ? responseData.message
                    : DEFAULT_MESSAGE;

            setMessage(nextMessage);
            setIsOpen(true);
        };

        document.addEventListener(
            'inertia:invalid',
            handleInvalid as EventListener,
        );

        return () => {
            document.removeEventListener(
                'inertia:invalid',
                handleInvalid as EventListener,
            );
        };
    }, []);

    return (
        <>
            {children}
            <Dialog
                open={isOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        closeAndGoBack();
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Akses ditolak</DialogTitle>
                        <DialogDescription>{message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={closeAndGoBack}>Kembali</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
