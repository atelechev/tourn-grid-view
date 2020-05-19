import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { buildColumn } from 'components/columns/column-factory';
import { ColumnsSelector } from 'components/control-panel/columns-selector';
import { DataContext } from 'components/context/data-context';
import { getI18nProvider } from 'components/i18n/i18n-provider';
import { I18nContext } from 'components/context/i18n-context';
import { LoadedTournament } from 'components/csv/loaded-tournament';
import { SimpleFilter } from 'components/filters/simple-filter';
import { UiSelectionsContext } from 'components/context/ui-selections-context';
import { UiSelectionsManager } from 'components/ui-selections/ui-selections-manager';

describe('ColumnsSelector', () => {
  const lang = 'en';

  const i18n = {
    lang: lang,
    i18nProvider: getI18nProvider(lang)
  };

  it('should display expected label', () => {
    const element = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <ColumnsSelector />
        </I18nContext.Provider>
      )
      .toJSON();
    expect(element.children[0].type).toEqual('label');
    expect(element.children[0].children[0]).toEqual('Shown columns');
  });

  it('should be enabled if source data and ui selections are set properly', () => {
    const csv: LoadedTournament = new LoadedTournament();
    csv.columns = [
      buildColumn('pos', 0),
      buildColumn('name', 1),
      buildColumn('fed', 2),
      buildColumn('club', 3),
      buildColumn('pts', 4)
    ];
    csv.data = [
      [1, 'A', 'FRA', 'aa', 2],
      [2, 'B', 'GER', 'bb', 1.5],
      [3, 'C', 'ESP', 'cc', 1]
    ];

    const selectedFilter = new SimpleFilter('test');
    selectedFilter.selectableOptions = ['A', 'B'];
    selectedFilter.selectedValue = 'B';

    const uiSelections = new UiSelectionsManager();
    uiSelections.filterActive = selectedFilter;
    uiSelections.filtersEnabled = [selectedFilter];
    uiSelections.shownColumns = [
      buildColumn('fed', 2),
      buildColumn('pts', 4)
    ];
    const element = renderer
      .create(
        <DataContext.Provider value={csv}>
          <UiSelectionsContext.Provider value={uiSelections}>
            <I18nContext.Provider value={i18n}>
              <ColumnsSelector />
            </I18nContext.Provider>
          </UiSelectionsContext.Provider>
        </DataContext.Provider>
      )
      .toJSON();
    expect(element).toBeTruthy();
    expect(element.type).toEqual('div');
    const input = element.children[1];
    expect(input.type).toEqual('div');
    const selectionSummaryText = input.children[0].children[0];
    expect(selectionSummaryText).toEqual('fed, pts');
  });
});
