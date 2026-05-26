import type { ComponentType } from 'react';
import { JavaIcon } from '@/components/icons/JavaIcon';
import { SqlIcon } from '@/components/icons/SqlIcon';
import { SpringIcon } from '@/components/icons/SpringIcon';
import { HibernateIcon } from '@/components/icons/HibernateIcon';
import { PostgresIcon } from '@/components/icons/PostgresIcon';
import { FlywayIcon } from '@/components/icons/FlywayIcon';
import { DockerIcon } from '@/components/icons/DockerIcon';
import { OpenCodeIcon } from '@/components/icons/OpenCodeIcon';
import { JiraIcon } from '@/components/icons/JiraIcon';
import { ConfluenceIcon } from '@/components/icons/ConfluenceIcon';
import { CsharpIcon } from '@/components/icons/CsharpIcon';
import { CssIcon } from '@/components/icons/CssIcon';
import { GitIcon } from '@/components/icons/GitIcon';
import { HtmlIcon } from '@/components/icons/HtmlIcon';
import { MavenIcon } from '@/components/icons/MavenIcon';
import { OpenApiIcon } from '@/components/icons/OpenApiIcon';
import { PostmanIcon } from '@/components/icons/PostmanIcon';
import { ReactIcon } from '@/components/icons/ReactIcon';

export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "Java": JavaIcon,
  "SQL": SqlIcon,
  "Spring": SpringIcon,
  "Hibernate": HibernateIcon,
  "PostgreSQL": PostgresIcon,
  "Flyway": FlywayIcon,
  "Docker": DockerIcon,
  "OpenCode AI Agent": OpenCodeIcon,
  "Jira": JiraIcon,
  "Confluence": ConfluenceIcon,
  "C#": CsharpIcon,
  "CSS": CssIcon,
  "Git": GitIcon,
  "HTML": HtmlIcon,
  "Maven": MavenIcon,
  "OpenAPI": OpenApiIcon,
  "Postman": PostmanIcon,
  "React": ReactIcon,
};
