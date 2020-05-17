import { I18nProvider } from 'components/i18n/i18n-provider';
import { translationsEn } from 'components/i18n/translations-en';

export const langSupportEn: I18nProvider = {
  hasWhiteColorMarker: (value: string): boolean => {
    return (
      !!value &&
      value
        .trim()
        .toUpperCase()
        .endsWith('W')
    );
  },
  hasBlackColorMarker: (value: string): boolean => {
    return (
      !!value &&
      value
        .trim()
        .toUpperCase()
        .endsWith('B')
    );
  },
  isByeMarker: (value: string): boolean => {
    return !!value && value.trim().toUpperCase() === 'BYE';
  },
  translate: (key: string): string => {
    return translationsEn.get(key);
  }
};
