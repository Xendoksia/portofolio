# Proje Notları — 12 Kasım 2026

## Yapılanlar
- **Stack:** Astro 7 + GSAP (ScrollTrigger). Tailwind yok, bileşen içi CSS. Lenis eklendi → **kaldırıldı** (scroll gecikmesi hissi veriyordu).
- **Bölümler:** Hero (hiperuzay girişi, harf harf isim, ışın kılıcı çizgisi), About (perspektiften düzleşen metin), Experience (scroll'la dolan ışın), Projects (3 öne çıkan + 6), Skills, Education + diller, Contact (e-posta kopyala) + footer.
- **Tema:** dark side (kırmızı) / light side (koyu lacivert `#1b2232`, mavi). Işın kılıcı anahtar, dairesel View Transition, `localStorage`.
- **İçerik:** tek dosyada `src/data/content.ts` (CV + GitHub README'lerinden). CV: `public/Deniz_Kanlicalioglu_CV.pdf`.
- **Performans:** kart ve nav `backdrop-filter` kaldırıldı; gereksiz `will-change` temizlendi; scrub animasyonları gecikmesiz; yıldız alanı baştan yazıldı (aşağıda).
- Hareketi azalt ayarı: animasyonlar kapanır, içerik direkt görünür.
- **Bölümden bölüme yolculuk** (`animations.ts` sonu): masaüstünde bir tekerlek = bir sıçrama (GSAP ScrollTo), yolda kısa hiperuzay patlaması. Uzun bölümde iki durak (önce bölümün altı hizalanır). Menü linkleri aynı yolculuğu yapar. Dokunmatik/klavye doğal. Gerçek tekerlek olayıyla test edildi (`tools/bench-travel.mjs`).
- Scroll'da yıldızlar hızla orantılı dikeyde uzar (warp), parallax %30.
- **Düzeltildi — donmuş yıldızlar:** hiperuzay canvas'ı CSS transition + `transitionend` ile siliniyordu; transition bitmedi, donmuş son kare gerçek yıldızların üstünde kaldı ve her yolculukta bir tane daha birikti. Artık Web Animations ile söner + 1 sn garanti zamanlayıcıyla silinir. Doğrulama: `tools/` dışında scratch `repro.mjs` (açılışta scroll + 3 sıçrama + geri: canvas 0, arka plan hareketli).
- **Dikkat (Astro):** bileşen CSS'i kapsamlıdır; JS ile oluşturulan elemanlar (`.hyperspace` canvas, `.spark`) için seçiciler `:global(...)` olmalı — yoksa stil uygulanmaz (canvas akışa girip sayfayı 800 px aşağı itmişti).

## Performans bulguları (gerçek Chrome penceresi, Intel UHD, 1424×805, DPR 1, 120 Hz+ ekran)
| Durum | Scroll fps |
|---|---|
| Her karede çizilen tam ekran canvas (2D ya da WebGL — yıldız sayısı fark etmiyor) | 26–47 |
| Yıldız katmanı yok (taban) | 130 |
| Yıldızlar tek resme çizili, 3 composited katman (çok derinlikli parallax) | 67 |
| 2 katman | 69 |
| 1 katman | 107–113 |
| **Son hal: 1 katman + yavaş zoom + 70 sn süzülme + %18 parallax + 14 parıltı + kayan yıldız** | **144 (ekran tavanı; p95 7 ms)** |

- Çözüm: `src/components/Starfield.astro` — yıldızlar bir kez resme çizilir; zoom, süzülme, parallax, parıltı ve kayan yıldız sadece `transform`/`opacity` (yeniden boyama yok). Hiperuzay girişi 2.6 sn canvas, sonra kendini siler.
- Ayar düğmeleri (Starfield.astro): yoğunluk `passes[].density` (büyük = az yıldız); süzülme hızı `--dur` (HTML'de 70s); yaklaşma `@keyframes zoom` (80s, scale 1.14); parallax `PARALLAX` (0.18); parıltı sayısı (14) ve kayan yıldız aralığı (7–14 sn) JS'te.
- Headless Chrome'un DPR 2 ölçümleri yanıltıcı çıktı (kendi artefaktı). Ölçümü **görünür** Chrome + CDP ile yap: `node tools/bench-scroll.mjs <geçici-klasör>` (Chrome `--disable-backgrounding-occluded-windows` ile açılmalı, yoksa örtülü pencerede rAF donar). Preview başlamazsa `npx astro preview stop` (Astro tek-örnek kilidi). Test Chrome'larını kapatmak için `tools/kill-test-chrome.ps1`.

## Yapılacaklar
1. `npm run dev` → gerçek his testi (scroll, tema geçişi, hero girişi). Gerekirse yukarıdaki bench ile ölç.
2. Tek katman halini görsel kontrol et (yıldız yoğunluğu, light side'da görünürlük).
3. Proje kartlarına README ekran görüntüleri (`public/projects/…`, `content.ts`'e `image` alanı + Astro `<Image />`).
4. İstatistikleri doğrula: "10+ AI/ML projects", "2 countries studied in" (`content.ts` → `stats`).
5. Network Analysis açıklaması (repo README yok, genel bırakıldı).
6. İsteğe bağlı: TR/EN dil seçeneği, özel imleç, gerçek telefonda test.
7. Yayın: `git init` **yapılmadı** → GitHub repo → Vercel/Netlify/Cloudflare Pages; `astro.config.mjs` içindeki `site` adresini güncelle; OG görseli ekle.
8. Lighthouse ölçümü (hedef 90+).

## Güncel durum (12 Kasım, akşam) — yukarıdaki yıldız/perf notlarının yerine geçer
- Yıldız alanı **projenin ilk halindeki sürekli 3B canvas'a döndü** (`Starfield.astro`): yıldızlar sürekli yaklaşır, açılışta hiperuzay, hızlı scroll'da hafif itki. Statik resim + transform + parıltı/kayan yıldız denemesi kullanıcı tarafından beğenilmedi, kaldırıldı.
- **Bölüm bölüm atlama kaldı** (`animations.ts`); yolculukta ayrı katman yok — aynı yıldızlar `hyperspace` olayıyla hızlanıp yumuşakça yavaşlar (ani kesilme/donma imkânsız).
- Kalite: **tam** (`RES = 1`, `SKIP = 1`). Kullanıcının Opera'sında (RTX 3060) fps normal. Test Chrome'u Intel GPU'da çalıştığı için çok kötü ölçüyordu — perf kararında ölçüt kullanıcının tarayıcısı. Zayıf cihazda kasarsa: önce `RES = 0.75`, sonra `SKIP = 2`.
- Otomatik kalite "kuralı" (governor) istenmedi, eklenmedi.
- **Bölüm geçişlerinde ışık hızı efekti kaldırıldı** (kullanıcı isteği; uzun bölüm içinde kaydırmada da tetikleniyordu). Geçişler sadece yumuşak GSAP kaydırması. Scroll itkisi çizgileşme eşiğinin (%60'ı) altında sınırlı → hızlı scroll'da bile ışık hızına geçmez. Hiperuzay yalnızca sayfa açılışında.
