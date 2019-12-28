import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { getI18nProvider } from '../i18n/i18n-provider';
import { I18nContext } from '../context/i18n-context';
import { ColumnsSelector } from './columns-selector';
import { SimpleFilter } from '../filters/simple-filter';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { Csv } from '../csv/csv';
import { DataContext } from '../context/data-context';

describe('ColumnsSelector', () => {
  const lang = 'en';

  const i18n = {
    lang: lang,
    i18nProvider: getI18nProvider(lang)
  };

  it('should display expected label', () => {
    const element = renderer.create(
      <I18nContext.Provider value={i18n}>
        <ColumnsSelector forceUpdate={() => { }} />
      </I18nContext.Provider>
    ).toJSON();
    expect(element.children[0].type).toEqual('label');
    expect(element.children[0].children[0]).toEqual('Shown columns');
  });

  it('should be enabled if source data and ui selections are set properly', () => {
    const csv: Csv = {
      header: ['pos', 'name', 'fed', 'club', 'pts'],
      data: [
        [1, 'A', 'FRA', 'aa', 2],
        [2, 'B', 'GER', 'bb', 1.5],
        [3, 'C', 'ESP', 'cc', 1]
      ]
    };
    const selectedFilter = new SimpleFilter('test');
    selectedFilter.selectableOptions = ['A', 'B'];
    selectedFilter.selectedValue = 'B';
    const uiSelections: UiSelectionsContext = {
      interactive: true,
      filterActive: selectedFilter,
      filtersEnabled: [selectedFilter],
      order: 'desc',
      orderBy: 'pos',
      orderEnabledColumns: [],
      selectedRow: undefined,
      shownColumns: ['fed', 'pts']
    };
    const element = renderer.create(
      <DataContext.Provider value={csv}>
        <UiSelectionsContext.Provider value={uiSelections}>
          <I18nContext.Provider value={i18n}>
            <ColumnsSelector forceUpdate={() => { }} />
          </I18nContext.Provider>
        </UiSelectionsContext.Provider>
      </DataContext.Provider>
    ).toJSON();
    expect(element).toBeTruthy();
    expect(element.type).toEqual('div');
    const input = element.children[1];
    expect(input.type).toEqual('div');
    const selectionSummaryText = input.children[0].children[0];
    expect(selectionSummaryText).toEqual('fed, pts');
  });

});
