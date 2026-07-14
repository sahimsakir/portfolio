import type {
  SocialLink,
  SkillCategory,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  CertificationItem,
  AchievementStat,
} from '@/types';

import profilePlaceholder from '@/assets/images/profile.jpeg';
import logoJbConnect from '@/assets/images/jbc-favicon.jpg';
import logoAdplay from '@/assets/images/adplay_mobile_logo.jpeg';
import logoNvisio from '@/assets/images/nvisio_solutions_logo.jpeg';
import logoBanglamark from '@/assets/images/banglamark.jpg';
import project1Placeholder from '@/assets/images/project-porfolio-1.png';
import project2Placeholder from '@/assets/images/project-2-placeholder.svg';
import project3Placeholder from '@/assets/images/project-3-placeholder.svg';
import project4Placeholder from '@/assets/images/project-4-placeholder.svg';

/**
 * ⚠️ PLACEHOLDER NOTICE
 * Fields marked "PLACEHOLDER" below are not present on the source resume
 * and must be replaced with real content before shipping this site.
 */

export const personal = {
  name: 'Sahim Sakir',
  firstName: 'Sahim',
  title: 'Senior Software Engineer',
  headline: 'Backend & Cloud Engineer building scalable Laravel systems on AWS',
  location: 'Dhaka, Bangladesh',
  address: 'Flat: 1A, House: 1/E, Road: 11, Block: G, Bashundhara R/A, Dhaka-1229',
  email: 'sahimsakir@gmail.com',
  phone: '01516117503',
  // PLACEHOLDER: replace with real headshot at src/assets/images/profile-photo.jpg
  photo: profilePlaceholder,
  isPlaceholderPhoto: true,
  summary:
    'I am a dedicated Software Engineer specializing in Laravel and PHP, with expertise in MySQL, MongoDB, AWS, and Docker. I focus on building scalable, high-performance applications while ensuring efficient backend architecture, security, and server management. Proficient in HTML, CSS, and JavaScript, I create seamless user experiences. My skills in cloud deployment and DevOps enhance system efficiency and reliability. Passionate about problem-solving and continuous learning, I thrive on developing innovative, user-friendly solutions.',
  resumeUrl: '/resume.pdf',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/sahimsakir', icon: 'github' },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/sahim-sakir-443459141',
    icon: 'linkedin',
  },
  { label: 'Email', url: 'mailto:sahimsakir@gmail.com', icon: 'email' },
  { label: 'Phone', url: 'tel:+8801516117503', icon: 'phone' },
];

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: [
      { name: 'PHP', percentage: 96 },
      { name: 'JavaScript', percentage: 88 },
      { name: 'Python', percentage: 78 },
      { name: 'TypeScript', percentage: 72 },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'Laravel', percentage: 97 },
      { name: 'FastAPI', percentage: 68 },
      { name: 'Bootstrap', percentage: 85 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'HTML', percentage: 88 },
      { name: 'CSS', percentage: 86 },
      { name: 'JavaScript', percentage: 88 },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MySQL', percentage: 90 },
      { name: 'PostgreSQL', percentage: 72 },
      { name: 'MongoDB', percentage: 85 },
      { name: 'Redis', percentage: 70 },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'AWS', percentage: 75 },
      { name: 'AWS CDK', percentage: 70 },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', percentage: 78 },
      { name: 'CI/CD', percentage: 80 },
      { name: 'Terraform', percentage: 68 },
      { name: 'Nginx', percentage: 74 },
      { name: 'Apache', percentage: 85 },
    ],
  },
  {
    category: 'Version Control',
    items: [{ name: 'Git', percentage: 88 }],
  },
  {
    category: 'Tools',
    items: [
      { name: 'CentOS', percentage: 72 },
      { name: 'Ubuntu', percentage: 74 },
    ],
  },
  {
    category: 'Soft Skills',
    items: [
      { name: 'Problem Solving', percentage: 96 },
      { name: 'System Architecture', percentage: 90 },
      { name: 'Team Collaboration', percentage: 88 },
      { name: 'Agile Delivery', percentage: 85 },
    ],
  },
];

// Featured subset shown as circular progress indicators at the top of the Skills dashboard
export const featuredSkills: { name: string; percentage: number }[] = [
  { name: 'Laravel', percentage: 97 },
  { name: 'PHP', percentage: 96 },
  { name: 'MySQL', percentage: 90 },
  { name: 'AWS', percentage: 75 },
  { name: 'Docker', percentage: 78 },
  { name: 'MongoDB', percentage: 85 },
];

