import React from 'react';
import { Csv } from '../csv/csv';

export interface DataContext extends Csv {}

const defaultDataContext: DataContext = {
  header: [],
  data: []
};

export const DataContext = React.createContext<DataContext>(defaultDataContext);
