import { compareOptionalValues } from './comparators';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { Csv } from '../csv/csv';

// TODO add tests
export const executeSorting = (
  column: string,
  uiSelections: UiSelectionsContext,
  csv: Csv
): void => {
  if (!uiSelections.interactive) {
    return;
  }
  const indexSortColumn = csv.header.findIndex(
    headerColumn => headerColumn === column
  );
  const enabledOnThisColumn =
    uiSelections.orderEnabledColumns.findIndex(
      orderEnabled => orderEnabled === column
    ) > -1;
  if (indexSortColumn < 0 || !enabledOnThisColumn) {
    return;
  }
  uiSelections.order = uiSelections.order === 'desc' ? 'asc' : 'desc';
  uiSelections.orderBy = column;
  csv.data.sort((row1, row2) => {
    const compare = compareOptionalValues(
      row1[indexSortColumn],
      row2[indexSortColumn]
    );
    return uiSelections.order === 'desc' ? compare : -compare;
  });
};
