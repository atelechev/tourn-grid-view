import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { UiSelectionsContext } from './context/ui-selections-context';
import { DataContext } from './context/data-context';
import GridData from './grid-data';
import { assertExpectedHtmlElement } from './grid-header.spec';
import { getI18nProvider } from './i18n/i18n-provider';
import { I18nContext } from './context/i18n-context';
import { SimpleFilter } from './filters/simple-filter';
import {
  ensureElementDisplayed,
  ensureElementHidden
} from './cell-value/cell-value.spec';
import { LoadedTournament } from './csv/loaded-tournament';
import { UiSelectionsManager } from './ui-selections/ui-selections-manager';
import { buildColumn } from './columns/column-factory';

describe('GridData', () => {
  const lang = 'en';

  const i18n = {
    lang: lang,
    i18nProvider: getI18nProvider(lang)
  };

  const buildTournament = (): LoadedTournament => {
    const csv = new LoadedTournament();
    csv.columns = [
      buildColumn('pos', 0),
      buildColumn('name', 1),
      buildColumn('r1', 2),
      buildColumn('r2', 3),
      buildColumn('r3', 4),
      buildColumn('r4', 5),
      buildColumn('r5', 6),
      buildColumn('pts', 7),
      buildColumn('club', 8)
    ];
    csv.data = [
      [1, 'E', '+7B', '+5W', '=2B', '+4W', '=3B', 4, 'aa'],
      [2, 'G', '-3B', '+8W', '=1W', '+5B', '+4W', 3.5, 'bb'],
      [3, 'C', '+2W', '-4B', '=6W', '+7B', '=1W', 3, 'aa'],
      [4, 'H', '+6B', '+3W', '+8W', '-1B', '-2B', 3, 'cc'],
      [5, 'A', '+8B', '-1B', '=7W', '-2W', '+6B', 2.5, 'bb'],
      [6, 'F', '-4W', '+7B', '=3B', '=8W', '-5W', 2, 'cc'],
      [7, 'B', '-1W', '-6W', '=5B', '-3W', '+8B', 1.5, 'aa'],
      [8, 'D', '-5W', '-2B', '-4B', '=6B', '-7W', 0.5, 'cc']
    ];
    return csv;
  }

  const assertCellValueExpected = (cell: any, expected: any): void => {
    assertExpectedHtmlElement(cell, 'td');
    expect(cell.children[0].children[0]).toEqual('' + expected);
  };

  const assertRowExpected = (
    row: any,
    expected: Array<any>,
    isVisible: boolean,
    expectedName: string
  ): void => {
    assertExpectedHtmlElement(row, 'tr');
    assertCellValueExpected(row.children[0], expected[0]);
    assertCellValueExpected(row.children[1], expected[1]);
    assertCellValueExpected(row.children[7], expected[7]);
    assertCellValueExpected(row.children[8], expected[8]);
    assertCellValueExpected(row.children[1], expectedName);
    const displayCheck = isVisible
      ? ensureElementDisplayed
      : ensureElementHidden;
    displayCheck(row);
  };

  it('should display expected grid data without filters', () => {
    const csv = buildTournament();
    const uiSelections = new UiSelectionsManager();
    uiSelections.shownColumns = [
      buildColumn('pos', 0),
      buildColumn('name', 1),
      buildColumn('pts', 7),
      buildColumn('club', 8)
    ];

    const grid = renderer
      .create(
        <DataContext.Provider value={csv}>
          <I18nContext.Provider value={i18n}>
            <UiSelectionsContext.Provider value={uiSelections}>
              <GridData />
            </UiSelectionsContext.Provider>
          </I18nContext.Provider>
        </DataContext.Provider>
      )
      .toJSON();
    assertExpectedHtmlElement(grid, 'tbody');
    expect(grid.children.length).toEqual(csv.data.length);
    assertRowExpected(grid.children[0], csv.data[0], true, 'E');
    assertRowExpected(grid.children[1], csv.data[1], true, 'G');
    assertRowExpected(grid.children[2], csv.data[2], true, 'C');
    assertRowExpected(grid.children[3], csv.data[3], true, 'H');
    assertRowExpected(grid.children[4], csv.data[4], true, 'A');
    assertRowExpected(grid.children[5], csv.data[5], true, 'F');
    assertRowExpected(grid.children[6], csv.data[6], true, 'B');
    assertRowExpected(grid.children[7], csv.data[7], true, 'D');
  });

  it('should display expected grid data filtered by club', () => {
    const csv = buildTournament();

    const filter = new SimpleFilter('club');
    filter.selectableOptions = ['aa', 'bb', 'cc'];
    filter.selectedValue = 'bb';
    filter.filteredColumnIndex = 8;

    const uiSelections = new UiSelectionsManager();
    uiSelections.filtersEnabled = [filter];
    uiSelections.filterActive = filter;
    uiSelections.shownColumns = [
      buildColumn('pos', 0),
      buildColumn('name', 1),
      buildColumn('pts', 7),
      buildColumn('club', 8)
    ];

    const grid = renderer
      .create(
        <DataContext.Provider value={csv}>
          <I18nContext.Provider value={i18n}>
            <UiSelectionsContext.Provider value={uiSelections}>
              <GridData />
            </UiSelectionsContext.Provider>
          </I18nContext.Provider>
        </DataContext.Provider>
      )
      .toJSON();
    assertExpectedHtmlElement(grid, 'tbody');
    expect(grid.children.length).toEqual(csv.data.length);
    assertRowExpected(grid.children[0], csv.data[0], false, 'E');
    assertRowExpected(grid.children[1], csv.data[1], true, 'G');
    assertRowExpected(grid.children[2], csv.data[2], false, 'C');
    assertRowExpected(grid.children[3], csv.data[3], false, 'H');
    assertRowExpected(grid.children[4], csv.data[4], true, 'A');
    assertRowExpected(grid.children[5], csv.data[5], false, 'F');
    assertRowExpected(grid.children[6], csv.data[6], false, 'B');
    assertRowExpected(grid.children[7], csv.data[7], false, 'D');
  });

  it('should display expected grid data sorted by name asc', () => {
    const csv = buildTournament();
    const colName = buildColumn('name', 1);

    const uiSelections = new UiSelectionsManager();
    uiSelections.order = 'asc';
    uiSelections.orderBy = colName;
    uiSelections.orderEnabledColumns = [colName];
    uiSelections.shownColumns = [
      buildColumn('pos', 0),
      colName,
      buildColumn('pts', 7),
      buildColumn('club', 8)
    ];

    csv.sort(colName, 'asc');

    const grid = renderer
      .create(
        <DataContext.Provider value={csv}>
          <I18nContext.Provider value={i18n}>
            <UiSelectionsContext.Provider value={uiSelections}>
              <GridData />
            </UiSelectionsContext.Provider>
          </I18nContext.Provider>
        </DataContext.Provider>
      )
      .toJSON();
    assertExpectedHtmlElement(grid, 'tbody');
    expect(grid.children.length).toEqual(csv.data.length);
    assertRowExpected(grid.children[0], csv.data[0], true, 'A');
    assertRowExpected(grid.children[1], csv.data[1], true, 'B');
    assertRowExpected(grid.children[2], csv.data[2], true, 'C');
    assertRowExpected(grid.children[3], csv.data[3], true, 'D');
    assertRowExpected(grid.children[4], csv.data[4], true, 'E');
    assertRowExpected(grid.children[5], csv.data[5], true, 'F');
    assertRowExpected(grid.children[6], csv.data[6], true, 'G');
    assertRowExpected(grid.children[7], csv.data[7], true, 'H');
  });
});
