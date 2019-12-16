import { isTieBreakColumn } from '../../../components/columns/column-tiebreak';

describe('isTieBreakColumn', () => {
  it('should return true for all tiebreaks from TB1 to TB10', () => {
    for (let i = 1; i < 11; i++) {
      expect(isTieBreakColumn(`TB${i}`)).toBe(true);
    }
  });

  it('should return true for TBx ignore case', () => {
    expect(isTieBreakColumn('tb1')).toBe(true);
  });

  it('should return true for TBx with leading and trailing spaces', () => {
    expect(isTieBreakColumn(' tb1 ')).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isTieBreakColumn(undefined)).toBe(false);
  });

  it('should return true for Sol', () => {
    expect(isTieBreakColumn('Sol')).toBe(true);
  });

  it('should return true for Bu', () => {
    expect(isTieBreakColumn('Bu')).toBe(true);
  });

  it('should return true for Bre', () => {
    expect(isTieBreakColumn('Bre')).toBe(true);
  });
});
