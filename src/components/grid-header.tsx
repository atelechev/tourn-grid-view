/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import { getColumnVisibilityStyle } from './columns/visibility-utils';
import { columnStylesHandler } from './columns/column-styles-handler';
import { UiSelectionsContext } from './context/ui-selections-context';
import { UpdateViewTriggerAware } from './update-view-trigger-aware';
import { DataContext } from './context/data-context';
import { DataManager } from './csv/data-manager';
import { UiSelectionsManager } from './ui-selections/ui-selections-manager';

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
            {(uiSelections: UiSelectionsManager) => (
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
                        sortDirection={uiSelections.getSortDirection(columnName)}
                      >
                        <TableSortLabel
                          active={uiSelections.isSortActive(columnName)}
                          hideSortIcon={!uiSelections.isSortEnabledOn(columnName)}
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
    uiSelections: UiSelectionsManager,
    csv: DataManager
  ): void {
    if (uiSelections.applyOrderBy(columnName)) {
      csv.sort(columnName, uiSelections.order);
      this.props.forceUpdate();
    }
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
