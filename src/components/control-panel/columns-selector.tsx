import React, { ReactNode } from 'react';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { GridContext, GridState } from '../grid-context';
import { buildSelectableColumns } from '../columns/column-utils';

export class ColumnsSelector extends React.Component {
  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => {
          const selectableOptions = buildSelectableColumns(ctx.csv.header);
          return (
            <FormControl>
              <InputLabel id="selector-columns-label">
                {ctx.i18nProvider.translate('control-panel.visible-columns')}
              </InputLabel>
              <Select
                multiple
                labelId="selector-columns-label"
                id="selector-columns"
                value={ctx.shownColumns}
                onChange={evt => this.columnsSelectionChanged(evt, ctx)}
              >
                {selectableOptions.map((opt, i) => (
                  <MenuItem key={i} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      </GridContext.Consumer>
    );
  }

  private columnsSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    ctx: GridState
  ): void {
    const newSelection = event.target.value as Array<string>;
    ctx.shownColumns = newSelection;
    this.setState({
      selectedColumns: newSelection
    });
    ctx.updateView();
  }
}
