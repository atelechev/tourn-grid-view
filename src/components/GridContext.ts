import React from 'react';
import { Csv, emptyCsv } from './Csv';
import { loadCsv } from './load-csv';

export interface GridState {
  csv: Csv,
  shownColumns: Array<string>,
  loadCsv: (idCsvElement: string) => void,
  setShownColumns: (columns: Array<string>) => void,
  updateView: () => void
};

export const gridState: GridState = {
  csv: emptyCsv,
  shownColumns: [],
  loadCsv: (idCsvElement: string) => {
    gridState.csv = loadCsv(idCsvElement);
  },
  setShownColumns: (columns: Array<string>) => {
    gridState.shownColumns = columns ? columns : [];
  },
  updateView: () => { }
};


export const GridContext = React.createContext<GridState>(gridState);
