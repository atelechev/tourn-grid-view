import { getI18nProvider } from './i18n-provider';
import { langSupportFr } from './lang-support-fr';
import { langSupportEn } from './lang-support-en';

describe('getI18nProvider', () => {

  it('should throw expected Error if lang arg is not defined', () => {
    expect(() => getI18nProvider(undefined)).toThrow('lang must be defined');
  });

  it('should return provider for French for FR arg untrimmed case insensitive', () => {
    expect(getI18nProvider(' FR ')).toEqual(langSupportFr);
  });

  it('should return provider for English for EN arg untrimmed case insensitive', () => {
    expect(getI18nProvider(' EN ')).toEqual(langSupportEn);
  });

  it('should throw expected Error if lang is not supported', () => {
    expect(() => getI18nProvider('ru')).toThrow('Unsupported language: ru');
  });

});
