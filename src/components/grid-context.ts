import React from 'react';
import { Csv, emptyCsv } from './csv/csv';

export interface GridState {
  csv: Csv;
}

export const GridContext = React.createContext<GridState>({
  csv: emptyCsv
});
