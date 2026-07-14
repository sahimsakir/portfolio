import { techStack } from '@/data/resume';
import { getSkillIcon } from '@/data/skillIcons';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function TechStack() {
  const loopStack = [...techStack, ...techStack];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="container-shell">
        <SectionHeading eyebrow="Toolbox" title="Tech stack" align="center" />
      </div>

      <div className="relative mt-12 flex overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent" />
        <div className="flex animate-marquee gap-4 whitespace-nowrap">
          {loopStack.map((tech, i) => {
            const Icon = getSkillIcon(tech);
            return (
              <span
                key={`${tech}-${i}`}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 font-mono text-sm text-ink-dim"
              >
                <Icon size={15} className="text-ink-faint" />
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
