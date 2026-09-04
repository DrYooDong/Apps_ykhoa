import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkHeadingId from 'remark-heading-id';

// https://astro.build/config
export default defineConfig({
  site: 'https://dryoodong.github.io',
  base: '/Apps_ykhoa/',
  output: 'static',
  build: {
    format: 'file'
  },
  markdown: {
    remarkPlugins: [remarkHeadingId, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark-dimmed'
    }
  },
  integrations: [
    mdx({
      gfm: true,
      remarkPlugins: [remarkHeadingId, remarkMath],
      rehypePlugins: [rehypeKatex]
    })
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@styles': '/src/styles',
        '@content': '/src/content'
      }
    }
  }
});
