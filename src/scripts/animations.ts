import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const animate = document.documentElement.classList.contains('anim');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
// Bu script hem ana sayfada hem /projects'te çalışır; sayfada olmayan öğeler için animasyon kurma
const has = (sel: string) => document.querySelector(sel) !== null;

/* ---------- Hero girişi ---------- */
if (animate && has('[data-hero]')) {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.25 });
  tl.to('[data-hero="intro"]', { opacity: 1, duration: 1.2, ease: 'power2.out' })
    .to('.hero__line .char', { y: 0, duration: 1.1, stagger: 0.035 }, '-=0.5')
    .to('[data-hero="saber"]', { scaleX: 1, duration: 0.9, ease: 'expo.out' }, '-=0.6')
    .fromTo(
      '[data-hero="fade"]',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, clearProps: 'transform' },
      '-=0.5',
    );
}

/* ---------- Temiz adres çubuğu ----------
   Başka sayfadan "/#about" gibi bir linkle gelinince bölüme git ve adresi "/" olarak bırak */
if (location.hash) {
  const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  history.replaceState(null, '', location.pathname + location.search);
  if (el) {
    const go = () => window.scrollTo(0, Math.max(0, el.offsetTop - 40)); // section { scroll-margin-top }
    go();
    const y0 = window.scrollY;
    // Resimler/yazı tipleri yüklenince yerleşim kayabilir; kullanıcı bu arada kaydırmadıysa yeniden hizala
    window.addEventListener('load', () => Math.abs(window.scrollY - y0) < 2 && go(), { once: true });
  }
}

/* ---------- Scroll ile beliren öğeler ---------- */
if (animate) {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.fromTo(
        els,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          onComplete() {
            // Animasyon bitince inline stilleri temizle ki hover efektleri çalışsın
            for (const el of els) el.classList.add('is-in');
            gsap.set(els, { clearProps: 'opacity,transform' });
          },
        },
      ),
  });

  // Hakkımda metni: eğik perspektiften düzleşerek gelir
  if (has('[data-crawl]')) gsap.to('[data-crawl]', {
    rotateX: 0,
    y: 0,
    opacity: 1,
    ease: 'none',
    // Bölüm sıçramasıyla gelindiğinde metin düzleşmiş olsun diye bitiş erken (top 70%)
    scrollTrigger: { trigger: '[data-crawl]', start: 'top 95%', end: 'top 70%', scrub: true },
  });

  // Deneyim çizgisi scroll ile dolar
  if (has('[data-beam]')) gsap.to('[data-beam]', {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: true },
  });
}

