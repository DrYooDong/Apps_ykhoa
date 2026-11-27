import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outFile = path.join(os.tmpdir(), `docspace-engines-test-${Date.now()}.mjs`);

try {
  await build({
    entryPoints: [path.join(root, 'src/engines/__tests__/docspaceEngines.test.ts')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: outFile,
    external: ['node:*'],
  });
  execFileSync(process.execPath, ['--test', outFile], { stdio: 'inherit' });
} finally {
  if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
}
