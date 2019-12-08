import React from 'react';
import { Csv, emptyCsv } from './csv/csv';
import { FiltersManager } from './filters/filters-manager';
import { COLUMN_PLACE } from './columns/column-utils';
import { I18nProvider } from './i18n/i18n-provider';
import { langUnsupported } from './i18n/lang-unsupported';

export type Order = 'asc' | 'desc';

export interface GridState {
  lang: string;
  csv: Csv;
  shownColumns: Array<string>;
  interactive: boolean;
  selectedRow: Array<any> | undefined;
  orderBy: string;
  order: Order;
  orderEnabledColumns: Array<string>;
  i18nProvider: I18nProvider;
  filtersManager: FiltersManager | undefined;
  updateView: () => void;
}

export const gridState: GridState = {
  lang: '??',
  csv: emptyCsv,
  shownColumns: [],
  interactive: true,
  selectedRow: undefined,
  orderBy: COLUMN_PLACE,
  order: 'desc',
  orderEnabledColumns: [],
  i18nProvider: langUnsupported,
  filtersManager: undefined,
  updateView: () => { }
};

export const GridContext = React.createContext<GridState>(gridState);
