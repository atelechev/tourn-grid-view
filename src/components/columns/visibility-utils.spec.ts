import {
  COLUMN_PLACE,
  COLUMN_NAME,
  COLUMN_POINTS,
  COLUMN_ROUNDS,
  COLUMN_CATEGORY,
  COLUMN_CLUB,
  COLUMN_FEDERATION,
  COLUMN_RATING
} from './names';
import {
  isAlwaysVisibleColumn,
  isRowVisible
} from './visibility-utils';
import { SimpleFilter } from '../filters/simple-filter';
import { UiSelectionsManager } from '../ui-selections/ui-selections-manager';

describe('isAlwaysVisibleColumn', () => {
  it('should return true for Pos', () => {
    expect(isAlwaysVisibleColumn(COLUMN_PLACE)).toBe(true);
  });

  it('should return true for Name', () => {
    expect(isAlwaysVisibleColumn(COLUMN_NAME)).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isAlwaysVisibleColumn(undefined)).toBe(false);
  });

  it('should return false for Cat', () => {
    expect(isAlwaysVisibleColumn(COLUMN_CATEGORY)).toBe(false);
  });

  it('should return false for Club', () => {
    expect(isAlwaysVisibleColumn(COLUMN_CLUB)).toBe(false);
  });

  it('should return false for Fed', () => {
    expect(isAlwaysVisibleColumn(COLUMN_FEDERATION)).toBe(false);
  });

  it('should return false for Pts', () => {
    expect(isAlwaysVisibleColumn(COLUMN_POINTS)).toBe(false);
  });

  it('should return false for Rating', () => {
    expect(isAlwaysVisibleColumn(COLUMN_RATING)).toBe(false);
  });

  it('should return false for Rounds', () => {
    expect(isAlwaysVisibleColumn(COLUMN_ROUNDS)).toBe(false);
  });
});

describe('isRowVisible', () => {
  const filter = new SimpleFilter('club');
  filter.filteredColumnIndex = 8;
  filter.selectableOptions = ['aa', 'bb'];

  it('should return false if there is no selectedRow and the row is not accepted by the filter in uiSelections', () => {
    filter.selectedValue = 'bb';

    const uiSelections = new UiSelectionsManager();
    uiSelections.filtersEnabled = [filter];
    uiSelections.filterActive = filter;

    const row = [1, 'A', '+7B', '+5W', '=2B', '+4W', '=3B', 4, 'aa'];
    const opponentsOfSelected = new Set([7, 5, 2, 4, 3]);
    expect(isRowVisible(row, uiSelections, 0, opponentsOfSelected)).toBe(false);
  });

  it('should return true if there is no selectedRow and the row is accepted by the filter in uiSelections', () => {
    filter.selectedValue = 'aa';

    const uiSelections = new UiSelectionsManager();
    uiSelections.filtersEnabled = [filter];
    uiSelections.filterActive = filter;

    const row = [1, 'A', '+7B', '+5W', '=2B', '+4W', '=3B', 4, 'aa'];
    const opponentsOfSelected = new Set([7, 5, 2, 4, 3]);
    expect(isRowVisible(row, uiSelections, 0, opponentsOfSelected)).toBe(true);
  });

  it('should return true if selectedRow is set and row is the same as selectedRow', () => {
    const selectedRow = [1, 'A', '+7B', '+5W', '=2B', '+4W', '=3B', 4, 'aa'];
    const opponentsOfSelected = new Set([7, 5, 2, 4, 3]);

    const uiSelections = new UiSelectionsManager();
    uiSelections.selectedRow = selectedRow;

    expect(
      isRowVisible(selectedRow, uiSelections, 0, opponentsOfSelected)
    ).toBe(true);
  });

  it('should return true if selectedRow is set and checked row is among the opponents of selectedRow', () => {
    const selectedRow = [1, 'A', '+7B', '+5W', '=2B', '+4W', '=3B', 4, 'aa'];
    const checkedRow = [2, 'B', '-3B', '+8W', '=1W', '+5B', '+4W', 3.5, 'bb'];
    const opponentsOfSelected = new Set([7, 5, 2, 4, 3]);

    const uiSelections = new UiSelectionsManager();
    uiSelections.selectedRow = selectedRow;

    expect(isRowVisible(checkedRow, uiSelections, 0, opponentsOfSelected)).toBe(
      true
    );
  });

  it('should return false if selectedRow is set and checked row is not among the opponents of selectedRow', () => {
    const selectedRow = [1, 'A', '+7B', '+5W', '=2B', '+4W', '=3B', 4, 'aa'];
    const checkedRow = [6, 'F', '-4W', '+7B', '=3B', '=8W', '-5W', 2, 'cc'];
    const opponentsOfSelected = new Set([7, 5, 2, 4, 3]);

    const uiSelections = new UiSelectionsManager();
    uiSelections.selectedRow = selectedRow;

    expect(isRowVisible(checkedRow, uiSelections, 0, opponentsOfSelected)).toBe(
      false
    );
  });
});
