/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import GridHeader from './grid-header';
import GridData from './grid-data';
import { GridContext, GridState, gridState } from './grid-context';
import { ControlPanel } from './control-panel/control-panel';
import {
  calculateVisibleColumns,
  buildSelectableColumns
} from './columns/column-utils';
import { GridProperties } from './grid-properties';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { getI18nProvider } from './i18n/i18n-provider';
import { loadCsv } from './csv/load-csv';
import { FiltersManager } from './filters/filters-manager';

const tableStyle = css({
  minWidth: 600
});

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Arial', 'Helvetica', 'sans-serif'].join(',')
  },
  overrides: {
    MuiTableCell: {
      sizeSmall: {
        padding: '2px'
      }
    },
    MuiSvgIcon: {
      root: {
        width: '12px',
        height: '12px',
        clear: 'both'
      }
    },
    MuiTableSortLabel: {
      active: {
        fontWeight: 'bolder'
      }
    }
  }
});

export default class TournamentGrid extends React.Component<GridProperties> {
  private readonly _state: GridState = gridState;

  constructor(props: GridProperties) {
    super(props);
    const csv = loadCsv(this.props.idCsvElement);
    this._state.csv = csv;
    this._state.interactive =
      this.props.interactive !== undefined ? this.props.interactive : true;
    this.initFiltersManager();
    const selectableColumns = buildSelectableColumns(this._state.csv.header);
    this._state.shownColumns = calculateVisibleColumns(
      selectableColumns,
      this.props.hiddenColumns
    );
    this._state.updateView = () => this.forceUpdate();
    this._state.orderEnabledColumns = this.props.enableOrderingColumns;
    this._state.lang = this.props.lang;
    this._state.i18nProvider = getI18nProvider(this.props.lang);
  }

  private initFiltersManager(): void {
    const filtersManager = new FiltersManager(this._state.csv);
    this._state.filtersManager = filtersManager;
    filtersManager.enableFilters(this.props.useFilters);
  }

  public render(): ReactNode {
    return (
      <ThemeProvider theme={theme}>
        <GridContext.Provider value={this._state}>
          <Grid container spacing={1}>
            {this._state.interactive && (
              <Grid item xs={12}>
                <ControlPanel />
              </Grid>
            )}
            <Grid item xs={12}>
              <Paper>
                <Table
                  css={tableStyle}
                  size="small"
                  aria-label="Tournament grid table"
                >
                  <GridHeader />
                  <GridData />
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </GridContext.Provider>
      </ThemeProvider>
    );
  }
}
