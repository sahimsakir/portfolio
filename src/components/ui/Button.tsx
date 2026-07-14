import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

type Variant = 'gradient' | 'outline';

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface ButtonAsLink extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a';
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'gradient', children, className } = props;
  const classes = cn(variant === 'gradient' ? 'btn-gradient' : 'btn-outline', className);

  if (props.as === 'a') {
    const { href, target, rel, onClick } = props;
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  const { onClick, type = 'button', disabled } = props;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
