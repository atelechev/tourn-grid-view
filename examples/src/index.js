import React from 'react';
import { render } from 'react-dom';
import TournamentGrid from '../../src/TournamentGrid';

const App = () => (
  <TournamentGrid csvElementId={'grid-raw-csv'} />
);

render(<App />, document.getElementById("root"));