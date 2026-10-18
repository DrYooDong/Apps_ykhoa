import esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: ['src/content/knowledge-vault/cdss/microbio/src/main.tsx'],
  bundle: true,
  outfile: 'src/content/knowledge-vault/cdss/microbio/assets/microbio-app.iife.js',
  format: 'iife',
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': '{}'
  },
  loader: {
    '.css': 'empty'
  }
});

console.log('Successfully bundled microbio-app.iife.js with empty CSS loader and production string!');
