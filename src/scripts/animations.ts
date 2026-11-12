import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const animate = document.documentElement.classList.contains('anim');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Hero girişi ---------- */
if (animate) {
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
  gsap.to('[data-crawl]', {
    rotateX: 0,
    y: 0,
    opacity: 1,
    ease: 'none',
    // Bölüm sıçramasıyla gelindiğinde metin düzleşmiş olsun diye bitiş erken (top 70%)
    scrollTrigger: { trigger: '[data-crawl]', start: 'top 95%', end: 'top 70%', scrub: true },
  });

  // Deneyim çizgisi scroll ile dolar
  gsap.to('[data-beam]', {
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
   Masaüstünde bir tekerlek hareketi bir sonraki bölümün başına götürür (ışık hızı efekti yok, sadece yumuşak kaydırma).
   Bölüm ekrandan uzunsa iki durak: önce bölümün altı hizalanır, sonra diğer bölüm (içerik atlanmaz).
   Dokunmatik ve klavye doğal kalır. */
if (animate) {
  const OFFSET = 40; // section { scroll-margin-top } ile aynı
  const sections = [...document.querySelectorAll<HTMLElement>('main > section')];
  let traveling = false;
  let cooldownUntil = 0;

  const topOf = (s: HTMLElement) => Math.max(0, s.offsetTop - OFFSET);

  function travelTo(y: number) {
    traveling = true;
    const dist = Math.abs(y - window.scrollY);
    const duration = Math.min(1.3, 0.6 + dist / 2500);
    gsap.to(window, {
      scrollTo: { y, autoKill: false },
      duration,
      ease: 'power3.inOut',
      onComplete() {
        traveling = false;
        cooldownUntil = performance.now() + 350; // trackpad ataletinin ikinci yolculuk başlatmasını önle
      },
    });
  }

  // Menü ve sayfa içi linkler aynı yolculuğu yapar
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!.slice(1);
      const target = id === 'top' ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      history.replaceState(null, '', id === 'top' ? ' ' : `#${id}`);
      travelTo(id === 'top' ? 0 : topOf(target as HTMLElement));
    });
  });

  if (finePointer) {
    window.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) return; // zoom
        if (traveling) {
          e.preventDefault();
          return;
        }
        if (performance.now() < cooldownUntil || Math.abs(e.deltaY) < 8) return;

        const y = window.scrollY;
        const vh = window.innerHeight;
        let i = 0;
        sections.forEach((s, k) => {
          if (topOf(s) <= y + 2) i = k;
        });
        const cur = sections[i];
        const curBottom = cur.offsetTop + cur.offsetHeight;

        const TOL = Math.max(120, vh * 0.15); // bu kadar az kalmışsa ara durak yapma

        if (e.deltaY > 0) {
          const remaining = curBottom - (y + vh);
          if (remaining > TOL) {
            // Uzun bölüm: önce altını hizala (içerik atlanmasın), sonraki tekerlekte diğer bölüme
            e.preventDefault();
            travelTo(curBottom - vh);
            return;
          }
          const next = sections[i + 1];
          if (!next) return;
          e.preventDefault();
          travelTo(topOf(next));
        } else {
          const intoSection = y - topOf(cur);
          if (intoSection > TOL) {
            e.preventDefault();
            travelTo(topOf(cur)); // önce bulunduğumuz bölümün başına
            return;
          }
          const prev = sections[i - 1];
          if (!prev) return;
          e.preventDefault();
          // Önceki bölüm uzunsa altı görünecek şekilde git ki içerik atlanmasın
          const prevBottomAligned = prev.offsetTop + prev.offsetHeight - vh;
          travelTo(Math.max(topOf(prev), prevBottomAligned));
        }
      },
      { passive: false },
    );
  }
}
