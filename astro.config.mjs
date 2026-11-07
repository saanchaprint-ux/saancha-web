import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.saancha.in',
  output: 'static',
  adapter: vercel(),
  security: { checkOrigin: false },
  build: { inlineStylesheets: 'auto' },
});
