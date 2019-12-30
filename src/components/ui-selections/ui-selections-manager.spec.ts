import { UiSelectionsManager } from './ui-selections-manager';
import { NO_FILTER } from '../filters/no-filter';

describe('UiSelectionsManager', () => {
  describe('constructor', () => {
    it('should instantiate the object with expected field values', () => {
      const usm = new UiSelectionsManager();
      expect(usm.interactive).toBe(true);
      expect(usm.filterActive).toEqual(NO_FILTER);
      expect(usm.filtersEnabled).toEqual([]);
      expect(usm.order).toEqual('desc');
      expect(usm.orderBy).toEqual('pos');
      expect(usm.orderEnabledColumns).toEqual([]);
      expect(usm.selectedRow).toBeUndefined();
      expect(usm.shownColumns).toEqual([]);
    });
  });

  describe('getSortDirection', () => {
    it('should return false if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.getSortDirection('pos')).toBe(false);
    });

    it('should return false if the ordering is set on another column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderBy = 'pos';
      expect(uiSelections.getSortDirection('name')).toBe(false);
    });

    it('should return asc if the ordering is set to asc on the specified column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.order = 'asc';
      uiSelections.orderBy = 'name';
      expect(uiSelections.getSortDirection('name')).toBe('asc');
    });

    it('should return desc if the ordering is set to desc on the specified column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.order = 'desc';
      uiSelections.orderBy = 'fed';
      expect(uiSelections.getSortDirection('fed')).toBe('desc');
    });
  });

  describe('isSortEnabledOn', () => {
    it('should return false if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.isSortEnabledOn('pos')).toBe(false);
    });

    it('should return false if sorting is not enabled on this column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderEnabledColumns = ['pos', 'name'];
      expect(uiSelections.isSortEnabledOn('club')).toBe(false);
    });

    it('should return true if sorting is enabled on this column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderEnabledColumns = ['pos', 'name', 'club'];
      expect(uiSelections.isSortEnabledOn('club')).toBe(true);
    });
  });

  describe('isSortActive', () => {
    it('should return false if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.isSortActive('pos')).toBe(false);
    });

    it('should return false if called with undefined', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = true;
      expect(uiSelections.isSortActive(undefined)).toBe(false);
    });

    it('should return false if called with column other than assigned in orderBy', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = true;
      expect(uiSelections.isSortActive('name')).toBe(false);
    });

    it('should return true if called with column assigned in orderBy', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = true;
      uiSelections.orderBy = 'name';
      expect(uiSelections.isSortActive('name')).toBe(true);
    });
  });

  describe('inverseSortOrder', () => {
    it('should invert the sort order from asc to desc', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.order = 'asc';
      uiSelections.inverseSortOrder();
      expect(uiSelections.order).toEqual('desc');
    });

    it('should invert the sort order from desc to asc', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.order = 'desc';
      uiSelections.inverseSortOrder();
      expect(uiSelections.order).toEqual('asc');
    });
  });

  describe('applyOrderBy', () => {
    it('should return false if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.applyOrderBy('pos')).toBe(false);
    });

    it('should return false if the column is not among enabled for sorting', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderEnabledColumns = ['pos'];
      expect(uiSelections.applyOrderBy('name')).toBe(false);
    });

    it('should return true and inverse ordering if the column is enabled for sorting', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderEnabledColumns = ['pos', 'name'];
      expect(uiSelections.orderBy).toEqual('pos');
      expect(uiSelections.order).toEqual('desc');
      expect(uiSelections.applyOrderBy('name')).toBe(true);
      expect(uiSelections.orderBy).toEqual('name');
      expect(uiSelections.order).toEqual('asc');
    });
  })
});