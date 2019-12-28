import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { getI18nProvider } from '../i18n/i18n-provider';
import { I18nContext } from '../context/i18n-context';
import FilteredItemSelector from './filtered-items-selector';
import { SimpleFilter } from '../filters/simple-filter';
import { UiSelectionsContext } from '../context/ui-selections-context';

describe('FilteredItemSelector', () => {
  const lang = 'en';

  const i18n = {
    lang: lang,
    i18nProvider: getI18nProvider(lang)
  };

  it('should display expected label', () => {
    const element = renderer.create(
      <I18nContext.Provider value={i18n}>
        <FilteredItemSelector forceUpdate={() => { }} />
      </I18nContext.Provider>
    ).toJSON();
    expect(element.children[0].type).toEqual('label');
    expect(element.children[0].children[0]).toEqual('Show only');
  });

  it('should be disabled if no filter type is selected', () => {
    const element = renderer.create(
      <I18nContext.Provider value={i18n}>
        <FilteredItemSelector forceUpdate={() => { }} />
      </I18nContext.Provider>
    ).toJSON();
    expect(element).toBeTruthy();
    expect(element.type).toEqual('div');
    const input = element.children[1];
    expect(input.type).toEqual('div');
    expect(input.props.className).toContain('Mui-disabled');
    const selectNone = input.children[0];
    expect(selectNone.type).toEqual('div');
    expect(selectNone.props.className).toContain('Mui-disabled');
    expect(selectNone.children[0]).toEqual('---');
  });

  it('should be enabled if a filter is active and has an expected selection', () => {
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
      shownColumns: []
    };
    const element = renderer.create(
      <UiSelectionsContext.Provider value={uiSelections}>
        <I18nContext.Provider value={i18n}>
          <FilteredItemSelector forceUpdate={() => { }} />
        </I18nContext.Provider>
      </UiSelectionsContext.Provider>
    ).toJSON();
    expect(element).toBeTruthy();
    expect(element.type).toEqual('div');
    const input = element.children[1];
    expect(input.type).toEqual('div');
    const selectedItem = input.children[0];
    expect(selectedItem.children[0]).toEqual('B');
  });

});
