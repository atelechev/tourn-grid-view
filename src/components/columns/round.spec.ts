import { isRoundColumn } from './round';

describe('isRoundColumn', () => {
  it('should return true for all rounds from R1 to R30', () => {
    for (let i = 1; i < 31; i++) {
      expect(isRoundColumn(`R${i}`)).toBe(true);
      expect(isRoundColumn(`R0${i}`)).toBe(true);
    }
  });

  it('should return true for Rx ignore case', () => {
    expect(isRoundColumn('r1')).toBe(true);
  });

  it('should return true for Rx with leading and trailing spaces', () => {
    expect(isRoundColumn(' R1 ')).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isRoundColumn(undefined)).toBe(false);
  });

});