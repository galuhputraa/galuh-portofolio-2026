/**
 * Single source of truth for every piece of content on the site.
 * Dates and titles are taken from the LinkedIn profile export (most current),
 * cross-checked against the CV PDF.
 *
 * NOTE: Bank Mandiri is an employment entry only. No project names, internal
 * system names, client data or metrics from that role appear anywhere.
 */

export const profile = {
  name: "Galuh Putra Warman",
  firstName: "Galuh",
  lastName: "Putra Warman",
  monogram: "gw",
  role: "AI/ML Engineer",
  /** Hero headline copy — long form. */
  tagline:
    "I build computer vision, Generative AI and production machine learning systems for banking and enterprise teams — taking a problem from raw, messy data all the way to a model in production and a number someone can act on.",
  /** Short form for OG cards and meta description, where space is fixed. */
  shortTagline:
    "Building computer vision, Generative AI and production machine learning for banking and enterprise teams.",
  summary:
    "AI/ML Engineer with 3+ years in data science, delivering machine learning, analytics and automation across banking, automotive, marketplace and digital business. Master's in Computer Science from BINUS University and Google Cloud Certified Professional Machine Learning Engineer.",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  currentRole: "AI/ML Engineer",
  currentCompany: "Bank Mandiri",
  currentCompanyNote: "Officer Development Program — IT",
  currentCompanyLogo: "/logos/mandiri.png",
  photo: "/galuh.webp",
  cv: "/cv/CV-Galuh-Putra-Warman.pdf",
} as const;

export const links = {
  email: "galuhputraww@gmail.com",
  linkedin: "https://www.linkedin.com/in/galuh-putra-warman/",
  whatsapp: "https://wa.me/6287886470420",
  whatsappLabel: "+62 878-8647-0420",
} as const;

export const stats = [
  { value: 3, suffix: "+", label: "Years in data science" },
  { value: 90, suffix: "%", label: "Model accuracy delivered" },
  { value: 80, prefix: "+", suffix: "%", label: "Conversion lift" },
] as const;

export type Experience = {
  id: string;
  period: string;
  start: string;
  end: string;
  role: string;
  company: string;
  companyShort: string;
  location: string;
  logo: string;
  logoAlt: string;
  /** Omitted for roles whose work is confidential. */
  description?: string;
  highlights?: string[];
};

export const experience: Experience[] = [
  {
    id: "mandiri",
    period: "Mar 2026 — Present",
    start: "2026",
    end: "Present",
    role: "Officer Development Program — Information Technology",
    company: "PT Bank Mandiri (Persero) Tbk.",
    companyShort: "Bank Mandiri",
    location: "Jakarta, Indonesia",
    logo: "/logos/mandiri.png",
    logoAlt: "Bank Mandiri",
  },
  {
    id: "ilmuone-ds",
    period: "Mar 2025 — Mar 2026",
    start: "2025",
    end: "2026",
    role: "Data Scientist",
    company: "ilmuOne Data",
    companyShort: "ilmuOne Data",
    location: "Jakarta, Indonesia",
    logo: "/logos/ilmuone.png",
    logoAlt: "ilmuOne Data",
    description:
      "Owned end-to-end analytics and machine learning for enterprise clients across automotive, marketplace and digital business.",
    highlights: [
      "Campaign ROI forecasting and performance analysis for marketing planning",
      "GA4, Ads Data Hub, Mailchimp and YouTube sentiment analysis on BigQuery",
      "Data transformation workflows, customer segmentation and WhatsApp campaign automation",
      "Executive and operational dashboards in BigQuery and Looker Studio",
    ],
  },
  {
    id: "ilmuone-jr",
    period: "Jun 2023 — Mar 2025",
    start: "2023",
    end: "2025",
    role: "Jr. Data Scientist",
    company: "ilmuOne Data",
    companyShort: "ilmuOne Data",
    location: "Jakarta, Indonesia",
    logo: "/logos/ilmuone.png",
    logoAlt: "ilmuOne Data",
    description:
      "Customer and sentiment analytics, business intelligence and marketing automation for telco, automotive and digital-bank clients.",
    highlights: [
      "YouTube sentiment analysis for a leading automotive brand",
      "Giveaway monitoring dashboard tracking winners, participants and new-user acquisition",
      "Sentiment and performance dashboards that improved query efficiency by 20%",
    ],
  },
  {
    id: "bangkit",
    period: "Feb 2021 — Jul 2021",
    start: "2021",
    end: "2021",
    role: "Machine Learning Engineer",
    company: "Bangkit Academy — led by Google, Tokopedia, Gojek & Traveloka",
    companyShort: "Bangkit Academy",
    location: "Jakarta, Indonesia",
    logo: "/logos/bangkit.png",
    logoAlt: "Bangkit Academy",
    description:
      "Six-month applied machine learning program covering deep learning, Python automation and model deployment.",
    highlights: [
      "Shipped Danbam Tech — an Android hospital queuing system using hand-gesture image classification",
      "Earned the DeepLearning.AI TensorFlow Developer and Google IT Automation with Python certificates",
    ],
  },
];

