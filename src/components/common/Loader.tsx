import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, GitCommit, Package, Code2, TestTube2, Rocket } from 'lucide-react';

interface LoaderProps {
  isLoading: boolean;
}

const steps = [
  { label: 'git commit -m "ship it"', icon: GitCommit, duration: 420 },
  { label: 'npm install', icon: Package, duration: 480 },
  { label: 'compiling typescript...', icon: Code2, duration: 460 },
  { label: 'running tests...', icon: TestTube2, duration: 420 },
  { label: 'deploying application...', icon: Rocket, duration: 460 },
];

export function Loader({ isLoading }: LoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    let cancelled = false;
    let elapsed = 0;

    const timers = steps.map((step, i) => {
      elapsed += step.duration;
      return setTimeout(() => {
        if (cancelled) return;
        setStepIndex(i + 1);
        if (i === steps.length - 1) {
          setTimeout(() => !cancelled && setDone(true), 200);
        }
      }, elapsed);
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isLoading]);

  const progress = Math.min(100, Math.round((stepIndex / steps.length) * 100));

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-grid opacity-[0.12]" />

          <div className="relative w-[300px] sm:w-[360px]">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-2 font-mono text-[11px] text-ink-faint">build.sh</span>
            </div>

            <div className="space-y-2.5 font-mono text-[13px]">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isComplete = stepIndex > i;
                const isActive = stepIndex === i;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: isComplete || isActive ? 1 : 0.25, x: 0 }}
                    className="flex items-center gap-2.5"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        isComplete ? 'bg-accent-cyan/20 text-accent-cyan' : 'text-ink-faint'
                      }`}
                    >
                      {isComplete ? <Check size={11} /> : <Icon size={11} />}
                    </span>
                    <span className={isComplete ? 'text-ink-dim line-through decoration-ink-faint/40' : 'text-ink-dim'}>
                      {step.label}
                    </span>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: done ? 1 : 0 }}
                className="flex items-center gap-2.5 pt-1 text-accent-cyan"
              >
                <Check size={13} />
                <span>build successful ✓</span>
              </motion.div>
            </div>

            <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="h-full bg-grad-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-2 text-right font-mono text-[11px] text-ink-faint">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
