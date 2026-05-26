import { describe, expect, it } from 'vitest';
import { mapPortfolio } from '../portfolio-mapper';
import { rawUserData } from '../../../data/user-data';
// ── Helpers ──
function validProject(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 'p-test',
    name: 'Test Project',
    type: 'cloud',
    status: 'completed',
    links: { github: 'https://github.com/test/test' },
    stack: ['Node.js'],
    description: 'A test project.',
    is_ai_built: false,
    ...overrides,
  };
}

function minimalRaw(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    personal_info: {
      name: 'Test',
      role: 'Developer',
      contact: { email: 'test@test.com' },
    },
    projects: [validProject()],
    techs: [],
    skills: [],
    ...overrides,
  };
}

const basePersonalInfo = {
  name: 'Test',
  role: 'Developer',
  contact: { email: 'test@test.com' },
};

// ── Happy Path ──
describe('mapPortfolio — happy path', () => {
  it('maps the real rawUserData without throwing', () => {
    const result = mapPortfolio(rawUserData as unknown as Record<string, unknown>);
    expect(result).toBeDefined();
    expect(result.personalInfo.name).toBe('Marcos');
  });

  it('maps all projects from rawUserData', () => {
    const result = mapPortfolio(rawUserData as unknown as Record<string, unknown>);
    expect(result.projects).toHaveLength(4);
  });

  it('maps project type as "desktop"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ type: 'desktop' })] }));
    expect(result.projects[0]!.type).toBe('desktop');
  });

  it('maps project type as "cloud"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ type: 'cloud' })] }));
    expect(result.projects[0]!.type).toBe('cloud');
  });

  it('maps project status as "completed"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ status: 'completed' })] }));
    expect(result.projects[0]!.status).toBe('completed');
  });

  it('maps project status as "in-development"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ status: 'in-development' })] }));
    expect(result.projects[0]!.status).toBe('in-development');
  });

  it('maps is_ai_built: true → isAiBuilt: true', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ is_ai_built: true })] }));
    expect(result.projects[0]!.isAiBuilt).toBe(true);
  });

  it('maps is_ai_built: false → isAiBuilt: false', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ is_ai_built: false })] }));
    expect(result.projects[0]!.isAiBuilt).toBe(false);
  });

  it('maps techs and skills as flat arrays', () => {
    const raw = { techs: ['Java', 'SQL', 'React'], skills: ['QA Manual', 'Debugging'] };
    const result = mapPortfolio(minimalRaw(raw));
    expect(result.skills.techs).toEqual(['Java', 'SQL', 'React']);
    expect(result.skills.habilidades).toEqual(['QA Manual', 'Debugging']);
  });
});

// ── Validation & Coercion ──
describe('mapPortfolio — validation / coercion', () => {
  it('defaults invalid type ("mobile") to "cloud"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ type: 'mobile' })] }));
    expect(result.projects[0]!.type).toBe('cloud');
  });

  it('defaults missing type to "cloud"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ type: undefined })] }));
    expect(result.projects[0]!.type).toBe('cloud');
  });

  it('defaults invalid status ("done") to "completed"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ status: 'done' })] }));
    expect(result.projects[0]!.status).toBe('completed');
  });

  it('defaults missing status to "completed"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ status: undefined })] }));
    expect(result.projects[0]!.status).toBe('completed');
  });

  it('drops URLs without protocol', () => {
    const result = mapPortfolio(minimalRaw({
      projects: [validProject({
        links: { github: 'github.com/user', demo: 'demo.example.com' },
      })],
    }));
    expect(result.projects[0]!.links.github).toBeUndefined();
    expect(result.projects[0]!.links.demo).toBeUndefined();
  });

  it('drops empty string URLs', () => {
    const result = mapPortfolio(minimalRaw({
      projects: [validProject({ links: { github: '', demo: '' } })],
    }));
    expect(result.projects[0]!.links.github).toBeUndefined();
  });

  it('drops non-string URL values (numbers)', () => {
    const result = mapPortfolio(minimalRaw({
      personal_info: {
        ...basePersonalInfo,
        contact: { email: 'a@b.com', links: { linkedin: 123, github: true } },
      },
    }));
    expect(result.personalInfo.contact.links?.linkedin).toBeUndefined();
    expect(result.personalInfo.contact.links?.github).toBeUndefined();
  });
});

