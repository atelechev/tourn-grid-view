/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import { calculateColumnVisibility } from './columns/column-utils';
import { GridContext, GridState } from './grid-context';
import { columnStyles } from './columns/column-styles';
import { executeSorting } from './columns/execute-sorting';

const headerCellStyle = css({
  fontSize: '12px'
});

export default class GridHeader extends React.Component {
  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {ctx => (
          <TableHead>
            <TableRow>
              {ctx.csv.header.map((columnName, index) => {
                const calculatedStyles = this.calculateStyles(
                  columnName,
                  ctx.shownColumns
                );
                return (
                  <TableCell
                    key={index}
                    css={calculatedStyles}
                    sortDirection={
                      ctx.orderBy === columnName ? ctx.order : false
                    }
                  >
                    <TableSortLabel
                      active={ctx.orderBy === columnName}
                      hideSortIcon={!this.isSortEnabledOn(columnName, ctx)}
                      direction={ctx.order}
                      onClick={_ => executeSorting(columnName, ctx)}
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

  private isSortEnabledOn(columnName: string, ctx: GridState): boolean {
    return ctx.orderEnabledColumns.findIndex(
      sortableColumn => sortableColumn === columnName
    ) > -1;
  }

  private calculateStyles(
    column: string,
    shownColumns: Array<string>
  ): Array<SerializedStyles> {
    const visibilityClass = calculateColumnVisibility(column, shownColumns);
    const styles: Array<SerializedStyles> = [headerCellStyle, visibilityClass];
    const columnStyle = columnStyles.get(column);
    if (columnStyle) {
      styles.push(columnStyle);
    }
    return styles;
  }
}
