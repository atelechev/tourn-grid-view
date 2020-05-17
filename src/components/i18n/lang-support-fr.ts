import { I18nProvider } from 'components/i18n/i18n-provider';
import { translationsFr } from 'components/i18n/translations-fr';

export const langSupportFr: I18nProvider = {
  hasWhiteColorMarker: (value: string): boolean => {
    return (
      !!value &&
      value
        .trim()
        .toUpperCase()
        .endsWith('B')
    );
  },
  hasBlackColorMarker: (value: string): boolean => {
    return (
      !!value &&
      value
        .trim()
        .toUpperCase()
        .endsWith('N')
    );
  },
  isByeMarker: (value: string): boolean => {
    return !!value && value.trim().toUpperCase() === 'EXE';
  },
  translate: (key: string): string => {
    return translationsFr.get(key);
  }
};
