// ── Discriminated Unions ──
export type SystemType = 'desktop' | 'cloud';
export type ProjectStatus = 'completed' | 'in-development';

// ── Link Contracts ──
export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface ContactLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

// ── Contact ──
export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
  links?: ContactLinks;
}

// ── Personal Info ──
export interface PersonalInfo {
  name: string;
  nameShort: string;
  role: string;
  focus: ReadonlyArray<string>;
  bio: string;
  contact: ContactInfo;
}

// ── Project Entity ──
export interface Project {
  id: string;
  name: string;
  type: SystemType;
  status: ProjectStatus;
  links: ProjectLinks;
  stack: ReadonlyArray<string>;
  description: string;
  technicalFocus?: ReadonlyArray<string>;
  features?: ReadonlyArray<string>;
  isAiBuilt: boolean;
}

// ── Skills ──
export interface Skills {
  techs: ReadonlyArray<string>;
  habilidades: ReadonlyArray<string>;
}

// ── Root Domain Entity ──
export interface Portfolio {
  personalInfo: PersonalInfo;
  projects: ReadonlyArray<Project>;
  skills: Skills;
}
