/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import FilteredItemsSelector from 'components/control-panel/filtered-items-selector';
import FilterTypeSelector from 'components/control-panel/filter-type-selector';
import React, { ReactNode } from 'react';
import { ColumnsSelector } from 'components/control-panel/columns-selector';
import { hiddenStyle } from 'components/columns/column-styles';
import { UiSelectionsContext } from 'components/context/ui-selections-context';
import { UiSelectionsManager } from 'components/ui-selections/ui-selections-manager';

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
