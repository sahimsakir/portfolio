import { motion } from 'framer-motion';
import { blurReveal, viewportOnce } from '@/animations/variants';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <motion.p
        variants={blurReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`kbd-eyebrow mb-4 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="kbd-dot" />
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={blurReveal}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="section-heading"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={blurReveal}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`mt-4 max-w-2xl text-ink-dim ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
