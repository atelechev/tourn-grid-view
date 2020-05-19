import { placeColumnStyle } from 'components/columns/column-styles';
import { RankColumn } from 'components/columns/rank-column';

describe('RankColumn', () => {

  const column = new RankColumn('Rank', 0);

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

  describe('hidden', () => {
    it('should be false', () => {
      expect(column.hidden).toBe(false);
    });
  });

  describe('canFilterOn', () => {
    it('should be false', () => {
      expect(column.canFilterOn).toBe(false);
    });
  });

  describe('canOrderBy', () => {
    it('should be true', () => {
      expect(column.canOrderBy).toBe(true);
    });
  });

});