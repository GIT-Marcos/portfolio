import { generateId } from '../../utils/id';

import type {
  Portfolio,
  PersonalInfo,
  Project,
  Skills,
  ContactInfo,
  ContactLinks,
  ProjectLinks,
  SystemType,
  ProjectStatus,
} from '../entities/portfolio';

// ── URL Validation ──
function isValidUrl(value: unknown): value is string {
  if (typeof value !== 'string' || value.length === 0) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// ── Safe String ──
function safeString(value: unknown, fallback: string = ''): string {
  return typeof value === 'string' ? value : fallback;
}

// ── Safe String Array ──
function safeStringArray(value: unknown): ReadonlyArray<string> {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

// ── System Type Guard ──
function isSystemType(value: unknown): value is SystemType {
  return value === 'desktop' || value === 'cloud';
}

// ── Project Status Guard ──
function isProjectStatus(value: unknown): value is ProjectStatus {
  return value === 'completed' || value === 'in-development';
}

// ── Map Contact Links ──
function mapContactLinks(raw: Record<string, unknown> | undefined): ContactLinks | undefined {
  if (!raw || typeof raw !== 'object') return undefined;

  const mapped: ContactLinks = {};
  if (isValidUrl(raw.linkedin)) mapped.linkedin = raw.linkedin;
  if (isValidUrl(raw.github)) mapped.github = raw.github;
  if (isValidUrl(raw.portfolio)) mapped.portfolio = raw.portfolio;

  return Object.keys(mapped).length > 0 ? mapped : undefined;
}

// ── Map Project Links ──
function mapProjectLinks(raw: Record<string, unknown> | undefined): ProjectLinks {
  if (!raw || typeof raw !== 'object') return {};

  const mapped: ProjectLinks = {};
  if (isValidUrl(raw.github)) mapped.github = raw.github;
  if (isValidUrl(raw.demo)) mapped.demo = raw.demo;

  return mapped;
}

// ── Map Contact Info ──
function mapContactInfo(raw: Record<string, unknown>): ContactInfo {
  const contact: ContactInfo = {
    email: safeString(raw.email, 'not-provided@email.com'),
  };

  const phone = safeString(raw.phone);
  if (phone.length > 0) contact.phone = phone;

  const location = safeString(raw.location);
  if (location.length > 0) contact.location = location;

  const availability = safeString(raw.availability);
  if (availability.length > 0) contact.availability = availability;

  const links = mapContactLinks(raw.links as Record<string, unknown> | undefined);
  if (links) contact.links = links;

  return contact;
}

// ── Map Personal Info ──
function mapPersonalInfo(raw: Record<string, unknown>): PersonalInfo {
  const contactRaw = (raw.contact ?? {}) as Record<string, unknown>;

  return {
    name: safeString(raw.name, 'Unknown'),
    role: safeString(raw.role, 'Developer'),
    focus: safeStringArray(raw.focus),
    bio: safeString(raw.bio),
    contact: mapContactInfo(contactRaw),
  };
}

// ── Map Single Project ──
function mapProject(raw: Record<string, unknown>): Project {
  return {
    id: safeString(raw.id, generateId()),
    name: safeString(raw.name, 'Untitled Project'),
    type: isSystemType(raw.type) ? raw.type : 'cloud',
    status: isProjectStatus(raw.status) ? raw.status : 'completed',
    links: mapProjectLinks(raw.links as Record<string, unknown> | undefined),
    stack: safeStringArray(raw.stack),
    description: safeString(raw.description),
    technicalFocus: safeStringArray(raw.technical_focus),
    features: safeStringArray(raw.features),
    isAiBuilt: raw.is_ai_built === true,
  };
}

// ── Map Skills ──
function mapSkills(raw: Record<string, unknown>): Skills {
  return {
    core: safeStringArray(raw.core),
    aiTools: safeStringArray(raw.ai_tools),
    testing: safeStringArray(raw.testing),
  };
}

// ── Root Mapper ──
export function mapPortfolio(raw: Record<string, unknown>): Portfolio {
  const personalInfoRaw = (raw.personal_info ?? {}) as Record<string, unknown>;
  const projectsRaw = Array.isArray(raw.projects) ? raw.projects : [];
  const skillsRaw = (raw.skills ?? {}) as Record<string, unknown>;

  return {
    personalInfo: mapPersonalInfo(personalInfoRaw),
    projects: projectsRaw.map((p) => mapProject(p as Record<string, unknown>)),
    skills: mapSkills(skillsRaw),
  };
}
