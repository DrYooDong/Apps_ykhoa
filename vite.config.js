import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Quan trọng nhất: base: './' giúp tương thích với cả
  // giao thức file:/// offline, đóng gói Electron/Capacitor và GitHub Pages.
  base: './',
  assetsInclude: ['**/*.mdx', '**/*.md'],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },

  plugins: [
    {
      name: 'guidelines-spa-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.startsWith('/kho-guidelines/') || req.url.includes('/kho-guidelines/'))) {
            const slug = req.url.split('/kho-guidelines/')[1].replace(/\.html.*$/, '');
            if (slug && slug !== 'index') {
              res.writeHead(302, { Location: `/#/ebm/kho-guidelines/${slug}` });
              return res.end();
            }
          }
          next();
        });
      }
    }
  ],

  server: {
    port: 3000,
    open: true,
    cors: true
  }
});
