import { UiSelectionsContext } from '../context/ui-selections-context';
import { NO_FILTER } from '../filters/no-filter';
import { getSortDirection, isSortEnabledOn } from '../ordering/sorting-utils';

describe('getSortDirection', () => {
  it('should return false if uiSelections is not interactive', () => {
    const uiSelections: UiSelectionsContext = {
      interactive: false,
      filterActive: NO_FILTER,
      filtersEnabled: [],
      order: 'desc',
      orderBy: 'pos',
      orderEnabledColumns: [],
      selectedRow: undefined,
      shownColumns: []
    };
    expect(getSortDirection('pos', uiSelections)).toBe(false);
  });

  it('should return false if the ordering is set on another column', () => {
    const uiSelections: UiSelectionsContext = {
      interactive: true,
      filterActive: NO_FILTER,
      filtersEnabled: [],
      order: 'desc',
      orderBy: 'pos',
      orderEnabledColumns: [],
      selectedRow: undefined,
      shownColumns: []
    };
    expect(getSortDirection('name', uiSelections)).toBe(false);
  });

  it('should return asc if the ordering is set to asc on the specified column', () => {
    const uiSelections: UiSelectionsContext = {
      interactive: true,
      filterActive: NO_FILTER,
      filtersEnabled: [],
      order: 'asc',
      orderBy: 'name',
      orderEnabledColumns: [],
      selectedRow: undefined,
      shownColumns: []
    };
    expect(getSortDirection('name', uiSelections)).toBe('asc');
  });

  it('should return desc if the ordering is set to desc on the specified column', () => {
    const uiSelections: UiSelectionsContext = {
      interactive: true,
      filterActive: NO_FILTER,
      filtersEnabled: [],
      order: 'desc',
      orderBy: 'fed',
      orderEnabledColumns: [],
      selectedRow: undefined,
      shownColumns: []
    };
    expect(getSortDirection('fed', uiSelections)).toBe('desc');
  });
});

describe('isSortEnabledOn', () => {
  it('should return false if uiSelections is not interactive', () => {
    const uiSelections: UiSelectionsContext = {
      interactive: false,
      filterActive: NO_FILTER,
      filtersEnabled: [],
      order: 'desc',
      orderBy: 'pos',
      orderEnabledColumns: [],
      selectedRow: undefined,
      shownColumns: []
    };
    expect(isSortEnabledOn('pos', uiSelections)).toBe(false);
  });

  it('should return false if sorting is not enabled on this column', () => {
    const uiSelections: UiSelectionsContext = {
      interactive: true,
      filterActive: NO_FILTER,
      filtersEnabled: [],
      order: 'desc',
      orderBy: 'club',
      orderEnabledColumns: ['pos', 'name'],
      selectedRow: undefined,
      shownColumns: []
    };
    expect(isSortEnabledOn('club', uiSelections)).toBe(false);
  });

  it('should return true if sorting is enabled on this column', () => {
    const uiSelections: UiSelectionsContext = {
      interactive: true,
      filterActive: NO_FILTER,
      filtersEnabled: [],
      order: 'desc',
      orderBy: 'club',
      orderEnabledColumns: ['pos', 'name', 'club'],
      selectedRow: undefined,
      shownColumns: []
    };
    expect(isSortEnabledOn('club', uiSelections)).toBe(true);
  });
});
