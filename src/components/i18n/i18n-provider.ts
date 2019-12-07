import { langSupportEn } from './lang-support-en';
import { langSupportFr } from './lang-support-fr';

export interface I18nProvider {
  hasWhiteColorMarker(value: string): boolean;
  hasBlackColorMarker(value: string): boolean;
  isByeMarker(value: string): boolean;
  translate(key: string): string;
}

export const getI18nProvider = (lang: string): I18nProvider => {
  if (!lang) {
    throw Error('lang must be defined');
  }
  switch (lang.trim().toLowerCase()) {
    case 'fr': return langSupportFr;
    case 'en': return langSupportEn;
    default: throw Error(`Unsupported language: ${lang}`);
  }
}
