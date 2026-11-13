import { defineConfig } from 'astro/config';

export default defineConfig({
  // Yayın adresi (Vercel). Alan adı alınırsa burayı değiştir.
  site: 'https://deniz-kanlicalioglu.vercel.app',
  // İngilizce kök adreste (/), Türkçe /tr altında. Sayfalar: src/pages/{,tr/} → görünümler src/views'ta.
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
