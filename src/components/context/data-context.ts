import React from 'react';
import { LoadedTournament } from 'components/csv/loaded-tournament';

const defaultDataContext = new LoadedTournament();

export const DataContext = React.createContext<LoadedTournament>(defaultDataContext);
