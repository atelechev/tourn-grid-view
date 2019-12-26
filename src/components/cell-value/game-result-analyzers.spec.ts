import { getI18nProvider } from '../i18n/i18n-provider';
import { isForfeitGame, isGameColorKnown } from './game-result-analyzers';

const lang = 'en';

const i18n = {
  lang: lang,
  i18nProvider: getI18nProvider(lang)
};

describe('isForfeitGame', () => {
  it('should return false if result is undefined', () => {
    expect(isForfeitGame(undefined, i18n)).toBe(false);
  });

  it('should return false if i18n is undefined', () => {
    expect(isForfeitGame('+1W', undefined)).toBe(false);
  });

  it('should return false for a normal game result', () => {
    expect(isForfeitGame('+1W', i18n)).toBe(false);
  });

  it('should return true if result is a BYE', () => {
    expect(isForfeitGame('BYE', i18n)).toBe(true);
  });

  it('should return true if result starts with >', () => {
    expect(isForfeitGame('>10B', i18n)).toBe(true);
  });

  it('should return true if result starts with <', () => {
    expect(isForfeitGame('<1B', i18n)).toBe(true);
  });
});

describe('isGameColorKnown', () => {
  it('should return false if result is undefined', () => {
    expect(isGameColorKnown(undefined, i18n)).toBe(false);
  });

  it('should return false if i18n is undefined', () => {
    expect(isGameColorKnown('+1W', undefined)).toBe(false);
  });

  it('should return true if result contains white side token', () => {
    expect(isGameColorKnown('+1W', i18n)).toBe(true);
  });

  it('should return true if result contains black side token', () => {
    expect(isGameColorKnown('+1B', i18n)).toBe(true);
  });

  it('should return false if result does not contain any side token', () => {
    expect(isGameColorKnown('+1', i18n)).toBe(false);
  });
});
