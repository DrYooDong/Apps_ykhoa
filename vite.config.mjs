import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  // Quan trọng nhất: base: './' giúp tương thích với cả
  // giao thức file:/// offline, đóng gói Electron/Capacitor và GitHub Pages.
  base: './',
  assetsInclude: ['**/*.mdx', '**/*.md'],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/');
          // Giữ nguyên lazy-chunk riêng lẻ cho từng bài viết .mdx / .md để tải theo nhu cầu
          if (norm.includes('.mdx') || norm.includes('.md')) return undefined;
          if (norm.includes('node_modules/')) return 'chunk-vendor';
          if (norm.includes('/src/content/ebm/')) return 'chunk-ebm-core';
          if (norm.includes('/src/content/knowledge-vault/')) return 'chunk-knowledge-vault';
          if (norm.includes('/src/content/docspace/')) return 'chunk-docspace-bridge';
          if (norm.includes('/src/simulators/') || norm.includes('/src/tools/')) return 'chunk-simulators-tools';
          if (norm.includes('/src/dashboard/') || norm.includes('/src/effects/')) return 'chunk-dashboard-effects';
          return undefined;
        },
      },
    },
  },

  plugins: [
    {
      name: 'clini-mdx-static-serve',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next();
          const cleanPath = decodeURIComponent(req.url.split('?')[0]);

          // 1. Phục vụ nội dung MDX thô (raw text/plain) cho fetch trực tiếp, bỏ qua các module import (?raw / ?import / script) để Vite tự transform
          if (cleanPath.endsWith('.mdx') || cleanPath.endsWith('.md')) {
            const isViteModuleReq =
              req.url.includes('?raw') ||
              req.url.includes('&raw') ||
              req.url.includes('?import') ||
              req.url.includes('&import') ||
              req.headers['sec-fetch-dest'] === 'script';
            if (!isViteModuleReq) {
              const fileName = cleanPath.split('/').pop() || '';
              const candidates = [
                resolve(__dirname, cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath),
                resolve(__dirname, 'src/content/ebm/guidelines/kho-guidelines', fileName),
                resolve(__dirname, 'src/content/basic-medical/physiology', fileName),
                resolve(__dirname, 'src/content/basic-medical/biochemistry', fileName),
                resolve(__dirname, 'src/content/basic-medical/epidemiology', fileName),
              ];

              for (const targetPath of candidates) {
                if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
                  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  return fs.createReadStream(targetPath).pipe(res);
                }
              }
            }
          }

          // 2. Phục vụ hình ảnh minh họa trong kho guidelines
          if (cleanPath.includes('/kho-guidelines/images/') || cleanPath.startsWith('/images/')) {
            const imageName = cleanPath.split('/').pop() || '';
            const imgPath = resolve(__dirname, 'src/content/ebm/guidelines/kho-guidelines/images', imageName);
            if (fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
              const ext = imageName.split('.').pop()?.toLowerCase();
              const mime =
                ext === 'png'
                  ? 'image/png'
                  : ext === 'jpg' || ext === 'jpeg'
                  ? 'image/jpeg'
                  : ext === 'svg'
                  ? 'image/svg+xml'
                  : ext === 'webp'
                  ? 'image/webp'
                  : 'application/octet-stream';
              res.setHeader('Content-Type', mime);
              res.setHeader('Access-Control-Allow-Origin', '*');
              return fs.createReadStream(imgPath).pipe(res);
            }
          }

          // 3. SPA Route Redirect chỉ áp dụng cho truy cập URL HTML, KHÔNG redirect file tĩnh/MDX
          if (req.url.startsWith('/kho-guidelines/') || req.url.includes('/kho-guidelines/')) {
            const isAsset = /\.(mdx|md|png|jpg|jpeg|svg|webp|css|js|json|ico)$/i.test(cleanPath);
            if (!isAsset) {
              const slug = cleanPath.split('/kho-guidelines/')[1].replace(/\.html.*$/, '');
              if (slug && slug !== 'index') {
                res.writeHead(302, { Location: `/#/ebm/kho-guidelines/${slug}` });
                return res.end();
              }
            }
          }

          next();
        });
      },
    },
  ],

  server: {
    port: 3000,
    open: true,
    cors: true,
  },
};
