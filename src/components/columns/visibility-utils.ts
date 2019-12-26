import { isPlaceColumn } from './place';
import { isNameColumn } from './name';
import { SerializedStyles } from '@emotion/core';
import { isRoundColumn } from './round';
import { visibleStyle, hiddenStyle } from './column-styles';
import { COLUMN_ROUNDS } from './names';

export const isAlwaysVisibleColumn = (column: string): boolean =>
  isPlaceColumn(column) || isNameColumn(column);

export const calculateColumnVisibility = (
  column: string,
  shownColumns: Array<string>
): SerializedStyles => {
  if (!column || !shownColumns) {
    return hiddenStyle;
  }
  const normalized = column.trim().toLowerCase();
  const isColumnVisible =
    isAlwaysVisibleColumn(normalized) ||
    shownColumns.find(shownColumn => {
      const shColNorm = shownColumn.trim().toLowerCase();
      return (
        shColNorm === normalized ||
        (shColNorm === COLUMN_ROUNDS && isRoundColumn(normalized))
      );
    }) !== undefined;
  return isColumnVisible ? visibleStyle : hiddenStyle;
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
  return allColumns.filter(
    column => hiddenColumns.find(hidden => column === hidden) === undefined
  );
};
