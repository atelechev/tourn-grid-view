import React from 'react';
import PropTypes from 'prop-types';
import CsvProcessor from './CsvProcessor';


class TournamentGrid extends React.Component {

  constructor(props) {
    super(props);
    this.csvProcessor = new CsvProcessor(this.props.csvElementId);
  }

  render() {
    return (
      <p>TODO grid</p>
    );
  }

}

TournamentGrid.propTypes = {
  csvElementId: PropTypes.string.isRequired
};

TournamentGrid.defaultProps = {

};

export default TournamentGrid;
