import { isCategoryColumn } from './category';

describe('isCategoryColumn', () => {
  it('should return true if arg is exactly Cat', () => {
    expect(isCategoryColumn('Cat')).toBe(true);
  });

  it('should return true if arg is with leading and trailing spaces', () => {
    expect(isCategoryColumn(' Cat ')).toBe(true);
  });

  it('should return true if arg is Cat ignore case', () => {
    expect(isCategoryColumn('CAT')).toBe(true);
  });

  it('should return false if arg is undefined', () => {
    expect(isCategoryColumn(undefined)).toBe(false);
  });

  it('should return false for another value', () => {
    expect(isCategoryColumn('x')).toBe(false);
  });
});
