// Sitedeki tüm içerik burada. Bir şeyi değiştirmek için sadece bu dosyayı düzenle.

export const profile = {
  name: 'Deniz Kanlıcalıoğlu',
  firstName: 'Deniz',
  lastName: 'Kanlıcalıoğlu',
  roles: ['Data Scientist', 'AI Engineer', 'Machine Learning Engineer'],
  location: 'Bolu, Türkiye',
  email: 'deniz200214@gmail.com',
  github: 'https://github.com/Xendoksia',
  linkedin: 'https://www.linkedin.com/in/deniz-kanl%C4%B1cal%C4%B1o%C4%9Flu',
  cv: '/Deniz_Kanlicalioglu_CV.pdf',
  tagline:
    'I build AI systems end to end — from raw data and feature engineering to trained, fine-tuned and deployed deep learning models.',
  summary: [
    "I'm a Computer Engineering graduate from Düzce University (100% English program), now doing my M.Sc. in Computer Engineering, with an Erasmus+ semester at Gdańsk University of Technology behind me.",
    'I enjoy building AI systems end to end: preparing data, engineering features, training and fine-tuning Machine Learning and Deep Learning models in Python with PyTorch and TensorFlow, and getting them deployed.',
    "I've worked on Computer Vision (ResNet, Vision Transformer, U-Net), NLP (BERT, GPT-2) and Generative AI projects such as a RAG chatbot built with LLMs and vector databases. I love hackathons and team projects where ideas turn into working prototypes fast.",
  ],
  stats: [
    { value: '3', label: 'Internships' },
    { value: '15+', label: 'AI / ML projects' },
    { value: 'Erasmus+', label: 'International experience' },
    { value: 'M.Sc.', label: 'In progress' },
  ],
};

export const experience = [
  {
    role: 'Intern – Artificial Intelligence Project',
    company: 'FLO Group',
    place: 'Istanbul, Türkiye',
    date: 'Jul 2025 – Sep 2025',
    points: [
      'Developed and trained deep learning models for an e-commerce AI project using PyTorch and Hugging Face Transformers.',
      'Built a ResNet-50 based model that extracts features from product images to predict product ratings.',
      'Fine-tuned a ViT-GPT2 encoder-decoder model to generate product image captions.',
      'Collaborated with multiple departments in cross-functional meetings and completed technical trainings.',
    ],
  },
  {
    role: 'Intern – IT Support',
    company: 'Republic of Türkiye Ministry of Industry and Technology',
    place: 'Ankara, Türkiye',
    date: 'Aug 2024 – Sep 2024',
    points: ["Supported the Ministry's digital infrastructure by handling technical support tasks."],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Bilsoft',
    place: 'Düzce, Türkiye',
    date: 'Jul 2023 – Oct 2023',
    points: [
      'Designed and implemented user interfaces with React.js and JavaScript.',
      'Implemented secure and efficient database operations with Microsoft SQL Server.',
      'Created a RESTful API documentation site to standardize integration workflows.',
    ],
  },
];

