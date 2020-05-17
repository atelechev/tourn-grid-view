import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { getI18nProvider } from 'components/i18n/i18n-provider';
import { GameResultValue } from 'components/cell-value/game-result-value';
import { I18nContext } from 'components/context/i18n-context';
import { getCssClassName, findCssRule } from 'components/cell-value/cell-value.spec';

describe('GameResultValue', () => {
  const lang = 'en';

  const i18n = {
    lang: lang,
    i18nProvider: getI18nProvider(lang)
  };

  const ensureElementIsOfType = (elt: any, tag: string): void => {
    expect(elt.type).toEqual(tag);
  };

  const ensureElementTextContentIs = (elt: any, text: string): void => {
    expect(elt.children[0]).toEqual(text);
  };

  const collectCssRulesFor = (element: any): CSSStyleDeclaration => {
    const cssClass = getCssClassName(element);
    return findCssRule(cssClass);
  };

  it('should render an undefined result as expected', () => {
    const props = {
      rawResult: undefined
    };
    const element = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <GameResultValue {...props} />
        </I18nContext.Provider>
      )
      .toJSON();
    ensureElementIsOfType(element, 'div');
    ensureElementTextContentIs(element, '.');
    const style = collectCssRulesFor(element);
    expect(style['align-items']).toEqual('center');
  });

  it('should render an empty result as expected', () => {
    const props = {
      rawResult: '  '
    };
    const element = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <GameResultValue {...props} />
        </I18nContext.Provider>
      )
      .toJSON();
    ensureElementIsOfType(element, 'div');
    ensureElementTextContentIs(element, '.');
    const style = collectCssRulesFor(element);
    expect(style['align-items']).toEqual('center');
  });

  it('should render a forfeit result as expected', () => {
    const props = {
      rawResult: '>10'
    };
    const element = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <GameResultValue {...props} />
        </I18nContext.Provider>
      )
      .toJSON();
    ensureElementIsOfType(element, 'div');
    ensureElementTextContentIs(element, '>10');
    const style = collectCssRulesFor(element);
    expect(style['align-items']).toEqual('center');
    expect(style['background-color']).toEqual('#f5deb3');
    expect(style['border']).toEqual('1px solid #e0e0e0');
  });

  it('should render a game result with white as expected', () => {
    const props = {
      rawResult: '+10W'
    };
    const element = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <GameResultValue {...props} />
        </I18nContext.Provider>
      )
      .toJSON();
    ensureElementIsOfType(element, 'div');
    ensureElementTextContentIs(element, '+10');
    const style = collectCssRulesFor(element);
    expect(style['align-items']).toEqual('center');
    expect(style['background-color']).toEqual('#ffffff');
    expect(style['border']).toEqual('1px solid #e0e0e0');
  });

  it('should render a game result with black as expected', () => {
    const props = {
      rawResult: '-10B'
    };
    const element = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <GameResultValue {...props} />
        </I18nContext.Provider>
      )
      .toJSON();
    ensureElementIsOfType(element, 'div');
    ensureElementTextContentIs(element, '-10');
    const style = collectCssRulesFor(element);
    expect(style['align-items']).toEqual('center');
    expect(style['background-color']).toEqual('#e0e0e0');
    expect(style['border']).toEqual('1px solid #e0e0e0');
  });

  it('should render a game result without color marker as expected', () => {
    const props = {
      rawResult: '-10'
    };
    const element = renderer
      .create(
        <I18nContext.Provider value={i18n}>
          <GameResultValue {...props} />
        </I18nContext.Provider>
      )
      .toJSON();
    ensureElementIsOfType(element, 'div');
    ensureElementTextContentIs(element, '-10');
    const style = collectCssRulesFor(element);
    expect(style['align-items']).toEqual('center');
    expect(style['background-color']).toBeUndefined();
    expect(style['border']).toEqual('1px solid #e0e0e0');
  });
});
