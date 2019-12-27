/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell, { SortDirection } from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import { getColumnVisibilityStyle } from './columns/visibility-utils';
import { GridContext, GridState } from './grid-context';
import { columnStylesHandler } from './columns/column-styles-handler';
import { executeSorting } from './ordering/execute-sorting';

const headerCellStyle = css({
  fontSize: '12px',
  textTransform: 'capitalize'
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
                    sortDirection={this.getSortDirection(columnName, ctx)}
                  >
                    <TableSortLabel
                      active={
                        ctx.interactive &&
                        ctx.orderBy === columnName.trim().toLowerCase()
                      }
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

  private getSortDirection(columnName: string, ctx: GridState): SortDirection {
    if (!ctx.interactive) {
      return false;
    }
    if (ctx.orderBy === columnName.trim().toLowerCase()) {
      return ctx.order;
    }
    return false;
  }

  private isSortEnabledOn(columnName: string, ctx: GridState): boolean {
    if (!ctx.interactive) {
      return false;
    }
    const columnNameNormalized = columnName.trim().toLowerCase();
    return (
      ctx.orderEnabledColumns.findIndex(
        sortableColumn => sortableColumn === columnNameNormalized
      ) > -1
    );
  }

  private calculateStyles(
    column: string,
    shownColumns: Array<string>
  ): Array<SerializedStyles> {
    const visibilityClass = getColumnVisibilityStyle(column, shownColumns);
    const styles: Array<SerializedStyles> = [headerCellStyle, visibilityClass];
    const columnStyle = columnStylesHandler.get(column);
    if (columnStyle) {
      styles.push(columnStyle);
    }
    return styles;
  }
}
