import React from 'react';
import { Csv, emptyCsv } from './csv/csv';

export interface GridState {
  csv: Csv;
  updateView: () => void;
}

export const gridState: GridState = {
  csv: emptyCsv,
  updateView: () => {}
};

export const GridContext = React.createContext<GridState>(gridState);