export const education = [
  {
    school: 'Bolu Abant İzzet Baysal University',
    degree: 'M.Sc., Computer Engineering',
    date: 'Feb 2026 – Present',
    place: 'Bolu, Türkiye',
  },
  {
    school: 'Gdańsk University of Technology',
    degree: 'Erasmus+ · B.Eng., Data Engineering',
    date: 'Feb 2024 – Jul 2024',
    place: 'Gdańsk, Poland',
  },
  {
    school: 'Düzce University',
    degree: 'B.Eng., Computer Engineering · GPA 3.17/4',
    date: 'Sep 2021 – Jun 2025',
    place: 'Düzce, Türkiye',
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'SQL', 'C#', 'JavaScript', 'MATLAB'] },
  {
    group: 'Machine & Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'Hugging Face', 'Transfer Learning', 'Fine-Tuning'],
  },
  {
    group: 'Generative AI & NLP',
    items: ['LLMs', 'RAG', 'LangChain', 'Prompt Engineering', 'Embeddings', 'FAISS', 'ChromaDB', 'BERT', 'GPT-2', 'TTS'],
  },
  { group: 'Computer Vision', items: ['OpenCV', 'ResNet', 'ViT', 'U-Net', 'DeepLabV3+', 'Segmentation'] },
  {
    group: 'Data Science',
    items: ['Preprocessing', 'Feature Engineering', 'Predictive Modeling', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau'],
  },
  { group: 'MLOps & Cloud', items: ['AWS EC2', 'S3', 'SageMaker', 'Docker', 'Git', 'CI/CD', 'Flask'] },
  { group: 'Web & Databases', items: ['React.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'MSSQL'] },
];

// Proje görselleri (README'lerden). Astro build sırasında WebP'ye çevirip boyutlandırır.
import skinai1 from '../assets/projects/skinai-1.png';
import skinai2 from '../assets/projects/skinai-2.png';
import autorate1 from '../assets/projects/autorate-1.png';
import autorate2 from '../assets/projects/autorate-2.png';
import tts1 from '../assets/projects/tts-1.png';
import landcover from '../assets/projects/landcover-result.png';
import type { ImageMetadata } from 'astro';

// Playlist Tracker galerisi: src/assets/projects/playlist/{desktop,mobile}/ klasörlerindeki TÜM görseller otomatik eklenir.
// Önce masaüstü, sonra telefon; sıra dosya adına göre (01-..., 02-...). Telefon görüntüleri 3'erli slayt olur.
// Açıklama: aşağıdaki listede varsa oradan, yoksa dosya adından ("03-history-tab.png" → "History tab").
const playlistCaptions: Record<string, string> = {
  statistics: 'Listening overview: plays, time, top track and artist',
  'top-tracks': 'Top tracks with rank changes',
  'top-artists': 'Top artists',
  charts: 'Minutes per day and plays by hour',
  genres: 'Genres and how their share changed',
  diversity: 'Diversity: the top 5 artists’ share',
  'album-collage': '3×3 album collage of the period',
  'track-page': 'Track page',
  'artist-page': 'Artist page with MusicBrainz bio',
  playlists: 'Tracked playlists',
  'monthly-summary': 'Monthly summary: intro slide',
  'monthly-summary-last': 'Monthly summary: closing overview',
  artist: 'Artist page: bio, plays per day and top tracks',
  recent: 'Recently played, recorded from the Spotify app',
  'how-it-works': 'How it works: API limits explained in the app',
  'light-theme': 'Light theme',
  login: 'Google login with Supabase sync, or continue without an account',
};
const galleryFrom = (files: Record<string, { default: ImageMetadata }>, phone: boolean) =>
  Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => {
      const key = path.split('/').pop()!.replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '');
      const name = playlistCaptions[key] ?? key.replace(/[-_]+/g, ' ');
      const where = phone ? 'Android' : 'Desktop';
      return { src: mod.default, alt: `${where} — ${name.charAt(0).toUpperCase() + name.slice(1)}`, phone };
    });
const playlistGallery = [
  ...galleryFrom(import.meta.glob('../assets/projects/playlist/desktop/*.{png,jpg,jpeg,webp}', { eager: true }), false),
  ...galleryFrom(import.meta.glob('../assets/projects/playlist/mobile/*.{png,jpg,jpeg,webp}', { eager: true }), true),
];

// /projects sayfasındaki büyük vaka kutusu. Tüm sayılar ilgili repo README'sinden.
export type CaseStudy = {
  order: number; // /projects sayfasındaki sıra (1 = en üstte)
  summary: string;
  built: string[];
  metrics?: { value: string; label: string }[];
  // phone: dikey telefon görüntüsü — art arda gelenler 3'erli tek slaytta gösterilir
  images: { src: ImageMetadata; alt: string; phone?: boolean }[];
};

export type Project = {
  title: string;
  kind: string;
  description: string;
  tags: string[];
  repo: string;
  featured?: boolean; // ana sayfada büyük kart
  case?: CaseStudy; // /projects sayfasında büyük vaka kutusu
};

const gh = (repo: string) => `https://github.com/Xendoksia/${repo}`;

