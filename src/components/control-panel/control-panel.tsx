/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import { ColumnsSelector } from 'components/control-panel/columns-selector';
import FilterTypeSelector from 'components/control-panel/filter-type-selector';
import FilteredItemsSelector from 'components/control-panel/filtered-items-selector';
import { UiSelectionsContext } from 'components/context/ui-selections-context';
import { UiSelectionsManager } from 'components/ui-selections/ui-selections-manager';
import { hiddenStyle } from 'components/columns/column-styles';

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
