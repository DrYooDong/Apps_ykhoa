import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'cdss-rewrite-fallback',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url && req.url.startsWith('/knowledge-vault/cdss/')) {
              req.url = req.url.replace('/knowledge-vault/cdss/', '/cdss/');
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: true,
      hmr: true,
      fs: {
        allow: ['..', '../..'],
      },
    },
  };
});
