import { motion } from 'framer-motion';
import { experience } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, viewportOnce } from '@/animations/variants';

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Work experience"
          description="Four years across ad-tech, fintech-adjacent commerce and platform engineering — moving from full-stack delivery to owning system architecture."
        />

        <div className="relative mt-16 space-y-10 border-l border-white/10 pl-8 sm:pl-10">
          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative"
            >
              <span className="absolute -left-[41px] top-2 h-3.5 w-3.5 rounded-full border-2 border-canvas bg-accent-indigo sm:-left-[49px]" />

              <Card className="w-full">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                      <img src={item.logo} alt={`${item.company} logo`} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold text-ink">{item.position}</p>
                      <p className="text-sm text-accent-indigo">{item.company}</p>
                      <p className="mt-1 font-mono text-xs text-ink-faint">{item.location}</p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-ink-dim">
                    {item.duration}
                  </span>
                </div>

                <ul className="mt-5 space-y-2">
                  {item.summary.map((line) => (
                    <li key={line} className="flex gap-2 text-sm leading-relaxed text-ink-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-indigo" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                {item.isPlaceholderLogo && (
                  <p className="mt-4 font-mono text-[11px] text-ink-faint">
                    company logo is a placeholder — swap in the real mark when available
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
