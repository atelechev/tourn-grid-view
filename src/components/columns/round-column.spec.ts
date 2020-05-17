import { RoundColumn } from 'components/columns/round-column';
import { roundColumnStyle } from 'components/columns/column-styles';

describe('RoundColumn', () => {

  const column = new RoundColumn('Round 1', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('round');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "round" arg', () => {
      expect(column.hasSemantics('round')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "round"', () => {
      expect(column.hasSemantics('name')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(roundColumnStyle);
    });
  });

});