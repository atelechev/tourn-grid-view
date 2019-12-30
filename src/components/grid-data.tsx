/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { CellValue } from './cell-value/cell-value';
import {
  buildColumnsVisibilityMap,
  isRowVisible
} from './columns/visibility-utils';
import { UiSelectionsContext } from './context/ui-selections-context';
import { NO_FILTER } from './filters/no-filter';
import { UpdateViewTriggerAware } from './update-view-trigger-aware';
import { DataContext } from './context/data-context';
import { extractOpponentPlaces } from './csv/data-utils';
import { hiddenStyle, visibleStyle } from './columns/column-styles';
import { DataManager } from './csv/data-manager';

const rowHoverStyle = css({
  cursor: 'pointer',
  backgroundColor: '#f5f5f5'
});

const rowStyle = css({
  ':hover,:focus': rowHoverStyle
});

export default class GridData extends React.Component<UpdateViewTriggerAware> {
  public render(): ReactNode {
    return (
      <DataContext.Consumer>
        {(csv: DataManager) => (
          <UiSelectionsContext.Consumer>
            {(uiSelections: UiSelectionsContext) => {
              const columnVisibility = buildColumnsVisibilityMap(
                csv.header,
                uiSelections.shownColumns
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
                      csv.positionColumnIndex,
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
    const styles = [rowStyle];
    if (rowVisible) {
      styles.push(visibleStyle);
    } else {
      styles.push(hiddenStyle);
    }
    if (isSelected) {
      styles.push(rowHoverStyle);
    }
    return styles;
  }
}