export const experience: ExperienceItem[] = [
  {
    id: 'jbconnect',
    company: 'JB Connect Ltd.',
    // PLACEHOLDER: replace with real logo at src/assets/images/logo-jbconnect.svg
    logo: logoJbConnect,
    isPlaceholderLogo: true,
    position: 'Senior Lead Software Engineer',
    duration: '06/2024 — Present',
    location: 'Dhaka, Bangladesh',
    summary: [
      'Designed and enhanced system architectures for 10+ large-scale projects, improving scalability and maintainability.',
      'Drove Laravel, AWS, Docker and CI/CD adoption, resulting in 30% faster deployment cycles.',
      'Owned cloud infrastructure across EC2, ECS, S3, RDS, SQS, Lambda and CloudWatch.',
      'Directed DevOps tooling strategy using Docker, AWS CDK and Terraform.',
    ],
    technologies: [
      'Laravel',
      'PHP',
      'Python',
      'TypeScript',
      'AWS',
      'Docker',
      'Terraform',
      'AWS CDK',
      'MySQL',
      'PostgreSQL',
      'Redis',
    ],
  },
  {
    id: 'adplay',
    company: 'AdPlay Technology Ltd.',
    logo: logoAdplay,
    isPlaceholderLogo: true,
    position: 'Software Engineer',
    duration: '09/2023 — 05/2024',
    location: 'Dhaka, Bangladesh',
    summary: [
      'Built and maintained high-performance backend services using Laravel (8–10) and PHP 7–8 for high-traffic ad-tech platforms.',
      'Designed and optimized RESTful APIs handling millions of ad requests with low latency.',
      'Refactored legacy codebases, reducing technical debt by 30%.',
      'Optimized MySQL and MongoDB queries and indexes, improving data retrieval speed by 40%.',
      'Integrated third-party ad and real-time bidding (RTB) APIs, improving targeting and fill rates.',
      'Tuned Apache/Nginx and PHP-FPM configurations, cutting response times by 35% and sustaining 99.9% uptime.',
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'MongoDB', 'AWS', 'Apache', 'Nginx', 'JavaScript', 'Bootstrap'],
  },
  {
    id: 'nvisio',
    company: 'NVISIO Solution Ltd.',
    logo: logoNvisio,
    isPlaceholderLogo: true,
    position: 'Full Stack Developer',
    duration: '02/2022 — 08/2023',
    location: 'Dhaka, Bangladesh',
    summary: [
      'Built scalable Laravel (5–10) / PHP (5–8) applications serving 100K+ daily users.',
      'Implemented 50+ stored procedures across MongoDB, MySQL and SQL Server to optimize data processing.',
      'Automated database jobs, cutting manual intervention by 40%.',
      'Delivered 100% mobile-responsive UIs with HTML, CSS, JavaScript and Bootstrap.',
      'Expanded a multi-database report-syncing application, reducing sync time by 40%.',
      'Improved server configurations, boosting site speed by 50% and cutting crashes by 30%.',
    ],
    technologies: [
      'Laravel',
      'PHP',
      'MongoDB',
      'MySQL',
      'SQL Server',
      'AWS',
      'Apache',
      'JavaScript',
      'Bootstrap',
    ],
  },
  {
    id: 'banglamark',
    company: 'Banglamark Group Ltd.',
    logo: logoBanglamark,
    isPlaceholderLogo: true,
    position: 'Development & Project Engineer',
    duration: '02/2021 — 02/2022',
    location: 'Dhaka, Bangladesh',
    summary: [
      'Enhanced catalogue-based company and product websites with Laravel, improving engagement by 20%.',
      'Grew a coupon and deals platform, increasing daily transactions by 35%.',
      'Managed the admin panel and front end for an e-commerce platform with 500K+ products.',
      'Built tender-request sites for multiple business units, cutting processing time by 50%.',
    ],
    technologies: ['Laravel', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
];

// PLACEHOLDER: entire projects array — no dedicated project section existed on the
// source resume. Replace title/description/links/screenshot for each entry below.
export const projects: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'PLACEHOLDER — Ad Analytics Platform',
    description:
      'PLACEHOLDER — A high-throughput ad analytics dashboard processing real-time bidding data with automated reporting pipelines. Replace with your real project description.',
    screenshot: project1Placeholder,
    isPlaceholderScreenshot: true,
    technologies: ['Laravel', 'MySQL', 'MongoDB', 'AWS', 'Redis'],
    github: null,
    demo: null,
    challenges: 'PLACEHOLDER — describe the hardest technical problem you solved.',
    solution: 'PLACEHOLDER — describe your approach and why it worked.',
    architecture: 'PLACEHOLDER — describe the system architecture (services, queues, DB layout).',
    features: ['PLACEHOLDER feature one', 'PLACEHOLDER feature two', 'PLACEHOLDER feature three'],
    featured: true,
  },
  {
    id: 'project-2',
    title: 'PLACEHOLDER — Multi-Region Report Sync Engine',
    description:
      'PLACEHOLDER — A syncing service unifying MongoDB, MySQL and SQL Server data sources for consistent cross-region reporting. Replace with your real project description.',
    screenshot: project2Placeholder,
    isPlaceholderScreenshot: true,
    technologies: ['Laravel', 'AWS', 'MongoDB', 'MySQL', 'SQL Server'],
    github: null,
    demo: null,
    challenges: 'PLACEHOLDER — describe the hardest technical problem you solved.',
    solution: 'PLACEHOLDER — describe your approach and why it worked.',
    architecture: 'PLACEHOLDER — describe the system architecture.',
    features: ['PLACEHOLDER feature one', 'PLACEHOLDER feature two', 'PLACEHOLDER feature three'],
    featured: true,
  },
  {
    id: 'project-3',
    title: 'PLACEHOLDER — E-Commerce Catalogue Admin',
    description:
      'PLACEHOLDER — An admin panel and storefront handling 500K+ products with inventory and tender workflows. Replace with your real project description.',
    screenshot: project3Placeholder,
    isPlaceholderScreenshot: true,
    technologies: ['Laravel', 'JavaScript', 'Bootstrap', 'MySQL'],
    github: null,
    demo: null,
    challenges: 'PLACEHOLDER — describe the hardest technical problem you solved.',
    solution: 'PLACEHOLDER — describe your approach and why it worked.',
    architecture: 'PLACEHOLDER — describe the system architecture.',
    features: ['PLACEHOLDER feature one', 'PLACEHOLDER feature two', 'PLACEHOLDER feature three'],
    featured: false,
  },
  {
    id: 'project-4',
    title: 'PLACEHOLDER — Infrastructure-as-Code Toolkit',
    description:
      'PLACEHOLDER — A Terraform + AWS CDK toolkit standardizing deployments across environments, cutting release time by 30%. Replace with your real project description.',
    screenshot: project4Placeholder,
    isPlaceholderScreenshot: true,
    technologies: ['Terraform', 'AWS CDK', 'Docker', 'CI/CD'],
    github: null,
    demo: null,
    challenges: 'PLACEHOLDER — describe the hardest technical problem you solved.',
    solution: 'PLACEHOLDER — describe your approach and why it worked.',
    architecture: 'PLACEHOLDER — describe the system architecture.',
    features: ['PLACEHOLDER feature one', 'PLACEHOLDER feature two', 'PLACEHOLDER feature three'],
    featured: false,
  },
];

