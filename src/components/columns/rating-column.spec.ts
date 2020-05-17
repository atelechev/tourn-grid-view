import { RatingColumn } from 'components/columns/rating-column';
import { standardNarrowColumnStyle } from 'components/columns/column-styles';

describe('RatingColumn', () => {

  const column = new RatingColumn('Rating', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('rating');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "rating" arg', () => {
      expect(column.hasSemantics('rating')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "rating"', () => {
      expect(column.hasSemantics('name')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(standardNarrowColumnStyle);
    });
  });

});