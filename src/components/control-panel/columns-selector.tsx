/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { buildSelectableColumns } from '../columns/selection-utils';
import { I18nContext } from '../context/i18n-context';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { DataContext } from '../context/data-context';
import { DataManager } from '../csv/data-manager';
import { UiSelectionsManager } from '../ui-selections/ui-selections-manager';

const itemStyle = css({
  textTransform: 'capitalize'
});

export class ColumnsSelector extends React.Component {
  public render(): ReactNode {
    return (
      <DataContext.Consumer>
        {(csv: DataManager) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => (
              <UiSelectionsContext.Consumer>
                {(uiSelections: UiSelectionsManager) => {
                  const selectableOptions = buildSelectableColumns(csv.header);
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
                          this.columnsSelectionChanged(evt, uiSelections)
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

  private columnsSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    uiSelections: UiSelectionsManager
  ): void {
    uiSelections.shownColumns = event.target.value as Array<string>;
  }
}
