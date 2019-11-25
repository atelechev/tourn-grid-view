import { css, SerializedStyles } from '@emotion/core';

const hiddenStyle = css({
  display: 'none'
});

const visibleStyle = css({});

export const isCountryColumn =
  (column: string): boolean => {
    return column === 'Fede';
  }

export const isRoundColumn =
  (column: string): boolean => {
    const roundColumnRegex = /[Rr][0-9]+/g;
    const matchResult = column.match(roundColumnRegex);
    return (matchResult && matchResult.length > 0) as boolean;
  }

const isAlwaysVisibleColumn = (column: string): boolean => {
  return column === 'Pl' || column === 'Nom';
}

export const calculateColumnVisibility =
  (column: string, shownColumns: Array<string>): SerializedStyles => {
    const isColumnVisible = isAlwaysVisibleColumn(column) ||
      shownColumns.find(shownColumn => {
        return shownColumn === column ||
          (shownColumn === 'Rounds' && isRoundColumn(column));
      }) !== undefined;
    return isColumnVisible ? visibleStyle : hiddenStyle;
  }

export const calculateVisibleColumns =
  (allColumns: Array<string>, hiddenColumns: Array<string>): Array<string> => {
    return allColumns.filter(column => hiddenColumns.find(hidden => column === hidden) === undefined);
  }

export const buildSelectableColumns =
  (allHeaderColumns: Array<string>): Array<string> => {
    const firstRoundColumnIndex = allHeaderColumns.findIndex(colName => isRoundColumn(colName));
    if (firstRoundColumnIndex === -1) {
      return allHeaderColumns;
    }
    const selectableOptions = allHeaderColumns.slice(0, firstRoundColumnIndex);
    selectableOptions.push('Rounds');
    const afterRoundsColumns = allHeaderColumns.slice(firstRoundColumnIndex)
      .filter(colName => !isRoundColumn(colName));
    return selectableOptions.concat(afterRoundsColumns)
      .filter(col => !isAlwaysVisibleColumn(col));
  }
