/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import GridHeader from './grid-header';
import GridData from './grid-data';
import { ControlPanel } from './control-panel/control-panel';
import { InitialConfig } from './initial-config';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { getI18nProvider } from './i18n/i18n-provider';
import { loadCsv } from './csv/load-csv';
import { I18nContext } from './context/i18n-context';
import { UiSelectionsContext } from './context/ui-selections-context';
import { DataContext } from './context/data-context';
import { LoadedTournament } from './csv/loaded-tournament';
import { UiSelectionsManager } from './ui-selections/ui-selections-manager';
import { UiEvent } from './ui-selections/ui-event';
import { Observable } from 'rxjs';
import { initUiSelectionsContext } from './ui-selections/context-initializer';

const tableStyle = css({
  minWidth: 600
});

const baseFontSize = '12px';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Arial', 'Helvetica', 'sans-serif'].join(',')
  },
  overrides: {
    MuiTable: {
      root: {
        fontSize: baseFontSize
      }
    },
    MuiTableCell: {
      head: {
        fontSize: baseFontSize
      },
      sizeSmall: {
        padding: '2px'
      }
    },
    MuiSvgIcon: {
      root: {
        width: baseFontSize,
        height: baseFontSize,
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

export default class TournamentGrid extends React.Component<InitialConfig> {
  private readonly _csv: LoadedTournament;

  private readonly _i18n: I18nContext;

  private readonly _uiSelections: UiSelectionsManager;

  constructor(config: InitialConfig) {
    super(config);
    this._csv = loadCsv(this.props.idCsvElement);
    this._i18n = this.initI18nContext();
    this._uiSelections = initUiSelectionsContext(config, this._csv);
  }

  private initI18nContext(): I18nContext {
    return {
      lang: this.props.lang,
      i18nProvider: getI18nProvider(this.props.lang)
    };
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
      'selected-row-change',
      'control-panel-toggle'
    ]
      .map((event: UiEvent) => this._uiSelections
        .eventsHandler
        .getObservable(event))
      .forEach((observable: Observable<any>) =>
        observable.subscribe(_ => this.forceUpdate())
      );
    this._uiSelections
      .eventsHandler
      .getObservable('sort-column-change').subscribe(_ => {
        this._csv.sort(this._uiSelections.orderBy, this._uiSelections.order);
        this.forceUpdate();
      });
  }
}
