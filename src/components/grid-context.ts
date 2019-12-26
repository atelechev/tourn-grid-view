import React from 'react';
import { Csv, emptyCsv } from './csv/csv';
import { FiltersManager } from './filters/filters-manager';
import { COLUMN_PLACE } from './columns/names';

export type Order = 'asc' | 'desc';

export interface GridState {
  csv: Csv;
  shownColumns: Array<string>;
  interactive: boolean;
  selectedRow: Array<any> | undefined;
  orderBy: string;
  order: Order;
  orderEnabledColumns: Array<string>;
  filtersManager: FiltersManager | undefined;
  updateView: () => void;
}

export const gridState: GridState = {
  csv: emptyCsv,
  shownColumns: [],
  interactive: true,
  selectedRow: undefined,
  orderBy: COLUMN_PLACE,
  order: 'desc',
  orderEnabledColumns: [],
  filtersManager: undefined,
  updateView: () => {}
};

export const GridContext = React.createContext<GridState>(gridState);
