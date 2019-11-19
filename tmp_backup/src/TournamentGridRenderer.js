import React from 'react';
import ReactDOM from 'react-dom';
import TournamentGrid from './TournamentGrid';


class TournamentGridRenderer {

  static processCsv(options) {
    ReactDOM.render(
      React.createElement(TournamentGrid, options),
      document.getElementById(options.targetElementId)
    );
  }

}

export default TournamentGridRenderer;
