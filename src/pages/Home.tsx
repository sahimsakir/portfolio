import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '@/components/common/SEO';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Achievements } from '@/components/sections/Achievements';
import { Education } from '@/components/sections/Education';
import { Certifications } from '@/components/sections/Certifications';
import { TechStack } from '@/components/sections/TechStack';
import { Contact } from '@/components/sections/Contact';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;

    if (!target) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      window.dispatchEvent(new Event('scroll'));
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    let tries = 0;
    const scroll = () => {
      const el = document.querySelector(target) as HTMLElement | null;
      if (el && el.offsetTop > 0) {
        const top = el.offsetTop - 72;
        window.scrollTo({ top, behavior: 'smooth' });
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 650);
      } else if (++tries < 40) {
        setTimeout(scroll, 50);
      }
    };
    requestAnimationFrame(scroll);
  }, []);

  return (
    <>
      <SEO
        title="Sahim Sakir — Senior Software Engineer"
        description="Portfolio of Sahim Sakir, a Senior Software Engineer specializing in Laravel, PHP, AWS, Docker and scalable backend architecture."
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Education />
      <Certifications />
      <TechStack />
      <Contact />
    </>
  );
}
