import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TournamentGrid from './components/TournamentGrid';
import * as serviceWorker from './serviceWorker';
import { COLUMN_PLACE, COLUMN_RATING, COLUMN_NAME } from './components/column-utils';

const element = React.createElement(TournamentGrid, {
  idCsvElement: 'grid-raw-csv',
  hiddenColumns: [COLUMN_RATING, 'Cat', 'Ligue', 'Club'],
  useFilters: ['Cat', 'Ligue', 'Club', COLUMN_RATING],
  enableOrderingColumns: [COLUMN_PLACE, COLUMN_NAME, COLUMN_RATING, 'Pts', 'Perf', 'Club', 'Fede']
});

ReactDOM.render(element, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