export const education: EducationItem[] = [
  {
    id: 'aiub',
    institution: 'American International University-Bangladesh',
    degree: 'Bachelor of Science in Computer Science & Engineering',
    duration: '01/2017 — 06/2020',
    location: 'Dhaka, Bangladesh',
  },
];

export const certifications: CertificationItem[] = [
  { id: 'cert-1', title: 'Certified DevOps Engineering', issuer: 'PLACEHOLDER — issuing body' },
  { id: 'cert-2', title: 'The Ideas Challenge', issuer: 'PLACEHOLDER — issuing body', year: '2018' },
  { id: 'cert-3', title: 'Hult Prize', issuer: 'American International University-Bangladesh', year: '2018' },
  {
    id: 'cert-4',
    title: 'Disaster Response Exercise & Exchange',
    issuer: 'Bangladesh Army',
    year: '2019',
    location: 'Dhaka, Bangladesh',
  },
  {
    id: 'cert-5',
    title: 'Community Volunteer Training',
    issuer: 'Fire Service and Civil Defense',
    year: '2015',
    location: 'Chattogram, Bangladesh',
  },
  {
    id: 'cert-6',
    title: 'Training of Trainers',
    issuer: 'Red Crescent Youth Chittagong',
    year: '2014',
    location: 'Chattogram, Bangladesh',
  },
  {
    id: 'cert-7',
    title: 'Basic & First Aid Training',
    issuer: 'Red Crescent Youth Chittagong',
    year: '2007',
    location: 'Chattogram, Bangladesh',
  },
  { id: 'cert-8', title: 'Cyber Crime Awareness Program', issuer: 'PLACEHOLDER — issuing body' },
];

// PLACEHOLDER: verify these figures — derived estimates from resume timeline, not stated explicitly.
export const achievements: AchievementStat[] = [
  { label: 'Years of Experience', value: 6, suffix: '+' },
  { label: 'Large-Scale Projects', value: 20, suffix: '+' },
  { label: 'Companies Worked', value: 4 },
  { label: 'Core Technologies', value: 20, suffix: '+' },
];

export const techStack: string[] = [
  'Laravel',
  'PHP',
  'Python',
  'TypeScript',
  'JavaScript',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'AWS',
  'Docker',
  'Terraform',
  'AWS CDK',
  'Nginx',
  'Apache',
  'Git',
  'CI/CD',
  'FastAPI',
  'Ubuntu',
  'CentOS',
];
