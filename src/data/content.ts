// Sitedeki tüm içerik burada. Bir şeyi değiştirmek için sadece bu dosyayı düzenle.
// Dile göre değişen metinler { en: '…', tr: '…' } çifti; düz metin iki dilde de aynı kalır.
// Bileşenler içeriği getContent(lang) ile alır (çiftler o dildeki metne çevrilir).
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

type T = string | { en: string; tr: string };

const profileData = {
  name: 'Deniz Kanlıcalıoğlu',
  firstName: 'Deniz',
  lastName: 'Kanlıcalıoğlu',
  roles: [
    { en: 'Data Scientist', tr: 'Veri Bilimci' },
    { en: 'AI Engineer', tr: 'Yapay Zekâ Mühendisi' },
    { en: 'Machine Learning Engineer', tr: 'Makine Öğrenmesi Mühendisi' },
  ],
  location: 'Bolu, Türkiye',
  email: 'deniz200214@gmail.com',
  github: 'https://github.com/Xendoksia',
  linkedin: 'https://www.linkedin.com/in/deniz-kanl%C4%B1cal%C4%B1o%C4%9Flu',
  cv: '/Deniz_Kanlicalioglu_CV.pdf',
  // İletişim formu: web3forms.com erişim anahtarı (herkese açık olabilir, mesajları e-postana iletir).
  // Boşsa form gösterilmez, sadece e-posta adresi görünür.
  contactFormKey: '18e7a727-9359-4bab-9a07-735280e74adc',
  tagline: {
    en: 'I build AI systems end to end — from raw data and feature engineering to trained, fine-tuned and deployed deep learning models.',
    tr: 'Yapay zekâ sistemlerini uçtan uca geliştiriyorum — ham veri ve öznitelik mühendisliğinden eğitilmiş, ince ayarı yapılmış ve canlıya alınmış derin öğrenme modellerine kadar.',
  },
  summary: [
    {
      en: "I'm a Computer Engineering graduate from Düzce University (100% English program), now doing my M.Sc. in Computer Engineering at Bolu Abant İzzet Baysal University, with an Erasmus+ semester at Gdańsk University of Technology behind me.",
      tr: 'Düzce Üniversitesi Bilgisayar Mühendisliği (%100 İngilizce) mezunuyum. Şu anda Bolu Abant İzzet Baysal Üniversitesi’nde Bilgisayar Mühendisliği yüksek lisansımı yapıyorum; lisans sırasında Gdańsk Teknik Üniversitesi’nde bir Erasmus+ dönemi geçirdim.',
    },
    {
      en: 'I enjoy building AI systems end to end: preparing data, engineering features, training and fine-tuning Machine Learning and Deep Learning models in Python with PyTorch and TensorFlow, and getting them deployed.',
      tr: 'Yapay zekâ sistemlerini uçtan uca kurmayı seviyorum: veriyi hazırlamak, öznitelik mühendisliği yapmak, Python’da PyTorch ve TensorFlow ile makine öğrenmesi ve derin öğrenme modellerini eğitip ince ayar yapmak ve onları canlıya almak.',
    },
    {
      en: "I've worked on Computer Vision (ResNet, Vision Transformer, U-Net), NLP (BERT, GPT-2) and Generative AI projects such as a RAG chatbot built with LLMs and vector databases. I love hackathons and team projects where ideas turn into working prototypes fast.",
      tr: 'Bilgisayarlı görü (ResNet, Vision Transformer, U-Net), doğal dil işleme (BERT, GPT-2) ve üretken yapay zekâ projelerinde çalıştım; LLM’ler ve vektör veritabanlarıyla kurduğum RAG tabanlı bir sohbet botu bunlardan biri. Fikirlerin hızla çalışan prototiplere dönüştüğü hackathon’ları ve takım projelerini seviyorum.',
    },
  ],
  stats: [
    { value: '3', label: { en: 'Internships', tr: 'Staj' } },
    { value: '15+', label: { en: 'AI / ML projects', tr: 'Yapay zekâ / ML projesi' } },
    { value: 'Erasmus+', label: { en: 'International experience', tr: 'Yurt dışı deneyimi' } },
    { value: { en: 'M.Sc.', tr: 'Y. Lisans' }, label: { en: 'In progress', tr: 'Devam ediyor' } },
  ],
};

