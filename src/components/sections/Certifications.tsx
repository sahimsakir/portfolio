import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { certifications } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { scaleIn, viewportOnce } from '@/animations/variants';

export function Certifications() {
  return (
    <section id="certifications" className="relative py-28">
      <div className="container-shell">
        <SectionHeading eyebrow="Certifications" title="Certifications & training" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={scaleIn}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Card className="h-full">
                <Award size={20} className="text-accent-indigo" />
                <p className="mt-3 font-display text-sm font-semibold leading-snug text-ink">{cert.title}</p>
                <p className="mt-1 text-xs text-ink-dim">{cert.issuer}</p>
                {(cert.year || cert.location) && (
                  <p className="mt-2 font-mono text-[11px] text-ink-faint">
                    {[cert.year, cert.location].filter(Boolean).join(' · ')}
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
