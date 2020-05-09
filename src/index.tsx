import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { InitialConfig } from './components/initial-config';
import TournamentGrid from './components/tournament-grid';

const renderGrid = (config: InitialConfig): void => {
  const element = React.createElement(TournamentGrid, config);
  ReactDOM.render(element, document.getElementById(config.idGridContainer));
};

export { renderGrid };
