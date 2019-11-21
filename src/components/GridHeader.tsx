/** @jsx jsx */
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { calculateColumnVisibility } from './column-visibility';
import { jsx } from '@emotion/core';

interface GridHeaderProps {
  columnNames: Array<string>;
  hideColumns: Array<string>;
}

export default class GridHeader extends React.Component<GridHeaderProps> {

  public render(): ReactNode {
    return (
      <TableHead>
        <TableRow>
          {this.props.columnNames.map((columnName, index) => {
            const visibilityClass = calculateColumnVisibility(columnName, this.props.hideColumns);
            return (
              <TableCell key={index} css={visibilityClass}>
                {columnName}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }

}
