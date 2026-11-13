# Proje Notları — 12 Kasım 2026

## Yapılanlar
- **Stack:** Astro 7 + GSAP (ScrollTrigger). Tailwind yok, bileşen içi CSS. Lenis eklendi → **kaldırıldı** (scroll gecikmesi hissi veriyordu).
- **Bölümler:** Hero (hiperuzay girişi, harf harf isim, ışın kılıcı çizgisi), About (perspektiften düzleşen metin), Experience (scroll'la dolan ışın), Projects (3 öne çıkan + 6), Skills, Education + diller, Contact (e-posta kopyala) + footer.
- **Tema:** dark side (kırmızı) / light side (koyu lacivert `#1b2232`, mavi). Işın kılıcı anahtar, dairesel View Transition, `localStorage`.
- **İçerik:** tek dosyada `src/data/content.ts` (CV + GitHub README'lerinden). CV: `public/Deniz_Kanlicalioglu_CV.pdf`.
- **Performans:** kart ve nav `backdrop-filter` kaldırıldı; gereksiz `will-change` temizlendi; scrub animasyonları gecikmesiz; yıldız alanı baştan yazıldı (aşağıda).
- Hareketi azalt ayarı: animasyonlar kapanır, içerik direkt görünür.
- **Bölümden bölüme yolculuk — karma model** (`animations.ts` sonu, 13 Kasım 2026): ekrandan en fazla ~bir ekran taşan bölüm "sayfalı" (başı ve altı birer durak, taşma < ekran olduğundan içerik atlanmaz; /projects'teki vaka kutuları böyle), daha uzun bölümün içinde doğal tarayıcı kaydırması, bölüm sınırında bir tekerlek hareketi = komşu bölüme yumuşak GSAP geçişi (eski iki duraklı model 2 ekrandan uzun bölümde içerik atlıyordu). Tekerlek olayları harekete gruplanır (160 ms ara / yön değişimi / atalet sönerken yeniden hızlanma = yeni hareket; takılma sonrası sönmeye devam eden atalet yeni hareket sayılmaz) → touchpad ataleti tek geçiş, sabit bekleme yok. Geçişte ters yön = geri dön, aynı yönde yeni hareket = bir sonrakine devam. İçinde kaydırması olan kutuda tekerlek kutuya kalır. Menü linkleri aynı geçişi yapar. Dokunmatik/klavye doğal. Test: `tools/bench-hybrid.mjs` (gerçek Chrome, 7 senaryo; tekerlek olayları await'siz gönderilir — CDP onayı ~200 ms, beklenirse her olay ayrı hareket sayılır).
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
3. ~~Proje ekran görüntüleri~~ — yapıldı: `/projects` vaka sayfası (`src/assets/projects/`).
4. ~~İstatistikleri doğrula~~ — yapıldı: "15+ AI / ML projects", "2 Countries studied in" yerine "Erasmus+ · International experience" (15+ kullanıcıdan; Erasmus+ benim önerim, 12 Kasım).
5. Network Analysis açıklaması (repo README yok, genel bırakıldı).
6. İsteğe bağlı: TR/EN dil seçeneği, özel imleç, gerçek telefonda test.
7. Yayın: GitHub repo var (`Xendoksia/portofolio`, main) → Vercel/Netlify/Cloudflare Pages; `astro.config.mjs` içindeki `site` adresini güncelle; OG görseli ekle.
8. Lighthouse ölçümü (hedef 90+).

## Güncel durum (12 Kasım, akşam) — yukarıdaki yıldız/perf notlarının yerine geçer
- Yıldız alanı **projenin ilk halindeki sürekli 3B canvas'a döndü** (`Starfield.astro`): yıldızlar sürekli yaklaşır, açılışta hiperuzay, hızlı scroll'da hafif itki. Statik resim + transform + parıltı/kayan yıldız denemesi kullanıcı tarafından beğenilmedi, kaldırıldı.
- **Bölüm bölüm atlama kaldı** (`animations.ts`); yolculukta ayrı katman yok — aynı yıldızlar `hyperspace` olayıyla hızlanıp yumuşakça yavaşlar (ani kesilme/donma imkânsız).
- Kalite: **tam** (`RES = 1`, `SKIP = 1`). Kullanıcının Opera'sında (RTX 3060) fps normal. Test Chrome'u Intel GPU'da çalıştığı için çok kötü ölçüyordu — perf kararında ölçüt kullanıcının tarayıcısı. Zayıf cihazda kasarsa: önce `RES = 0.75`, sonra `SKIP = 2`.
- Otomatik kalite "kuralı" (governor) istenmedi, eklenmedi.
- **Bölüm geçişlerinde ışık hızı efekti kaldırıldı** (kullanıcı isteği; uzun bölüm içinde kaydırmada da tetikleniyordu). Geçişler sadece yumuşak GSAP kaydırması. Scroll itkisi çizgileşme eşiğinin (%60'ı) altında sınırlı → hızlı scroll'da bile ışık hızına geçmez. Hiperuzay yalnızca sayfa açılışında.

## /projects sayfası (12 Kasım, akşam)
- `src/pages/projects.astro`: başlık + 5 büyük vaka kutusu (`CaseStudy.astro`, her biri ayrı `<section>` → bölüm atlama vaka vaka çalışır) + kalan projeler küçük kart (`ProjectCard.astro`, ana sayfayla ortak) + Contact. Lightbox: `<dialog>`, Esc/arka plan ile kapanır; açıkken tekerlek sayfayı kaydırmaz.
- Vaka içeriği `content.ts` → `project.case` (summary, built, metrics, images). Sayılar repo README'lerinden.
- Görseller `src/assets/projects/` (README'lerden indirildi); Astro build'de WebP'ye çevirir (~4.7 MB PNG → kutu başına 15–60 KB). LandCover GIF'i (4.6 MB, 762 kare) yerine sonuç ekranının tek karesi kullanıldı.
- Ana sayfa Projects bölümüne "All projects in detail" butonu; Nav alt sayfada `base="/"` + `active` ile çalışır.
- **Kullanıcı onayladı:** AutoRate caption = ViT + GPT-2 decoder; SkinAI chatbot = RAG (FAISS/ChromaDB); TTS grup projesi (repo fork, ekran görüntüsünde takım arkadaşının dosya yolu normal). Not: AutoRate'teki 'Caption BLEU 20–25%' metriği README'den (LSTM'li sürüm).

## KALDIĞIMIZ YER (12 Kasım, ~21:00)
- `/projects` vaka sırası `content.ts` → `case.order` ile: 1 SkinAI, 2 Playlist Tracker, 3 AutoRate, 4 LandCover, 5 TTS.
- **Playlist Tracker vakası (12 Kasım, ~21:15) — README'ye göre yeniden yazıldı:** masaüstü + Android, dinleme istatistikleri, Supabase senkron; metrikler 16K+ satır / 2 uygulama / ~90 commit / EN-TR. Kaynak: `D:\Portfolyo\Playlist-Tracker\README.md`.
  - Görseller: `src/assets/projects/playlist/desktop/` ve `.../mobile/` (otomatik, dosya adı sırası). Masaüstü önce; **telefon görüntüleri 3'erli tek slayt** (`phone: true`), lightbox'ta yan yana. Açıklamalar `content.ts` → `playlistCaptions`.
  - Masaüstü görüntüleri eklendi (12 Kasım, ~21:20; kaynak `D:\Portfolyo\Playlist-Tracker\desktop\`): 01-statistics, 02-artist, 03-recent, 04-playlists, 05-how-it-works, 06-light-theme, 07-login. Eski `01-playlist-tracking.png` silindi. Açıklamalar `playlistCaptions`'a eklendi.
  - Repo linki `Spotify-Track-Ur-Playlist` (README'deki `Spotify-Follow-Ur-List` GitHub'da 404).
- **Commit edilmedi:** `/projects` sayfası, CaseStudy/ProjectCard bileşenleri, proje görselleri, içerik düzeltmeleri (GPT-2, RAG, TTS takım projesi), sıralama. Son commit: `c6433aa İlk sürüm`.
- Açık soru: AutoRate "Caption BLEU 20–25%" metriği README'deki LSTM sürümünden; GPT-2 sürümünün skoru farklıysa güncelle/kaldır.
- **F5 ana sayfada en üstten başlar** (`index.astro` başındaki inline script; yalnızca `reload` türü gezinmede, `#bölüm` adresten silinir). `/projects`'ten `/#about` linkleri ve `/projects` sayfasının kendi F5'i etkilenmez. Gerçek Chrome'da test edildi.
- **Lightbox galeri gezintisi** (`projects.astro`): yanlarda ok düğmeleri (üstüne gelince accent parıltı), ←/→ tuşları, telefonda yatay kaydırma, `01 / 11` sayaç, başa/sona sarar. Komşu görseller önceden yüklenir; geçiş 220 ms kayma+belirme (hareketi azalt'ta yok). Kapatınca kutu son bakılan slaytta kalır. Tek görselli vakalarda oklar gizli. Görsel alanı sabit yükseklik (oklar zıplamaz).
- **Ana sayfa projeleri azaltıldı** (`Projects.astro`): yalnızca `featured` 3 büyük kart + `/projects`'e çağıran "hangar" paneli (gizli projelerin adları chip olarak, `+06 more missions · 5 full case studies`, büyük accent düğme, üstte hover'da uzayan ışın çizgisi). Küçük 6 kart ana sayfadan kalktı; GitHub linki panelin altında küçük metin. Hangi projelerin ana sayfada kalacağı `content.ts` → `featured`.

## SONRA YAPILACAKLAR (12 Kasım, ~22:00 — yayından sonra sırayla)
**Yayın:** **Vercel** (GitHub bağlantılı, `main` push = otomatik yayın) → https://deniz-kanlicalioglu.vercel.app. Ayar: Vercel Astro'yu kendisi tanır; Node `.node-version` (22), `astro.config.mjs` → `site`. Alan adı alınırsa Vercel → Domains + `site` güncelle.
- Geçmiş: önce Cloudflare Workers (`…deniz200214.workers.dev`, adres uzun) → Cloudflare Pages. **`*.pages.dev` Türkiye'de engelli** (Türk Telekom DNS'i `213.14.227.50`/`::1` döndürüyor, doğru IP'ye bağlantı da kesiliyor; 12 Kasım 2026). `vercel.app`, `netlify.app`, `github.io` açılıyor. Barındırma/alan adı değişirse önce Türkiye'den erişimi test et. Yayından sonra `main` push = canlı; commit akışını kullanıcıya tekrar sor.

**2. Paylaşım / bulunabilirlik**
- OG görseli (1200×630, site temasında) + `og:image` / `twitter:card` meta etiketleri (`Layout.astro`). Şu an yok → LinkedIn/WhatsApp önizlemesi boş.
- `@astrojs/sitemap` + `public/robots.txt` (sitemap adresiyle). `site` ayarı doğru olmalı.
- Her vaka için paylaşılabilir link: `/projects#playlist-tracker` gibi (CaseStudy `<section>`'larına id; açılışta o vakaya kaydır).

**3. Kalite**
- Lighthouse (hedef 90+): performans, erişilebilirlik, SEO. Lightbox ve hangar paneli dahil.
- Gerçek telefonda test: kaydırma, lightbox'ta kaydırarak geçiş, dar ekranda hangar paneli.

**4. İçerik**
- Network Analysis açıklaması (README yok; kullanıcıdan birkaç cümle al).
- Playlist Tracker ana sayfada öne çıksın mı? (`content.ts` → `featured: true` → 4 büyük kart; grid düzenini kontrol et.)
- AutoRate "Caption BLEU 20–25%": LSTM sürümünden; GPT-2 sürümünün skoru farklıysa güncelle/kaldır.

**5. İsteğe bağlı**
- TR/EN dil seçeneği (en çok emek; tüm metinlerin çevirisi).
- Ziyaretçi sayacı: Cloudflare Web Analytics (çerezsiz, onay bandı gerekmez).

## KALDIĞIMIZ YER (12 Kasım, ~22:25)
- Site yayında: https://deniz-kanlicalioglu.vercel.app (Türkiye'den açılıyor; ana sayfa, /projects, CV, lightbox canlıda test edildi).
- **Commit akışı (kullanıcı onayı):** "commit et" denince doğrudan `main`'e commit + push → birkaç dakikada canlı. Push'tan önce yerelde `npm run build` + tarayıcıda kontrol.
- Cloudflare'deki eski Worker/Pages projeleri silinmeli (kullanıcı tarafında; silinmediyse her push'ta boşuna build alır).
- Sıradaki iş: yukarıdaki "SONRA YAPILACAKLAR" → 2 (OG görseli + sitemap/robots), sonra 3–5.
