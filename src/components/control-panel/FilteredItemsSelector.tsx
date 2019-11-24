/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { GridContext, GridState } from '../GridContext';
import { FiltersManager } from '../filters/FiltersManager';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Filter } from '../filters/Filter';

const selectorStyle = css({
  minWidth: '100px'
});

export default class FilteredItemSelector extends React.Component {

  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => {
          const filterManager = (ctx.filtersManager as FiltersManager);
          const filterableItems = filterManager.activeFilter.selectableOptions;
          return (
            <FormControl>
              <InputLabel id="selector-filtered-items-label">Select only</InputLabel>
              <Select labelId="selector-filtered-items-label"
                id="selector-filtered-items"
                value={filterManager.activeFilter.selectedValue}
                onChange={(evt) => this.filteredItemsSelectionChanged(evt, ctx)}
                css={selectorStyle}
              >
                {filterableItems.map((opt, i) => (
                  <MenuItem key={i} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      </GridContext.Consumer>
    );
  }

  private filteredItemsSelectionChanged(event: React.ChangeEvent<{ value: unknown }>, ctx: GridState): void {
    const newSelection = event.target.value as any;
    const filtersManager = ctx.filtersManager as FiltersManager;
    const filter = (filtersManager.activeFilter) as Filter;
    filter.selectedValue = newSelection;
    this.setState({
      selectedFilteredItem: newSelection
    });
    ctx.updateView();
  }

}
