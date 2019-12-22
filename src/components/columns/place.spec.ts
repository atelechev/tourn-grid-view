import { isPlaceColumn } from './place';

describe('isPlaceColumn', () => {
  it('should return true for Pos', () => {
    expect(isPlaceColumn('Pos')).toBe(true);
  });

  it('should return true for Pos ignore case', () => {
    expect(isPlaceColumn('pos')).toBe(true);
  });

  it('should return true for Pos with leading and trailing spaces', () => {
    expect(isPlaceColumn(' Pos ')).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isPlaceColumn(undefined)).toBe(false);
  });

  it('should return false for another value', () => {
    expect(isPlaceColumn('x')).toBe(false);
  });

});