const experienceData = [
  {
    role: { en: 'Intern – Artificial Intelligence Project', tr: 'Stajyer – Yapay Zekâ Projesi' },
    company: 'FLO Group',
    place: { en: 'Istanbul, Türkiye', tr: 'İstanbul, Türkiye' },
    date: { en: 'Jul 2025 – Sep 2025', tr: 'Tem 2025 – Eyl 2025' },
    points: [
      {
        en: 'Developed and trained deep learning models for an e-commerce AI project using PyTorch and Hugging Face Transformers.',
        tr: 'Bir e-ticaret yapay zekâ projesi için PyTorch ve Hugging Face Transformers ile derin öğrenme modelleri geliştirip eğittim.',
      },
      {
        en: 'Built a ResNet-50 based model that extracts features from product images to predict product ratings.',
        tr: 'Ürün görsellerinden öznitelik çıkararak ürün puanını tahmin eden ResNet-50 tabanlı bir model kurdum.',
      },
      {
        en: 'Fine-tuned a ViT-GPT2 encoder-decoder model to generate product image captions.',
        tr: 'Ürün görsellerine açıklama üretmesi için ViT-GPT2 encoder-decoder modeline ince ayar yaptım.',
      },
      {
        en: 'Collaborated with multiple departments in cross-functional meetings and completed technical trainings.',
        tr: 'Farklı departmanlarla ortak toplantılarda birlikte çalıştım ve teknik eğitimleri tamamladım.',
      },
    ],
  },
  {
    role: { en: 'Intern – IT Support', tr: 'Stajyer – Bilgi İşlem Destek' },
    company: { en: 'Republic of Türkiye Ministry of Industry and Technology', tr: 'T.C. Sanayi ve Teknoloji Bakanlığı' },
    place: 'Ankara, Türkiye',
    date: { en: 'Aug 2024 – Sep 2024', tr: 'Ağu 2024 – Eyl 2024' },
    points: [
      {
        en: "Supported the Ministry's digital infrastructure by handling technical support tasks.",
        tr: 'Teknik destek görevleri üstlenerek Bakanlığın dijital altyapısına destek oldum.',
      },
    ],
  },
  {
    role: { en: 'Full-Stack Developer Intern', tr: 'Full-Stack Geliştirici Stajyeri' },
    company: 'Bilsoft',
    place: 'Düzce, Türkiye',
    date: { en: 'Jul 2023 – Oct 2023', tr: 'Tem 2023 – Eki 2023' },
    points: [
      {
        en: 'Designed and implemented user interfaces with React.js and JavaScript.',
        tr: 'React.js ve JavaScript ile kullanıcı arayüzleri tasarlayıp geliştirdim.',
      },
      {
        en: 'Implemented secure and efficient database operations with Microsoft SQL Server.',
        tr: 'Microsoft SQL Server ile güvenli ve verimli veritabanı işlemleri yazdım.',
      },
      {
        en: 'Created a RESTful API documentation site to standardize integration workflows.',
        tr: 'Entegrasyon süreçlerini standartlaştırmak için bir RESTful API dokümantasyon sitesi hazırladım.',
      },
    ],
  },
];

const educationData = [
  {
    school: { en: 'Bolu Abant İzzet Baysal University', tr: 'Bolu Abant İzzet Baysal Üniversitesi' },
    degree: { en: 'M.Sc., Computer Engineering', tr: 'Yüksek Lisans, Bilgisayar Mühendisliği' },
    date: { en: 'Feb 2026 – Present', tr: 'Şub 2026 – Devam ediyor' },
    place: 'Bolu, Türkiye',
  },
  {
    school: { en: 'Gdańsk University of Technology', tr: 'Gdańsk Teknik Üniversitesi' },
    degree: { en: 'Erasmus+ · B.Eng., Data Engineering', tr: 'Erasmus+ · Lisans, Veri Mühendisliği' },
    date: { en: 'Feb 2024 – Jul 2024', tr: 'Şub 2024 – Tem 2024' },
    place: { en: 'Gdańsk, Poland', tr: 'Gdańsk, Polonya' },
  },
  {
    school: { en: 'Düzce University', tr: 'Düzce Üniversitesi' },
    degree: { en: 'B.Eng., Computer Engineering · GPA 3.17/4', tr: 'Lisans, Bilgisayar Mühendisliği · GNO 3,17/4' },
    date: { en: 'Sep 2021 – Jun 2025', tr: 'Eyl 2021 – Haz 2025' },
    place: 'Düzce, Türkiye',
  },
];

const skillsData = [
  { group: { en: 'Languages', tr: 'Programlama dilleri' }, items: ['Python', 'SQL', 'C#', 'JavaScript', 'MATLAB'] },
  {
    group: { en: 'Machine & Deep Learning', tr: 'Makine & Derin Öğrenme' },
    items: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'scikit-learn',
      'Hugging Face',
      { en: 'Transfer Learning', tr: 'Transfer öğrenme' },
      'Fine-Tuning',
    ],
  },
  {
    group: { en: 'Generative AI & NLP', tr: 'Üretken Yapay Zekâ & NLP' },
    items: ['LLMs', 'RAG', 'LangChain', 'Prompt Engineering', 'Embeddings', 'FAISS', 'ChromaDB', 'BERT', 'GPT-2', 'TTS'],
  },
  {
    group: { en: 'Computer Vision', tr: 'Bilgisayarlı Görü' },
    items: ['OpenCV', 'ResNet', 'ViT', 'U-Net', 'DeepLabV3+', { en: 'Segmentation', tr: 'Segmentasyon' }],
  },
  {
    group: { en: 'Data Science', tr: 'Veri Bilimi' },
    items: [
      { en: 'Preprocessing', tr: 'Veri ön işleme' },
      { en: 'Feature Engineering', tr: 'Öznitelik mühendisliği' },
      { en: 'Predictive Modeling', tr: 'Tahmine dayalı modelleme' },
      'Matplotlib',
      'Seaborn',
      'Power BI',
      'Tableau',
    ],
  },
  { group: { en: 'MLOps & Cloud', tr: 'MLOps & Bulut' }, items: ['AWS EC2', 'S3', 'SageMaker', 'Docker', 'Git', 'CI/CD', 'Flask'] },
  {
    group: { en: 'Web & Databases', tr: 'Web & Veritabanları' },
    items: ['React.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'MSSQL'],
  },
];