/* ---------- Proje kartlarında imleci izleyen ışık ---------- */
if (finePointer) {
  document.querySelectorAll<HTMLElement>('[data-glow]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- Mıknatıs butonlar ---------- */
if (animate && finePointer) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ---------- Bölümden bölüme yolculuk ----------
   Karma model: ekrandan en fazla ~bir ekran uzun bölümde başı ve altı birer durak; daha uzun bölümün içinde
   doğal tarayıcı kaydırması. Bölüm sınırında bir tekerlek hareketi yumuşak geçişle komşu bölüme götürür. Tekerlek olayları "hareket" olarak gruplanır (touchpad ataleti tek
   hareket sayılır, sabit bekleme süresi yok). Geçiş sürerken ters yöne çevirmek geçişi geri alır.
   Dokunmatik ve klavye doğal kalır. */
if (animate) {
  const OFFSET = 40; // section { scroll-margin-top } ile aynı
  const GAP = 160; // bu kadar ms olay gelmezse yeni hareket başlar
  const sections = [...document.querySelectorAll<HTMLElement>('main > section')];
  let traveling = false;
  let travelFrom = 0;
  let travelTarget = 0;
  let travelDir = 0;
  let tween: gsap.core.Tween | null = null;

  const topOf = (s: HTMLElement) => Math.max(0, s.offsetTop - OFFSET);

  function travelTo(y: number, from = window.scrollY) {
    if (Math.abs(y - window.scrollY) < 1) return;
    tween?.kill();
    traveling = true;
    travelFrom = from;
    travelTarget = y;
    travelDir = Math.sign(y - from);
    const dist = Math.abs(y - window.scrollY);
    tween = gsap.to(window, {
      scrollTo: { y, autoKill: false },
      duration: Math.min(1.3, 0.6 + dist / 2500),
      ease: 'power3.inOut',
      onComplete() {
        traveling = false;
      },
    });
  }

  // y konumunda dir yönünde bir hareket nereye götürmeli? null = doğal kaydırma
  // Ekrana sığan ya da en fazla ~bir ekran taşan bölüm "sayfalı": başı ve altı birer durak (taşma < ekran,
  // içerik atlanmaz). Daha uzun bölümün içi doğal kaydırma, sınırına gelince komşu bölüme geçilir.
  function decide(y: number, dir: number): number | null {
    const vh = window.innerHeight;
    const TOL = Math.max(120, vh * 0.15); // bu kadarlık taşma/kalan yok sayılır
    const bottomStop = (s: HTMLElement) => s.offsetTop + s.offsetHeight - vh; // bölümün altı hizalı
    const overflow = (s: HTMLElement) => bottomStop(s) - topOf(s);
    const paged = (s: HTMLElement) => overflow(s) <= vh * 0.85;
    let i = 0;
    sections.forEach((s, k) => {
      if (topOf(s) <= y + 2) i = k;
    });
    const cur = sections[i];
    if (dir > 0) {
      const remaining = bottomStop(cur) - y;
      if (remaining > TOL) return paged(cur) ? bottomStop(cur) : null;
      const next = sections[i + 1];
      return next ? topOf(next) : null;
    }
    if (y - topOf(cur) > TOL) return paged(cur) ? topOf(cur) : null;
    const prev = sections[i - 1];
    if (!prev) return null;
    // Önceki bölüm ekrana (neredeyse) sığıyorsa başına, uzunsa altı hizalı dur
    return overflow(prev) <= TOL ? topOf(prev) : Math.max(topOf(prev), bottomStop(prev));
  }

  // İmlecin altında o yönde kayabilen iç kutu varsa tekerlek ona kalsın
  function innerScrollable(t: EventTarget | null, dir: number) {
    for (let el = t instanceof Element ? t : null; el && el !== document.body; el = el.parentElement) {
      if (el.scrollHeight <= el.clientHeight + 1) continue;
      const oy = getComputedStyle(el).overflowY;
      if (oy !== 'auto' && oy !== 'scroll') continue;
      if (dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0) return true;
    }
    return false;
  }

  // Menü ve sayfa içi linkler aynı yolculuğu yapar
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!.slice(1);
      const target = id === 'top' ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault(); // adres çubuğu temiz kalsın (#about eklenmez)
      travelTo(id === 'top' ? 0 : topOf(target as HTMLElement));
    });
  });

  if (finePointer) {
    let gLast = 0; // son olayın zamanı
    let gDir = 0;
    let gPeak = 0; // hareketteki en büyük delta
    let gPrev = 0; // önceki olayın deltası
    let gAcc = 0; // biriken delta
    let gMode: 'pending' | 'native' | 'travel' = 'native';

    window.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) return; // zoom
        if (document.querySelector('dialog[open]')) return; // lightbox açıkken sayfayı kaydırma
        const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
        const abs = Math.abs(dy);
        if (abs === 0 || Math.abs(e.deltaX) > abs) return; // yatay kaydırma

        const dir = Math.sign(dy);
        const now = performance.now();
        // Yeni hareket: ara verildi (sayfa takılıp atalet olayları gecikmediyse), yön değişti, atalet sönerken yeniden hızlandı (yeni fiske) ya da
        // geçiş bittikten sonra tekerlek hâlâ tam hızda dönüyor (fare: her çentik ~aynı delta, atalet sönümlenir)
        const gap = now - gLast;
        const fresh =
          gap > 400 ||
          (gap > GAP && abs >= gPrev && abs >= gPeak * 0.5) || // kısa takılmadan sonra sönmeye devam eden atalet yeni hareket değildir
          dir !== gDir ||
          (gPrev < gPeak * 0.6 && abs > gPrev * 2 && abs > 20) ||
          (gMode === 'travel' && !traveling && abs >= gPeak * 0.8);
        gLast = now;
        gPrev = abs;
        if (fresh) {
          gDir = dir;
          gPeak = abs;
          gAcc = 0;
          gMode = 'pending';
        } else gPeak = Math.max(gPeak, abs);
        gAcc += abs;

        if (traveling) {
          e.preventDefault(); // geçişle tarayıcı kaydırması çakışmasın
          if (!fresh) return;
          gMode = 'travel';
          if (dir !== travelDir) travelTo(travelFrom, travelTarget); // ters yön: geri dön
          else {
            const t = decide(travelTarget, dir); // aynı yön: bir sonrakine devam
            if (t !== null) travelTo(t, travelTarget);
          }
          return;
        }
        if (gMode === 'native') return;
        if (gMode === 'travel') {
          e.preventDefault(); // geçişin ardından gelen atalet
          return;
        }
        // pending: hareketin ilk olayları
        const t = innerScrollable(e.target, dir) ? null : decide(window.scrollY, dir);
        if (t === null) {
          gMode = 'native'; // hareket sonuna kadar doğal kalır, sınıra varınca kendiliğinden geçiş yapmaz
          return;
        }
        e.preventDefault();
        if (gAcc < 8) return; // touchpad gürültüsü
        gMode = 'travel';
        travelTo(t);
      },
      { passive: false },
    );
  }
}
