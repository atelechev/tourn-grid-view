/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableSortLabel } from '@material-ui/core';
import { UiSelectionsContext } from './context/ui-selections-context';
import { DataContext } from './context/data-context';
import { LoadedTournament } from './csv/loaded-tournament';
import { UiSelectionsManager } from './ui-selections/ui-selections-manager';
import { isNameColumn } from './columns/name';
import ShowInfo from './control-panel/show-info';
import ShowPanel from './control-panel/show-panel';
import { Column } from './columns/column';
import { visibleStyle, hiddenStyle } from './columns/column-styles';

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
        {(csv: LoadedTournament) => (
          <UiSelectionsContext.Consumer>
            {(uiSelections: UiSelectionsManager) => (
              <TableHead>
                <TableRow>
                  {csv.columns.map(column => {
                    const calculatedStyles = this.calculateStyles(
                      column,
                      uiSelections
                    );
                    return (
                      <TableCell
                        key={column.index}
                        css={calculatedStyles}
                        sortDirection={uiSelections.getSortDirection(column)}
                      >
                        <TableSortLabel
                          active={uiSelections.isSortActive(column)}
                          hideSortIcon={!uiSelections.isSortEnabledOn(column)}
                          direction={uiSelections.order}
                          onClick={_ => uiSelections.applyOrderBy(column)}
                        >
                          {column.name}
                        </TableSortLabel>
                        {this.renderTools(column.name, uiSelections.interactive)}
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
        {isInteractive && <ShowPanel />}
        <ShowInfo />
      </span>
    );
  }

  private calculateStyles(
    column: Column,
    uiSelections: UiSelectionsManager
  ): Array<SerializedStyles> {
    const isVisible = uiSelections.isShown(column);
    const visibilityClass = isVisible ? visibleStyle : hiddenStyle;
    return [headerCellStyle, visibilityClass, column.styles];
  }

}
