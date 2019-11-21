/** @jsx jsx */
import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { css, jsx } from '@emotion/core';
import GridHeader from './GridHeader';
import GridData from './GridData';
import { loadCsv } from './load-csv';

const tableStyle = css({
  minWidth: 600,
});

export default class TournamentGrid extends React.Component {
  public render(): ReactNode {
    const csv = loadCsv('grid-raw-csv');
    const hiddenColumns: Array<string> = ['Rapide', 'Cat', 'Ligue'];
    return (
      <div>
        <Paper>
          <Table css={tableStyle} size="small" aria-label="Tournament grid table">
            <GridHeader columnNames={csv.header} hideColumns={hiddenColumns} />
            <GridData rowData={csv.data} columnNames={csv.header} hideColumns={hiddenColumns} />
          </Table>
        </Paper>
      </div>
    );
  }
}
