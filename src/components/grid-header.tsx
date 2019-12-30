/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import { getColumnVisibilityStyle } from './columns/visibility-utils';
import { columnStylesHandler } from './columns/column-styles-handler';
import { executeSorting } from './ordering/execute-sorting';
import { UiSelectionsContext } from './context/ui-selections-context';
import { UpdateViewTriggerAware } from './update-view-trigger-aware';
import { DataContext } from './context/data-context';
import { getSortDirection, isSortEnabledOn } from './ordering/sorting-utils';
import { DataManager } from './csv/data-manager';

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
        {(csv: DataManager) => (
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
                        sortDirection={getSortDirection(
                          columnName,
                          uiSelections
                        )}
                      >
                        <TableSortLabel
                          active={
                            uiSelections.interactive &&
                            uiSelections.orderBy === columnName
                          }
                          hideSortIcon={
                            !isSortEnabledOn(columnName, uiSelections)
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
    csv: DataManager
  ): void {
    executeSorting(columnName, uiSelections, csv);
    this.props.forceUpdate();
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
