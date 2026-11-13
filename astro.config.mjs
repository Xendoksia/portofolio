import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Yayın adresi (Vercel). Alan adı alınırsa burayı ve public/robots.txt'yi değiştir.
  site: 'https://deniz-kanlicalioglu.vercel.app',
  // İngilizce kök adreste (/), Türkçe /tr altında. Sayfalar: src/pages/{,tr/} → görünümler src/views'ta.
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  // sitemap-index.xml üretir; her sayfaya diğer dildeki karşılığı (hreflang) eklenir
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr' } },
    }),
  ],
});
