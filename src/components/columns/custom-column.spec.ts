import { CustomColumn } from './custom-column';
import { standardNarrowColumnStyle } from './column-styles';

describe('CustomColumn', () => {

  const column = new CustomColumn('test', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('custom');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "custom" arg', () => {
      expect(column.hasSemantics('custom')).toBe(true);
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
      expect(column.styles).toEqual(standardNarrowColumnStyle);
    });
  });

});