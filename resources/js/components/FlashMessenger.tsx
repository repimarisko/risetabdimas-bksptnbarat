import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

type FlashProps = {
    success?: string;
    error?: string;
    info?: string;
    warning?: string;
};

type FlashMessengerProps = {
    initialFlash?: FlashProps;
};

export default function FlashMessenger({ initialFlash }: FlashMessengerProps) {
    useEffect(() => {
        const showAlert = (flash?: FlashProps) => {
            if (!flash) {
                return;
            }

            const show = (title: string, text: string, icon: 'success' | 'error' | 'info' | 'warning') => {
                Swal.fire({
                    title,
                    text,
                    icon,
                    confirmButtonColor: icon === 'success' ? '#16a34a' : icon === 'error' ? '#dc2626' : '#6366f1',
                });
            };

            if (flash.success) {
                show('Berhasil', flash.success, 'success');
                return;
            }

            if (flash.error) {
                show('Gagal', flash.error, 'error');
                return;
            }

            if (flash.warning) {
                show('Perhatian', flash.warning, 'warning');
                return;
            }

            if (flash.info) {
                show('Informasi', flash.info, 'info');
            }
        };

        showAlert(initialFlash);

        const handleSuccess = (event: any) => {
            const nextFlash = event?.detail?.page?.props?.flash as FlashProps | undefined;
            showAlert(nextFlash);
        };

        const unlisten = router.on('success', handleSuccess);
        return () => {
            if (typeof unlisten === 'function') {
                unlisten();
            }
        };
    }, [initialFlash]);

    return null;
}
