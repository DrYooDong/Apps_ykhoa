import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Quan trọng nhất: base: './' giúp toàn bộ sản phẩm build trong dist/
  // tương thích hoàn hảo với giao thức file:/// offline và đóng gói Electron/Capacitor
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
