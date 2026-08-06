import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Quan trọng nhất: process.env.VITE_BASE_PATH || './' giúp tương thích với cả
  // giao thức file:/// offline, đóng gói Electron/Capacitor và GitHub Pages subdirectory.
  base: process.env.VITE_BASE_PATH || './',

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
