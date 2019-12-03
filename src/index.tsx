import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GridProperties } from './components/grid-properties';
import TournamentGrid from './components/tournament-grid';

const renderGrid = (props: GridProperties): void => {
  const element = React.createElement(TournamentGrid, props);
  ReactDOM.render(element, document.getElementById(props.idGridContainer));
};

export { renderGrid };
