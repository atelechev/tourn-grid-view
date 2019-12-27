/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { CellValue } from './cell-value/cell-value';
import { isRoundColumn } from './columns/round';
import { isPlaceColumn } from './columns/place';
import { isColumnVisible } from './columns/visibility-utils';
import { UiSelectionsContext } from './context/ui-selections-context';
import { NO_FILTER } from './filters/no-filter';
import { UpdateViewTriggerAware } from './update-view-trigger-aware';
import { Csv } from './csv/csv';
import { DataContext } from './context/data-context';

const rowHoverStyle = css({
  cursor: 'pointer',
  backgroundColor: '#f5f5f5'
});

const rowStyle = css({
  ':hover,:focus': rowHoverStyle
});

const hiddenRow = css({
  display: 'none'
});

export default class GridData extends React.Component<UpdateViewTriggerAware> {
  public render(): ReactNode {
    return (
      <DataContext.Consumer>
        {(csv: Csv) => (
          <UiSelectionsContext.Consumer>
            {(uiSelections: UiSelectionsContext) => {
              const columnVisibility = this.buildColumnsVisibilityMap(
                csv.header,
                uiSelections.shownColumns
              );
              const placeColumnIndex = csv.header.findIndex(col =>
                isPlaceColumn(col)
              );
              const opponentPlacesOfSelected = this.extractOpponentPlaces(
                uiSelections,
                csv
              );
              return (
                <TableBody>
                  {csv.data.map((row, indexRow) => {
                    const rowStyles = this.calculateRowStyles(
                      row,
                      uiSelections,
                      placeColumnIndex,
                      opponentPlacesOfSelected
                    );
                    return (
                      <TableRow
                        key={indexRow}
                        css={rowStyles}
                        onClick={_ => this.selectRow(row, uiSelections)}
                      >
                        {row.map((cellValue, indexCell) => {
                          const column = csv.header[indexCell];
                          return (
                            <CellValue
                              key={indexCell}
                              column={column}
                              isVisible={columnVisibility.get(column)}
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

  private buildColumnsVisibilityMap(
    allColumns: Array<string>,
    shownColumns: Array<string>
  ): Map<string, boolean> {
    const visibilities = new Map<string, boolean>();
    allColumns.forEach(column =>
      visibilities.set(column, isColumnVisible(column, shownColumns))
    );
    return visibilities;
  }

  private selectRow(row: Array<any>, uiSelections: UiSelectionsContext): void {
    if (!uiSelections.interactive) {
      return;
    }
    if (row === uiSelections.selectedRow) {
      uiSelections.selectedRow = undefined;
    } else {
      uiSelections.selectedRow = row;
      uiSelections.filterActive = NO_FILTER;
    }
    this.props.forceUpdate();
  }

  private calculateRowStyles(
    row: Array<any>,
    uiSelections: UiSelectionsContext,
    placeColumnIndex: number,
    opponentPlacesOfSelected: Set<number>
  ): Array<SerializedStyles> {
    const isRowVisible = this.isRowVisible(
      row,
      uiSelections,
      placeColumnIndex,
      opponentPlacesOfSelected
    );
    const isSelected = uiSelections.selectedRow === row;
    const styles = new Array<SerializedStyles>();
    if (isRowVisible) {
      styles.push(rowStyle);
    } else {
      styles.push(hiddenRow);
    }
    if (isSelected) {
      styles.push(rowHoverStyle);
    }
    return styles;
  }

  private isRowVisible(
    row: Array<any>,
    uiSelections: UiSelectionsContext,
    placeColumnIndex: number,
    opponentPlacesOfSelected: Set<number>
  ): boolean {
    if (uiSelections.selectedRow) {
      const selectedPlace = parseInt(
        uiSelections.selectedRow[placeColumnIndex].toString()
      );
      const candidatePlace = parseInt(row[placeColumnIndex].toString());
      return this.isOpponent(
        selectedPlace,
        candidatePlace,
        opponentPlacesOfSelected
      );
    }
    return uiSelections.filterActive.shouldShowRow(row);
  }

  private extractOpponentPlaces(
    uiSelections: UiSelectionsContext,
    csv: Csv
  ): Set<any> {
    if (uiSelections.selectedRow) {
      const extractPosition = /\d+/g;
      const roundColumns = csv.header.filter(col => isRoundColumn(col));
      const roundColumnIndices = roundColumns.map(roundCol =>
        csv.header.findIndex(headerCol => headerCol === roundCol)
      );
      const gameResultValues = roundColumnIndices
        .map(
          indexRoundColumn =>
            (uiSelections.selectedRow as Array<any>)[indexRoundColumn]
        )
        .filter(gameResult => !!gameResult)
        .map(gameResult => {
          const matchResult = gameResult.toString().match(extractPosition);
          if (matchResult && matchResult.length > 0) {
            return parseInt(matchResult[0]);
          }
          return -1;
        })
        .filter(pos => pos > -1);
      return new Set(gameResultValues);
    }
    return new Set();
  }

  private isOpponent(
    selectedPlace: number,
    candidatePlace: number,
    opponentPlacesOfSelected: Set<number>
  ): boolean {
    return (
      selectedPlace === candidatePlace ||
      opponentPlacesOfSelected.has(candidatePlace)
    );
  }
}
