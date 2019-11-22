import React from 'react';
import { Csv, emptyCsv } from './Csv';

export interface GridStateProperties {
  csv: Csv,
  hiddenColumns: Array<string>
}

export const GridContext = React.createContext<GridStateProperties>({
  csv: emptyCsv,
  hiddenColumns: []
});
