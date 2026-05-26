import { describe, expect, it } from 'vitest';
import { rot13 } from '../email';

describe('rot13', () => {
  it('encodes lowercase: "hello" → "uryyb"', () => {
    expect(rot13('hello')).toBe('uryyb');
  });

  it('decodes: "uryyb" → "hello"', () => {
    expect(rot13('uryyb')).toBe('hello');
  });

  it('preserves non-alphabetic characters', () => {
    expect(rot13('123!@# ')).toBe('123!@# ');
  });

  it('handles mixed case: "Hello" → "Uryyb"', () => {
    expect(rot13('Hello')).toBe('Uryyb');
  });

  it('handles empty string', () => {
    expect(rot13('')).toBe('');
  });

  it('handles wrapping: "xyz" → "klm"', () => {
    expect(rot13('xyz')).toBe('klm');
  });

  it('handles uppercase wrapping: "XYZ" → "KLM"', () => {
    expect(rot13('XYZ')).toBe('KLM');
  });
});
