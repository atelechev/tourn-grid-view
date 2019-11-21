/** @jsx jsx */
import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { calculateColumnVisibility } from './column-visibility';
import { jsx } from '@emotion/core';

interface GridDataProps {
  columnNames: Array<string>;
  rowData: Array<Array<any>>;
  hideColumns: Array<string>;
}

export default class GridData extends React.Component<GridDataProps> {

  public render(): ReactNode {
    return (
      <TableBody>
        {this.props.rowData.map((row, iRow) => (
          <TableRow key={iRow}>
            {row.map((cellValue, iCell) => {
              const columnName = this.props.columnNames[iCell];
              const visibilityClass = calculateColumnVisibility(columnName, this.props.hideColumns);
              return (
                <TableCell key={iCell} css={visibilityClass}>
                  {cellValue}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    );
  }

}
