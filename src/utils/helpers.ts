import type { MouseEvent } from 'react';

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function scrollToId(id: string) {
  const el = document.querySelector(id) as HTMLElement | null;
  if (!el) return;
  // Use window.scrollTo with absolute offsetTop instead of scrollIntoView —
  // scrollIntoView is relative to the current viewport position and can silently
  // do nothing when called right after a route change. offsetTop is always
  // the element's absolute distance from the document top.
  const top = el.offsetTop - 72; // 72px = fixed header height
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function createRipple(event: MouseEvent<HTMLElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const circle = document.createElement('span');

  circle.style.position = 'absolute';
  circle.style.borderRadius = '9999px';
  circle.style.pointerEvents = 'none';
  circle.style.width = circle.style.height = `${size}px`;
  circle.style.left = `${event.clientX - rect.left - size / 2}px`;
  circle.style.top = `${event.clientY - rect.top - size / 2}px`;
  circle.style.background = 'rgba(255,255,255,0.35)';
  circle.style.transform = 'scale(0)';
  circle.style.opacity = '1';
  circle.style.transition = 'transform 600ms ease-out, opacity 600ms ease-out';
  circle.className = 'ripple-circle';

  target.appendChild(circle);

  requestAnimationFrame(() => {
    circle.style.transform = 'scale(1.6)';
    circle.style.opacity = '0';
  });

  setTimeout(() => circle.remove(), 650);
}