import { isAlwaysVisibleColumn } from './visibility-utils';
import { Column } from './column';

export const buildSelectableColumns = (
  allHeaderColumns: Array<Column>
): Array<Column> => {
  if (!allHeaderColumns || allHeaderColumns.length === 0) {
    return [];
  }
  return allHeaderColumns.filter(
    column => !isAlwaysVisibleColumn(column) && !column.hasSemantics('round')
  );
};
