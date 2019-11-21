import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface GridHeaderProps {
  columnNames: Array<string>;
  hideColumns: Array<string>;
}

export default class GridHeader extends React.Component<GridHeaderProps> {
  constructor(props: GridHeaderProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <TableHead>
        <TableRow>
          {this.props.columnNames.map((columnName, index) => (
            <TableCell key={index} className={this.calculateCellClasses(columnName)}>
              {columnName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  private calculateCellClasses(columnName: string): string {
    const isVisible = this.props.hideColumns.filter((item) => item === columnName).length === 0;
    return isVisible ? '' : 'hidden-item';
  }
}
