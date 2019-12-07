import { I18nProvider } from './i18n-provider';
import { translationsEn } from './translations-en';

export const langSupportEn: I18nProvider = {
  hasWhiteColorMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase().endsWith('W');
  },
  hasBlackColorMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase().endsWith('B');
  },
  isByeMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase() === 'BYE';
  },
  translate: (key: string): string => {
    return translationsEn.get(key);
  }
}