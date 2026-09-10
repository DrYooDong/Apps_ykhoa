import esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outfile: 'dist/assets/abg-app.iife.js',
  format: 'iife',
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}'
  },
  loader: {
    '.css': 'empty'
  }
});

console.log('Successfully bundled abg-app.iife.js with empty CSS loader and production string!');
