import { css, SerializedStyles } from '@emotion/core';

export const COLUMN_PLACE = 'Pos';

export const COLUMN_RATING = 'Rating';

const COLUMN_FEDERATION = 'Fed';

export const COLUMN_NAME = 'Name';

const COLUMN_ROUNDS = 'Rounds';

const hiddenStyle = css({
  display: 'none'
});

const visibleStyle = css({});

export const isCountryColumn = (column: string): boolean =>
  column === COLUMN_FEDERATION;

export const isRoundColumn = (column: string): boolean => {
  const roundColumnRegex = /[Rr][0-9]+/g;
  const matchResult = column.match(roundColumnRegex);
  return (matchResult && matchResult.length > 0) as boolean;
};

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