// Proje görselleri (README'lerden). Astro build sırasında WebP'ye çevirip boyutlandırır.
import skinai1 from '../assets/projects/skinai-1.png';
import skinai2 from '../assets/projects/skinai-2.png';
import autorate1 from '../assets/projects/autorate-1.png';
import autorate2 from '../assets/projects/autorate-2.png';
import tts1 from '../assets/projects/tts-1.png';
import landcover from '../assets/projects/landcover-result.png';

// Playlist Tracker galerisi: src/assets/projects/playlist/{desktop,mobile}/ klasörlerindeki TÜM görseller otomatik eklenir.
// Önce masaüstü, sonra telefon; sıra dosya adına göre (01-..., 02-...). Telefon görüntüleri 3'erli slayt olur.
// Açıklama: aşağıdaki listede varsa oradan, yoksa dosya adından ("03-history-tab.png" → "History tab").
const playlistCaptions: Record<string, { en: string; tr: string }> = {
  statistics: {
    en: 'Listening overview: plays, time, top track and artist',
    tr: 'Dinleme özeti: dinleme sayısı, süre, en çok dinlenen şarkı ve sanatçı',
  },
  'top-tracks': { en: 'Top tracks with rank changes', tr: 'Sıra değişimleriyle en çok dinlenen şarkılar' },
  'top-artists': { en: 'Top artists', tr: 'En çok dinlenen sanatçılar' },
  charts: { en: 'Minutes per day and plays by hour', tr: 'Günlük dakika ve saatlere göre dinleme' },
  genres: { en: 'Genres and how their share changed', tr: 'Türler ve paylarının nasıl değiştiği' },
  diversity: { en: 'Diversity: the top 5 artists’ share', tr: 'Çeşitlilik: ilk 5 sanatçının payı' },
  'album-collage': { en: '3×3 album collage of the period', tr: 'Dönemin 3×3 albüm kolajı' },
  'track-page': { en: 'Track page', tr: 'Şarkı sayfası' },
  'artist-page': { en: 'Artist page with MusicBrainz bio', tr: 'MusicBrainz biyografili sanatçı sayfası' },
  playlists: { en: 'Tracked playlists', tr: 'Takip edilen çalma listeleri' },
  'monthly-summary': { en: 'Monthly summary: intro slide', tr: 'Aylık özet: giriş slaytı' },
  'monthly-summary-last': { en: 'Monthly summary: closing overview', tr: 'Aylık özet: kapanış görünümü' },
  artist: {
    en: 'Artist page: bio, plays per day and top tracks',
    tr: 'Sanatçı sayfası: biyografi, günlük dinleme ve en çok dinlenen şarkılar',
  },
  recent: { en: 'Recently played, recorded from the Spotify app', tr: 'Son dinlenenler, Spotify uygulamasından kaydedildi' },
  'how-it-works': {
    en: 'How it works: API limits explained in the app',
    tr: 'Nasıl çalışır: API sınırları uygulamanın içinde anlatılıyor',
  },
  'light-theme': { en: 'Light theme', tr: 'Açık tema' },
  login: {
    en: 'Google login with Supabase sync, or continue without an account',
    tr: 'Supabase senkronlu Google girişi ya da hesapsız devam',
  },
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const galleryFrom = (files: Record<string, { default: ImageMetadata }>, phone: boolean) =>
  Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => {
      const key = path.split('/').pop()!.replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '');
      const fallback = key.replace(/[-_]+/g, ' ');
      const name = playlistCaptions[key] ?? { en: fallback, tr: fallback };
      const where = phone ? { en: 'Android', tr: 'Android' } : { en: 'Desktop', tr: 'Masaüstü' };
      const alt = { en: `${where.en} — ${cap(name.en)}`, tr: `${where.tr} — ${cap(name.tr)}` };
      return { src: mod.default, alt, phone };
    });
const playlistGallery = [
  ...galleryFrom(import.meta.glob('../assets/projects/playlist/desktop/*.{png,jpg,jpeg,webp}', { eager: true }), false),
  ...galleryFrom(import.meta.glob('../assets/projects/playlist/mobile/*.{png,jpg,jpeg,webp}', { eager: true }), true),
];

// /projects sayfasındaki büyük vaka kutusu. Tüm sayılar ilgili repo README'sinden.
type CaseStudyData = {
  order: number; // /projects sayfasındaki sıra (1 = en üstte)
  summary: T;
  built: T[];
  metrics?: { value: T; label: T }[];
  // phone: dikey telefon görüntüsü — art arda gelenler 3'erli tek slaytta gösterilir
  images: { src: ImageMetadata; alt: T; phone?: boolean }[];
};

