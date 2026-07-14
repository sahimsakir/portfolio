import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Download, ArrowDown, Sparkles, BadgeCheck } from 'lucide-react';
import { personal, socialLinks, achievements } from '@/data/resume';
import { scrollToId, createRipple } from '@/utils/helpers';
import { useMousePosition } from '@/hooks/useMousePosition';

const rotatingTitles = [
  'Senior Software Engineer',
  'Backend & Cloud Architect',
  'Laravel Specialist',
  'DevOps-Minded Engineer',
];

function RotatingTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingTitles.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingTitles[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text inline-block"
        >
          {rotatingTitles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const mouse = useMousePosition();
  const years = achievements.find((a) => a.label.includes('Years'))?.value ?? 5;
  const projects = achievements.find((a) => a.label.includes('Projects'))?.value ?? 10;

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* background grid + glow */}
      <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-grad-radial" />
      <motion.div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent-indigo/20 blur-[120px]"
        style={{ x: mouse.x * 24, y: mouse.y * 24 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-accent-cyan/20 blur-[120px]"
        style={{ x: mouse.x * -18, y: mouse.y * -18 }}
      />

      <div className="container-shell relative z-10 grid gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span className="kbd-eyebrow rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="kbd-dot" />
              available for select opportunities
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-dim">
              <BadgeCheck size={13} className="text-accent-cyan" />
              {years}+ years experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 text-xl font-medium text-ink-dim sm:text-2xl"
          >
            <RotatingTitle />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg"
          >
            {personal.headline}. Based in {personal.location}, building resilient backend systems and cloud
            infrastructure for high-traffic products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId('#contact')}
              onMouseDown={createRipple}
              className="btn-gradient ripple"
            >
              <Sparkles size={16} /> Get in touch
            </button>
            <a href={personal.resumeUrl} download className="btn-outline">
              <Download size={16} /> Download resume
            </a>
            <div className="flex items-center gap-2">
              <a
                href={socialLinks[0].url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/50 hover:text-accent-indigo"
              >
                <Github size={18} />
              </a>
              <a
                href={socialLinks[1].url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/50 hover:text-accent-indigo"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Signature panel — floating status card */}
        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card relative z-10 mx-auto w-full p-0 shadow-glow"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-primary text-xs font-bold text-white">
                  SS
                </span>
                <span className="font-mono text-xs text-ink-dim">status.json</span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-accent-cyan/10 px-2.5 py-1 font-mono text-[10px] text-accent-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" /> online
              </span>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-faint">role</span>
                <span className="text-sm text-ink">{personal.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-faint">focus</span>
                <span className="text-sm text-ink">Laravel · AWS · Docker</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-faint">location</span>
                <span className="text-sm text-ink">{personal.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-5">
                <div>
                  <p className="font-display text-xl font-semibold text-ink">{years}+</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">years</p>
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-ink">{projects}+</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                    projects
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-ink">99.9%</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                    uptime
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollToId('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-dim"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-xs">scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}
