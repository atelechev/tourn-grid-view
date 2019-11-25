import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TournamentGrid from './components/TournamentGrid';
import * as serviceWorker from './serviceWorker';

const element = React.createElement(TournamentGrid, {
  idCsvElement: 'grid-raw-csv',
  hiddenColumns: ['Rapide', 'Cat', 'Ligue', 'Club'],
  useFilters: ['Cat', 'Ligue', 'Club', 'Rating'],
});

ReactDOM.render(element, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
