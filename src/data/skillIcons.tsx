import type { ComponentType } from 'react';
import {
  SiLaravel,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiTerraform,
  SiNginx,
  SiApache,
  SiGit,
  SiCentos,
  SiUbuntu,
  SiBootstrap,
  SiFastapi,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { Cloud, Workflow, Brain, Network, Users, Repeat, FileCode, Palette } from 'lucide-react';

type IconComponent = ComponentType<{ size?: number; className?: string }>;

// Maps a skill's display name (as used in src/data/resume.ts) to a brand icon.
// Falls back to a neutral lucide icon for skills without an official logo
// (soft skills, catch-all cloud/devops concepts, etc), and for HTML/CSS since
// simple-icons dropped the generic SiHtml5/SiCss3 marks.
export const skillIconMap: Record<string, IconComponent> = {
  PHP: SiPhp,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Laravel: SiLaravel,
  FastAPI: SiFastapi,
  Bootstrap: SiBootstrap,
  HTML: FileCode,
  CSS: Palette,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  AWS: FaAws,
  'AWS CDK': FaAws,
  Docker: SiDocker,
  'CI/CD': Workflow,
  Terraform: SiTerraform,
  Nginx: SiNginx,
  Apache: SiApache,
  Git: SiGit,
  CentOS: SiCentos,
  Ubuntu: SiUbuntu,
  'Problem Solving': Brain,
  'System Architecture': Network,
  'Team Collaboration': Users,
  'Agile Delivery': Repeat,
};

export function getSkillIcon(name: string): IconComponent {
  return skillIconMap[name] ?? Cloud;
}
