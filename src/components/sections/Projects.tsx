import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';
import { projects } from '@/data/resume';
import type { ProjectItem } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, scaleIn, viewportOnce } from '@/animations/variants';

export function Projects() {
  const [active, setActive] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-28">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured projects"
          description="A selection of systems I've designed and shipped. Screenshots and links below are placeholders — swap in real project detail."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Card className="group flex h-full flex-col overflow-hidden p-0">
                <div className="relative overflow-hidden bg-surface-elevated">
                  <img
                    src={project.screenshot}
                    alt={project.title}
                    className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ maxHeight: '240px' }}
                  />
                  {project.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-grad-primary px-3 py-1 font-mono text-[11px] text-white">
                      featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-lg font-semibold text-ink">{project.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => setActive(project)}
                      className="font-mono text-xs text-accent-indigo hover:underline"
                    >
                      view details →
                    </button>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub repo">
                        <Github size={16} className="text-ink-dim hover:text-ink" />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" aria-label="Live demo">
                        <ExternalLink size={16} className="text-ink-dim hover:text-ink" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-h-[85vh] w-full max-w-2xl overflow-y-auto p-0"
            >
              <div className="relative">
                <img
                  src={active.screenshot}
                  alt={active.title}
                  className="aspect-[16/9] w-full object-cover"
                />
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-8">
                <p className="font-display text-2xl font-semibold text-ink">{active.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">{active.description}</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="kbd-eyebrow mb-2">challenge</p>
                    <p className="text-sm text-ink-dim">{active.challenges}</p>
                  </div>
                  <div>
                    <p className="kbd-eyebrow mb-2">solution</p>
                    <p className="text-sm text-ink-dim">{active.solution}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="kbd-eyebrow mb-2">architecture</p>
                  <p className="text-sm text-ink-dim">{active.architecture}</p>
                </div>

                <div className="mt-5">
                  <p className="kbd-eyebrow mb-2">key features</p>
                  <ul className="mt-2 space-y-1.5">
                    {active.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-ink-dim">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-indigo" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {active.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                {active.isPlaceholderScreenshot && (
                  <p className="mt-6 font-mono text-[11px] text-ink-faint">
                    placeholder project — replace title, description, screenshot and links
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
