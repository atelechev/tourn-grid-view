/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { I18nContext } from 'components/context/i18n-context';
import { UiSelectionsContext } from 'components/context/ui-selections-context';
import { DataContext } from 'components/context/data-context';
import { LoadedTournament } from 'components/csv/loaded-tournament';
import { UiSelectionsManager } from 'components/ui-selections/ui-selections-manager';
import { Column } from 'components/columns/column';

const itemStyle = css({
  textTransform: 'capitalize'
});

export class ColumnsSelector extends React.Component {

  private readonly _roundsGroupName = 'rounds';

  public render(): ReactNode {
    return (
      <DataContext.Consumer>
        {(tournament: LoadedTournament) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => (
              <UiSelectionsContext.Consumer>
                {(uiSelections: UiSelectionsManager) => {
                  const selectableOptions = this.buildSelectableColumns(tournament);
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
                        value={this.extractCheckedFromSelectable(selectableOptions, uiSelections.shownColumns)}
                        onChange={evt =>
                          this.columnsSelectionChanged(evt, uiSelections, tournament)
                        }
                      >
                        {selectableOptions.map((opt, i) => (
                          <MenuItem key={i} value={opt} css={itemStyle}>
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

  private buildSelectableColumns(tournament: LoadedTournament): Array<string> {
    const selectable = tournament.columns
      .filter(column => !column.hasSemantics('round')
        && !(column.hasSemantics('rank') || column.hasSemantics('name')))
      .map(column => column.name);
    if (tournament.roundColumns.length > 0) {
      selectable.push(this._roundsGroupName);
    }
    return selectable;
  }

  private extractCheckedFromSelectable(
    selectable: Array<string>,
    shownColumns: Array<Column>
  ): Array<string> {
    const shownNames = new Set<string>(shownColumns.filter(column => !column.hasSemantics('round'))
      .map(column => column.name));
    const checked = selectable.filter(colName => shownNames.has(colName));
    const roundsShown = shownColumns.find(column => column.hasSemantics('round')) !== undefined;
    if (roundsShown) {
      checked.push(this._roundsGroupName);
    }
    return checked;
  }

  private columnsSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    uiSelections: UiSelectionsManager,
    tournament: LoadedTournament
  ): void {
    const selections = (event.target.value as Array<string>);
    const mappedFromStrings = selections
      .map(colName => tournament.columns.find(column => column.name === colName))
      .filter(column => column !== undefined);
    const roundsSelected = selections.find(selected => selected === this._roundsGroupName) !== undefined;
    const mappedRounds = roundsSelected ? tournament.roundColumns : [];
    uiSelections.shownColumns = mappedFromStrings.concat(mappedRounds);
  }
}
