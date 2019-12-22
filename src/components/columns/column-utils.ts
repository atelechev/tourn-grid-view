import { isRoundColumn } from './round';
import { COLUMN_ROUNDS } from './names';
import { isAlwaysVisibleColumn } from './visibility-utils';

export const isSimpleColumnIdentifier = (column: string,
  expectedIdentifier: string): boolean => {
  if (!column) {
    return false;
  }
  return column.trim().toLowerCase() === expectedIdentifier.toLowerCase();
}

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
