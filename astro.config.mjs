import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.saancha.in';

export default defineConfig({
  site: SITE,
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      // SSR material pages prerender nahi hote — unhe manually add karo
      customPages: [
        `${SITE}/candles`,
        `${SITE}/soap`,
        `${SITE}/concrete`,
        `${SITE}/resin`,
        `${SITE}/blog/how-to-choose-the-right-candle-mould`,
        `${SITE}/blog/silicone-vs-3d-printed-moulds`,
        `${SITE}/blog/make-sharp-handmade-soap-bars`,
        `${SITE}/blog/concrete-homeware-moulds-guide`,
      ],
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/account') &&
        !page.includes('/login') &&
        !page.includes('/logout') &&
        !page.includes('/signup') &&
        !page.includes('/forgot') &&
        !page.includes('/reset') &&
        !page.includes('/api'),
    }),
  ],
  security: { checkOrigin: false },
  build: { inlineStylesheets: 'auto' },
});
