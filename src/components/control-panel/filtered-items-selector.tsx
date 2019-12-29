/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { I18nContext } from '../context/i18n-context';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { NO_FILTER } from '../filters/no-filter';
import { UpdateViewTriggerAware } from '../update-view-trigger-aware';

const selectorStyle = css({
  minWidth: '160px',
  textTransform: 'capitalize'
});

const itemStyle = css({
  textTransform: 'capitalize'
});

export default class FilteredItemSelector extends React.Component<
  UpdateViewTriggerAware
> {
  public render(): ReactNode {
    return (
      <UiSelectionsContext.Consumer>
        {(uiSelections: UiSelectionsContext) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => {
              const filterableItems =
                uiSelections.filterActive.selectableOptions;
              return (
                <FormControl>
                  <InputLabel id="selector-filtered-items-label">
                    {i18n.i18nProvider.translate('control-panel.show-only')}
                  </InputLabel>
                  <Select
                    labelId="selector-filtered-items-label"
                    id="selector-filtered-items"
                    disabled={uiSelections.filterActive === NO_FILTER}
                    value={uiSelections.filterActive.selectedValue}
                    onChange={evt =>
                      this.filteredItemsSelectionChanged(evt, uiSelections)
                    }
                    css={selectorStyle}
                  >
                    {filterableItems.map((opt, i) => (
                      <MenuItem key={i} value={opt} css={itemStyle}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
          </I18nContext.Consumer>
        )}
      </UiSelectionsContext.Consumer>
    );
  }

  private filteredItemsSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    uiSelections: UiSelectionsContext
  ): void {
    uiSelections.filterActive.selectedValue = event.target.value;
    this.props.forceUpdate();
  }
}
