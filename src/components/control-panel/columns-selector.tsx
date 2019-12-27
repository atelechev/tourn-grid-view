/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { GridContext, GridState } from '../grid-context';
import { buildSelectableColumns } from '../columns/selection-utils';
import { I18nContext } from '../context/i18n-context';
import { UiSelectionsContext } from '../context/ui-selections-context';

const itemStyle = css({
  textTransform: 'capitalize'
});

export class ColumnsSelector extends React.Component {
  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => (
              <UiSelectionsContext.Consumer>
                {(uiSelections: UiSelectionsContext) => {
                  const selectableOptions = buildSelectableColumns(
                    ctx.csv.header
                  );
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
                        value={uiSelections.shownColumns}
                        onChange={evt =>
                          this.columnsSelectionChanged(evt, uiSelections, ctx)
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
      </GridContext.Consumer>
    );
  }

  private columnsSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    uiSelections: UiSelectionsContext,
    ctx: GridState
  ): void {
    const newSelection = event.target.value as Array<string>;
    uiSelections.shownColumns = newSelection;
    this.setState({
      selectedColumns: newSelection
    });
    ctx.updateView();
  }
}
