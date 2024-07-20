import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    build: {
        assetsDir: 'assets',
        outDir: 'dist',
    },
    server: {
        port: 3000,
    },
    publicDir: 'public',
    root: './',
    plugins: [
        eslint({
            cache: false,
            fix: true,
        }),
    ],
});