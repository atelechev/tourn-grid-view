import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { getI18nProvider } from '../i18n/i18n-provider';
import { I18nContext } from '../context/i18n-context';
import FilterTypeSelector from './filter-type-selector';
import { SimpleFilter } from '../filters/simple-filter';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { UiSelectionsManager } from '../ui-selections/ui-selections-manager';

describe('FilterTypeSelector', () => {
  const lang = 'en';

  const i18n = {
    lang: lang,
    i18nProvider: getI18nProvider(lang)
  };

  it('should display expected label', () => {
    const element = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <FilterTypeSelector forceUpdate={() => { }} />
        </I18nContext.Provider>
      )
      .toJSON();
    expect(element.children[0].type).toEqual('label');
    expect(element.children[0].children[0]).toEqual('Filter by');
  });

  it('should be enabled if a filter is active and has an expected selection', () => {
    const selectedFilter = new SimpleFilter('test');
    selectedFilter.selectableOptions = ['A', 'B'];
    selectedFilter.selectedValue = 'B';

    const uiSelections = new UiSelectionsManager();
    uiSelections.filterActive = selectedFilter;
    uiSelections.filtersEnabled = [selectedFilter];
    const element = renderer
      .create(
        <UiSelectionsContext.Provider value={uiSelections}>
          <I18nContext.Provider value={i18n}>
            <FilterTypeSelector forceUpdate={() => { }} />
          </I18nContext.Provider>
        </UiSelectionsContext.Provider>
      )
      .toJSON();
    expect(element).toBeTruthy();
    expect(element.type).toEqual('div');
    const input = element.children[1];
    expect(input.type).toEqual('div');
    const selectedItem = input.children[0];
    expect(selectedItem.children[0]).toEqual('test');
  });
});
