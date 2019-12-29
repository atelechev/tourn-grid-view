import { gameResultForOutput } from './result-output-transformer';
import { getI18nProvider } from '../i18n/i18n-provider';

const lang = 'en';

const i18n = {
  lang: lang,
  i18nProvider: getI18nProvider(lang)
};

describe('gameResultForOutput', () => {
  it('should return . if i18n is undefined', () => {
    expect(gameResultForOutput('+1W', undefined)).toEqual('.');
  });

  it('should return . if result is undefined', () => {
    expect(gameResultForOutput(undefined, i18n)).toEqual('.');
  });

  it('should return . if result is empty', () => {
    expect(gameResultForOutput('', i18n)).toEqual('.');
  });

  it('should strip white side marker', () => {
    expect(gameResultForOutput('+1W', i18n)).toEqual('+1');
  });

  it('should strip black side marker', () => {
    expect(gameResultForOutput('+1B', i18n)).toEqual('+1');
  });

  it('should return the original string if there is no side marker', () => {
    expect(gameResultForOutput('>10', i18n)).toEqual('>10');
  });
});
