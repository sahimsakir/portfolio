import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { personal, experience } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeUp, viewportOnce } from '@/animations/variants';

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="container-shell">
        <SectionHeading eyebrow="About" title="About me" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto w-full max-w-xs lg:mx-0"
          >
            <div className="glass-card overflow-hidden p-2">
              <img
                src={personal.photo}
                alt={personal.name}
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>
            {personal.isPlaceholderPhoto && (
              <p className="mt-2 text-center font-mono text-[11px] text-ink-faint">
                placeholder — replace with real headshot
              </p>
            )}

            <div className="mt-6 space-y-3 font-mono text-sm text-ink-dim">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-accent-indigo" /> {personal.location}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-accent-indigo" /> {personal.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-accent-indigo" /> {personal.phone}
              </p>
            </div>
          </motion.div>

          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-lg leading-relaxed text-ink-dim"
            >
              {personal.summary}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-12"
            >
              <p className="kbd-eyebrow mb-6"><span className="kbd-dot" />Career timeline</p>
              <div className="relative space-y-8 border-l border-white/10 pl-6">
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
                    <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-canvas bg-accent-indigo" />
                    <p className="font-mono text-xs text-ink-faint">{item.duration}</p>
                    <p className="font-display text-base font-semibold text-ink">{item.position}</p>
                    <p className="text-sm text-ink-dim">{item.company}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
