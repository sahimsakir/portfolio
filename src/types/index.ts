export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email' | 'phone' | 'location';
}

export interface SkillItem {
  name: string;
  percentage: number; // 0-100
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  logo: string;
  position: string;
  duration: string;
  location: string;
  isPlaceholderLogo: boolean;
  summary: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  screenshot: string;
  isPlaceholderScreenshot: boolean;
  technologies: string[];
  github: string | null;
  demo: string | null;
  challenges: string;
  solution: string;
  architecture: string;
  features: string[];
  featured: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  location?: string;
}

export interface AchievementStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // paragraphs; simple structure, no markdown parser required
  coverImage: string;
  isPlaceholderCover: boolean;
  date: string;
  readTime: string;
  tags: string[];
}
