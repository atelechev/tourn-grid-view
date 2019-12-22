import { isRatingColumn } from './rating';

describe('isRatingColumn', () => {
  it('should return true for Rating', () => {
    expect(isRatingColumn('Rating')).toBe(true);
  });

  it('should return true for Rtg', () => {
    expect(isRatingColumn('Rtg')).toBe(true);
  });

  it('should return true for Elo', () => {
    expect(isRatingColumn('Elo')).toBe(true);
  });

  it('should return true for Rating ignore case', () => {
    expect(isRatingColumn('RATING')).toBe(true);
  });

  it('should return true for Rating with leading and trailing spaces', () => {
    expect(isRatingColumn(' Rating ')).toBe(true);
  });

  it('should return true for Perf', () => {
    expect(isRatingColumn('Perf')).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isRatingColumn(undefined)).toBe(false);
  });

  it('should return false for another value', () => {
    expect(isRatingColumn('x')).toBe(false);
  });

});