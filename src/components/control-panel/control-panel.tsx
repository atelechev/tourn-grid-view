/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { ColumnsSelector } from './columns-selector';
import FilterTypeSelector from './filter-type-selector';
import FilteredItemsSelector from './filtered-items-selector';
import { ControlPanelProps } from './control-panel-props';

const panelStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly'
});

export class ControlPanel extends React.Component<ControlPanelProps> {
  constructor(props: ControlPanelProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div css={panelStyle}>
        <FilterTypeSelector />
        <FilteredItemsSelector />
        <ColumnsSelector />
      </div>
    );
  }
}
