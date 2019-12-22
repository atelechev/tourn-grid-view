import { isPointsColumn } from './points';

describe('isPointsColumn', () => {
  it('should return true for Points', () => {
    expect(isPointsColumn('Points')).toBe(true);
  });

  it('should return true for Pts', () => {
    expect(isPointsColumn('Pts')).toBe(true);
  });

  it('should return true for Points ignore case', () => {
    expect(isPointsColumn('POINTS')).toBe(true);
  });

  it('should return true for Points with leading and trailing spaces', () => {
    expect(isPointsColumn(' Points ')).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isPointsColumn(undefined)).toBe(false);
  });

  it('should return false for another value', () => {
    expect(isPointsColumn('x')).toBe(false);
  });

});