/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { GridContext, GridState } from '../grid-context';
import { FiltersManager } from '../filters/filters-manager';
import { I18nContext } from '../context/i18n-context';

const selectorStyle = css({
  minWidth: '160px',
  textTransform: 'capitalize'
});

const itemStyle = css({
  textTransform: 'capitalize'
});

export default class FilterTypeSelector extends React.Component {
  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => {
              const filterManager = ctx.filtersManager as FiltersManager;
              const filterNames = filterManager.availableFilters;
              return (
                <FormControl>
                  <InputLabel id="selector-filters-label">
                    {i18n.i18nProvider.translate('control-panel.filter-by')}
                  </InputLabel>
                  <Select
                    labelId="selector-filters-label"
                    id="selector-filters"
                    value={filterManager.activeFilter.name}
                    onChange={evt => this.filtersSelectionChanged(evt, ctx)}
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
      </GridContext.Consumer>
    );
  }

  private filtersSelectionChanged(
    event: React.ChangeEvent<{ value: unknown }>,
    ctx: GridState
  ): void {
    const newSelection = event.target.value as string;
    ctx.filtersManager.useFilter(newSelection);
    this.setState({
      selectedFilter: newSelection
    });
    ctx.updateView();
  }
}
