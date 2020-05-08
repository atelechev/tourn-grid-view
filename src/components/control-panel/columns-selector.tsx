/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { buildSelectableColumns } from '../columns/selection-utils';
import { I18nContext } from '../context/i18n-context';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { DataContext } from '../context/data-context';
import { LoadedTournament } from '../csv/loaded-tournament';
import { UiSelectionsManager } from '../ui-selections/ui-selections-manager';
import { Column } from '../columns/column';

const itemStyle = css({
  textTransform: 'capitalize'
});

export class ColumnsSelector extends React.Component {
  public render(): ReactNode {
    return (
      <DataContext.Consumer>
        {(tournament: LoadedTournament) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => (
              <UiSelectionsContext.Consumer>
                {(uiSelections: UiSelectionsManager) => {
                  const allColumns = tournament.columns;
                  const selectableOptions = buildSelectableColumns(allColumns);
                  return (
                    <FormControl>
                      <InputLabel id="selector-columns-label">
                        {i18n.i18nProvider.translate(
                          'control-panel.visible-columns'
                        )}
                      </InputLabel>
                      <Select
                        css={itemStyle}
                        multiple
                        labelId="selector-columns-label"
                        id="selector-columns"
                        value={this.shownColumnsAsString(uiSelections)}
                        onChange={evt =>
                          this.columnsSelectionChanged(evt, uiSelections, allColumns)
                        }
                      >
                        {selectableOptions.map((opt, i) => (
                          <MenuItem key={i} value={opt.name} css={itemStyle}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }}
              </UiSelectionsContext.Consumer>
            )}
          </I18nContext.Consumer>
        )}
      </DataContext.Consumer>
    );
  }

  private shownColumnsAsString(uiSelections: UiSelectionsManager): Array<string> {
    return uiSelections.shownColumns.map(col => col.name);
  }

  private columnsSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    uiSelections: UiSelectionsManager,
    allColumns: Array<Column>
  ): void {
    const mappedFromStrings = (event.target.value as Array<string>)
      .map(colName => allColumns.find(column => column.name === colName))
      .filter(column => column !== undefined);
    uiSelections.shownColumns = mappedFromStrings;
  }
}
