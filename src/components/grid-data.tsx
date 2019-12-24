/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { GridContext, GridState } from './grid-context';
import { CellValue } from './cell-value/cell-value';
import { FiltersManager } from './filters/filters-manager';
import { isRoundColumn } from './columns/round';
import { VALUE_NO_FILTER } from './filters/filter';
import { isPlaceColumn } from './columns/place';

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

export default class GridData extends React.Component {
  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => {
          const placeColumnIndex = ctx.csv.header.findIndex(col =>
            isPlaceColumn(col)
          );
          const opponentPlacesOfSelected = this.extractOpponentPlaces(ctx);
          return (
            <TableBody>
              {ctx.csv.data.map((row, indexRow) => {
                const rowStyles = this.calculateRowStyles(
                  row,
                  ctx,
                  placeColumnIndex,
                  opponentPlacesOfSelected
                );
                return (
                  <TableRow
                    key={indexRow}
                    css={rowStyles}
                    onClick={_ => this.selectRow(row, ctx)}
                  >
                    {row.map((cellValue, indexCell) => {
                      const column = ctx.csv.header[indexCell];
                      return (
                        <CellValue
                          key={indexCell}
                          column={column}
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
      </GridContext.Consumer>
    );
  }

  private selectRow(row: Array<any>, ctx: GridState): void {
    if (!ctx.interactive) {
      return;
    }
    if (row === ctx.selectedRow) {
      ctx.selectedRow = undefined;
    } else {
      ctx.selectedRow = row;
      if (ctx.filtersManager) {
        ctx.filtersManager.useFilter(VALUE_NO_FILTER);
      } else {
        throw Error(
          'Attempted to use filter before filtersManager was initialized.'
        );
      }
    }
    ctx.updateView();
  }

  private calculateRowStyles(
    row: Array<any>,
    ctx: GridState,
    placeColumnIndex: number,
    opponentPlacesOfSelected: Set<number>
  ): Array<SerializedStyles> {
    const isRowVisible = this.isRowVisible(
      row,
      ctx,
      placeColumnIndex,
      opponentPlacesOfSelected
    );
    const isSelected = ctx.selectedRow === row;
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
    ctx: GridState,
    placeColumnIndex: number,
    opponentPlacesOfSelected: Set<number>
  ): boolean {
    if (ctx.selectedRow) {
      const selectedPlace = parseInt(
        ctx.selectedRow[placeColumnIndex].toString()
      );
      const candidatePlace = parseInt(row[placeColumnIndex].toString());
      return this.isOpponent(
        selectedPlace,
        candidatePlace,
        opponentPlacesOfSelected
      );
    }
    const filter = (ctx.filtersManager as FiltersManager).activeFilter;
    return filter.shouldShowRow(row);
  }

  private extractOpponentPlaces(ctx: GridState): Set<any> {
    if (ctx.selectedRow) {
      const extractPosition = /\d+/g;
      const roundColumns = ctx.csv.header.filter(col => isRoundColumn(col));
      const roundColumnIndices = roundColumns.map(roundCol =>
        ctx.csv.header.findIndex(headerCol => headerCol === roundCol)
      );
      const gameResultValues = roundColumnIndices
        .map(
          indexRoundColumn => (ctx.selectedRow as Array<any>)[indexRoundColumn]
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
