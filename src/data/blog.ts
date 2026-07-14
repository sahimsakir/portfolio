import type { BlogPost } from '@/types';

import blog1Placeholder from '@/assets/images/blog-1-placeholder.svg';
import blog2Placeholder from '@/assets/images/blog-2-placeholder.svg';
import blog3Placeholder from '@/assets/images/blog-3-placeholder.svg';
import blog4Placeholder from '@/assets/images/blog-4-placeholder.svg';
import blog5Placeholder from '@/assets/images/blog-5-placeholder.svg';
import blog6Placeholder from '@/assets/images/blog-6-placeholder.svg';
import blog7Placeholder from '@/assets/images/blog-7-placeholder.svg';

export const blogPosts: BlogPost[] = [
  {
    slug: 'scaling-laravel-for-high-traffic',
    title: 'PLACEHOLDER — Scaling Laravel for high-traffic ad platforms',
    excerpt: 'Notes on the architecture decisions that got a Laravel monolith handling millions of daily ad requests without falling over.',
    coverImage: blog1Placeholder,
    isPlaceholderCover: true,
    date: 'Draft',
    readTime: '6 min read',
    tags: ['Laravel', 'Performance', 'Architecture'],
    content: [
      'PLACEHOLDER — Replace this with your own write-up.',
      'PLACEHOLDER — Talk about specifics: query optimization, caching layers (Redis), queue design.',
      'PLACEHOLDER — Close with what you would do differently next time.',
    ],
  },
  {
    slug: 'docker-terraform-deploy-pipeline',
    title: 'PLACEHOLDER — Building a repeatable deploy pipeline with Docker and Terraform',
    excerpt: 'How standardizing infrastructure-as-code cut environment drift and got deployments down to a single command.',
    coverImage: blog2Placeholder,
    isPlaceholderCover: true,
    date: 'Draft',
    readTime: '5 min read',
    tags: ['Docker', 'Terraform', 'DevOps', 'AWS'],
    content: [
      'PLACEHOLDER — Describe the before state: manual deploys, inconsistent environments.',
      'PLACEHOLDER — Walk through the toolchain you settled on and why.',
      'PLACEHOLDER — Share a concrete result: faster deploys, fewer incidents.',
    ],
  },
  {
    slug: 'mysql-mongodb-when-to-use-which',
    title: 'PLACEHOLDER — MySQL vs MongoDB: what actually decided it for us',
    excerpt: 'A practical look at choosing between relational and document stores for a reporting system with mixed data shapes.',
    coverImage: blog3Placeholder,
    isPlaceholderCover: true,
    date: 'Draft',
    readTime: '4 min read',
    tags: ['MySQL', 'MongoDB', 'Databases'],
    content: [
      'PLACEHOLDER — Set up the use case: what kind of data, what kind of queries, what scale.',
      'PLACEHOLDER — Explain the tradeoffs that mattered in practice.',
      'PLACEHOLDER — End with the decision and how it has held up since.',
    ],
  },
  {
    slug: 'aws-ecs-zero-downtime-deployments',
    title: 'PLACEHOLDER — Zero-downtime deployments with AWS ECS and Blue/Green',
    excerpt: 'A step-by-step walkthrough of setting up blue/green deployments on ECS to eliminate downtime during releases.',
    coverImage: blog4Placeholder,
    isPlaceholderCover: true,
    date: 'Draft',
    readTime: '7 min read',
    tags: ['AWS', 'DevOps', 'ECS'],
    content: [
      'PLACEHOLDER — Explain the problem with rolling deployments and why blue/green solves it.',
      'PLACEHOLDER — Walk through the ECS task definition, load balancer, and CodeDeploy setup.',
      'PLACEHOLDER — Cover rollback strategy and how you monitor the switchover.',
    ],
  },
  {
    slug: 'redis-caching-strategies-laravel',
    title: 'PLACEHOLDER — Redis caching strategies that actually move the needle in Laravel',
    excerpt: 'Cache invalidation is hard. These are the three patterns I keep reaching for when a Laravel app starts slowing down under load.',
    coverImage: blog5Placeholder,
    isPlaceholderCover: true,
    date: 'Draft',
    readTime: '5 min read',
    tags: ['Redis', 'Laravel', 'Performance'],
    content: [
      'PLACEHOLDER — Introduce the caching problem in the context of a real feature.',
      'PLACEHOLDER — Cover cache-aside, write-through, and cache-busting by event.',
      'PLACEHOLDER — Show before/after response time numbers.',
    ],
  },
  {
    slug: 'nginx-php-fpm-tuning',
    title: 'PLACEHOLDER — Nginx and PHP-FPM tuning for high-concurrency Laravel apps',
    excerpt: 'The server-level changes that cut our p95 response time by 35% without touching a single line of application code.',
    coverImage: blog6Placeholder,
    isPlaceholderCover: true,
    date: 'Draft',
    readTime: '6 min read',
    tags: ['Nginx', 'PHP', 'Performance', 'DevOps'],
    content: [
      'PLACEHOLDER — Baseline metrics and the profiling approach.',
      'PLACEHOLDER — worker_processes, worker_connections, PHP-FPM pool sizing.',
      'PLACEHOLDER — The final configuration and the numbers.',
    ],
  },
  {
    slug: 'mongodb-aggregation-pipelines',
    title: 'PLACEHOLDER — MongoDB aggregation pipelines for analytics at scale',
    excerpt: 'How we replaced a batch of slow report queries with a single aggregation pipeline, reducing report generation from 40s to under 2s.',
    coverImage: blog7Placeholder,
    isPlaceholderCover: true,
    date: 'Draft',
    readTime: '8 min read',
    tags: ['MongoDB', 'Databases', 'Performance'],
    content: [
      'PLACEHOLDER — The reporting requirement and why raw queries were failing.',
      'PLACEHOLDER — Breaking down the aggregation pipeline stage by stage.',
      'PLACEHOLDER — Index strategy and final performance numbers.',
    ],
  },
];

export const POSTS_PER_PAGE = 4;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const tags = blogPosts.flatMap((p) => p.tags);
  return ['All', ...Array.from(new Set(tags))];
}