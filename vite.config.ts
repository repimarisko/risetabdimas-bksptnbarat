import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const ngrokDomain = env.VITE_NGROK_DOMAIN || env.NGROK_DOMAIN || null;

    const corsOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ];

    if (ngrokDomain) {
        corsOrigins.push(`https://${ngrokDomain}`);
    }

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react({
                babel: {
                    plugins: ['babel-plugin-react-compiler'],
                },
            }),
            tailwindcss(),
            wayfinder({
                formVariants: true,
            }),
        ],
        server: {
            host: true,
            cors: {
                origin: corsOrigins,
                credentials: true,
            },
            origin: ngrokDomain ? `https://${ngrokDomain}` : undefined,
            hmr: ngrokDomain
                ? {
                      host: ngrokDomain,
                      protocol: 'wss',
                      port: 443,
                      clientPort: 443,
                  }
                : undefined,
        },
        esbuild: {
            jsx: 'automatic',
        },
    };
});
