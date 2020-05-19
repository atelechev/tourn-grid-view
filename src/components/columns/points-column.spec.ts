import { PointsColumn } from 'components/columns/points-column';
import { pointsColumnStyle } from 'components/columns/column-styles';

describe('PointsColumn', () => {

  const column = new PointsColumn('test', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('points');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "points" arg', () => {
      expect(column.hasSemantics('points')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "custom"', () => {
      expect(column.hasSemantics('name')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(pointsColumnStyle);
    });
  });

});