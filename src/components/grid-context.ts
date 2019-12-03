import React from 'react';
import { Csv, emptyCsv } from './csv';
import { loadCsv } from './load-csv';
import { FiltersManager } from './filters/filters-manager';
import { VALUE_NO_FILTER } from './filters/filter';
import { compareOptionalValues } from './ordering-util';
import { COLUMN_PLACE } from './column-utils';

export type Order = 'asc' | 'desc';

export interface GridState {
  csv: Csv;
  shownColumns: Array<string>;
  loadCsv: (idCsvElement: string) => void;
  setShownColumns: (columns: Array<string>) => void;
  updateView: () => void;
  filtersManager: FiltersManager | undefined;
  setEnabledFilters: (filterNames: Array<string>) => void;
  useFilter: (filterName: string) => void;
  selectedRow: Array<any> | undefined;
  selectRow: (row: Array<any>) => void;
  orderBy: string;
  order: Order;
  orderEnabledColumns: Array<string>;
  executeSort: (column: string) => void;
}

export const gridState: GridState = {
  csv: emptyCsv,
  shownColumns: [],
  loadCsv: (idCsvElement: string) => {
    const csv = loadCsv(idCsvElement);
    gridState.csv = csv;
    gridState.filtersManager = new FiltersManager(csv);
  },
  setShownColumns: (columns: Array<string>) => {
    gridState.shownColumns = columns || [];
  },
  updateView: () => {},
  filtersManager: undefined,
  useFilter: (filterName: string) => {
    if (gridState.filtersManager) {
      gridState.filtersManager.useFilter(filterName);
    } else {
      throw Error(
        'Attempted to use filter before filtersManager was initialized.'
      );
    }
  },
  setEnabledFilters: (filterNames: Array<string>) => {
    if (gridState.filtersManager) {
      gridState.filtersManager.enableFilters(filterNames);
    } else {
      throw Error(
        'Attempted to set enabled filters before filtersManager was initialized.'
      );
    }
  },
  selectedRow: undefined,
  selectRow: (row: Array<any>) => {
    if (row === gridState.selectedRow) {
      gridState.selectedRow = undefined;
    } else {
      gridState.selectedRow = row;
      if (gridState.filtersManager) {
        gridState.filtersManager.useFilter(VALUE_NO_FILTER);
      } else {
        throw Error(
          'Attempted to use filter before filtersManager was initialized.'
        );
      }
    }
    gridState.updateView();
  },
  orderBy: COLUMN_PLACE,
  order: 'desc',
  orderEnabledColumns: [],
  executeSort: (column: string) => {
    const indexSortColumn = gridState.orderEnabledColumns.findIndex(
      headerColumn => headerColumn === column
    );
    if (indexSortColumn < 0) {
      return;
    }
    gridState.order = gridState.order === 'desc' ? 'asc' : 'desc';
    gridState.orderBy = column;
    gridState.csv.data.sort((row1, row2) => {
      const compare = compareOptionalValues(
        row1[indexSortColumn],
        row2[indexSortColumn]
      );
      return gridState.order === 'desc' ? compare : -compare;
    });
    gridState.updateView();
  }
};

export const GridContext = React.createContext<GridState>(gridState);
