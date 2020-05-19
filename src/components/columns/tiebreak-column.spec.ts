import { standardNarrowColumnStyle } from 'components/columns/column-styles';
import { TieBreakColumn } from 'components/columns/tiebreak-column';

describe('TieBreakColumn', () => {

  const column = new TieBreakColumn('TB1', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('tiebreak');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "tiebreak" arg', () => {
      expect(column.hasSemantics('tiebreak')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "tiebreak"', () => {
      expect(column.hasSemantics('name')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(standardNarrowColumnStyle);
    });
  });

});