import { GridState } from '../grid-context';
import { compareOptionalValues } from './comparators';

export const executeSorting = (column: string, ctx: GridState): void => {
  if (!ctx.interactive) {
    return;
  }
  const columnNormalized = column.trim().toLowerCase();
  const indexSortColumn = ctx.csv.header.findIndex(
    headerColumn => headerColumn.trim().toLowerCase() === columnNormalized
  );
  const enabledOnThisColumn =
    ctx.orderEnabledColumns.findIndex(orderEnabled => orderEnabled.trim().toLowerCase() === columnNormalized) >
    -1;
  if (indexSortColumn < 0 || !enabledOnThisColumn) {
    return;
  }
  ctx.order = ctx.order === 'desc' ? 'asc' : 'desc';
  ctx.orderBy = columnNormalized;
  ctx.csv.data.sort((row1, row2) => {
    const compare = compareOptionalValues(
      row1[indexSortColumn],
      row2[indexSortColumn]
    );
    return ctx.order === 'desc' ? compare : -compare;
  });
  ctx.updateView();
};
