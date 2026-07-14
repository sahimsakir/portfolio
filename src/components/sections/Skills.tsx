import { motion } from 'framer-motion';
import { skills, featuredSkills } from '@/data/resume';
import { getSkillIcon } from '@/data/skillIcons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { fadeUp, scaleIn, viewportOnce } from '@/animations/variants';

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-lines bg-grid opacity-[0.15]" />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow="Skills"
          title="Technical skills"
          description="A categorized, percentage-scored breakdown of the languages, frameworks and infrastructure tools I use to ship and operate production systems."
        />

        {/* Featured skills — circular dashboard with brand logos */}
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {featuredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={scaleIn}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex justify-center"
            >
              <CircularProgress
                percentage={skill.percentage}
                label={skill.name}
                icon={getSkillIcon(skill.name)}
              />
            </motion.div>
          ))}
        </div>

        {/* Category breakdown — linear bars with logo per skill */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              custom={groupIndex}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Card className="h-full">
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-accent-indigo">
                  {group.category}
                </p>
                <div className="space-y-5">
                  {group.items.map((skill) => {
                    const Icon = getSkillIcon(skill.name);
                    return (
                      <div key={skill.name} className="group/skill">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-ink transition-colors group-hover/skill:text-accent-indigo-soft">
                            <Icon size={14} className="shrink-0 text-ink-faint transition-colors group-hover/skill:text-accent-indigo" />
                            {skill.name}
                          </span>
                          <span className="font-mono text-[11px] tabular-nums text-ink-faint">
                            {skill.percentage}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={viewportOnce}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full bg-grad-primary transition-[filter] duration-300 group-hover/skill:brightness-125"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
