// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'url';

// https://astro.build/config
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import mdx from '@astrojs/mdx';

// Detect environment
const isGhPages = process.env.GITHUB_ACTIONS === 'true';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://simplearyan.github.io', 
  base: isGhPages ? '/notebook/' : '/',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    react(), 
    tailwind(), 
    mdx()
  ],
  vite: {
    resolve: {
      alias: {
        '@widgets': fileURLToPath(new URL('./src/content-widgets', import.meta.url))
      }
    }
  }
});
