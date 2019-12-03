/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { GridContext, GridState } from '../grid-context';
import { FiltersManager } from '../filters/filters-manager';

const selectorStyle = css({
  minWidth: '120px'
});

export default class FilterTypeSelector extends React.Component {
  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => {
          const filterManager = ctx.filtersManager as FiltersManager;
          const filterNames = filterManager.availableFilters;
          return (
            <FormControl>
              <InputLabel id="selector-filters-label">Filter by</InputLabel>
              <Select
                labelId="selector-filters-label"
                id="selector-filters"
                value={filterManager.activeFilter.name}
                onChange={evt => this.filtersSelectionChanged(evt, ctx)}
                css={selectorStyle}
              >
                {filterNames.map((opt, i) => (
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

  private filtersSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    ctx: GridState
  ): void {
    const newSelection = event.target.value as string;
    ctx.useFilter(newSelection);
    this.setState({
      selectedFilter: newSelection
    });
    ctx.updateView();
  }
}
