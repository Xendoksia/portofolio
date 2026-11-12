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
    { value: '10+', label: 'AI / ML projects' },
    { value: '2', label: 'Countries studied in' },
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

export type Project = {
  title: string;
  kind: string;
  description: string;
  tags: string[];
  repo: string;
  featured?: boolean;
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
  },
  {
    title: 'AutoRate & Caption',
    kind: 'Multimodal Deep Learning',
    description:
      'Predicts 1–5 star product ratings from images with ResNet-50 and generates product captions with a ViT encoder + GPT-2 decoder, trained on 63K+ fashion product images.',
    tags: ['PyTorch', 'Transformers', 'ResNet-50', 'ViT', 'GPT-2'],
    repo: gh('Amazon-Product-RatingAndCaptionGeneration-AI'),
    featured: true,
  },
  {
    title: 'Emotional Text-to-Speech',
    kind: 'NLP · Speech',
    description:
      'Fine-tuned BERT for Turkish emotion recognition, then voices every sentence with emotion-conditioned speech synthesis for dubbing and voice-assistant use cases.',
    tags: ['BERT', 'Transformers', 'TTS', 'Python'],
    repo: gh('Sentiment-Analysis-with-TTS'),
    featured: true,
  },
  {
    title: 'Land Cover Segmentation',
    kind: 'Remote Sensing',
    description:
      'Semantic segmentation of satellite imagery into 8 land-cover classes on LoveDA, comparing UNet, DeepLabV3+ and FPN with combined Dice + CE + Focal loss and an interactive test GUI.',
    tags: ['PyTorch', 'DeepLabV3+', 'EfficientNet', 'GUI'],
    repo: gh('LandCover-Semantic-Segmentation-Masker-AI'),
  },
  {
    title: 'Playlist Tracker',
    kind: 'Tool',
    description:
      'Keeps the history of your Spotify & YouTube playlists: which track was added, removed or became unplayable — and when.',
    tags: ['Python', 'Spotify API', 'YouTube API'],
    repo: gh('Spotify-Track-Ur-Playlist'),
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
