/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import GridHeader from './grid-header';
import GridData from './grid-data';
import { GridContext, GridState } from './grid-context';
import { ControlPanel } from './control-panel/control-panel';
import { buildSelectableColumns } from './columns/selection-utils';
import { GridProperties } from './grid-properties';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { getI18nProvider } from './i18n/i18n-provider';
import { loadCsv } from './csv/load-csv';
import { calculateVisibleColumns } from './columns/visibility-utils';
import { I18nContext } from './context/i18n-context';
import { UiSelectionsContext } from './context/ui-selections-context';
import { COLUMN_PLACE } from './columns/names';
import { NO_FILTER } from './filters/no-filter';
import { initializeFilters } from './filters/filters-initialization-util';

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
  private readonly _csv: GridState;

  private readonly _i18n: I18nContext;

  private readonly _uiSelections: UiSelectionsContext;

  constructor(props: GridProperties) {
    super(props);
    this._csv = this.initDataContext();
    this._i18n = this.initI18nContext();
    this._uiSelections = this.initUiSelectionsContext();
    this.state = this._uiSelections;
  }

  private initDataContext(): GridState {
    return {
      csv: loadCsv(this.props.idCsvElement)
    };
  }

  private initI18nContext(): I18nContext {
    return {
      lang: this.props.lang,
      i18nProvider: getI18nProvider(this.props.lang)
    };
  }

  private initUiSelectionsContext(): UiSelectionsContext {
    const isInteractive =
      this.props.interactive !== undefined ? this.props.interactive : true;
    const shownColumns = calculateVisibleColumns(
      buildSelectableColumns(this._csv.csv.header),
      this.props.hiddenColumns
    );
    const enabledFilters = initializeFilters(
      this.props.useFilters,
      this._csv.csv
    );
    return {
      interactive: isInteractive,
      filterActive: NO_FILTER,
      filtersEnabled: enabledFilters,
      order: 'desc',
      orderBy: COLUMN_PLACE,
      orderEnabledColumns: this.props.enableOrderingColumns,
      selectedRow: undefined,
      shownColumns: shownColumns
    };
  }

  public render(): ReactNode {
    const updateView = () => this.forceUpdate();
    return (
      <ThemeProvider theme={theme}>
        <GridContext.Provider value={this._csv}>
          <I18nContext.Provider value={this._i18n}>
            <UiSelectionsContext.Provider value={this._uiSelections}>
              <Grid container spacing={1}>
                {this._uiSelections.interactive && (
                  <Grid item xs={12}>
                    <ControlPanel forceUpdate={updateView} />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Paper>
                    <Table
                      css={tableStyle}
                      size="small"
                      aria-label="Tournament grid table"
                    >
                      <GridHeader forceUpdate={updateView} />
                      <GridData forceUpdate={updateView} />
                    </Table>
                  </Paper>
                </Grid>
              </Grid>
            </UiSelectionsContext.Provider>
          </I18nContext.Provider>
        </GridContext.Provider>
      </ThemeProvider>
    );
  }
}
