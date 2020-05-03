import { RankColumn } from './rank-column';
import { placeColumnStyle } from './column-styles';

describe('RankColumn', () => {

  const column = new RankColumn('Rank', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('rank');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "rank" arg', () => {
      expect(column.hasSemantics('rank')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "rank"', () => {
      expect(column.hasSemantics('name')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(placeColumnStyle);
    });
  });

});