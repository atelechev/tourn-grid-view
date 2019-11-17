import React from 'react';
import PropTypes from 'prop-types';
import CsvProcessor from './CsvProcessor';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import GridHeader from './GridHeader';
import GridData from './GridData';
import './index.css';

class TournamentGrid extends React.Component {

  constructor(props) {
    super(props);
    this.csvProcessor = new CsvProcessor(this.props.csvElementId);
  }

  render() {
    return (
      <Paper>
        <Table className={'tourn-grid-table'} aria-label='Tournament grid table'>
          <GridHeader columnNames={this.csvProcessor.header} />
          <GridData rowData={this.csvProcessor.data} />
        </Table>
      </Paper>
    );
  }

}

TournamentGrid.propTypes = {
  csvElementId: PropTypes.string.isRequired
};

TournamentGrid.defaultProps = {

};

export default TournamentGrid;
