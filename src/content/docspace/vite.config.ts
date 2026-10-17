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
      {
        name: 'soap-case-api',
        async configureServer(server) {
          const fs = await import('node:fs');
          const path = await import('node:path');
          const { execSync } = await import('node:child_process');

          const baDir = path.resolve(__dirname, 'data/ba');
          const rootDir = path.resolve(__dirname, '../../..');
          const vaultBaDir = path.resolve(rootDir, 'knowledge-vault/Kho bệnh án');
          const scriptPath = path.resolve(rootDir, 'tools/scripts/ingest-notebooklm-case.mjs');

          // GET /api/soap/raw?caseId=...
          server.middlewares.use(async (req, res, next) => {
            if (!req.url?.startsWith('/api/soap/raw')) {
              return next();
            }

            try {
              const urlObj = new URL(req.url, 'http://localhost:3000');
              const caseId = urlObj.searchParams.get('caseId');
              const reqFileName = urlObj.searchParams.get('file');

              if (!caseId && !reqFileName) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing caseId or file parameter' }));
                return;
              }

              let foundFileName = '';
              let targetPath = '';

              if (reqFileName && fs.existsSync(path.join(baDir, reqFileName))) {
                foundFileName = reqFileName;
                targetPath = path.join(baDir, reqFileName);
              } else if (caseId) {
                const candidates = [
                  `${caseId}.md`,
                  `soap-${caseId}.md`,
                  `${caseId.replace(/^soap-/, '')}.md`,
                ];

                for (const c of candidates) {
                  const p = path.join(baDir, c);
                  if (fs.existsSync(p)) {
                    foundFileName = c;
                    targetPath = p;
                    break;
                  }
                }

                // If not found by direct name, search inside files for caseId
                if (!foundFileName && fs.existsSync(baDir)) {
                  const allFiles = fs.readdirSync(baDir).filter((f) => f.endsWith('.md'));
                  for (const f of allFiles) {
                    const content = fs.readFileSync(path.join(baDir, f), 'utf-8');
                    if (content.includes(`caseId: "${caseId}"`) || content.includes(`caseId: ${caseId}`)) {
                      foundFileName = f;
                      targetPath = path.join(baDir, f);
                      break;
                    }
                  }
                }
              }

              if (!foundFileName || !fs.existsSync(targetPath)) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'File not found on disk' }));
                return;
              }

              const content = fs.readFileSync(targetPath, 'utf-8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, fileName: foundFileName, content }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });

          // POST /api/soap/save
          server.middlewares.use(async (req, res, next) => {
            if (req.url !== '/api/soap/save' || req.method !== 'POST') {
              return next();
            }

            try {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });

              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const { caseId, fileName: customFileName, markdown } = data;

                  if (!markdown || typeof markdown !== 'string') {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Missing markdown content' }));
                    return;
                  }

                  if (!fs.existsSync(baDir)) {
                    fs.mkdirSync(baDir, { recursive: true });
                  }

                  // Determine target file name
                  let targetFileName = customFileName || '';

                  if (!targetFileName && caseId) {
                    const directCandidates = [
                      `${caseId}.md`,
                      `soap-${caseId}.md`,
                      `${caseId.replace(/^soap-/, '')}.md`,
                    ];
                    for (const cand of directCandidates) {
                      if (fs.existsSync(path.join(baDir, cand))) {
                        targetFileName = cand;
                        break;
                      }
                    }

                    if (!targetFileName) {
                      const allFiles = fs.readdirSync(baDir).filter((f) => f.endsWith('.md'));
                      for (const f of allFiles) {
                        const content = fs.readFileSync(path.join(baDir, f), 'utf-8');
                        if (content.includes(`caseId: "${caseId}"`) || content.includes(`caseId: ${caseId}`)) {
                          targetFileName = f;
                          break;
                        }
                      }
                    }

                    if (!targetFileName) {
                      targetFileName = caseId.startsWith('soap-') ? `${caseId}.md` : `soap-${caseId}.md`;
                    }
                  }

                  if (!targetFileName) {
                    targetFileName = `soap-custom-${Date.now()}.md`;
                  }

                  const targetFilePath = path.join(baDir, targetFileName);
                  fs.writeFileSync(targetFilePath, markdown, 'utf-8');

                  // Also sync to knowledge-vault/Kho bệnh án if exists
                  if (fs.existsSync(vaultBaDir)) {
                    const vaultTarget = path.join(vaultBaDir, targetFileName);
                    if (fs.existsSync(vaultTarget)) {
                      fs.writeFileSync(vaultTarget, markdown, 'utf-8');
                    }
                  }

                  // Run ingestion script to automatically keep catalogs in sync
                  let catalogUpdated = false;
                  if (fs.existsSync(scriptPath)) {
                    try {
                      execSync(`node "${scriptPath}" "${targetFilePath}"`, {
                        cwd: rootDir,
                        encoding: 'utf-8',
                        timeout: 10000,
                      });
                      catalogUpdated = true;
                    } catch (cmdErr: any) {
                      console.warn('[SOAP Save API] Catalog sync warning:', cmdErr?.message);
                    }
                  }

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: true,
                      fileName: targetFileName,
                      path: targetFilePath,
                      catalogUpdated,
                      message: 'Đã lưu trực tiếp vào file .md và cập nhật catalog thành công!',
                    })
                  );
                } catch (parseErr: any) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: parseErr.message }));
                }
              });
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@data': path.resolve(__dirname, './data'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
