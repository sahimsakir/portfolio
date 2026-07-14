import { cn } from '@/utils/helpers';

interface BadgeProps {
  children: string;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-ink-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/40 hover:text-ink',
        className
      )}
    >
      {children}
    </span>
  );
}
