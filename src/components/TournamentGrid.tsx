/** @jsx jsx */
import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { css, jsx } from '@emotion/core';
import GridHeader from './GridHeader';
import GridData from './GridData';
import { loadCsv } from './load-csv';
import { GridContext, GridStateProperties } from './GridContext';
import { Csv } from './Csv';

const tableStyle = css({
  minWidth: 600,
});

interface GridProperties {
  idCsvElement: string,
  hiddenColumns: Array<string>
}

export default class TournamentGrid extends React.Component<GridProperties> {

  private readonly csv: Csv;

  constructor(props: GridProperties) {
    super(props);
    this.csv = loadCsv(props.idCsvElement);
  }

  public render(): ReactNode {
    const context = {
      csv: this.csv,
      hiddenColumns: this.props.hiddenColumns
    } as GridStateProperties;
    return (
      <GridContext.Provider value={context}>
        <div>
          <Paper>
            <Table css={tableStyle} size="small" aria-label="Tournament grid table">
              <GridHeader />
              <GridData />
            </Table>
          </Paper>
        </div>
      </GridContext.Provider>
    );
  }
}
