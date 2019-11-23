import React, { ReactNode } from 'react';
import { ColumnsSelector } from './ColumnsSelector';

export class ControlPanel extends React.Component {

  public render(): ReactNode {
    return (
      <ColumnsSelector />
    );
  }

}