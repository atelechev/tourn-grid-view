import React from 'react';
import { Csv, emptyCsv } from './Csv';
import { loadCsv } from './load-csv';
import { FiltersManager } from './filters/FiltersManager';

export interface GridState {
  csv: Csv,
  shownColumns: Array<string>,
  loadCsv: (idCsvElement: string) => void,
  setShownColumns: (columns: Array<string>) => void,
  updateView: () => void,
  filtersManager: FiltersManager | undefined,
  setEnabledFilters: (filterNames: Array<string>) => void,
  useFilter: (filterName: string) => void
};

export const gridState: GridState = {
  csv: emptyCsv,
  shownColumns: [],
  loadCsv: (idCsvElement: string) => {
    const csv = loadCsv(idCsvElement);
    gridState.csv = csv;
    gridState.filtersManager = new FiltersManager(csv);
  },
  setShownColumns: (columns: Array<string>) => {
    gridState.shownColumns = columns ? columns : [];
  },
  updateView: () => { },
  filtersManager: undefined,
  useFilter: (filterName: string) => {
    if (gridState.filtersManager) {
      gridState.filtersManager.useFilter(filterName);
    } else {
      throw Error('Attempted to use filter before filtersManager was initialized.');
    }
  },
  setEnabledFilters: (filterNames: Array<string>) => {
    if (gridState.filtersManager) {
      gridState.filtersManager.enableFilters(filterNames);
    } else {
      throw Error('Attempted to set enabled filters before filtersManager was initialized.');
    }
  }
};


export const GridContext = React.createContext<GridState>(gridState);
