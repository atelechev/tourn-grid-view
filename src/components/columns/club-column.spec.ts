import { ClubColumn } from 'components/columns/club-column';
import { clubColumnStyle } from 'components/columns/column-styles';

describe('ClubColumn', () => {

  const column = new ClubColumn('club', 0, false, false, false);

  describe('semantics', () => {
    it('should have expected value', () => {
      expect(column.semantics).toEqual('club');
    });
  });

  describe('hasSemantics', () => {

    it('should return true for "club" arg', () => {
      expect(column.hasSemantics('club')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(column.hasSemantics(undefined)).toBe(false);
    });

    it('should return false for value other than "club"', () => {
      expect(column.hasSemantics('name')).toBe(false);
    });

  });

  describe('styles', () => {
    it('should return expected value', () => {
      expect(column.styles).toEqual(clubColumnStyle);
    });
  });

});