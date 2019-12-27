/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { ColumnsSelector } from './columns-selector';
import FilterTypeSelector from './filter-type-selector';
import FilteredItemsSelector from './filtered-items-selector';
import { UpdateViewTriggerAware } from '../update-view-trigger-aware';

const panelStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly'
});

export class ControlPanel extends React.Component<UpdateViewTriggerAware> {
  public render(): ReactNode {
    const { forceUpdate } = this.props;
    return (
      <div css={panelStyle}>
        <FilterTypeSelector forceUpdate={forceUpdate} />
        <FilteredItemsSelector forceUpdate={forceUpdate} />
        <ColumnsSelector forceUpdate={forceUpdate} />
      </div>
    );
  }
}