export const education = [
  {
    id: "binus-master",
    period: "Sep 2021 — Mar 2023",
    degree: "M.Sc. Computer Science",
    school: "BINUS University",
    detail: "GPA 3.87 / 4.00",
  },
  {
    id: "binus-bachelor",
    period: "Sep 2018 — Sep 2021",
    degree: "B.Sc. Computer Science",
    school: "BINUS University",
    detail: "GPA 3.42 / 4.00",
  },
] as const;

export type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  context: string;
};

export const projects: Project[] = [
  {
    id: "genai-activation",
    category: "Generative AI",
    title: "Audience activation for a digital bank",
    description:
      "GenAI-generated marketing segments and creative variants, wired into campaign delivery and measured end to end.",
    metrics: [
      { value: "+30%", label: "campaign performance" },
      { value: "+80%", label: "conversions" },
    ],
    stack: ["LLMs", "Python", "BigQuery", "GCP"],
    context: "ilmuOne Data",
  },
  {
    id: "roi-forecasting",
    category: "Forecasting",
    title: "ROI & sentiment models",
    description:
      "Campaign ROI forecasting and sentiment scoring for banking and automotive clients, feeding marketing planning and budget allocation.",
    metrics: [
      { value: "90%", label: "peak accuracy" },
      { value: "2", label: "industries served" },
    ],
    stack: ["Python", "scikit-learn", "SQL", "Looker Studio"],
    context: "ilmuOne Data",
  },
  {
    id: "data-automation",
    category: "Automation",
    title: "Marketplace data workflows",
    description:
      "Automated extraction, transformation and reporting pipelines that replaced recurring manual analyst work.",
    metrics: [
      { value: "−80%", label: "compute cost" },
      { value: "−30%", label: "manual workload" },
    ],
    stack: ["Python", "BigQuery", "Cloud Functions", "Mailchimp"],
    context: "ilmuOne Data",
  },
  {
    id: "danbam-tech",
    category: "Computer Vision",
    title: "Danbam Tech queuing system",
    description:
      "Touch-free hospital queuing on Android via hand-gesture image classification — built during COVID-19 to cut shared-surface contact.",
    metrics: [
      { value: "85%", label: "classification accuracy" },
      { value: "Android", label: "on-device" },
    ],
    stack: ["TensorFlow", "Android", "Cloud Storage"],
    context: "Bangkit Academy",
  },
];

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  file: string;
  featured?: boolean;
};

/**
 * Preview image for a certificate. Generated from page 1 of the PDF by
 * `node scripts/certificate-thumbnails.mjs` — re-run it after adding a PDF.
 */
export const certThumb = (file: string) =>
  file.replace("/certificates/", "/certificates/thumbs/").replace(".pdf", ".webp");

export const certifications: Certification[] = [
  {
    id: "gcp-pmle",
    title: "Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    year: "2025",
    file: "/certificates/gcp-professional-ml-engineer.pdf",
    featured: true,
  },
  {
    id: "dlai-tf",
    title: "DeepLearning.AI TensorFlow Developer",
    issuer: "Coursera",
    year: "2021",
    file: "/certificates/deeplearning-ai-tensorflow-developer.pdf",
  },
  {
    id: "tf-deploy",
    title: "TensorFlow: Data and Deployment",
    issuer: "Coursera",
    year: "2021",
    file: "/certificates/tensorflow-data-deployment.pdf",
  },
  {
    id: "it-automation",
    title: "Google IT Automation with Python",
    issuer: "Coursera",
    year: "2021",
    file: "/certificates/google-it-automation-python.pdf",
  },
  {
    id: "math-ml",
    title: "Mathematics for Machine Learning",
    issuer: "Coursera",
    year: "2021",
    file: "/certificates/mathematics-for-machine-learning.pdf",
  },
  {
    id: "sql-bootcamp",
    title: "The Complete SQL Bootcamp",
    issuer: "Udemy",
    year: "2023",
    file: "/certificates/complete-sql-bootcamp.pdf",
  },
  {
    id: "google-analytics",
    title: "Google Analytics Certification",
    issuer: "Skillshop",
    year: "2023",
    file: "/certificates/google-analytics.pdf",
  },
  {
    id: "dumet",
    title: "Web Design — Grade A",
    issuer: "DUMET School",
    year: "2023",
    file: "/certificates/dumet-web-design.pdf",
  },
  {
    id: "bangkit-cert",
    title: "Bangkit Academy Graduate",
    issuer: "Google, Tokopedia, Gojek & Traveloka",
    year: "2021",
    file: "/certificates/bangkit-academy.pdf",
  },
];

export const skills = [
  "Python",
  "SQL",
  "BigQuery",
  "Google Cloud",
  "TensorFlow",
  "LLMs & GenAI",
  "Computer Vision",
  "Looker Studio",
  "GA4",
  "Ads Data Hub",
  "Tableau",
  "Cloud Functions",
] as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
] as const;
