import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import UnauthorizedModalProvider from './components/unauthorized-modal-provider';
import FlashMessenger from './components/FlashMessenger';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./pages/**/*.{tsx,ts,jsx,js}');
const pagePathCandidates = (name: string) => [
    `./pages/${name}.tsx`,
    `./pages/${name}.ts`,
    `./pages/${name}.jsx`,
    `./pages/${name}.js`,
    `./pages/${name}/index.tsx`,
    `./pages/${name}/index.ts`,
    `./pages/${name}/index.jsx`,
    `./pages/${name}/index.js`,
];

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(pagePathCandidates(name), pages),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <UnauthorizedModalProvider>
                    <FlashMessenger initialFlash={props.initialPage.props.flash as any} />
                    <App {...props} />
                </UnauthorizedModalProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
