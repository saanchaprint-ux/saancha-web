import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://saancha.in',
  output: 'hybrid',                 // marketing pages static; login/account SSR
  adapter: vercel(),
  build: { inlineStylesheets: 'auto' },
});
