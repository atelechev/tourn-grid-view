import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CsvProcessor from './CsvProcessor';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import GridHeader from './GridHeader';
import GridData from './GridData';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 600
  },
  tablecell: {
    fontSize: 'smaller'
  },
  hidden: {
    display: 'none'
  }
}));

export default function TournamentGrid(props) {

  const classes = useStyles();

  const csvProcessor = new CsvProcessor(props.csvElementId);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label='Tournament grid table'>
          <GridHeader columnNames={csvProcessor.header}
            hideColumns={props.hideColumns}
            useStyles={classes} />
          <GridData rowData={csvProcessor.data}
            columnNames={csvProcessor.header}
            hideColumns={props.hideColumns}
            useStyles={classes} />
        </Table>
      </Paper>
    </div>
  );

}

TournamentGrid.propTypes = {
  csvElementId: PropTypes.string.isRequired,
  hideColumns: PropTypes.arrayOf(PropTypes.string).isRequired
};

TournamentGrid.defaultProps = {
  hideColumns: ['Cat', 'Ligue']
};