export const projects: Project[] = [
  {
    title: 'SkinAI',
    kind: 'Computer Vision · RAG',
    description:
      'Skin lesion classification and segmentation with a U-Net (ResNet-34 encoder), served through a web UI for real-time inference — plus a RAG chatbot using FAISS / ChromaDB and an LLM.',
    tags: ['PyTorch', 'TensorFlow', 'U-Net', 'RAG', 'FAISS', 'React'],
    repo: gh('Skin-Disease-AI'),
    featured: true,
    case: {
      order: 1,
      summary:
        'A web app that supports skin-disease diagnosis. Upload or capture a photo and get a classification, a pixel-level lesion mask, an attention heat-map and a RAG-based dermatology assistant that explains the result.',
      built: [
        'Classification model: ImageNet-pretrained MobileNetV2 fine-tuned on 10 skin-disease classes, returning top-5 predictions with confidence scores.',
        'Segmentation model: U-Net++ with a ResNet-34 encoder, trained with a Dice + BCE loss for precise lesion boundaries.',
        'Preprocessing pipeline (CLAHE, non-local-means denoising, DullRazor hair removal) that lifted segmentation IoU from 74.2% to 82.7%.',
        'Edge-based attention heat-map that shows which regions drove the prediction.',
        'RAG dermatology chatbot: document ingestion, text chunking, embeddings, semantic retrieval with FAISS / ChromaDB and LLM answers grounded in the retrieved sources.',
        'React + Vite front end and a Flask back end serving the models for real-time inference.',
      ],
      metrics: [
        { value: '92.3%', label: 'Classification accuracy' },
        { value: '96.1%', label: 'Top-3 accuracy' },
        { value: '82.7%', label: 'Segmentation IoU' },
        { value: '30K+', label: 'Training images' },
      ],
      images: [
        { src: skinai2, alt: 'SkinAI results: predicted condition with confidence, attention heat-map, lesion boundary and the dermatology assistant chat' },
        { src: skinai1, alt: 'SkinAI upload screen with drag-and-drop and camera capture' },
      ],
    },
  },
  {
    title: 'AutoRate & Caption',
    kind: 'Multimodal Deep Learning',
    description:
      'Predicts 1–5 star product ratings from images with ResNet-50 and generates product captions with a ViT encoder + GPT-2 decoder, trained on 63K+ fashion product images.',
    tags: ['PyTorch', 'Transformers', 'ResNet-50', 'ViT', 'GPT-2'],
    repo: gh('Amazon-Product-RatingAndCaptionGeneration-AI'),
    featured: true,
    case: {
      order: 3,
      summary:
        'Two models that read a product photo: one predicts its 1–5 star rating, the other writes a product caption. Built around my AI internship work at FLO and trained on 63K+ Amazon Fashion images.',
      built: [
        'Rating model: ImageNet-pretrained ResNet-50 regressor (~23M parameters) trained with Huber loss for robustness.',
        'Caption model: ViT-GPT2 encoder-decoder — a Vision Transformer encoder with a fine-tuned GPT-2 decoder that writes context-aware product descriptions.',
        'Data pipeline: dataset downloader, automatic filtering of missing files, 70/20/10 split and image augmentation.',
        'Training with mixed precision, early stopping, learning-rate scheduling and gradient clipping on CUDA.',
        'Desktop test suite that loads both models, analyses an image and keeps an exportable history.',
      ],
      metrics: [
        { value: '63K+', label: 'Product images' },
        { value: '0.65', label: 'Rating MAE (1–5 scale)' },
        { value: '20–25%', label: 'Caption BLEU' },
      ],
      images: [
        { src: autorate2, alt: 'Product Analysis Suite predicting a 4.16 / 5 rating and generating a caption for a sweater photo' },
        { src: autorate1, alt: 'Product Analysis Suite with model loading and analysis history panels' },
      ],
    },
  },
  {
    title: 'Emotional Text-to-Speech',
    kind: 'NLP · Speech',
    description:
      'Fine-tuned BERT for Turkish emotion recognition, then voices every sentence with emotion-conditioned speech synthesis for dubbing and voice-assistant use cases. Team project.',
    tags: ['BERT', 'Transformers', 'TTS', 'Python'],
    repo: gh('Sentiment-Analysis-with-TTS'),
    featured: true,
    case: {
      order: 5,
      summary:
        'Type Turkish text and the app detects the emotion of every sentence, then voices each sentence in a matching tone — a building block for dubbing and expressive voice assistants. Built as a team project.',
      built: [
        'Fine-tuned a Turkish BERT model for sentence-level emotion classification with confidence scores.',
        'Tagged each sentence with its emotion and synthesised emotion-conditioned speech through the ElevenLabs API.',
        'Merged the sentences into a single WAV file that can be played back or exported.',
        'Desktop interface built with Tkinter + ttkbootstrap.',
      ],
      images: [{ src: tts1, alt: 'Emotion Dubbing App: Turkish input text tagged as anger and converted to a WAV file' }],
    },
  },
  {
    title: 'Land Cover Segmentation',
    kind: 'Remote Sensing',
    description:
      'Semantic segmentation of satellite imagery into 8 land-cover classes on LoveDA, comparing UNet, DeepLabV3+ and FPN with combined Dice + CE + Focal loss and an interactive test GUI.',
    tags: ['PyTorch', 'DeepLabV3+', 'EfficientNet', 'GUI'],
    repo: gh('LandCover-Semantic-Segmentation-Masker-AI'),
    case: {
      order: 4,
      summary:
        'Pixel-level land-cover mapping of satellite images into 8 classes — buildings, roads, water, forest, agriculture and more — on the LoveDA dataset.',
      built: [
        'Compared UNet, DeepLabV3+ and FPN with EfficientNet, ResNet and MobileNetV3 encoders.',
        'Combined Dice + Cross-Entropy + Focal loss with class weighting to handle heavily imbalanced classes.',
        'Speed-optimised setup: UNet + EfficientNet-B2 (~10M parameters) at 384×384 with mixed precision.',
        'Interactive GUI that shows the prediction, ground truth, overlays and an error map side by side.',
      ],
      metrics: [
        { value: '8', label: 'Land-cover classes' },
        { value: '0.60', label: 'Mean IoU' },
        { value: '84%', label: 'Pixel accuracy (UNet + ResNet-34)' },
      ],
      images: [
        { src: landcover, alt: 'Segmentation results: original satellite image, predicted segmentation, ground truth, overlays and error map' },
      ],
    },
  },
  {
    title: 'Playlist Tracker',
    kind: 'Desktop + Android App',
    description:
      'Keeps the history of your Spotify & YouTube playlists and builds your own listening statistics from what you actually play — synced between Windows and Android.',
    tags: ['Python', 'Flutter', 'Kotlin', 'Supabase', 'SQLite', 'Spotify API', 'YouTube API'],
    repo: gh('Spotify-Track-Ur-Playlist'),
    case: {
      order: 2,
      summary:
        'Tracks quietly disappear from Spotify playlists and YouTube videos turn into “Deleted video” — with no record of what was there. Wrapped comes once a year and listening data isn’t in the API. Playlist Tracker covers both: a full playlist history and your own listening statistics, on Windows and Android, synced between them.',
      built: [
        'Playlist history: every check snapshots each playlist and diffs it with the previous one — added, removed, unplayable or playable again — and removed tracks keep their title, artist and add date. Background checks every 6/12/24 h with a Windows notification.',
        'Listening statistics without the Spotify API: plays are read from the Windows media session (WinRT) and, on Android, from a Kotlin NotificationListenerService that keeps recording while the app is closed.',
        'Play-detection rules: a play counts after 30 s, listening time comes from how far the position really moved, and repeats/skips are handled — written once per platform and tested against each other so both show the same numbers.',
        'Stats for any week, month or year: top 10s with rank changes, minutes per day, plays by hour, genres (MusicBrainz + Wikidata), discoveries, diversity, milestones, album collage, detail pages and a slide-by-slide “Wrapped”-style monthly summary.',
        'Offline-first sync over Supabase (Postgres + Row Level Security + Google OAuth): local SQLite is the main copy, only changes go up; device-independent UUIDs and a last-change-wins Postgres trigger resolve conflicts.',
        'Desktop in Python/tkinter (tray, autostart, single .exe via PyInstaller, CLI); mobile in Flutter with platform channels to Kotlin. EN / TR, light / dark themes; secrets never leave the device.',
      ],
      metrics: [
        { value: '16K+', label: 'Lines of Python, Dart & Kotlin' },
        { value: '2', label: 'Apps: Windows + Android' },
        { value: '~90', label: 'Commits' },
        { value: 'EN / TR', label: 'Interface' },
      ],
      images: playlistGallery,
    },
  },
  {
    title: 'Music Genre Classifier',
    kind: 'Audio ML',
    description: 'Classifies music genres from spectrogram images on the GTZAN dataset, with a desktop UI. Team project.',
    tags: ['MATLAB', 'Spectrograms', 'Classification'],
    repo: gh('MusicClassifier-Using-Spectograms-MachineLearning'),
  },
  {
    title: 'Password Strength Classifier',
    kind: 'Classic ML',
    description: 'Compares KNN, SVM, Decision Tree and Random Forest for predicting password strength.',
    tags: ['scikit-learn', 'KNN', 'SVM', 'Random Forest'],
    repo: gh('Password-Strength-Classifier-KNN-SVM-DT-RF-'),
  },
  {
    title: 'Network Analysis',
    kind: 'Graph Analytics',
    description: 'Graph analysis of the Gnutella-04 peer-to-peer network snapshot.',
    tags: ['Python', 'Graph Theory', 'Jupyter'],
    repo: gh('Network-Analysis'),
  },
  {
    title: 'E-Commerce Website',
    kind: 'Full-Stack',
    description: 'Pure JS/CSS/HTML storefront with cart, wishlist, checkout and reviews on a Node.js + Express + MSSQL backend.',
    tags: ['Node.js', 'Express', 'MSSQL', 'JavaScript'],
    repo: gh('E-Commerce-Website-Project'),
  },
];

export const nav = [
  { id: 'about', label: 'About', episode: 'I' },
  { id: 'experience', label: 'Experience', episode: 'II' },
  { id: 'projects', label: 'Projects', episode: 'III' },
  { id: 'skills', label: 'Skills', episode: 'IV' },
  { id: 'education', label: 'Education', episode: 'V' },
  { id: 'contact', label: 'Contact', episode: 'VI' },
];
