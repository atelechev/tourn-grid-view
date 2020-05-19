import React from 'react';
import { I18nProvider } from 'components/i18n/i18n-provider';
import { langUnsupported } from 'components/i18n/lang-unsupported';

export interface I18nContext {
  lang: string;
  i18nProvider: I18nProvider;
}

const defaultI18n: I18nContext = {
  lang: '??',
  i18nProvider: langUnsupported
};

export const I18nContext = React.createContext<I18nContext>(defaultI18n);
