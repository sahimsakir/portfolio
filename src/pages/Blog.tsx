import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Calendar, Clock, Search,
  ChevronLeft, ChevronRight, PenLine, Rss, X,
} from 'lucide-react';
import { blogPosts, getAllTags, POSTS_PER_PAGE } from '@/data/blog';
import { SEO } from '@/components/common/SEO';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, scaleIn, viewportOnce } from '@/animations/variants';
import { useMousePosition } from '@/hooks/useMousePosition';
import { cn } from '@/utils/helpers';

function FeaturedPost() {
  const post = blogPosts[0];
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      <Link to={`/blog/${post.slug}`}>
        <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent-indigo/40 hover:shadow-lift">
          <div className="absolute inset-0 bg-grad-primary-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:aspect-auto lg:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-canvas/70 hidden lg:block" />
              <span className="absolute left-4 top-4 rounded-full bg-grad-primary px-3 py-1 font-mono text-[10px] font-medium text-white shadow-glow">
                ★ Featured
              </span>
            </div>

            <div className="flex flex-col justify-center gap-5 bg-white/[0.025] p-8 lg:p-10">
              <span className="kbd-eyebrow">
                <span className="kbd-dot" /> Editor's pick
              </span>

              <h2 className="font-display text-xl font-semibold leading-snug text-ink group-hover:text-accent-indigo-soft lg:text-2xl transition-colors duration-300">
                {post.title}
              </h2>

              <p className="text-sm leading-relaxed text-ink-dim line-clamp-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => <Badge key={t}>{t}</Badge>)}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 font-mono text-xs text-ink-faint">
                  <span className="flex items-center gap-1.5"><Calendar size={11} />{post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-xs text-accent-indigo">
                  Read <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function PostCard({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
  return (
    <motion.div variants={scaleIn} custom={index} initial="hidden" animate="visible">
      <Link to={`/blog/${post.slug}`}>
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-white/[0.025] shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent-indigo/40 hover:shadow-lift">
          <div className="absolute inset-0 bg-grad-primary-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[20px]" />

          <div className="relative overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 p-3">
              {post.tags.slice(0, 2).map((t) => (
                <span key={t} className="rounded-full bg-canvas/80 px-2.5 py-0.5 font-mono text-[10px] text-ink-dim backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex flex-1 flex-col p-5">
            <div className="mb-2.5 flex items-center gap-3 font-mono text-[11px] text-ink-faint">
              <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-ink-faint" />
              <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
            </div>

            <h3 className="font-display text-base font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-accent-indigo-soft">
              {post.title}
            </h3>

            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim line-clamp-2">{post.excerpt}</p>

            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <div className="flex gap-1.5">
                {post.tags.slice(0, 2).map((t) => <Badge key={t}>{t}</Badge>)}
              </div>
              <span className="flex items-center gap-1 font-mono text-xs text-accent-indigo">
                Read <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)} disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-all hover:border-accent-indigo/50 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm transition-all',
            p === page ? 'bg-grad-primary text-white shadow-glow' : 'border border-white/10 text-ink-dim hover:border-accent-indigo/50 hover:text-ink'
          )}
        >{p}</button>
      ))}
      <button
        onClick={() => onChange(page + 1)} disabled={page === total}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-all hover:border-accent-indigo/50 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export function Blog() {
  const mouse = useMousePosition();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [page, setPage] = useState(1);
  const tags = getAllTags();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => { setPage(1); }, [search, activeTag]);

  const rest = blogPosts.slice(1);
  const filtered = useMemo(() => rest.filter((p) => {
    const matchTag = activeTag === 'All' || p.tags.includes(activeTag);
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchTag && matchSearch;
  }), [rest, activeTag, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const pagePosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const hasFilters = search !== '' || activeTag !== 'All';

  return (
    <div>
      <SEO
        title="Blog — Sahim Sakir"
        description="Writing on Laravel, backend architecture, AWS and DevOps from Sahim Sakir, Senior Software Engineer."
      />

      <section className="relative flex min-h-[56vh] items-center overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-grid opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-grad-radial" />
        <motion.div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[440px] w-[440px] rounded-full bg-accent-indigo/15 blur-[120px]"
          style={{ x: mouse.x * 20, y: mouse.y * 20 }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-[-8%] h-[320px] w-[320px] rounded-full bg-accent-cyan/15 blur-[100px]"
          style={{ x: mouse.x * -14, y: mouse.y * -14 }}
        />

        <div className="container-shell relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-2"
          >
            <span className="kbd-eyebrow rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="kbd-dot" /> {blogPosts.length} articles published
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Writing &amp; <span className="gradient-text">Thoughts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg"
          >
            Deep dives on Laravel, backend architecture, cloud infrastructure, and the
            engineering decisions behind shipping high-traffic production systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {[
              { icon: PenLine, label: `${blogPosts.length} Posts` },
              { icon: Rss, label: `${tags.length - 1} Topics` },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-ink-dim">
                <Icon size={13} className="text-accent-indigo" />{label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative pb-32 pt-8">
        <div className="container-shell space-y-14">

          <FeaturedPost />

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
            className="flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">All posts</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="relative w-full sm:max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts…"
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-9 font-mono text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent-indigo/50"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    'rounded-full px-4 py-1.5 font-mono text-xs transition-all duration-200',
                    activeTag === tag
                      ? 'bg-grad-primary text-white shadow-glow'
                      : 'border border-white/10 bg-white/[0.03] text-ink-dim hover:border-accent-indigo/40 hover:text-ink'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {hasFilters && (
              <motion.p
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="font-mono text-xs text-ink-faint"
              >
                {filtered.length} post{filtered.length !== 1 ? 's' : ''} found
                {activeTag !== 'All' && <> in <span className="text-accent-indigo">{activeTag}</span></>}
                {search && <> matching <span className="text-accent-indigo">"{search}"</span></>}
                <button onClick={() => { setSearch(''); setActiveTag('All'); }} className="ml-3 text-ink-dim underline hover:text-ink">
                  clear
                </button>
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {pagePosts.length > 0 ? (
              <motion.div
                key={`${activeTag}-${search}-${page}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
              >
                {pagePosts.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 py-24 text-center"
              >
                <span className="text-4xl">📭</span>
                <p className="font-display text-xl text-ink">No posts found</p>
                <p className="text-sm text-ink-dim">Try a different tag or search term.</p>
                <button
                  onClick={() => { setSearch(''); setActiveTag('All'); }}
                  className="mt-3 rounded-full border border-white/10 px-5 py-2 font-mono text-xs text-ink-dim hover:border-accent-indigo/40 hover:text-ink transition-colors"
                >
                  clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
              className="mt-12"
            >
              <Pagination
                page={page} total={totalPages}
                onChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 480, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
            className="relative overflow-hidden rounded-[24px] border border-accent-indigo/20 bg-grad-primary-soft p-8 text-center sm:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-indigo/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-cyan/20 blur-[80px]" />
            <div className="relative">
              <span className="kbd-eyebrow mb-4 justify-center">
                <span className="kbd-dot" /> Stay updated
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink">
                More posts coming soon
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink-dim">
                Working on detailed write-ups of production engineering experiences.
                Add your real articles in <code className="font-mono text-xs text-accent-indigo">src/data/blog.ts</code>.
              </p>
              <Link
                to="/#contact"
                className="btn-gradient mt-6 inline-flex"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}