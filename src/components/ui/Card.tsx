import type { ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div className={cn('glass-card p-6 shadow-card', hover && 'glass-card-hover', className)}>
      {children}
    </div>
  );
}
