/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import ShowInfo from 'components/control-panel/show-info';
import ShowPanel from 'components/control-panel/show-panel';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Column } from 'components/columns/column';
import { DataContext } from 'components/context/data-context';
import { hiddenStyle, visibleStyle } from 'components/columns/column-styles';
import { LoadedTournament } from 'components/csv/loaded-tournament';
import { TableSortLabel } from '@material-ui/core';
import { UiSelectionsContext } from 'components/context/ui-selections-context';
import { UiSelectionsManager } from 'components/ui-selections/ui-selections-manager';

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
                        {this.renderTools(column, uiSelections.interactive)}
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

  private renderTools(column: Column, isInteractive: boolean): ReactNode {
    if (!column.hasSemantics('name')) {
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
