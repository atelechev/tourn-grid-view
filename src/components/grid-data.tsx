/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { CellValue } from './cell-value/cell-value';
import { isPlaceColumn } from './columns/place';
import {
  buildColumnsVisibilityMap,
  isRowVisible
} from './columns/visibility-utils';
import { UiSelectionsContext } from './context/ui-selections-context';
import { NO_FILTER } from './filters/no-filter';
import { UpdateViewTriggerAware } from './update-view-trigger-aware';
import { Csv } from './csv/csv';
import { DataContext } from './context/data-context';
import { extractOpponentPlaces } from './csv/data-utils';

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
              const columnVisibility = buildColumnsVisibilityMap(
                csv.header,
                uiSelections.shownColumns
              );
              const placeColumnIndex = csv.header.findIndex(col =>
                isPlaceColumn(col)
              );
              const opponentPlacesOfSelected = extractOpponentPlaces(
                uiSelections.selectedRow,
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
    const rowVisible = isRowVisible(
      row,
      uiSelections,
      placeColumnIndex,
      opponentPlacesOfSelected
    );
    const isSelected = uiSelections.selectedRow === row;
    const styles = new Array<SerializedStyles>();
    if (rowVisible) {
      styles.push(rowStyle);
    } else {
      styles.push(hiddenRow);
    }
    if (isSelected) {
      styles.push(rowHoverStyle);
    }
    return styles;
  }
}
