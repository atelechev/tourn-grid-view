import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface GridDataProps {
  columnNames: Array<string>;
  rowData: Array<Array<any>>;
  hideColumns: Array<string>;
}

export default class GridData extends React.Component<GridDataProps> {
  constructor(props: GridDataProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <TableBody>
        {this.props.rowData.map((row, iRow) => (
          <TableRow key={iRow}>
            {row.map((cellValue, iCell) => {
              const columnName = this.props.columnNames[iCell];
              return (
                <TableCell key={iCell} className={this.calculateCellClasses(columnName)}>
                  {cellValue}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  private calculateCellClasses(columnName: string): string {
    const isVisible = this.props.hideColumns.filter((item) => item === columnName).length === 0;
    return isVisible ? '' : 'hidden-item';
  }
}
