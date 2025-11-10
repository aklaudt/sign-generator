import { describe, it, expect } from 'vitest';
import {
  validateHoleNumber,
  validateDistance,
  validatePar,
} from './validation';

describe('validation utils', () => {
  describe('validateHoleNumber', () => {
    it('validates correct hole numbers', () => {
      expect(validateHoleNumber(1)).toBe(true);
      expect(validateHoleNumber(18)).toBe(true);
    });

    it('rejects invalid hole numbers', () => {
      expect(validateHoleNumber(0)).toBe(false);
      expect(validateHoleNumber(37)).toBe(false);
    });
  });

  describe('validatePar', () => {
    it('validates correct par values', () => {
      expect(validatePar(3)).toBe(true);
      expect(validatePar(4)).toBe(true);
      expect(validatePar(5)).toBe(true);
    });

    it('rejects invalid par values', () => {
      expect(validatePar(2)).toBe(false);
      expect(validatePar(6)).toBe(false);
    });
  });
});
