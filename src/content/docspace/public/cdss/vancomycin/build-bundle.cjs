const esbuild = require('C:/Users/nguye/AppData/Roaming/npm/node_modules/esbuild');
const path = require('path');

const localModules = 'C:/Users/nguye/.gemini/antigravity-ide/temp_build/node_modules';
const nodeBuiltins = new Set(['fs', 'path', 'worker_threads', 'stream', 'crypto', 'buffer', 'util', 'events', 'http', 'https', 'url', 'zlib', 'os']);

const localResolverPlugin = {
  name: 'local-resolver',
  setup(build) {
    build.onResolve({ filter: /^[^./]/ }, (args) => {
      if (nodeBuiltins.has(args.path)) {
        return { path: args.path, external: true };
      }
      try {
        const resolved = require.resolve(args.path, { paths: [localModules] });
        return { path: resolved };
      } catch (e) {
        return null;
      }
    });
  }
};

(async () => {
  try {
    // 1. Build ES Module bundle for modern browser loading
    await esbuild.build({
      entryPoints: [path.resolve(__dirname, 'src/main.tsx')],
      bundle: true,
      outfile: path.resolve(__dirname, 'assets/index-DueZW2ru.js'),
      format: 'esm',
      platform: 'browser',
      jsx: 'automatic',
      minify: false,
      plugins: [localResolverPlugin],
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    });
    console.log('Successfully built assets/index-DueZW2ru.js (ESM)!');

    // 2. Build IIFE standalone bundle for offline file:/// fallback
    await esbuild.build({
      entryPoints: [path.resolve(__dirname, 'src/main.tsx')],
      bundle: true,
      outfile: path.resolve(__dirname, 'assets/vancomycin-app.iife.js'),
      format: 'iife',
      platform: 'browser',
      jsx: 'automatic',
      minify: false,
      plugins: [localResolverPlugin],
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    });
    console.log('Successfully built assets/vancomycin-app.iife.js (IIFE)!');
  } catch (err) {
    console.error('Bundle error:', err);
    process.exit(1);
  }
})();
