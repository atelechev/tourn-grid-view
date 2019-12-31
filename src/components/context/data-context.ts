import React from 'react';
import { DataManager } from '../csv/data-manager';

const defaultDataContext = new DataManager();

export const DataContext = React.createContext<DataManager>(defaultDataContext);
