import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { getBlogPostBySlug, blogPosts } from '@/data/blog';
import { SEO } from '@/components/common/SEO';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, viewportOnce } from '@/animations/variants';

function ReadProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
      <motion.div
        className="h-full bg-grad-primary"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

function RelatedPosts({ current }: { current: { slug: string; tags: string[] } }) {
  const related = blogPosts
    .filter((p) => p.slug !== current.slug && p.tags.some((t) => current.tags.includes(t)))
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-16">
      <p className="kbd-eyebrow mb-6"><span className="kbd-dot" /> Related posts</p>
      <div className="grid gap-5 sm:grid-cols-2">
        {related.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`}>
            <div className="group flex gap-4 overflow-hidden rounded-[16px] border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/40 hover:shadow-lift">
              <img src={post.coverImage} alt={post.title} className="h-16 w-24 shrink-0 rounded-xl object-cover" />
              <div className="flex flex-col justify-between">
                <h4 className="text-sm font-medium leading-snug text-ink line-clamp-2 group-hover:text-accent-indigo-soft transition-colors">
                  {post.title}
                </h4>
                <span className="flex items-center gap-1 font-mono text-[11px] text-ink-faint">
                  <Clock size={10} /> {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const articleRef = useRef<HTMLElement>(null);
  const [readPercent, setReadPercent] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const total = articleRef.current.offsetHeight;
      const scrolled = Math.max(0, -rect.top + window.innerHeight * 0.3);
      setReadPercent(Math.min(100, Math.round((scrolled / total) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;

  const postIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <>
      <ReadProgress />
      <SEO title={`${post.title} — Sahim Sakir`} description={post.excerpt} />

      <div className="relative h-[45vh] w-full overflow-hidden pt-16 sm:h-[52vh]">
        <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />

        <div className="absolute left-0 right-0 top-20 z-10">
          <div className="container-shell max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-canvas/60 px-4 py-2 font-mono text-xs text-ink-dim backdrop-blur-sm transition-colors hover:border-white/40 hover:text-ink"
            >
              <ArrowLeft size={13} /> Back to Blog
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container-shell max-w-3xl pb-8">
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="flex items-center gap-1 rounded-full bg-accent-indigo/20 px-3 py-0.5 font-mono text-[10px] text-accent-indigo-soft backdrop-blur-sm">
                  <Tag size={9} />{t}
                </span>
              ))}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl lg:text-4xl"
            >
              {post.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="container-shell max-w-3xl py-12">
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4"
        >
          <div className="flex flex-wrap items-center gap-5 font-mono text-xs text-ink-faint">
            <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="h-full rounded-full bg-grad-primary"
                animate={{ width: `${readPercent}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="font-mono text-[10px] tabular-nums text-ink-faint">{readPercent}% read</span>
          </div>
        </motion.div>

        <article ref={articleRef} className="space-y-6">
          {post.content.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-base leading-[1.85] text-ink-dim"
            >
              {paragraph}
            </motion.p>
          ))}
        </article>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-8"
        >
          <span className="mr-1 font-mono text-xs text-ink-faint">Tagged:</span>
          {post.tags.map((t) => <Badge key={t}>{t}</Badge>)}
        </motion.div>

        {post.isPlaceholderCover && (
          <p className="mt-6 font-mono text-[11px] text-ink-faint">
            placeholder — replace cover image and content in{' '}
            <code className="text-accent-indigo">src/data/blog.ts</code> before publishing.
          </p>
        )}

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
            className="mt-14 grid gap-4 border-t border-white/[0.06] pt-10 sm:grid-cols-2"
          >
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`}>
                <div className="group flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all hover:-translate-y-0.5 hover:border-accent-indigo/40 hover:shadow-lift">
                  <ArrowLeft size={16} className="mt-0.5 shrink-0 text-ink-faint transition-transform group-hover:-translate-x-1" />
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-ink-faint">Previous</p>
                    <p className="text-sm font-medium text-ink line-clamp-2 group-hover:text-accent-indigo-soft transition-colors">{prevPost.title}</p>
                  </div>
                </div>
              </Link>
            ) : <div />}

            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`}>
                <div className="group flex items-start justify-end gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-right transition-all hover:-translate-y-0.5 hover:border-accent-indigo/40 hover:shadow-lift">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-ink-faint">Next</p>
                    <p className="text-sm font-medium text-ink line-clamp-2 group-hover:text-accent-indigo-soft transition-colors">{nextPost.title}</p>
                  </div>
                  <ArrowRight size={16} className="mt-0.5 shrink-0 text-ink-faint transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )}
          </motion.div>
        )}

        <RelatedPosts current={{ slug: post.slug, tags: post.tags }} />

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="mt-16 text-center"
        >
          <Link to="/blog" className="btn-outline inline-flex">
            <ArrowLeft size={15} /> Back to all posts
          </Link>
        </motion.div>
      </div>
    </>
  );
}