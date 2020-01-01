/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import GridHeader from './grid-header';
import GridData from './grid-data';
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
import { DataContext } from './context/data-context';
import { DataManager } from './csv/data-manager';
import { UiSelectionsManager } from './ui-selections/ui-selections-manager';
import { UiEvent } from 'components/ui-selections/ui-event';
import { Observable } from 'rxjs';

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
  private readonly _csv: DataManager;

  private readonly _i18n: I18nContext;

  private readonly _uiSelections: UiSelectionsManager;

  constructor(props: GridProperties) {
    super(props);
    this._csv = loadCsv(this.props.idCsvElement);
    this._i18n = this.initI18nContext();
    this._uiSelections = this.initUiSelectionsContext();
  }

  private initI18nContext(): I18nContext {
    return {
      lang: this.props.lang,
      i18nProvider: getI18nProvider(this.props.lang)
    };
  }

  private initUiSelectionsContext(): UiSelectionsManager {
    const uiSelections = new UiSelectionsManager();
    const isInteractive =
      this.props.interactive !== undefined ? this.props.interactive : true;
    const shownColumns = calculateVisibleColumns(
      buildSelectableColumns(this._csv.header),
      this.props.hiddenColumns
    );
    const enabledFilters = initializeFilters(this.props.useFilters, this._csv);
    uiSelections.interactive = isInteractive;
    uiSelections.filterActive = NO_FILTER;
    uiSelections.filtersEnabled = enabledFilters;
    uiSelections.order = 'asc';
    uiSelections.orderBy = COLUMN_PLACE;
    uiSelections.orderEnabledColumns = this.props.enableOrderingColumns;
    uiSelections.selectedRow = undefined;
    uiSelections.shownColumns = shownColumns;
    return uiSelections;
  }

  public render(): ReactNode {
    return (
      <ThemeProvider theme={theme}>
        <DataContext.Provider value={this._csv}>
          <I18nContext.Provider value={this._i18n}>
            <UiSelectionsContext.Provider value={this._uiSelections}>
              <Grid container spacing={1}>
                {this._uiSelections.interactive && (
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
            </UiSelectionsContext.Provider>
          </I18nContext.Provider>
        </DataContext.Provider>
      </ThemeProvider>
    );
  }

  public componentDidMount(): void {
    [
      'shown-columns-change',
      'filter-type-change',
      'filter-item-change',
      'selected-row-change'
    ]
      .map((event: UiEvent) => this._uiSelections.getObservable(event))
      .forEach((observable: Observable<any>) =>
        observable.subscribe(_ => this.forceUpdate())
      );
    this._uiSelections.getObservable('sort-column-change').subscribe(_ => {
      this._csv.sort(this._uiSelections.orderBy, this._uiSelections.order);
      this.forceUpdate();
    });
  }
}
