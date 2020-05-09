import { CategoryColumn } from './category-column';
import { standardNarrowColumnStyle } from './column-styles';

describe('CategoryColumn', () => {

  const column = new CategoryColumn('cat', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('category');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "category" arg', () => {
      expect(column.hasSemantics('category')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "category"', () => {
      expect(column.hasSemantics('name')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(standardNarrowColumnStyle);
    });
  });

});