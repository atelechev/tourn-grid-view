/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell, { SortDirection } from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import { getColumnVisibilityStyle } from './columns/visibility-utils';
import { columnStylesHandler } from './columns/column-styles-handler';
import { executeSorting } from './ordering/execute-sorting';
import { UiSelectionsContext } from './context/ui-selections-context';
import { UpdateViewTriggerAware } from './update-view-trigger-aware';
import { Csv } from './csv/csv';
import { DataContext } from './context/data-context';

const headerCellStyle = css({
  fontSize: '12px',
  textTransform: 'capitalize'
});

export default class GridHeader extends React.Component<
  UpdateViewTriggerAware
> {
  public render(): ReactNode {
    return (
      <DataContext.Consumer>
        {(csv: Csv) => (
          <UiSelectionsContext.Consumer>
            {(uiSelections: UiSelectionsContext) => (
              <TableHead>
                <TableRow>
                  {csv.header.map((columnName, index) => {
                    const calculatedStyles = this.calculateStyles(
                      columnName,
                      uiSelections.shownColumns
                    );
                    return (
                      <TableCell
                        key={index}
                        css={calculatedStyles}
                        sortDirection={this.getSortDirection(
                          columnName,
                          uiSelections
                        )}
                      >
                        <TableSortLabel
                          active={
                            uiSelections.interactive &&
                            uiSelections.orderBy ===
                              columnName.trim().toLowerCase()
                          }
                          hideSortIcon={
                            !this.isSortEnabledOn(columnName, uiSelections)
                          }
                          direction={uiSelections.order}
                          onClick={_ =>
                            this.handleSorting(columnName, uiSelections, csv)
                          }
                        >
                          {columnName}
                        </TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            )}
          </UiSelectionsContext.Consumer>
        )}
      </DataContext.Consumer>
    );
  }

  private handleSorting(
    columnName: string,
    uiSelections: UiSelectionsContext,
    csv: Csv
  ): void {
    executeSorting(columnName, uiSelections, csv);
    this.props.forceUpdate();
  }

  private getSortDirection(
    columnName: string,
    uiSelections: UiSelectionsContext
  ): SortDirection {
    if (!uiSelections.interactive) {
      return false;
    }
    if (uiSelections.orderBy === columnName.trim().toLowerCase()) {
      return uiSelections.order;
    }
    return false;
  }

  private isSortEnabledOn(
    columnName: string,
    uiSelections: UiSelectionsContext
  ): boolean {
    if (!uiSelections.interactive) {
      return false;
    }
    const columnNameNormalized = columnName.trim().toLowerCase();
    return (
      uiSelections.orderEnabledColumns.findIndex(
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
