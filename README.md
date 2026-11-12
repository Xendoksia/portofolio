# Deniz Kanlıcalıoğlu — Portfolio

Astro + GSAP + Lenis ile yapılmış, hafif Star Wars esintili kişisel portfolyo.

## Komutlar

```bash
npm install      # ilk kurulum
npm run dev      # geliştirme sunucusu → http://localhost:4321
npm run build    # yayın için dist/ klasörünü üretir
npm run preview  # build edilmiş siteyi önizler
```

## Nereyi düzenlerim?

| Ne | Dosya |
|---|---|
| Tüm metinler, projeler, deneyim, yetenekler | `src/data/content.ts` |
| Renkler / temalar (dark side = kırmızı, light side = mavi) | `src/styles/global.css` (`:root` değişkenleri) |
| Scroll animasyonları, mıknatıs butonlar | `src/scripts/animations.ts` |
| Yıldız alanı + hiperuzay girişi | `src/components/Starfield.astro` |
| CV dosyası | `public/Deniz_Kanlicalioglu_CV.pdf` |

## Yayına alma

GitHub'a push et → Vercel / Netlify / Cloudflare Pages'te repoyu seç (Astro'yu otomatik tanır).
Sonra `astro.config.mjs` içindeki `site` adresini kendi alan adınla değiştir.
