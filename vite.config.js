import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        assetsDir: 'assets',
    },
    server: {
        port: 3000,
    },
});