import { resolve } from 'path';
import fs from 'fs';

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
        main: resolve(__dirname, 'index.html')
      }
    }
  },

  plugins: [
    {
      name: 'clini-mdx-static-serve',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next();
          const cleanPath = decodeURIComponent(req.url.split('?')[0]);

          // 1. Phục vụ nội dung MDX thô (raw text/plain)
          if (cleanPath.endsWith('.mdx') || cleanPath.endsWith('.md')) {
            const fileName = cleanPath.split('/').pop() || '';
            const candidates = [
              resolve(__dirname, cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath),
              resolve(__dirname, 'src/content/ebm/guidelines/kho-guidelines', fileName),
              resolve(__dirname, 'src/content/basic-medical/physiology', fileName),
              resolve(__dirname, 'src/content/basic-medical/biochemistry', fileName),
              resolve(__dirname, 'src/content/basic-medical/epidemiology', fileName)
            ];

            for (const targetPath of candidates) {
              if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                return fs.createReadStream(targetPath).pipe(res);
              }
            }
          }

          // 2. Phục vụ hình ảnh minh họa trong kho guidelines
          if (cleanPath.includes('/kho-guidelines/images/') || cleanPath.startsWith('/images/')) {
            const imageName = cleanPath.split('/').pop() || '';
            const imgPath = resolve(__dirname, 'src/content/ebm/guidelines/kho-guidelines/images', imageName);
            if (fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
              const ext = imageName.split('.').pop()?.toLowerCase();
              const mime = ext === 'png' ? 'image/png' : (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : ext === 'svg' ? 'image/svg+xml' : ext === 'webp' ? 'image/webp' : 'application/octet-stream';
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
      }
    }
  ],

  server: {
    port: 3000,
    open: true,
    cors: true
  }
};
