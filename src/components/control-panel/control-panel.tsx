/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import { ColumnsSelector } from './columns-selector';
import FilterTypeSelector from './filter-type-selector';
import FilteredItemsSelector from './filtered-items-selector';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { UiSelectionsManager } from '../ui-selections/ui-selections-manager';
import { hiddenStyle } from '../columns/column-styles';

const panelStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly'
});

export class ControlPanel extends React.Component {
  public render(): ReactNode {
    return (
      <UiSelectionsContext.Consumer>
        {(uiSelections: UiSelectionsManager) => (
          <div css={this.calculateStyles(uiSelections)}>
            <FilterTypeSelector />
            <FilteredItemsSelector />
            <ColumnsSelector />
          </div>
        )}
      </UiSelectionsContext.Consumer>
    );
  }

  private calculateStyles(
    uiSelections: UiSelectionsManager
  ): Array<SerializedStyles> {
    const styles = [panelStyle];
    if (!uiSelections.showControlPanel) {
      styles.push(hiddenStyle);
    }
    return styles;
  }
}