// ── Filtering (whitelist) ──
describe('mapPortfolio — link filtering', () => {
  it('contact links: only linkedin, github, portfolio are kept', () => {
    const raw = minimalRaw({
      personal_info: {
        ...basePersonalInfo,
        contact: {
          email: 'a@b.com',
          links: {
            linkedin: 'https://linkedin.com/in/test',
            github: 'https://github.com/test',
            portfolio: 'https://test.com',
            twitter: 'https://twitter.com/test',
            youtube: 'https://youtube.com/test',
          },
        },
      },
    });
    const result = mapPortfolio(raw);
    expect(result.personalInfo.contact.links?.linkedin).toBeDefined();
    expect(result.personalInfo.contact.links?.github).toBeDefined();
    expect(result.personalInfo.contact.links?.portfolio).toBeDefined();
    expect((result.personalInfo.contact.links as Record<string, unknown>).twitter).toBeUndefined();
  });

  it('project links: only github, demo are kept', () => {
    const result = mapPortfolio(minimalRaw({
      projects: [validProject({
        links: {
          github: 'https://github.com/test/test',
          demo: 'https://demo.test',
          website: 'https://test.com',
        },
      })],
    }));
    expect(result.projects[0]!.links.github).toBeDefined();
    expect(result.projects[0]!.links.demo).toBeDefined();
    expect((result.projects[0]!.links as Record<string, unknown>).website).toBeUndefined();
  });
});

// ── Fallbacks ──
describe('mapPortfolio — fallbacks', () => {
  it('missing project name → "Untitled Project"', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ name: undefined })] }));
    expect(result.projects[0]!.name).toBe('Untitled Project');
  });

  it('missing project id → auto-generated UUID', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ id: undefined })] }));
    expect(result.projects[0]!.id).toBeTypeOf('string');
    expect(result.projects[0]!.id.length).toBeGreaterThan(0);
  });

  it('missing email → "not-provided@email.com"', () => {
    const raw = minimalRaw({ personal_info: { ...basePersonalInfo, contact: {} } });
    const result = mapPortfolio(raw);
    expect(result.personalInfo.contact.email).toBe('not-provided@email.com');
  });

  it('missing projects → empty array', () => {
    const result = mapPortfolio(minimalRaw({ projects: undefined }));
    expect(result.projects).toEqual([]);
  });

  it('missing personal_info → name defaults to "Unknown"', () => {
    const raw = minimalRaw({ personal_info: undefined });
    const result = mapPortfolio(raw);
    expect(result.personalInfo.name).toBe('Unknown');
  });

  it('missing techs and skills → empty arrays', () => {
    const raw = minimalRaw({ techs: undefined, skills: undefined });
    const result = mapPortfolio(raw);
    expect(result.skills.techs).toEqual([]);
    expect(result.skills.habilidades).toEqual([]);
  });

  it('phone omitted when empty string', () => {
    const raw = minimalRaw({
      personal_info: {
        ...basePersonalInfo,
        contact: { email: 'a@b.com', phone: '' },
      },
    });
    const result = mapPortfolio(raw);
    expect(result.personalInfo.contact.phone).toBeUndefined();
  });

  it('location omitted when empty string', () => {
    const raw = minimalRaw({
      personal_info: {
        ...basePersonalInfo,
        contact: { email: 'a@b.com', location: '' },
      },
    });
    const result = mapPortfolio(raw);
    expect(result.personalInfo.contact.location).toBeUndefined();
  });
});

// ── snake_case → camelCase ──
describe('mapPortfolio — snake_case to camelCase', () => {
  it('technical_focus maps to technicalFocus', () => {
    const result = mapPortfolio(minimalRaw({
      projects: [validProject({ technical_focus: ['REST API', 'Testing'] })],
    }));
    expect(result.projects[0]!.technicalFocus).toEqual(['REST API', 'Testing']);
  });

  it('features maps to features', () => {
    const result = mapPortfolio(minimalRaw({
      projects: [validProject({ features: ['Auth', 'Pagination'] })],
    }));
    expect(result.projects[0]!.features).toEqual(['Auth', 'Pagination']);
  });

  it('skills maps to habilidades', () => {
    const raw = minimalRaw({ skills: ['ChatGPT'] });
    const result = mapPortfolio(raw);
    expect(result.skills.habilidades).toEqual(['ChatGPT']);
  });

  it('is_ai_built maps to isAiBuilt', () => {
    const result = mapPortfolio(minimalRaw({ projects: [validProject({ is_ai_built: true })] }));
    expect(result.projects[0]!.isAiBuilt).toBe(true);
  });
});
