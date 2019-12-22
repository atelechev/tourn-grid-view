import { isRoundColumn } from './round';
import { COLUMN_ROUNDS } from './names';
import { isAlwaysVisibleColumn } from './visibility-utils';

export const buildSelectableColumns = (
  allHeaderColumns: Array<string>
): Array<string> => {
  if (!allHeaderColumns || allHeaderColumns.length === 0) {
    return [];
  }
  const noAlwaysVisible = allHeaderColumns.filter(column => !isAlwaysVisibleColumn(column));
  const firstRoundColumnIndex = noAlwaysVisible.findIndex(colName =>
    isRoundColumn(colName)
  );
  if (firstRoundColumnIndex === -1) {
    return noAlwaysVisible;
  }
  const noRoundColumns = noAlwaysVisible.filter(column => !isRoundColumn(column));
  noRoundColumns.splice(firstRoundColumnIndex, 0, COLUMN_ROUNDS);
  return noRoundColumns;
};
