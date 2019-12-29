import { isClubColumn } from './club';

describe('isClubColumn', () => {
  it('should return true if arg is exactly Club', () => {
    expect(isClubColumn('Club')).toBe(true);
  });

  it('should return true if arg is with leading and trailing spaces', () => {
    expect(isClubColumn(' Club ')).toBe(true);
  });

  it('should return true if arg is Club ignore case', () => {
    expect(isClubColumn('CLUB')).toBe(true);
  });

  it('should return false if arg is undefined', () => {
    expect(isClubColumn(undefined)).toBe(false);
  });

  it('should return false for another value', () => {
    expect(isClubColumn('x')).toBe(false);
  });
});
