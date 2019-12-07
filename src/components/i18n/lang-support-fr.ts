import { I18nProvider } from './i18n-provider';
import { translationsFr } from './translations-fr';


export const langSupportFr: I18nProvider = {
  hasWhiteColorMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase().endsWith('B');
  },
  hasBlackColorMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase().endsWith('N');
  },
  isByeMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase() === 'EXE';
  },
  translate: (key: string): string => {
    return translationsFr.get(key);
  }
}
