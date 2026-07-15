import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { NAV_LINKS } from '@/constants';
import { personal } from '@/data/resume';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/context/ThemeContext';
import { scrollToId, cn } from '@/utils/helpers';

const anchorIds = NAV_LINKS.filter((l) => l.type === 'anchor').map((l) => l.href.replace('#', ''));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const activeSection = useActiveSection(anchorIds);

  // ── Sliding pill indicator ──────────────────────────────────────────────
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const isLinkActive = useCallback(
    (link: (typeof NAV_LINKS)[number]) => {
      if (link.type === 'route') return location.pathname.startsWith(link.href);
      return isHome && activeSection === link.href.replace('#', '');
    },
    [location.pathname, isHome, activeSection]
  );

  // Recalculate pill position whenever active changes or window resizes.
  // Uses requestAnimationFrame so the DOM has definitely painted first.
  const recalcPill = useCallback(() => {
    requestAnimationFrame(() => {
      const activeLink = NAV_LINKS.find((l) => isLinkActive(l));
      if (!activeLink) {
        setPill(null);
        return;
      }
      const btn = buttonRefs.current.get(activeLink.href);
      const nav = navRef.current;
      if (!btn || !nav) {
        setPill(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPill({ left: btnRect.left - navRect.left, width: btnRect.width });
    });
  }, [isLinkActive]);

  useEffect(() => {
    recalcPill();
  }, [recalcPill]);

  useEffect(() => {
    window.addEventListener('resize', recalcPill, { passive: true });
    return () => window.removeEventListener('resize', recalcPill);
  }, [recalcPill]);

  // ── Scroll state ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Cross-route scroll ─────────────────────────────────────────────────
  const pendingScrollRef = useRef<string | null>(null);

  useEffect(() => {
    if (location.pathname === '/' && pendingScrollRef.current) {
      const target = pendingScrollRef.current;
      pendingScrollRef.current = null;
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(target)));
    }
  }, [location.pathname]);

  // ── Navigation helpers ──────────────────────────────────────────────────
  const goHome = () => {
    if (isHome) {
      scrollToId('#hero');
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (link: (typeof NAV_LINKS)[number]) => {
    setMenuOpen(false);

    if (link.type === 'route') {
      navigate(link.href);
      return;
    }

    if (isHome) {
      setTimeout(() => scrollToId(link.href), 50);
    } else {
      pendingScrollRef.current = link.href;
      navigate('/');
    }
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || !isHome
          ? 'border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-canvas/80 backdrop-blur-lg shadow-sm dark:shadow-none'
          : 'bg-transparent'
      )}
    >
      <div className="container-shell flex h-16 items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2 font-mono text-sm text-ink"
          aria-label="Go to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-primary text-xs font-bold text-white">
            SS
          </span>
          <span className="hidden text-ink-dim sm:inline">~/sahim-sakir</span>
        </button>

        {/* Desktop nav */}
        <nav
          ref={navRef}
          className="relative hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 md:flex"
        >
          {/* Single always-mounted sliding pill — positioned with left/width via
              inline style so it never has a wrong initial x value */}
          {pill && (
            <motion.span
              aria-hidden
              className="absolute top-1 bottom-1 z-0 rounded-full bg-grad-primary"
              initial={false}
              animate={{ left: pill.left, width: pill.width }}
              transition={{ type: 'spring', stiffness: 400, damping: 36, mass: 0.5 }}
              style={{ position: 'absolute' }}
            />
          )}

          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link);
            return (
              <button
                key={link.href}
                type="button"
                ref={(el) => {
                  if (el) buttonRefs.current.set(link.href, el);
                  else buttonRefs.current.delete(link.href);
                }}
                onClick={() => handleNavClick(link)}
                className={cn(
                  'relative z-10 rounded-full px-4 py-2 font-mono text-xs transition-colors duration-150',
                  isActive ? 'text-white' : 'text-ink-dim hover:text-ink'
                )}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-colors hover:text-accent-indigo sm:flex"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={personal.resumeUrl}
            download
            className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-ink-dim transition-colors hover:border-accent-indigo/50 hover:text-ink sm:flex"
          >
            <Download size={14} /> resume.pdf
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-white/[0.06] bg-canvas/95 backdrop-blur-lg md:hidden"
          >
            <div className="container-shell flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link);
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className={cn(
                      'rounded-lg px-3 py-3 text-left font-mono text-sm transition-colors',
                      isActive
                        ? 'bg-white/[0.07] text-ink'
                        : 'text-ink-dim hover:bg-white/[0.04] hover:text-ink'
                    )}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="mt-2 flex items-center gap-2 px-3 pt-1">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 font-mono text-xs text-ink-dim"
                >
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />} theme
                </button>
                <a
                  href={personal.resumeUrl}
                  download
                  className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 font-mono text-xs text-ink-dim"
                >
                  <Download size={14} /> resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
