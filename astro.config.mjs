import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://saancha.in',
  output: 'hybrid',                 // pages static by default; opt-in SSR per page
  adapter: node({ mode: 'standalone' }),
  build: { inlineStylesheets: 'auto' },
});
