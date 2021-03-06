/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { CellValue } from './cell-value/cell-value';
import {
  isRowVisible
} from './columns/visibility-utils';
import { UiSelectionsContext } from './context/ui-selections-context';
import { DataContext } from './context/data-context';
import { hiddenStyle, visibleStyle } from './columns/column-styles';
import { LoadedTournament } from './csv/loaded-tournament';
import { UiSelectionsManager } from './ui-selections/ui-selections-manager';

const rowHoverStyle = css({
  cursor: 'pointer',
  backgroundColor: '#f5f5f5'
});

const rowStyle = css({
  ':hover,:focus': rowHoverStyle
});

export default class GridData extends React.Component {
  public render(): ReactNode {
    return (
      <DataContext.Consumer>
        {(tournament: LoadedTournament) => (
          <UiSelectionsContext.Consumer>
            {(uiSelections: UiSelectionsManager) => {
              const position = tournament.getPositionFor(uiSelections.selectedRow);
              const opponentPlacesOfSelected = tournament.getOpponentsFor(position);
              return (
                <TableBody>
                  {tournament.data.map((row, indexRow) => {
                    const rowStyles = this.calculateRowStyles(
                      row,
                      uiSelections,
                      tournament.rankColumn.index,
                      opponentPlacesOfSelected
                    );
                    return (
                      <TableRow
                        key={indexRow}
                        css={rowStyles}
                        onClick={_ => uiSelections.toggleRowSelection(row)}
                      >
                        {row.map((cellValue, indexCell) => {
                          const column = tournament.columns[indexCell];
                          return (
                            <CellValue
                              key={indexCell}
                              column={column}
                              isVisible={uiSelections.isShown(column)}
                              cellValue={cellValue}
                            />
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              );
            }}
          </UiSelectionsContext.Consumer>
        )}
      </DataContext.Consumer>
    );
  }

  private calculateRowStyles(
    row: Array<any>,
    uiSelections: UiSelectionsManager,
    placeColumnIndex: number,
    opponentPlacesOfSelected: Set<number>
  ): Array<SerializedStyles> {
    const rowVisible = isRowVisible(
      row,
      uiSelections,
      placeColumnIndex,
      opponentPlacesOfSelected
    );
    const styles = [rowStyle];
    if (rowVisible) {
      styles.push(visibleStyle);
    } else {
      styles.push(hiddenStyle);
    }
    const isSelected = uiSelections.selectedRow === row;
    if (isSelected) {
      styles.push(rowHoverStyle);
    }
    return styles;
  }
}
