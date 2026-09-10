import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://saancha.in',
  output: 'static',                 // static by default; SSR pages opt-in via prerender=false
  adapter: vercel(),
  security: {
    checkOrigin: false,             // allow same-site form POSTs (login/signup)
  },
  build: { inlineStylesheets: 'auto' },
});
