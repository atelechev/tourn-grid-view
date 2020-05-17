import { I18nProvider } from 'components/i18n/i18n-provider';

const notInitializedMessage =
  'The language support is not initialized properly.';

export const langUnsupported: I18nProvider = {
  hasWhiteColorMarker: (_: string): boolean => {
    throw Error(notInitializedMessage);
  },
  hasBlackColorMarker: (_: string): boolean => {
    throw Error(notInitializedMessage);
  },
  isByeMarker: (_: string): boolean => {
    throw Error(notInitializedMessage);
  },
  translate: (_: string): string => {
    throw Error(notInitializedMessage);
  }
};
