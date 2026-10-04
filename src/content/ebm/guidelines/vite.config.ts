import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

function rawMdxPlugin(): Plugin {
  return {
    name: 'raw-mdx-plugin',
    transform(src, id) {
      if (id.split('?')[0].endsWith('.mdx')) {
        return {
          code: `export default ${JSON.stringify(src)};`,
          map: null,
        };
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url) {
          const cleanPath = decodeURIComponent(req.url.split('?')[0]);
          if (cleanPath.endsWith('.mdx')) {
            const relPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
            const filePath = resolve(__dirname, relPath);
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              return fs.createReadStream(filePath).pipe(res);
            }
          }
          if (cleanPath.startsWith('/images/')) {
            const imageName = cleanPath.replace(/^\/images\//, '');
            const filePath = resolve(__dirname, 'kho-guidelines/images', imageName);
            if (fs.existsSync(filePath)) {
              const ext = imageName.split('.').pop()?.toLowerCase();
              const mime = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'svg' ? 'image/svg+xml' : 'application/octet-stream';
              res.setHeader('Content-Type', mime);
              return fs.createReadStream(filePath).pipe(res);
            }
          }
        }
        next();
      });
    },
    closeBundle() {
      const copyDir = (srcDir: string, destDir: string) => {
        if (!fs.existsSync(srcDir)) return;
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        for (const file of fs.readdirSync(srcDir)) {
          const srcPath = resolve(srcDir, file);
          const destPath = resolve(destDir, file);
          if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };
      copyDir(resolve(__dirname, 'kho-guidelines'), resolve(__dirname, 'dist/kho-guidelines'));
      copyDir(resolve(__dirname, 'data'), resolve(__dirname, 'dist/data'));
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [rawMdxPlugin()],
  assetsInclude: ['**/*.mdx', '**/*.bib', '**/*.ris', '**/*.md'],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        guidelines: resolve(__dirname, 'guidelines.html'),
        journalQuality: resolve(__dirname, 'journal-quality-analyzer.html'),
        radar: resolve(__dirname, 'guideline-radar/radar.html'),
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
  },
});
