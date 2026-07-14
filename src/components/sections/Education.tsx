import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { education } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { fadeUp, viewportOnce } from '@/animations/variants';

export function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="container-shell">
        <SectionHeading eyebrow="Background" title="Education" />

        <div className="mt-14 space-y-6">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Card className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-grad-primary text-white">
                  <GraduationCap size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-display text-lg font-semibold text-ink">{item.degree}</p>
                    <span className="font-mono text-xs text-ink-faint">{item.duration}</span>
                  </div>
                  <p className="mt-1 text-sm text-accent-indigo">{item.institution}</p>
                  <p className="mt-1 font-mono text-xs text-ink-faint">{item.location}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
