import { isFederationColumn } from './federation';

describe('isFederationColumn', () => {
  it('should return true if arg is exactly Fed', () => {
    expect(isFederationColumn('Fed')).toBe(true);
  });

  it('should return true if arg is with leading and trailing spaces', () => {
    expect(isFederationColumn(' Fed ')).toBe(true);
  });

  it('should return true if arg is Fed ignore case', () => {
    expect(isFederationColumn('FED')).toBe(true);
  });

  it('should return false if arg is undefined', () => {
    expect(isFederationColumn(undefined)).toBe(false);
  });

  it('should return false for another value', () => {
    expect(isFederationColumn('x')).toBe(false);
  });

});
