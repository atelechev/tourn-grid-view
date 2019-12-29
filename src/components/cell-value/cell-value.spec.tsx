import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { CellValue } from './cell-value';
import { getI18nProvider } from '../i18n/i18n-provider';
import { I18nContext } from '../context/i18n-context';

export const getCssClassName = (json: any): string => {
  const allClasses = json.props.className.split(' ') as Array<string>;
  return allClasses.find(cssClass => cssClass.startsWith('css-'));
};

export const findCssRule = (className: string): CSSStyleDeclaration => {
  const styleSheetsCount = (document.styleSheets as StyleSheetList).length;
  const cssSelector = `.${className}`;
  for (let i = 0; i < styleSheetsCount; i++) {
    const styleSheet = (document.styleSheets as StyleSheetList)[
      i
    ] as CSSStyleSheet;
    const rulesCount = styleSheet.cssRules.length;
    for (let j = 0; j < rulesCount; j++) {
      const rule = styleSheet.cssRules[j] as CSSStyleRule;
      if (rule.selectorText === cssSelector) {
        return rule.style;
      }
    }
  }
  return undefined;
};

export const ensureElementDisplayed = (elt: any): void => {
  const cssClass = getCssClassName(elt);
  const style = findCssRule(cssClass);
  if (style) {
    expect(style['display']).toBeFalsy();
  }
};

export const ensureElementHidden = (elt: any): void => {
  const cssClass = getCssClassName(elt);
  const style = findCssRule(cssClass);
  expect(style['display']).toEqual('none');
};

export const ensureTableCellHasOneChildOfType = (
  cell: any,
  childTag: string
): void => {
  expect(cell.type).toEqual('td');
  expect(cell.children.length).toEqual(1);
  expect(cell.children[0].type).toEqual(childTag);
};

describe('CellValue', () => {
  const lang = 'en';

  const i18n = {
    lang: lang,
    i18nProvider: getI18nProvider(lang)
  };

  it('should render the federation column value if it is visible', () => {
    const props = {
      column: 'Fed',
      isVisible: true,
      cellValue: 'FRA'
    };
    const cell = renderer.create(<CellValue {...props} />).toJSON();
    ensureTableCellHasOneChildOfType(cell, 'img');
    ensureElementDisplayed(cell);
  });

  it('should not render the federation column value if it is not visible', () => {
    const props = {
      column: 'Fed',
      isVisible: false,
      cellValue: 'FRA'
    };
    const cell = renderer.create(<CellValue {...props} />).toJSON();
    ensureTableCellHasOneChildOfType(cell, 'img');
    ensureElementHidden(cell);
  });

  it('should render a simple text column value if it is visible', () => {
    const props = {
      column: 'Club',
      isVisible: true,
      cellValue: 'test1'
    };
    const cell = renderer.create(<CellValue {...props} />).toJSON();
    ensureTableCellHasOneChildOfType(cell, 'span');
    expect(cell.children[0].children[0]).toEqual('test1');
    ensureElementDisplayed(cell);
  });

  it('should not render a simple text column value if it is not visible', () => {
    const props = {
      column: 'Club',
      isVisible: false,
      cellValue: 'test2'
    };
    const cell = renderer.create(<CellValue {...props} />).toJSON();
    ensureTableCellHasOneChildOfType(cell, 'span');
    expect(cell.children[0].children[0]).toEqual('test2');
    ensureElementHidden(cell);
  });

  it('should render a game result column value if it is visible', () => {
    const props = {
      column: 'R1',
      isVisible: true,
      cellValue: '+1W'
    };
    const cell = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <CellValue {...props} />
        </I18nContext.Provider>
      )
      .toJSON();
    ensureTableCellHasOneChildOfType(cell, 'div');
    ensureElementDisplayed(cell);
  });

  it('should not render a game result column value if it is not visible', () => {
    const props = {
      column: 'R1',
      isVisible: false,
      cellValue: '+1W'
    };
    const cell = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <CellValue {...props} />
        </I18nContext.Provider>
      )
      .toJSON();
    ensureTableCellHasOneChildOfType(cell, 'div');
    ensureElementHidden(cell);
  });
});
