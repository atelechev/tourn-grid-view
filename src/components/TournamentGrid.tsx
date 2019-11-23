/** @jsx jsx */
import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import { css, jsx } from '@emotion/core';
import GridHeader from './GridHeader';
import GridData from './GridData';
import { GridContext, GridState } from './GridContext';
import { ControlPanel } from './ControlPanel';
import { calculateVisibleColumns, buildSelectableColumns } from './column-utils';
import { gridState } from './GridContext';

const tableStyle = css({
  minWidth: 600,
});

interface GridProperties {
  idCsvElement: string,
  hiddenColumns: Array<string>
}

export default class TournamentGrid extends React.Component<GridProperties> {

  private readonly _state: GridState = gridState;

  constructor(props: GridProperties) {
    super(props);
    this._state.loadCsv(this.props.idCsvElement);
    const selectableColumns = buildSelectableColumns(this._state.csv.header);
    this._state.setShownColumns(calculateVisibleColumns(selectableColumns, this.props.hiddenColumns));
    this._state.updateView = () => this.forceUpdate();
  }

  public render(): ReactNode {
    return (
      <GridContext.Provider value={this._state}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ControlPanel />
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Table css={tableStyle} size="small" aria-label="Tournament grid table">
                <GridHeader />
                <GridData />
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </GridContext.Provider>
    );
  }
}
