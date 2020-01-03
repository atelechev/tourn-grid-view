import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { UiSelectionsContext } from './context/ui-selections-context';
import { DataContext } from './context/data-context';
import GridHeader from './grid-header';
import {
  ensureElementDisplayed,
  ensureElementHidden
} from './cell-value/cell-value.spec';
import { DataManager } from './csv/data-manager';
import { UiSelectionsManager } from './ui-selections/ui-selections-manager';
import { I18nContext } from './context/i18n-context';
import { getI18nProvider } from './i18n/i18n-provider';

export const assertExpectedHtmlElement = (
  elt: any,
  expectedTag: string
): void => {
  expect(elt).toBeTruthy();
  expect(elt.type).toEqual(expectedTag);
};

describe('GridHeader', () => {
  const csv = new DataManager();
  csv.header = ['pos', 'name', 'r1', 'r2', 'r3', 'r4', 'r5', 'pts', 'club'];
  csv.data = [
    [1, 'A', '+7B', '+5W', '=2B', '+4W', '=3B', 4, 'aa'],
    [2, 'B', '-3B', '+8W', '=1W', '+5B', '+4W', 3.5, 'bb'],
    [3, 'C', '+2W', '-4B', '=6W', '+7B', '=1W', 3, 'aa'],
    [4, 'D', '+6B', '+3W', '+8W', '-1B', '-2B', 3, 'cc'],
    [5, 'E', '+8B', '-1B', '=7W', '-2W', '+6B', 2.5, 'bb'],
    [6, 'F', '-4W', '+7B', '=3B', '=8W', '-5W', 2, 'cc'],
    [7, 'G', '-1W', '-6W', '=5B', '-3W', '+8B', 1.5, 'aa'],
    [8, 'H', '-5W', '-2B', '-4B', '=6B', '-7W', 0.5, 'cc']
  ];

  const uiSelections = new UiSelectionsManager();
  uiSelections.shownColumns = ['pos', 'name', 'pts'];

  const assertColumnExpected = (
    elt: any,
    text: string,
    isVisible: boolean
  ): void => {
    assertExpectedHtmlElement(elt, 'th');
    const span = elt.children[0];
    assertExpectedHtmlElement(span, 'span');
    expect(span.children[0]).toEqual(text);
    const displayCheck = isVisible
      ? ensureElementDisplayed
      : ensureElementHidden;
    displayCheck(elt);
  };

  const i18n: I18nContext = {
    lang: 'en',
    i18nProvider: getI18nProvider('en')
  };

  it('should render the expected header', () => {
    const header = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <DataContext.Provider value={csv}>
            <UiSelectionsContext.Provider value={uiSelections}>
              <GridHeader />
            </UiSelectionsContext.Provider>
          </DataContext.Provider>
        </I18nContext.Provider>
      )
      .toJSON();
    assertExpectedHtmlElement(header, 'thead');
    const trow = header.children[0];
    assertExpectedHtmlElement(trow, 'tr');
    expect(trow.children.length).toEqual(9);
    assertColumnExpected(trow.children[0], 'pos', true);
    assertColumnExpected(trow.children[1], 'name', true);
    assertColumnExpected(trow.children[2], 'r1', false);
    assertColumnExpected(trow.children[3], 'r2', false);
    assertColumnExpected(trow.children[4], 'r3', false);
    assertColumnExpected(trow.children[5], 'r4', false);
    assertColumnExpected(trow.children[6], 'r5', false);
    assertColumnExpected(trow.children[7], 'pts', true);
    assertColumnExpected(trow.children[8], 'club', false);
  });
});