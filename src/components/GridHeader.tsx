/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import { calculateColumnVisibility } from './column-utils';
import { GridContext } from './GridContext';
import { columnStyles } from './column-styles';

const headerCellStyle = css({
  fontSize: '12px',
});

export default class GridHeader extends React.Component {
  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx) => (
          <TableHead>
            <TableRow>
              {ctx.csv.header.map((columnName, index) => {
                const calculatedStyles = this.calculateStyles(columnName, ctx.shownColumns);
                return (
                  <TableCell
                    key={index}
                    css={calculatedStyles}
                    sortDirection={ctx.orderBy === columnName ? ctx.order : false}
                  >
                    <TableSortLabel
                      active={ctx.orderBy === columnName}
                      hideSortIcon
                      direction={ctx.order}
                      onClick={(_) => ctx.executeSort(columnName)}
                    >
                      {columnName}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        )}
      </GridContext.Consumer>
    );
  }

  private calculateStyles(column: string, shownColumns: Array<string>): Array<SerializedStyles> {
    const visibilityClass = calculateColumnVisibility(column, shownColumns);
    const styles: Array<SerializedStyles> = [headerCellStyle, visibilityClass];
    const columnStyle = columnStyles.get(column);
    if (columnStyle) {
      styles.push(columnStyle);
    }
    return styles;
  }
}
