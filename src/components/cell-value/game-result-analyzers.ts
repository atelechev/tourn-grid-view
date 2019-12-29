import { I18nContext } from '../context/i18n-context';

export const isForfeitGame = (result: string, i18n: I18nContext): boolean => {
  return (!!result &&
    !!i18n &&
    (i18n.i18nProvider.isByeMarker(result) ||
      result.startsWith('>') ||
      result.startsWith('<'))) as boolean;
};

export const isGameColorKnown = (
  result: string,
  i18n: I18nContext
): boolean => {
  return (!!result &&
    !!i18n &&
    (i18n.i18nProvider.hasWhiteColorMarker(result) ||
      i18n.i18nProvider.hasBlackColorMarker(result))) as boolean;
};
