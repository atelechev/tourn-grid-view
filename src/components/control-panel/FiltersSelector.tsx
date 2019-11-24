import React, { ReactNode } from 'react';
import { GridContext, GridState } from '../GridContext';
import { FiltersManager } from '../filters/FiltersManager';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export default class FiltersSelector extends React.Component {

  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => {
          const filterManager = (ctx.filtersManager as FiltersManager);
          const filterNames = filterManager.availableFilters;
          return (
            <FormControl>
              <InputLabel id="selector-filters-label">Filters</InputLabel>
              <Select labelId="selector-filters-label"
                id="selector-filters"
                value={filterManager.activeFilter.name}
                onChange={(evt) => this.filtersSelectionChanged(evt, ctx)}
              >
                {filterNames.map((opt, i) => (
                  <MenuItem key={i} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      </GridContext.Consumer>
    );
  }

  private filtersSelectionChanged(event: React.ChangeEvent<{ value: unknown }>, ctx: GridState): void {
    const newSelection = event.target.value as string;
    ctx.useFilter(newSelection);
    this.setState({
      selectedFilter: newSelection
    });
    ctx.updateView();
  }

}
