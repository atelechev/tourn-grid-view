import { GridState } from '../grid-context';
import { compareOptionalValues } from './comparators';
import { UiSelectionsContext } from '../context/ui-selections-context';

// TODO add tests
export const executeSorting = (
  column: string,
  uiSelections: UiSelectionsContext,
  ctx: GridState
): void => {
  if (!uiSelections.interactive) {
    return;
  }
  const columnNormalized = column.trim().toLowerCase();
  const indexSortColumn = ctx.csv.header.findIndex(
    headerColumn => headerColumn.trim().toLowerCase() === columnNormalized
  );
  const enabledOnThisColumn =
    uiSelections.orderEnabledColumns.findIndex(
      orderEnabled => orderEnabled.trim().toLowerCase() === columnNormalized
    ) > -1;
  if (indexSortColumn < 0 || !enabledOnThisColumn) {
    return;
  }
  uiSelections.order = uiSelections.order === 'desc' ? 'asc' : 'desc';
  uiSelections.orderBy = columnNormalized;
  ctx.csv.data.sort((row1, row2) => {
    const compare = compareOptionalValues(
      row1[indexSortColumn],
      row2[indexSortColumn]
    );
    return uiSelections.order === 'desc' ? compare : -compare;
  });
  ctx.updateView();
};
