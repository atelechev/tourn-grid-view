/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { ColumnsSelector } from './ColumnsSelector';
import FilterTypeSelector from './FilterTypeSelector';
import FilteredItemsSelector from './FilteredItemsSelector';

const panelStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

export class ControlPanel extends React.Component {
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
