import { isPlaceColumn } from './place';
import { isNameColumn } from './name';
import { SerializedStyles } from '@emotion/core';
import { isRoundColumn } from './round';
import { visibleStyle, hiddenStyle } from './column-styles';
import { COLUMN_ROUNDS } from './names';

export const isAlwaysVisibleColumn = (column: string): boolean =>
  isPlaceColumn(column) || isNameColumn(column);

export const isColumnVisible = (
  column: string,
  shownColumns: Array<string>
): boolean => {
  if (!column || !shownColumns) {
    return false;
  }
  const normalized = column.trim().toLowerCase();
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