type ProjectData = {
  title: T;
  kind: T;
  description: T;
  tags: string[];
  repo: string;
  featured?: boolean; // ana sayfada büyük kart
  case?: CaseStudyData; // /projects sayfasında büyük vaka kutusu
};

const gh = (repo: string) => `https://github.com/Xendoksia/${repo}`;

const projectsData: ProjectData[] = [
  {
    title: 'SkinAI',
    kind: { en: 'Computer Vision · RAG', tr: 'Bilgisayarlı Görü · RAG' },
    description: {
      en: 'Skin lesion classification and segmentation with a U-Net (ResNet-34 encoder), served through a web UI for real-time inference — plus a RAG chatbot using FAISS / ChromaDB and an LLM.',
      tr: 'U-Net (ResNet-34 encoder) ile cilt lezyonu sınıflandırma ve segmentasyonu, web arayüzünden gerçek zamanlı çıkarım — üstüne FAISS / ChromaDB ve bir LLM ile çalışan RAG sohbet botu.',
    },
    tags: ['PyTorch', 'TensorFlow', 'U-Net', 'RAG', 'FAISS', 'React'],
    repo: gh('Skin-Disease-AI'),
    featured: true,
    case: {
      order: 1,
      summary: {
        en: 'A web app that supports skin-disease diagnosis. Upload or capture a photo and get a classification, a pixel-level lesion mask, an attention heat-map and a RAG-based dermatology assistant that explains the result.',
        tr: 'Cilt hastalığı teşhisine destek olan bir web uygulaması. Bir fotoğraf yükleyin ya da çekin; sınıflandırma, piksel düzeyinde lezyon maskesi, dikkat ısı haritası ve sonucu açıklayan RAG tabanlı bir dermatoloji asistanı karşınızda.',
      },
      built: [
        {
          en: 'Classification model: ImageNet-pretrained MobileNetV2 fine-tuned on 10 skin-disease classes, returning top-5 predictions with confidence scores.',
          tr: 'Sınıflandırma modeli: ImageNet ön eğitimli MobileNetV2, 10 cilt hastalığı sınıfında ince ayarlandı; güven skorlarıyla ilk 5 tahmini döndürür.',
        },
        {
          en: 'Segmentation model: U-Net++ with a ResNet-34 encoder, trained with a Dice + BCE loss for precise lesion boundaries.',
          tr: 'Segmentasyon modeli: ResNet-34 encoder’lı U-Net++, keskin lezyon sınırları için Dice + BCE kaybıyla eğitildi.',
        },
        {
          en: 'Preprocessing pipeline (CLAHE, non-local-means denoising, DullRazor hair removal) that lifted segmentation IoU from 74.2% to 82.7%.',
          tr: 'Segmentasyon IoU’sunu %74,2’den %82,7’ye çıkaran ön işleme hattı (CLAHE, non-local means gürültü giderme, DullRazor ile kıl temizleme).',
        },
        {
          en: 'Edge-based attention heat-map that shows which regions drove the prediction.',
          tr: 'Tahmini hangi bölgelerin belirlediğini gösteren kenar tabanlı dikkat ısı haritası.',
        },
        {
          en: 'RAG dermatology chatbot: document ingestion, text chunking, embeddings, semantic retrieval with FAISS / ChromaDB and LLM answers grounded in the retrieved sources.',
          tr: 'RAG dermatoloji sohbet botu: doküman alma, metin parçalama, embedding’ler, FAISS / ChromaDB ile anlamsal arama ve getirilen kaynaklara dayanan LLM yanıtları.',
        },
        {
          en: 'React + Vite front end and a Flask back end serving the models for real-time inference.',
          tr: 'React + Vite ön yüz ve modelleri gerçek zamanlı çıkarım için sunan Flask arka uç.',
        },
      ],
      metrics: [
        { value: { en: '92.3%', tr: '%92,3' }, label: { en: 'Classification accuracy', tr: 'Sınıflandırma doğruluğu' } },
        { value: { en: '96.1%', tr: '%96,1' }, label: { en: 'Top-3 accuracy', tr: 'İlk 3 doğruluğu' } },
        { value: { en: '82.7%', tr: '%82,7' }, label: { en: 'Segmentation IoU', tr: 'Segmentasyon IoU' } },
        { value: { en: '30K+', tr: '30 bin+' }, label: { en: 'Training images', tr: 'Eğitim görseli' } },
      ],
      images: [
        {
          src: skinai2,
          alt: {
            en: 'SkinAI results: predicted condition with confidence, attention heat-map, lesion boundary and the dermatology assistant chat',
            tr: 'SkinAI sonuçları: güven skoruyla tahmin edilen hastalık, dikkat ısı haritası, lezyon sınırı ve dermatoloji asistanı sohbeti',
          },
        },
        {
          src: skinai1,
          alt: {
            en: 'SkinAI upload screen with drag-and-drop and camera capture',
            tr: 'SkinAI yükleme ekranı: sürükle-bırak ve kamerayla çekim',
          },
        },
      ],
    },
  },
  {
    title: 'AutoRate & Caption',
    kind: { en: 'Multimodal Deep Learning', tr: 'Çok Kipli Derin Öğrenme' },
    description: {
      en: 'Predicts 1–5 star product ratings from images with ResNet-50 and generates product captions with a ViT encoder + GPT-2 decoder, trained on 63K+ fashion product images.',
      tr: 'Ürün görsellerinden ResNet-50 ile 1–5 yıldız puan tahmin eder, ViT encoder + GPT-2 decoder ile ürün açıklaması üretir; 63 bin+ moda ürünü görseliyle eğitildi.',
    },
    tags: ['PyTorch', 'Transformers', 'ResNet-50', 'ViT', 'GPT-2'],
    repo: gh('Amazon-Product-RatingAndCaptionGeneration-AI'),
    featured: true,
    case: {
      order: 3,
      summary: {
        en: 'Two models that read a product photo: one predicts its 1–5 star rating, the other writes a product caption. Built around my AI internship work at FLO and trained on 63K+ Amazon Fashion images.',
        tr: 'Bir ürün fotoğrafını okuyan iki model: biri 1–5 yıldız puanını tahmin ediyor, diğeri ürün açıklaması yazıyor. FLO’daki yapay zekâ stajımda yaptığım işin üzerine kuruldu ve 63 bin+ Amazon Fashion görseliyle eğitildi.',
      },
      built: [
        {
          en: 'Rating model: ImageNet-pretrained ResNet-50 regressor (~23M parameters) trained with Huber loss for robustness.',
          tr: 'Puan modeli: ImageNet ön eğitimli ResNet-50 regresörü (~23M parametre), aykırı değerlere dayanıklılık için Huber kaybıyla eğitildi.',
        },
        {
          en: 'Caption model: ViT-GPT2 encoder-decoder — a Vision Transformer encoder with a fine-tuned GPT-2 decoder that writes context-aware product descriptions.',
          tr: 'Açıklama modeli: ViT-GPT2 encoder-decoder — Vision Transformer encoder ve ince ayarlı GPT-2 decoder ile bağlama uygun ürün açıklamaları.',
        },
        {
          en: 'Data pipeline: dataset downloader, automatic filtering of missing files, 70/20/10 split and image augmentation.',
          tr: 'Veri hattı: veri seti indirici, eksik dosyaların otomatik ayıklanması, 70/20/10 bölme ve görsel çoğaltma (augmentation).',
        },
        {
          en: 'Training with mixed precision, early stopping, learning-rate scheduling and gradient clipping on CUDA.',
          tr: 'CUDA üzerinde karma hassasiyet (mixed precision), erken durdurma, öğrenme oranı planlama ve gradyan kırpma ile eğitim.',
        },
        {
          en: 'Desktop test suite that loads both models, analyses an image and keeps an exportable history.',
          tr: 'İki modeli yükleyip görseli analiz eden ve dışa aktarılabilir bir geçmiş tutan masaüstü test arayüzü.',
        },
      ],
      metrics: [
        { value: { en: '63K+', tr: '63 bin+' }, label: { en: 'Product images', tr: 'Ürün görseli' } },
        { value: { en: '0.65', tr: '0,65' }, label: { en: 'Rating MAE (1–5 scale)', tr: 'Puan MAE (1–5 ölçeği)' } },
        { value: { en: '20–25%', tr: '%20–25' }, label: { en: 'Caption BLEU', tr: 'Açıklama BLEU' } },
      ],
      images: [
        {
          src: autorate2,
          alt: {
            en: 'Product Analysis Suite predicting a 4.16 / 5 rating and generating a caption for a sweater photo',
            tr: 'Product Analysis Suite bir kazak fotoğrafı için 4,16 / 5 puan tahmin edip açıklama üretiyor',
          },
        },
        {
          src: autorate1,
          alt: {
            en: 'Product Analysis Suite with model loading and analysis history panels',
            tr: 'Product Analysis Suite: model yükleme ve analiz geçmişi panelleri',
          },
        },
      ],
    },
  },
  {
    title: { en: 'Emotional Text-to-Speech', tr: 'Duygulu Metinden Sese' },
    kind: { en: 'NLP · Speech', tr: 'NLP · Konuşma' },
    description: {
      en: 'Fine-tuned BERT for Turkish emotion recognition, then voices every sentence with emotion-conditioned speech synthesis for dubbing and voice-assistant use cases. Team project.',
      tr: 'Türkçe duygu tanıma için ince ayarlı BERT; ardından her cümleyi duyguya uygun ses sentezi ile seslendirir — dublaj ve sesli asistan kullanımları için. Takım projesi.',
    },
    tags: ['BERT', 'Transformers', 'TTS', 'Python'],
    repo: gh('Sentiment-Analysis-with-TTS'),
    featured: true,
    case: {
      order: 5,
      summary: {
        en: 'Type Turkish text and the app detects the emotion of every sentence, then voices each sentence in a matching tone — a building block for dubbing and expressive voice assistants. Built as a team project.',
        tr: 'Türkçe bir metin yazın; uygulama her cümlenin duygusunu bulur ve her cümleyi o duyguya uygun tonda seslendirir — dublaj ve ifadeli sesli asistanlar için bir yapı taşı. Takım projesi olarak geliştirildi.',
      },
      built: [
        {
          en: 'Fine-tuned a Turkish BERT model for sentence-level emotion classification with confidence scores.',
          tr: 'Cümle düzeyinde duygu sınıflandırması için Türkçe bir BERT modeline ince ayar; güven skorlarıyla birlikte.',
        },
        {
          en: 'Tagged each sentence with its emotion and synthesised emotion-conditioned speech through the ElevenLabs API.',
          tr: 'Her cümle duygusuyla etiketlenir ve ElevenLabs API üzerinden o duyguya uygun konuşma sentezlenir.',
        },
        {
          en: 'Merged the sentences into a single WAV file that can be played back or exported.',
          tr: 'Cümleler, oynatılabilen ya da dışa aktarılabilen tek bir WAV dosyasında birleştirilir.',
        },
        { en: 'Desktop interface built with Tkinter + ttkbootstrap.', tr: 'Tkinter + ttkbootstrap ile masaüstü arayüz.' },
      ],
      images: [
        {
          src: tts1,
          alt: {
            en: 'Emotion Dubbing App: Turkish input text tagged as anger and converted to a WAV file',
            tr: 'Emotion Dubbing App: öfke olarak etiketlenen Türkçe metin WAV dosyasına dönüştürülüyor',
          },
        },
      ],
    },
  },
  {
    title: { en: 'Land Cover Segmentation', tr: 'Arazi Örtüsü Segmentasyonu' },
    kind: { en: 'Remote Sensing', tr: 'Uzaktan Algılama' },
    description: {
      en: 'Semantic segmentation of satellite imagery into 8 land-cover classes on LoveDA, comparing UNet, DeepLabV3+ and FPN with combined Dice + CE + Focal loss and an interactive test GUI.',
      tr: 'LoveDA üzerinde uydu görüntülerinin 8 arazi örtüsü sınıfına semantik segmentasyonu; UNet, DeepLabV3+ ve FPN karşılaştırması, Dice + CE + Focal birleşik kayıp ve etkileşimli test arayüzü.',
    },
    tags: ['PyTorch', 'DeepLabV3+', 'EfficientNet', 'GUI'],
    repo: gh('LandCover-Semantic-Segmentation-Masker-AI'),
    case: {
      order: 4,
      summary: {
        en: 'Pixel-level land-cover mapping of satellite images into 8 classes — buildings, roads, water, forest, agriculture and more — on the LoveDA dataset.',
        tr: 'LoveDA veri setinde uydu görüntülerinin piksel düzeyinde 8 sınıfa ayrılması — binalar, yollar, su, orman, tarım ve dahası.',
      },
      built: [
        {
          en: 'Compared UNet, DeepLabV3+ and FPN with EfficientNet, ResNet and MobileNetV3 encoders.',
          tr: 'EfficientNet, ResNet ve MobileNetV3 encoder’larıyla UNet, DeepLabV3+ ve FPN karşılaştırması.',
        },
        {
          en: 'Combined Dice + Cross-Entropy + Focal loss with class weighting to handle heavily imbalanced classes.',
          tr: 'Çok dengesiz sınıflar için sınıf ağırlıklandırmalı Dice + Cross-Entropy + Focal birleşik kayıp.',
        },
        {
          en: 'Speed-optimised setup: UNet + EfficientNet-B2 (~10M parameters) at 384×384 with mixed precision.',
          tr: 'Hız odaklı kurulum: 384×384 çözünürlükte karma hassasiyetle UNet + EfficientNet-B2 (~10M parametre).',
        },
        {
          en: 'Interactive GUI that shows the prediction, ground truth, overlays and an error map side by side.',
          tr: 'Tahmini, gerçek etiketi, bindirmeleri ve hata haritasını yan yana gösteren etkileşimli arayüz.',
        },
      ],
      metrics: [
        { value: '8', label: { en: 'Land-cover classes', tr: 'Arazi örtüsü sınıfı' } },
        { value: { en: '0.60', tr: '0,60' }, label: { en: 'Mean IoU', tr: 'Ortalama IoU' } },
        { value: { en: '84%', tr: '%84' }, label: { en: 'Pixel accuracy (UNet + ResNet-34)', tr: 'Piksel doğruluğu (UNet + ResNet-34)' } },
      ],
      images: [
        {
          src: landcover,
          alt: {
            en: 'Segmentation results: original satellite image, predicted segmentation, ground truth, overlays and error map',
            tr: 'Segmentasyon sonuçları: orijinal uydu görüntüsü, tahmin edilen segmentasyon, gerçek etiket, bindirmeler ve hata haritası',
          },
        },
      ],
    },
  },
  {
    title: 'Playlist Tracker',
    kind: { en: 'Desktop + Android App', tr: 'Masaüstü + Android Uygulaması' },
    description: {
      en: 'Keeps the history of your Spotify & YouTube playlists and builds your own listening statistics from what you actually play — synced between Windows and Android.',
      tr: 'Spotify ve YouTube çalma listelerinin geçmişini tutar, gerçekten dinlediklerinden kendi dinleme istatistiklerini çıkarır — Windows ile Android arasında senkron.',
    },
    tags: ['Python', 'Flutter', 'Kotlin', 'Supabase', 'SQLite', 'Spotify API', 'YouTube API'],
    repo: gh('Spotify-Track-Ur-Playlist'),
    case: {
      order: 2,
      summary: {
        en: 'Tracks quietly disappear from Spotify playlists and YouTube videos turn into “Deleted video” — with no record of what was there. Wrapped comes once a year and listening data isn’t in the API. Playlist Tracker covers both: a full playlist history and your own listening statistics, on Windows and Android, synced between them.',
        tr: 'Spotify listelerinden şarkılar sessizce kaybolur, YouTube videoları “Silinmiş video”ya dönüşür — orada ne olduğuna dair hiçbir kayıt kalmaz. Wrapped yılda bir gelir, dinleme verisi de API’de yok. Playlist Tracker ikisini de çözüyor: eksiksiz bir liste geçmişi ve kendi dinleme istatistikleriniz, Windows ve Android’de, aralarında senkron.',
      },
      built: [
        {
          en: 'Playlist history: every check snapshots each playlist and diffs it with the previous one — added, removed, unplayable or playable again — and removed tracks keep their title, artist and add date. Background checks every 6/12/24 h with a Windows notification.',
          tr: 'Liste geçmişi: her kontrolde listenin anlık görüntüsü alınıp bir öncekiyle karşılaştırılır — eklenen, çıkarılan, oynatılamayan ya da yeniden oynatılabilen — ve çıkarılan şarkıların adı, sanatçısı ve eklenme tarihi saklanır. 6/12/24 saatte bir arka planda kontrol ve Windows bildirimi.',
        },
        {
          en: 'Listening statistics without the Spotify API: plays are read from the Windows media session (WinRT) and, on Android, from a Kotlin NotificationListenerService that keeps recording while the app is closed.',
          tr: 'Spotify API olmadan dinleme istatistikleri: dinlemeler Windows medya oturumundan (WinRT), Android’de ise uygulama kapalıyken de kayda devam eden bir Kotlin NotificationListenerService’ten okunur.',
        },
        {
          en: 'Play-detection rules: a play counts after 30 s, listening time comes from how far the position really moved, and repeats/skips are handled — written once per platform and tested against each other so both show the same numbers.',
          tr: 'Dinleme algılama kuralları: 30 sn’den sonra dinleme sayılır, dinleme süresi konumun gerçekte ne kadar ilerlediğinden hesaplanır, tekrarlar/atlamalar ele alınır — her platform için ayrı yazıldı ve ikisi aynı sayıları göstersin diye birbirine karşı test edildi.',
        },
        {
          en: 'Stats for any week, month or year: top 10s with rank changes, minutes per day, plays by hour, genres (MusicBrainz + Wikidata), discoveries, diversity, milestones, album collage, detail pages and a slide-by-slide “Wrapped”-style monthly summary.',
          tr: 'Herhangi bir hafta, ay ya da yıl için istatistik: sıra değişimleriyle ilk 10’lar, günlük dakika, saatlere göre dinleme, türler (MusicBrainz + Wikidata), keşifler, çeşitlilik, kilometre taşları, albüm kolajı, detay sayfaları ve slayt slayt “Wrapped” tarzı aylık özet.',
        },
        {
          en: 'Offline-first sync over Supabase (Postgres + Row Level Security + Google OAuth): local SQLite is the main copy, only changes go up; device-independent UUIDs and a last-change-wins Postgres trigger resolve conflicts.',
          tr: 'Supabase üzerinden çevrimdışı öncelikli senkron (Postgres + Row Level Security + Google OAuth): ana kopya yerel SQLite, yalnızca değişiklikler gönderilir; cihazdan bağımsız UUID’ler ve “son değişiklik kazanır” Postgres tetikleyicisi çakışmaları çözer.',
        },
        {
          en: 'Desktop in Python/tkinter (tray, autostart, single .exe via PyInstaller, CLI); mobile in Flutter with platform channels to Kotlin. EN / TR, light / dark themes; secrets never leave the device.',
          tr: 'Masaüstü Python/tkinter ile (sistem tepsisi, otomatik başlatma, PyInstaller ile tek .exe, CLI); mobil Flutter ile, Kotlin’e platform kanalları. EN / TR, açık / koyu tema; gizli anahtarlar cihazdan hiç çıkmaz.',
        },
      ],
      metrics: [
        { value: { en: '16K+', tr: '16 bin+' }, label: { en: 'Lines of Python, Dart & Kotlin', tr: 'Satır Python, Dart ve Kotlin' } },
        { value: '2', label: { en: 'Apps: Windows + Android', tr: 'Uygulama: Windows + Android' } },
        { value: '~90', label: 'Commits' },
        { value: 'EN / TR', label: { en: 'Interface', tr: 'Arayüz' } },
      ],
      images: playlistGallery,
    },
  },
  {
    title: { en: 'Music Genre Classifier', tr: 'Müzik Türü Sınıflandırıcı' },
    kind: { en: 'Audio ML', tr: 'Ses ile ML' },
    description: {
      en: 'Classifies music genres from spectrogram images on the GTZAN dataset, with a desktop UI. Team project.',
      tr: 'GTZAN veri setinde spektrogram görüntülerinden müzik türü sınıflandırması, masaüstü arayüzüyle. Takım projesi.',
    },
    tags: ['MATLAB', 'Spectrograms', 'Classification'],
    repo: gh('MusicClassifier-Using-Spectograms-MachineLearning'),
  },
  {
    title: { en: 'Password Strength Classifier', tr: 'Parola Gücü Sınıflandırıcı' },
    kind: { en: 'Classic ML', tr: 'Klasik ML' },
    description: {
      en: 'Compares KNN, SVM, Decision Tree and Random Forest for predicting password strength.',
      tr: 'Parola gücünü tahmin etmek için KNN, SVM, Karar Ağacı ve Random Forest karşılaştırması.',
    },
    tags: ['scikit-learn', 'KNN', 'SVM', 'Random Forest'],
    repo: gh('Password-Strength-Classifier-KNN-SVM-DT-RF-'),
  },
  {
    title: { en: 'Network Analysis', tr: 'Ağ Analizi' },
    kind: { en: 'Graph Analytics', tr: 'Graf Analizi' },
    description: {
      en: 'Graph analysis of the Gnutella-04 peer-to-peer network snapshot.',
      tr: 'Gnutella-04 eşler arası (P2P) ağ görüntüsünün graf analizi.',
    },
    tags: ['Python', 'Graph Theory', 'Jupyter'],
    repo: gh('Network-Analysis'),
  },
  {
    title: { en: 'E-Commerce Website', tr: 'E-Ticaret Sitesi' },
    kind: 'Full-Stack',
    description: {
      en: 'Pure JS/CSS/HTML storefront with cart, wishlist, checkout and reviews on a Node.js + Express + MSSQL backend.',
      tr: 'Saf JS/CSS/HTML ile sepet, istek listesi, ödeme ve yorumlar içeren mağaza; Node.js + Express + MSSQL arka uç.',
    },
    tags: ['Node.js', 'Express', 'MSSQL', 'JavaScript'],
    repo: gh('E-Commerce-Website-Project'),
  },
];

