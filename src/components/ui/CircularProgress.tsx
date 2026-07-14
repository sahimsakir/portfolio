import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ComponentType } from 'react';

interface CircularProgressProps {
  percentage: number;
  label: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({
  percentage,
  label,
  icon: Icon,
  size = 108,
  strokeWidth = 6,
}: CircularProgressProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="relative transition-transform duration-300 group-hover:scale-105">
        <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={strokeWidth}
          />
          <defs>
            <linearGradient id={`ring-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#ring-${label})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          {Icon && <Icon size={16} className="text-ink-dim" />}
          <span className="font-display text-base font-semibold text-ink">{percentage}%</span>
        </div>
      </div>
      <p className="font-mono text-xs text-ink-dim">{label}</p>
    </div>
  );
}
