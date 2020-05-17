import { UiSelectionsManager } from 'components/ui-selections/ui-selections-manager';
import { NO_FILTER } from 'components/filters/no-filter';
import { SimpleFilter } from 'components/filters/simple-filter';
import { VALUE_NO_FILTER } from 'components/filters/filter';
import { buildColumn } from 'components/columns/column-factory';

describe('UiSelectionsManager', () => {

  const columnPos = buildColumn('pos', 0);
  const columnName = buildColumn('name', 1);
  const columnClub = buildColumn('club', 2);

  describe('constructor', () => {
    it('should instantiate the object with expected field values', () => {
      const usm = new UiSelectionsManager();
      expect(usm.interactive).toBe(true);
      expect(usm.showControlPanel).toBe(false);
      expect(usm.filterActive).toEqual(NO_FILTER);
      expect(usm.filtersEnabled).toEqual([]);
      expect(usm.order).toEqual('desc');
      expect(usm.orderBy).toBeUndefined();
      expect(usm.orderEnabledColumns).toEqual([]);
      expect(usm.selectedRow).toBeUndefined();
      expect(usm.shownColumns).toEqual([]);
    });
  });

  describe('set filterActive', () => {
    it('should set NO_FILTER if arg is undefined', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.filterActive = undefined;
      expect(uiSelections.filterActive).toEqual(NO_FILTER);
    });

    it('should set NO_FILTER if arg is not among the enabled filters', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = new SimpleFilter('fed');
      expect(uiSelections.filterActive).toEqual(NO_FILTER);
    });

    it('should set expected filter if it is among the enabled filters', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = filter;
      expect(uiSelections.filterActive).toEqual(filter);
    });
  });

  describe('set selectedRow', () => {
    it('should have no effect if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.selectedRow).toBeUndefined();

      uiSelections.selectedRow = [1, 'test', 10];
      expect(uiSelections.selectedRow).toBeUndefined();
    });

    it('should set selected row to expected value if uiSelections is interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = true;
      expect(uiSelections.selectedRow).toBeUndefined();

      const row = [1, 'test', 10];
      uiSelections.selectedRow = row;
      expect(uiSelections.selectedRow).toEqual(row);
    });
  });

  describe('set showControlPanel', () => {
    it('should have no effect if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.showControlPanel).toBe(false);

      uiSelections.showControlPanel = true;
      expect(uiSelections.showControlPanel).toBe(false);
    });

    it('should set showControlPanel to expected value if uiSelections is interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = true;
      expect(uiSelections.showControlPanel).toBe(false);

      uiSelections.showControlPanel = true;
      expect(uiSelections.showControlPanel).toBe(true);
    });
  });

  describe('getSortDirection', () => {
    it('should return false if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.getSortDirection(columnPos)).toBe(false);
    });

    it('should return false if the ordering is set on another column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderBy = columnPos;
      expect(uiSelections.getSortDirection(columnName)).toBe(false);
    });

    it('should return asc if the ordering is set to asc on the specified column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.order = 'asc';
      uiSelections.orderBy = columnName;
      expect(uiSelections.getSortDirection(columnName)).toBe('asc');
    });

    it('should return desc if the ordering is set to desc on the specified column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.order = 'desc';
      uiSelections.orderBy = columnClub;
      expect(uiSelections.getSortDirection(columnClub)).toBe('desc');
    });
  });

  describe('isSortEnabledOn', () => {
    it('should return false if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.isSortEnabledOn(columnPos)).toBe(false);
    });

    it('should return false if sorting is not enabled on this column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderEnabledColumns = [
        columnPos,
        columnName
      ];
      expect(uiSelections.isSortEnabledOn(columnClub)).toBe(false);
    });

    it('should return true if sorting is enabled on this column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderEnabledColumns = [
        columnPos,
        columnName,
        columnClub
      ];
      expect(uiSelections.isSortEnabledOn(columnClub)).toBe(true);
    });
  });

  describe('isSortActive', () => {
    it('should return false if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.isSortActive(columnPos)).toBe(false);
    });

    it('should return false if called with undefined', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = true;
      uiSelections.orderBy = columnPos;
      expect(uiSelections.isSortActive(undefined)).toBe(false);
    });

    it('should return false if called with column other than assigned in orderBy', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = true;
      expect(uiSelections.isSortActive(columnName)).toBe(false);
    });

    it('should return true if called with column assigned in orderBy', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = true;
      uiSelections.orderBy = columnName;
      expect(uiSelections.isSortActive(columnName)).toBe(true);
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
    it('should have no effect if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderBy = columnPos;
      uiSelections.interactive = false;
      expect(uiSelections.orderBy).toEqual(columnPos);

      uiSelections.applyOrderBy(columnName);
      expect(uiSelections.orderBy).toEqual(columnPos);
    });

    it('should have no effect if the column is not among enabled for sorting', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderBy = columnPos;
      uiSelections.orderEnabledColumns = [columnPos];

      uiSelections.applyOrderBy(columnName);
      expect(uiSelections.orderBy).toEqual(columnPos);
    });

    it('should inverse ordering if the column is enabled for sorting', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.orderEnabledColumns = [
        columnPos,
        columnName
      ];
      uiSelections.orderBy = columnPos;
      expect(uiSelections.orderBy).toEqual(columnPos);
      expect(uiSelections.order).toEqual('desc');

      uiSelections.applyOrderBy(columnName);
      expect(uiSelections.orderBy).toEqual(columnName);
      expect(uiSelections.order).toEqual('asc');
    });
  });

  describe('toggleRowSelection', () => {
    const row = [1, 'A', 'test'];

    it('should have no effect if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.selectedRow).toBeUndefined();
      uiSelections.toggleRowSelection(row);
      expect(uiSelections.selectedRow).toBeUndefined();
    });

    it('should set selectedRow and filterActive to expected values if row is valid', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = filter;
      expect(uiSelections.selectedRow).toBeUndefined();
      expect(uiSelections.filterActive).toEqual(filter);

      uiSelections.toggleRowSelection(row);
      expect(uiSelections.selectedRow).toEqual(row);
      expect(uiSelections.filterActive).toEqual(NO_FILTER);
    });

    it('should set selectedRow to undefined and keep filterActive if called with same row as already selected', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = filter;
      uiSelections.selectedRow = row;
      expect(uiSelections.selectedRow).toEqual(row);
      expect(uiSelections.filterActive).toEqual(filter);

      uiSelections.toggleRowSelection(row);
      expect(uiSelections.selectedRow).toBeUndefined();
      expect(uiSelections.filterActive).toEqual(filter);
    });

    it('should set selectedRow to undefined and reset filterActive if called with undefined', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = filter;
      uiSelections.selectedRow = row;
      expect(uiSelections.selectedRow).toEqual(row);
      expect(uiSelections.filterActive).toEqual(filter);

      uiSelections.toggleRowSelection(undefined);
      expect(uiSelections.selectedRow).toBeUndefined();
      expect(uiSelections.filterActive).toEqual(NO_FILTER);
    });
  });

  describe('useFilter', () => {
    it('should set NO_FILTER if filterName is undefined', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = filter;
      expect(uiSelections.filterActive).toEqual(filter);

      uiSelections.useFilter(undefined);
      expect(uiSelections.filterActive).toEqual(NO_FILTER);
    });

    it('should set NO_FILTER if filterName is not among enabled filters', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = filter;
      expect(uiSelections.filterActive).toEqual(filter);

      uiSelections.useFilter('fed');
      expect(uiSelections.filterActive).toEqual(NO_FILTER);
    });

    it('should set expected filterActive if filterName is among enabled filters', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      expect(uiSelections.filterActive).toEqual(NO_FILTER);

      uiSelections.useFilter('name');
      expect(uiSelections.filterActive).toEqual(filter);
    });
  });

  describe('filterByItem', () => {
    it('should have no effect if uiSelections is not interactive', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.interactive = false;
      expect(uiSelections.filterActive.selectedValue).toEqual(VALUE_NO_FILTER);

      uiSelections.filterByItem = 'test';
      expect(uiSelections.filterActive.selectedValue).toEqual(VALUE_NO_FILTER);
    });

    it('should set the selectedValue of the active filter', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = filter;
      expect(uiSelections.filterActive.selectedValue).toEqual(VALUE_NO_FILTER);

      uiSelections.filterByItem = 'test';
      expect(uiSelections.filterActive.selectedValue).toEqual('test');
    });

    it('should unset the previous selectedRow', () => {
      const uiSelections = new UiSelectionsManager();
      const filter = new SimpleFilter('name');
      uiSelections.filtersEnabled = [filter];
      uiSelections.filterActive = filter;
      uiSelections.selectedRow = [1, 'test', 10];
      expect(uiSelections.selectedRow).toBeDefined();

      uiSelections.filterByItem = 'test';
      expect(uiSelections.selectedRow).toBeUndefined();
    });
  });

  describe('isShown', () => {

    it('should return false for undefined arg', () => {
      const uiSelections = new UiSelectionsManager();
      expect(uiSelections.isShown(undefined)).toBe(false);
    });

    it('should always return true for ranking column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.shownColumns = [
        buildColumn('fed', 1),
        buildColumn('rating', 2),
      ]
      expect(uiSelections.isShown(buildColumn('rank', 0))).toBe(true);
    });

    it('should always return true for name column', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.shownColumns = [
        buildColumn('fed', 1),
        buildColumn('rating', 2),
      ]
      expect(uiSelections.isShown(buildColumn('name', 0))).toBe(true);
    });

    it('should return true if column is among shownColumns', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.shownColumns = [
        buildColumn('fed', 1),
        buildColumn('rating', 2),
      ]
      expect(uiSelections.isShown(buildColumn('rating', 2))).toBe(true);
    });

    it('should return false if column is not among shownColumns', () => {
      const uiSelections = new UiSelectionsManager();
      uiSelections.shownColumns = [
        buildColumn('fed', 1),
        buildColumn('rating', 2),
      ]
      expect(uiSelections.isShown(buildColumn('club', 3))).toBe(false);
    });

  });
});
