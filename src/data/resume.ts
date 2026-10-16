import type {
  SocialLink,
  SkillCategory,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  CertificationItem,
  AchievementStat,
} from '@/types';

import profilePhoto from '@/assets/images/profile.jpeg';
import logoJbConnect from '@/assets/images/jbc-favicon.jpg';
import logoAdplay from '@/assets/images/adplay_mobile_logo.jpeg';
import logoNvisio from '@/assets/images/nvisio_solutions_logo.jpeg';
import logoBanglamark from '@/assets/images/banglamark.jpg';


export const personal = {
  name: 'Sahim Sakir',
  firstName: 'Sahim',
  title: 'Senior Software Engineer',
  headline: 'Backend & Cloud Engineer building scalable Laravel systems on AWS',
  location: 'Dhaka, Bangladesh',
  address: 'Dhaka, Bangladesh',
  email: 'sahimsakir@gmail.com',
  phone: '01516117503',
  photo: profilePhoto,
  isPlaceholderPhoto: false,
  summary:
    'I build backend services and business applications with PHP and Laravel, and help deliver them with AWS, Docker and Terraform. Since 2021, my work has spanned product catalogs, e-commerce, interactive web experiences and advertising technology. At AdPlay, I worked on real-time bidding, campaign management and MongoDB-to-SQL Server reporting integrations. At JB Connect, I work across application delivery, APIs, testing and cloud deployment. I care about clear data models, efficient queries and systems that teams can maintain.',
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
    isPlaceholderLogo: false,
    logo: logoJbConnect,
    position: 'Senior Lead Software Engineer',
    duration: '06/2024 — Present',
    location: 'Dhaka, Bangladesh',
    summary: ['Develop and maintain business applications with Laravel, PHP, JavaScript and relational databases.', 'Work across backend features, frontend integration, testing and issue resolution in a Scrum delivery process.', 'Configure AWS deployment workflows with Docker, Terraform, CodePipeline, CodeDeploy and CloudWatch.', 'Build APIs and support reliable releases through full-flow testing and infrastructure maintenance.'],
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
    isPlaceholderLogo: false,
    logo: logoAdplay,
    position: 'Software Engineer',
    duration: '09/2023 — 05/2024',
    location: 'Dhaka, Bangladesh',
    summary: ['Built and maintained PHP real-time bidding services and a Laravel campaign management system.', 'Integrated Google Authorized Buyers, MaxMind GeoIP2 and WURFL for bidding and audience context.', 'Worked on audience targeting, remarketing and frequency-capping logic.', 'Synchronized MongoDB advertising data into SQL Server for reporting using scheduled jobs.', 'Tuned Apache and PHP runtime settings and supported AWS-hosted services.'],
    technologies: ['Laravel', 'PHP', 'MySQL', 'MongoDB', 'AWS', 'Apache', 'Nginx', 'JavaScript', 'Bootstrap'],
  },
  {
    id: 'nvisio',
    company: 'NVISIO Solution Ltd.',
    isPlaceholderLogo: false,
    logo: logoNvisio,
    position: 'Full Stack Developer',
    duration: '02/2022 — 08/2023',
    location: 'Dhaka, Bangladesh',
    summary: ['Delivered corporate websites, product viewers and application features using Laravel, MySQL and JavaScript.', 'Built interactive 3D package viewers with three.js and explored browser-based AR with WebXR.', 'Maintained SIG Micro and Ayojok.com features, resolved defects and refined responsive layouts.', 'Managed hosting and releases on Bluehost and Hostinger.'],
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
    isPlaceholderLogo: false,
    logo: logoBanglamark,
    position: 'Development & Project Engineer',
    duration: '02/2021 — 02/2022',
    location: 'Dhaka, Bangladesh',
    summary: ['Built and maintained Laravel product-catalog websites for Banglamark and Liugong Bangladesh.', 'Developed tender landing pages for business units and worked on the Flokoin homepage.', 'Maintained Kablewala e-commerce administration and storefront features.', 'Implemented responsive pages with HTML, CSS, JavaScript and Bootstrap.'],
    technologies: ['Laravel', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
];


export const education: EducationItem[] = [
  {
    id: 'aiub',
    institution: 'American International University-Bangladesh',
    degree: 'Bachelor of Science in Computer Science & Engineering',
    duration: '01/2017 — 07/2020 · CGPA 3.75/4.00',
    location: 'Dhaka, Bangladesh',
  },
];

export const certifications: CertificationItem[] = [
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
];

export const achievements: AchievementStat[] = [
  { label: 'Years of Experience', value: 5, suffix: '+' },
  { label: 'Featured Projects', value: 4 },
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

export const projects: ProjectItem[] = [
  {
    "id": "rtb",
    "title": "Real-Time Bidding & Campaign Management",
    "description": "Backend engineering for an advertising platform: PHP bidding services, a Laravel CMS, audience targeting and reporting integrations.",
    "screenshot": "/images/rtb.webp",
    "isPlaceholderScreenshot": false,
    "technologies": [
      "PHP",
      "Laravel",
      "MongoDB",
      "SQL Server",
      "AWS"
    ],
    "github": null,
    "demo": null,
    "challenges": "Responding to bid requests while keeping campaign rules, audience context and reporting consistent.",
    "solution": "Integrated bidding and targeting logic with campaign configuration, geolocation and device intelligence.",
    "architecture": "PHP bidder and Laravel CMS, with MongoDB data synchronized to SQL Server through scheduled jobs.",
    "features": [
      "OpenRTB response handling",
      "Audience targeting and frequency capping",
      "Google Authorized Buyers integration",
      "Campaign administration and reporting"
    ],
    "featured": true
  },
  {
    "id": "sync",
    "title": "Advertising Data Sync Pipeline",
    "description": "A scheduled data pipeline moving advertising records from MongoDB into SQL Server for reporting.",
    "screenshot": "/images/sync.webp",
    "isPlaceholderScreenshot": false,
    "technologies": [
      "PHP",
      "MongoDB",
      "SQL Server",
      "AWS"
    ],
    "github": null,
    "demo": null,
    "challenges": "Reconciling document-oriented source data with relational reporting structures.",
    "solution": "Mapped source records into reporting tables and automated transfers through scheduled processing.",
    "architecture": "MongoDB source \u2192 PHP synchronization jobs \u2192 SQL Server reporting database.",
    "features": [
      "Source-to-target field mapping",
      "Scheduled data transfers",
      "Relational reporting integration"
    ],
    "featured": true
  },
  {
    "id": "catalog",
    "title": "Product Catalog & Commerce Websites",
    "description": "Laravel websites and commerce features built during my work at Banglamark, including product catalogs, tender pages and storefront administration.",
    "screenshot": "/images/catalog.webp",
    "isPlaceholderScreenshot": false,
    "technologies": [
      "Laravel",
      "MySQL",
      "JavaScript",
      "Bootstrap"
    ],
    "github": null,
    "demo": null,
    "challenges": "Presenting business and product information clearly while supporting administration workflows.",
    "solution": "Built reusable page layouts and connected product content to Laravel-backed administration.",
    "architecture": "Laravel application with MySQL storage and responsive Bootstrap interfaces.",
    "features": [
      "Product catalog pages",
      "Administration and storefront features",
      "Tender landing pages",
      "Responsive business websites"
    ],
    "featured": false
  },
  {
    "id": "cloud",
    "title": "AWS Deployment Infrastructure",
    "description": "Infrastructure and delivery configuration for a Laravel development API using Terraform and AWS deployment services.",
    "screenshot": "/images/cloud.webp",
    "isPlaceholderScreenshot": false,
    "technologies": [
      "Terraform",
      "AWS",
      "Docker",
      "CI/CD"
    ],
    "github": null,
    "demo": null,
    "challenges": "Keeping environment configuration and deployment steps repeatable and reviewable.",
    "solution": "Defined infrastructure in Terraform and connected release workflows with AWS deployment and logging services.",
    "architecture": "Application Load Balancer, EC2 Auto Scaling, CodePipeline, CodeDeploy and CloudWatch logs.",
    "features": [
      "Infrastructure as code",
      "Application deployment pipeline",
      "Load balancing and instance configuration",
      "Centralized application logs"
    ],
    "featured": false
  }
];
