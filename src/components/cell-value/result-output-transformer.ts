import { I18nContext } from '../context/i18n-context';
import { isGameColorKnown } from './game-result-analyzers';

export const gameResultForOutput = (
  result: string,
  i18n: I18nContext
): string => {
  if (i18n && result && result.length > 0) {
    if (isGameColorKnown(result, i18n)) {
      return result.substring(0, result.length - 1);
    }
    return result;
  }
  return '.';
};
