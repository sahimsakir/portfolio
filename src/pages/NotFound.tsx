import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '@/components/common/SEO';

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <SEO title="404 — Page not found" description="This page could not be found." />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="kbd-eyebrow mb-6"
      >
        error 404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display text-5xl font-semibold text-ink sm:text-6xl"
      >
        <span className="gradient-text">404</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 max-w-md text-ink-dim"
      >
        This route doesn't exist. Even 99.9% uptime has its exceptions.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
        <Link to="/" className="btn-gradient">
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
