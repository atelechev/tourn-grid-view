/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { GridContext, GridState } from '../grid-context';
import { FiltersManager } from '../filters/filters-manager';
import { Filter } from '../filters/filter';
import { I18nContext } from '../context/i18n-context';

const selectorStyle = css({
  minWidth: '160px',
  textTransform: 'capitalize'
});

const itemStyle = css({
  textTransform: 'capitalize'
});

export default class FilteredItemSelector extends React.Component {
  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => {
              const filterManager = ctx.filtersManager as FiltersManager;
              const filterableItems =
                filterManager.activeFilter.selectableOptions;
              return (
                <FormControl>
                  <InputLabel id="selector-filtered-items-label">
                    {i18n.i18nProvider.translate('control-panel.show-only')}
                  </InputLabel>
                  <Select
                    labelId="selector-filtered-items-label"
                    id="selector-filtered-items"
                    disabled={!filterManager.isFilterSelected}
                    value={filterManager.activeFilter.selectedValue}
                    onChange={evt =>
                      this.filteredItemsSelectionChanged(evt, ctx)
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
      </GridContext.Consumer>
    );
  }

  private filteredItemsSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    ctx: GridState
  ): void {
    const newSelection = event.target.value as any;
    const filtersManager = ctx.filtersManager as FiltersManager;
    const filter = filtersManager.activeFilter as Filter;
    filter.selectedValue = newSelection;
    this.setState({
      selectedFilteredItem: newSelection
    });
    ctx.updateView();
  }
}
