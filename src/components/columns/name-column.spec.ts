import { NameColumn } from 'components/columns/name-column';
import { nameColumnStyle } from 'components/columns/column-styles';

describe('NameColumn', () => {

  const column = new NameColumn('name', 0, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('name');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "name" arg', () => {
      expect(column.hasSemantics('name')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "name"', () => {
      expect(column.hasSemantics('custom')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(nameColumnStyle);
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

});