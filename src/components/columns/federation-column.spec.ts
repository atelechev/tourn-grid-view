import { FederationColumn } from 'components/columns/federation-column';
import { standardNarrowColumnStyle } from 'components/columns/column-styles';

describe('FederationColumn', () => {

  const column = new FederationColumn('fed', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('federation');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "federation" arg', () => {
      expect(column.hasSemantics('federation')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "federation"', () => {
      expect(column.hasSemantics('name')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(standardNarrowColumnStyle);
    });
  });

});