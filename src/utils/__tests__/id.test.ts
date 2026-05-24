import { describe, expect, it } from 'vitest';
import { generateId } from '../id';

describe('generateId', () => {
  it('returns a string', () => {
    expect(typeof generateId()).toBe('string');
  });

  it('returns a valid UUID format', () => {
    const uuid = generateId();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('successive calls return different values', () => {
    const a = generateId();
    const b = generateId();
    expect(a).not.toBe(b);
  });
});
