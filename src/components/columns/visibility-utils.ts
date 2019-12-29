import { isPlaceColumn } from './place';
import { isNameColumn } from './name';
import { SerializedStyles } from '@emotion/core';
import { isRoundColumn } from './round';
import { visibleStyle, hiddenStyle } from './column-styles';
import { COLUMN_ROUNDS } from './names';
import { UiSelectionsContext } from '../context/ui-selections-context';

export const isAlwaysVisibleColumn = (column: string): boolean =>
  isPlaceColumn(column) || isNameColumn(column);

export const isColumnVisible = (
  column: string,
  shownColumns: Array<string>
): boolean => {
  if (!column) {
    return false;
  }
  const normalized = column.trim().toLowerCase();
  if (!shownColumns || shownColumns.length === 0) {
    return isAlwaysVisibleColumn(normalized);
  }
  return (
    isAlwaysVisibleColumn(normalized) ||
    shownColumns.find(shownColumn => {
      const shColNorm = shownColumn.trim().toLowerCase();
      return (
        shColNorm === normalized ||
        (shColNorm === COLUMN_ROUNDS && isRoundColumn(normalized))
      );
    }) !== undefined
  );
};

export const getColumnVisibilityStyle = (
  column: string,
  shownColumns: Array<string>
): SerializedStyles => {
  const isVisible = isColumnVisible(column, shownColumns);
  return isVisible ? visibleStyle : hiddenStyle;
};

export const calculateVisibleColumns = (
  allColumns: Array<string>,
  hiddenColumns: Array<string>
): Array<string> => {
  if (!allColumns || allColumns.length === 0) {
    return [];
  }
  if (!hiddenColumns || hiddenColumns.length === 0) {
    return [].concat(allColumns);
  }
  const hiddenNormalized = hiddenColumns
    .filter(column => !!column)
    .map(column => column.trim().toLowerCase())
    .filter(column => column.length > 0);
  return allColumns.filter(
    column => hiddenNormalized.find(hidden => column === hidden) === undefined
  );
};

export const buildColumnsVisibilityMap = (
  allColumns: Array<string>,
  shownColumns: Array<string>
): Map<string, boolean> => {
  const visibilities = new Map<string, boolean>();
  if (allColumns) {
    allColumns.forEach(column =>
      visibilities.set(column, isColumnVisible(column, shownColumns))
    );
  }
  return visibilities;
};

export const isRowVisible = (
  row: Array<any>,
  uiSelections: UiSelectionsContext,
  placeColumnIndex: number,
  opponentPlacesOfSelected: Set<number>
): boolean => {
  if (uiSelections.selectedRow) {
    const selectedPlace = parseInt(
      uiSelections.selectedRow[placeColumnIndex].toString()
    );
    const candidatePlace = parseInt(row[placeColumnIndex].toString());
    return (
      selectedPlace === candidatePlace ||
      opponentPlacesOfSelected.has(candidatePlace)
    );
  }
  return uiSelections.filterActive.shouldShowRow(row);
};
