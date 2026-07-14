import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { achievements } from '@/data/resume';
import { fadeUp, viewportOnce } from '@/animations/variants';

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-ink sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section className="relative py-24">
      <div className="container-shell">
        <div className="glass-card grid grid-cols-2 gap-8 p-8 sm:p-12 lg:grid-cols-4">
          {achievements.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-dim">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-ink-faint">
          figures are estimates derived from the résumé timeline — replace with verified numbers
        </p>
      </div>
    </section>
  );
}
