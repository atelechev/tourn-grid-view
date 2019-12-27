/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { I18nContext } from '../context/i18n-context';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { VALUE_NO_FILTER } from '../filters/filter';
import { NO_FILTER } from '../filters/no-filter';
import { UpdateViewTriggerAware } from '../update-view-trigger-aware';

const selectorStyle = css({
  minWidth: '160px',
  textTransform: 'capitalize'
});

const itemStyle = css({
  textTransform: 'capitalize'
});

export default class FilterTypeSelector extends React.Component<
  UpdateViewTriggerAware
> {
  public render(): ReactNode {
    return (
      <UiSelectionsContext.Consumer>
        {(uiSelections: UiSelectionsContext) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => {
              const filterNames = [NO_FILTER]
                .concat(uiSelections.filtersEnabled)
                .map(filter => filter.name);
              return (
                <FormControl>
                  <InputLabel id="selector-filters-label">
                    {i18n.i18nProvider.translate('control-panel.filter-by')}
                  </InputLabel>
                  <Select
                    labelId="selector-filters-label"
                    id="selector-filters"
                    value={uiSelections.filterActive.name}
                    onChange={evt =>
                      this.filtersSelectionChanged(evt, uiSelections)
                    }
                    css={selectorStyle}
                  >
                    {filterNames.map((opt, i) => (
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

  private filtersSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    uiSelections: UiSelectionsContext
  ): void {
    const newSelection = event.target.value as string;
    this.setActiveFilter(uiSelections, newSelection);
    this.setState({
      selectedFilter: newSelection
    });
    this.props.forceUpdate();
  }

  private setActiveFilter(
    uiSelections: UiSelectionsContext,
    filterName: string
  ): void {
    if (!filterName || filterName === VALUE_NO_FILTER) {
      uiSelections.filterActive = NO_FILTER;
      return;
    }
    const filterNameNormalized = filterName.trim().toLowerCase();
    uiSelections.filterActive =
      uiSelections.filtersEnabled.find(
        filter => filter.name === filterNameNormalized
      ) || NO_FILTER;
  }
}
