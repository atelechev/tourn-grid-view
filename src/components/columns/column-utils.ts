import { SerializedStyles } from '@emotion/core';
import { isRoundColumn } from './column-round';
import { hiddenStyle, visibleStyle } from './column-styles';
import { COLUMN_NAME, COLUMN_PLACE, COLUMN_ROUNDS } from './names';

const isAlwaysVisibleColumn = (column: string): boolean =>
  column === COLUMN_PLACE || column === COLUMN_NAME;

export const calculateColumnVisibility = (
  column: string,
  shownColumns: Array<string>
): SerializedStyles => {
  const isColumnVisible =
    isAlwaysVisibleColumn(column) ||
    shownColumns.find(
      shownColumn =>
        shownColumn === column ||
        (shownColumn === COLUMN_ROUNDS && isRoundColumn(column))
    ) !== undefined;
  return isColumnVisible ? visibleStyle : hiddenStyle;
};

export const calculateVisibleColumns = (
  allColumns: Array<string>,
  hiddenColumns: Array<string>
): Array<string> =>
  allColumns.filter(
    column => hiddenColumns.find(hidden => column === hidden) === undefined
  );

export const buildSelectableColumns = (
  allHeaderColumns: Array<string>
): Array<string> => {
  const firstRoundColumnIndex = allHeaderColumns.findIndex(colName =>
    isRoundColumn(colName)
  );
  if (firstRoundColumnIndex === -1) {
    return allHeaderColumns;
  }
  const selectableOptions = allHeaderColumns.slice(0, firstRoundColumnIndex);
  selectableOptions.push(COLUMN_ROUNDS);
  const afterRoundsColumns = allHeaderColumns
    .slice(firstRoundColumnIndex)
    .filter(colName => !isRoundColumn(colName));
  return selectableOptions
    .concat(afterRoundsColumns)
    .filter(col => !isAlwaysVisibleColumn(col));
};
