import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

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

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => resolvePageComponent(pagePathCandidates(name), pages),
        setup: ({ App, props }) => {
            return <App {...props} />;
        },
    }),
);
