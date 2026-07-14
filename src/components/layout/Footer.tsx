import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { personal, socialLinks } from '@/data/resume';
import { scrollToId } from '@/utils/helpers';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  phone: Phone,
  location: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-canvas">
      <div className="container-shell py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-ink">{personal.name}</p>
            <p className="mt-1 font-mono text-xs text-ink-dim">{personal.title} · {personal.location}</p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-colors hover:border-accent-indigo/50 hover:text-accent-indigo"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-ink-dim">
            © {year} {personal.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={personal.resumeUrl} download className="font-mono text-xs text-ink-dim hover:text-ink">
              download resume
            </a>
            <button
              onClick={() => scrollToId('#hero')}
              className="flex items-center gap-1 font-mono text-xs text-ink-dim hover:text-ink"
            >
              back to top <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
