import React from 'react';
import { emptyCsv, Csv } from '../csv/csv';

const defaultDataContext = emptyCsv;

export const DataContext = React.createContext<Csv>(defaultDataContext);