const navData = [
  { id: 'about', label: { en: 'About', tr: 'Hakkımda' } },
  { id: 'experience', label: { en: 'Experience', tr: 'Deneyim' } },
  { id: 'projects', label: { en: 'Projects', tr: 'Projeler' } },
  { id: 'skills', label: { en: 'Skills', tr: 'Yetenekler' } },
  { id: 'education', label: { en: 'Education', tr: 'Eğitim' } },
  { id: 'contact', label: { en: 'Contact', tr: 'İletişim' } },
];

// ---------- Dile çevirme ----------
// { en, tr } çiftini o dildeki metne indirger; görseller ve diğer değerler olduğu gibi kalır.
type Localized<V> = V extends { en: string; tr: string }
  ? string
  : V extends ImageMetadata
    ? V
    : V extends (infer U)[]
      ? Localized<U>[]
      : V extends object
        ? { [K in keyof V]: Localized<V[K]> }
        : V;

const isPair = (v: object): v is { en: string; tr: string } =>
  Object.keys(v).length === 2 && typeof (v as any).en === 'string' && typeof (v as any).tr === 'string';
const isImage = (v: object) => 'src' in v && 'width' in v && 'format' in v;

function localize<V>(v: V, lang: Lang): Localized<V> {
  if (Array.isArray(v)) return v.map((x) => localize(x, lang)) as Localized<V>;
  if (v && typeof v === 'object' && !isImage(v)) {
    if (isPair(v)) return v[lang] as Localized<V>;
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, localize(x, lang)])) as Localized<V>;
  }
  return v as Localized<V>;
}

// Proje kimliği (dilden bağımsız, İngilizce başlıktan): "Land Cover Segmentation" → "land-cover-segmentation"
const slug = (t: T) => (typeof t === 'string' ? t : t.en).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function getContent(lang: Lang) {
  return {
    profile: localize(profileData, lang),
    experience: localize(experienceData, lang),
    education: localize(educationData, lang),
    skills: localize(skillsData, lang),
    projects: projectsData.map((p) => ({ ...localize(p, lang), id: slug(p.title) })),
    nav: localize(navData, lang),
  };
}

export type Project = ReturnType<typeof getContent>['projects'][number];
export type CaseStudy = NonNullable<Project['case']>;
