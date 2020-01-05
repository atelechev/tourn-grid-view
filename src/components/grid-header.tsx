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
import { DataContext } from './context/data-context';
import { DataManager } from './csv/data-manager';
import { UiSelectionsManager } from './ui-selections/ui-selections-manager';
import { isNameColumn } from './columns/name';
import ShowInfo from './control-panel/show-info';
import ShowPanel from './control-panel/show-panel';

const headerCellStyle = css({
  textTransform: 'capitalize'
});

const toolsStyle = css({
  minWidth: '40px',
  marginRight: '8px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  float: 'right'
});

export default class GridHeader extends React.Component {
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
                        sortDirection={uiSelections.getSortDirection(
                          columnName
                        )}
                      >
                        <TableSortLabel
                          active={uiSelections.isSortActive(columnName)}
                          hideSortIcon={
                            !uiSelections.isSortEnabledOn(columnName)
                          }
                          direction={uiSelections.order}
                          onClick={_ => uiSelections.applyOrderBy(columnName)}
                        >
                          {columnName}
                        </TableSortLabel>
                        {this.renderTools(columnName, uiSelections.interactive)}
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

  private renderTools(columnName: string, isInteractive: boolean): ReactNode {
    if (!isNameColumn(columnName)) {
      return undefined;
    }
    return (
      <span css={toolsStyle}>
        {isInteractive &&
          <ShowPanel />
        }
        <ShowInfo />
      </span>
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
