// Dil desteği: İngilizce ana dil (kök adres), Türkçe /tr altında.
// Arayüz metinleri burada; CV / proje içeriği content.ts'te ({ en, tr } çiftleri).

export const langs = ['en', 'tr'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'en';

export const getLang = (locale: string | undefined): Lang => (locale === 'tr' ? 'tr' : 'en');

// Site içi yol → o dildeki adres: path('/projects', 'tr') = '/tr/projects', path('/#about', 'tr') = '/tr#about'
export function path(p: string, lang: Lang) {
  if (lang === defaultLang) return p;
  if (p === '/') return `/${lang}`;
  return p.startsWith('/#') ? `/${lang}${p.slice(1)}` : `/${lang}${p}`;
}

// Bulunulan sayfanın öbür dildeki karşılığı
export function switchPath(pathname: string, to: Lang) {
  const bare = pathname.replace(/^\/tr(?=\/|$)/, '').replace(/\/$/, '') || '/';
  return path(bare, to);
}

const en = {
  metaTitle: 'AI & Machine Learning Engineer',
  langName: 'English',
  switchTo: 'Türkçe sürüme geç',
  nav: { home: 'Home', top: 'Back to top', main: 'Main', theme: 'Toggle theme', menu: 'Open menu', dark: 'Dark side', light: 'Light side' },
  hero: {
    introDark: 'Not so long ago, on a Death Star not so far away',
    introLight: 'Not so long ago, in a lab not so far away',
    explore: 'Explore projects',
    cv: 'Download CV',
    scroll: 'scroll',
    scrollAria: 'Scroll to about',
  },
  about: { label: 'Episode I · About', title: ['From raw data', 'to deployed models.'] },
  experience: { label: 'Episode II · Experience', title: "Where I've trained." },
  projects: {
    label: 'Episode III · Projects',
    title: 'Selected missions.',
    more: (cases: number) => `more missions · ${cases} full case studies`,
    hangar: 'The rest of the fleet is in the hangar.',
    hangarDesc: 'Screenshots, how each one was built and the results, project by project.',
    moreAria: 'More projects',
    all: 'Explore all projects',
    github: 'or browse everything on GitHub',
  },
  card: { github: 'View on GitHub' },
  skills: { label: 'Episode IV · Skills', title: 'The toolkit.' },
  education: {
    label: 'Episode V · Education',
    title: 'The academy years.',
    langs: 'Languages',
    turkish: 'Turkish — Native',
    english: 'English — Professional working proficiency',
  },
  contact: {
    label: 'Episode VI · Contact',
    title: ['Open a ', 'channel', '.'],
    text: 'Looking for an AI / ML engineer, a hackathon teammate, or just want to talk models? Send a transmission and it lands straight in my inbox.',
    barDark: ['Imperial channel', '· encrypted'],
    barLight: ['Secure channel', '· Rebel frequency'],
    name: 'Name',
    email: 'Email',
    message: 'Message',
    placeholderDark: 'Join me, and together we can rule the galaxy…',
    placeholderLight: "Help me, Obi-Wan Kenobi. You're my only hope…",
    send: 'Send transmission',
    direct: 'Prefer a direct line?',
    copy: 'Copy',
    cv: 'Download CV',
    footerDark: 'I find your lack of code disturbing.',
    footerLight: 'May the code be with you.',
  },
  projectsPage: {
    title: 'Projects',
    description: 'Detailed case studies of my AI, computer vision and NLP projects, plus smaller experiments.',
    back: 'Back to home',
    heading: 'Mission archive.',
    intro:
      "A closer look at the projects I'm proudest of: the problem, what I built, and the numbers behind it. Smaller experiments are further down.",
    sideLabel: 'Side missions',
    sideTitle: 'More projects.',
    github: 'More on GitHub',
    lightbox: 'Screenshot',
    close: 'Close',
    prev: 'Previous screenshot',
    next: 'Next screenshot',
  },
  caseStudy: {
    enlarge: 'Enlarge screenshot',
    clickToEnlarge: 'Click to enlarge',
    screenshots: 'Screenshots',
    show: (n: number) => `Show screenshot ${n}`,
    built: 'What I built',
    github: 'View on GitHub',
  },
};

export type UI = typeof en;

const tr: UI = {
  metaTitle: 'Yapay Zekâ ve Makine Öğrenmesi Mühendisi',
  langName: 'Türkçe',
  switchTo: 'Switch to English',
  nav: {
    home: 'Ana sayfa',
    top: 'Başa dön',
    main: 'Ana menü',
    theme: 'Temayı değiştir',
    menu: 'Menüyü aç',
    dark: 'Karanlık taraf',
    light: 'Aydınlık taraf',
  },
  hero: {
    introDark: 'Çok da uzun olmayan bir zaman önce, çok da uzak olmayan bir Ölüm Yıldızı’nda',
    introLight: 'Çok da uzun olmayan bir zaman önce, çok da uzak olmayan bir laboratuvarda',
    explore: 'Projeleri keşfet',
    cv: 'CV’yi indir',
    scroll: 'kaydır',
    scrollAria: 'Hakkımda bölümüne kaydır',
  },
  about: { label: 'Bölüm I · Hakkımda', title: ['Ham veriden', 'canlıdaki modele.'] },
  experience: { label: 'Bölüm II · Deneyim', title: 'Tecrübelerim.' },
  projects: {
    label: 'Bölüm III · Projeler',
    title: 'Seçilmiş görevler.',
    more: (cases: number) => `görev daha · ${cases} detaylı vaka incelemesi`,
    hangar: 'Filonun geri kalanı hangarda.',
    hangarDesc: 'Ekran görüntüleri, her birinin nasıl yapıldığı ve sonuçları, proje proje.',
    moreAria: 'Diğer projeler',
    all: 'Tüm projeleri keşfet',
    github: 'ya da hepsine GitHub’da göz atın',
  },
  card: { github: 'GitHub’da gör' },
  skills: { label: 'Bölüm IV · Yetenekler', title: 'The toolkit.' },
  education: {
    label: 'Bölüm V · Eğitim',
    title: 'Eğitimim.',
    langs: 'Diller',
    turkish: 'Türkçe — Ana dil',
    english: 'İngilizce — Profesyonel çalışma düzeyinde',
  },
  contact: {
    label: 'Bölüm VI · İletişim',
    title: ['', 'Bağlantı', ' kuralım.'],
    text: 'Bir yapay zekâ / ML mühendisi ya da hackathon takım arkadaşı mı arıyorsunuz, yoksa sadece modeller üzerine konuşmak mı istiyorsunuz? Bir mesaj gönderin, doğrudan gelen kutuma düşsün.',
    barDark: ['İmparatorluk kanalı', '· şifreli'],
    barLight: ['Güvenli kanal', '· Asi frekansı'],
    name: 'Ad',
    email: 'E-posta',
    message: 'Mesaj',
    placeholderDark: 'Bana katıl, galaksiyi birlikte yönetelim…',
    placeholderLight: 'Bana yardım et Obi-Wan Kenobi, tek umudum sensin…',
    send: 'Mesajı gönder',
    direct: 'Doğrudan ulaşmak isterseniz:',
    copy: 'Kopyala',
    cv: 'CV’yi indir',
    footerDark: 'Kod eksikliğini rahatsız edici buluyorum.',
    footerLight: 'Kod seninle olsun.',
  },
  projectsPage: {
    title: 'Projeler',
    description: 'Yapay zekâ, bilgisayarlı görü ve NLP projelerimin detaylı vaka incelemeleri ve daha küçük deneyler.',
    back: 'Ana sayfaya dön',
    heading: 'Görev arşivi.',
    intro:
      'En gurur duyduğum projelere yakından bir bakış: problem, ne geliştirdiğim ve arkasındaki sayılar. Daha küçük deneyler aşağıda.',
    sideLabel: 'Yan görevler',
    sideTitle: 'Diğer projeler.',
    github: 'GitHub’da daha fazlası',
    lightbox: 'Ekran görüntüsü',
    close: 'Kapat',
    prev: 'Önceki ekran görüntüsü',
    next: 'Sonraki ekran görüntüsü',
  },
  caseStudy: {
    enlarge: 'Ekran görüntüsünü büyüt',
    clickToEnlarge: 'Büyütmek için tıklayın',
    screenshots: 'Ekran görüntüleri',
    show: (n: number) => `${n}. ekran görüntüsünü göster`,
    built: 'Ne geliştirdim',
    github: 'GitHub’da gör',
  },
};

export const ui: Record<Lang, UI> = { en, tr };

// Tarayıcıda çalışan script'lerin metinleri (dil <html lang> üzerinden seçilir)
const clientText = {
  en: {
    awayLight: 'Come back, Padawan…',
    awayDark: 'Come back to the dark side…',
    consoleLight: ['The Force is strong with this one.', "You found the console. Let's build something together."],
    consoleDark: ['Impressive. Most impressive.', 'You found the console. Now find my inbox.'],
    themeDark: 'Dark side',
    themeLight: 'Light side',
    okDark: "Transmission received. I've been expecting you.",
    errDark: 'Signal jammed. Please try again or email me directly.',
    okLight: "Transmission received. I'll get back to you soon.",
    errLight: 'Signal lost. Please try again or email me directly.',
    badEmail: 'Please enter a valid email.',
    empty: 'Please fill in all fields.',
    sending: 'Transmitting…',
    send: 'Send transmission',
    copy: 'Copy',
    copiedLight: 'Copied. The Force is with you.',
    copiedDark: 'Copied. As I have foreseen.',
    copyFailed: 'Copy failed',
  },
  tr: {
    awayLight: 'Geri dön, Padawan…',
    awayDark: 'Karanlık tarafa geri dön…',
    consoleLight: ['Bu kişide Güç çok kuvvetli.', 'Konsolu buldun. Hadi birlikte bir şeyler yapalım.'],
    consoleDark: ['Etkileyici. Çok etkileyici.', 'Konsolu buldun. Şimdi gelen kutumu bul.'],
    themeDark: 'Karanlık taraf',
    themeLight: 'Aydınlık taraf',
    okDark: 'Mesaj alındı. Seni bekliyordum.',
    errDark: 'Sinyal karıştırıldı. Lütfen tekrar deneyin ya da doğrudan e-posta gönderin.',
    okLight: 'Mesaj alındı. En kısa sürede dönüş yapacağım.',
    errLight: 'Sinyal kayboldu. Lütfen tekrar deneyin ya da doğrudan e-posta gönderin.',
    badEmail: 'Lütfen geçerli bir e-posta girin.',
    empty: 'Lütfen tüm alanları doldurun.',
    sending: 'Gönderiliyor…',
    send: 'Mesajı gönder',
    copy: 'Kopyala',
    copiedLight: 'Kopyalandı. Güç seninle.',
    copiedDark: 'Kopyalandı. Bunu önceden görmüştüm.',
    copyFailed: 'Kopyalanamadı',
  },
};

export const clientUI = () => clientText[getLang(document.documentElement.lang)];
