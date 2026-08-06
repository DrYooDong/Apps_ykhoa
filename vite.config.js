import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Quan trọng nhất: base: './' giúp tương thích với cả
  // giao thức file:/// offline, đóng gói Electron/Capacitor và GitHub Pages.
  base: './',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },

  server: {
    port: 3000,
    open: true,
    cors: true
  }
});
