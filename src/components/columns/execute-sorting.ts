import { GridState } from '../grid-context';
import { compareOptionalValues } from './comparators';

export const executeSorting = (column: string, ctx: GridState): void => {
  if (!ctx.interactive) {
    return;
  }
  const indexSortColumn = ctx.csv.header.findIndex(
    headerColumn => headerColumn === column
  );
  const enabledOnThisColumn =
    ctx.orderEnabledColumns.findIndex(orderEnabled => orderEnabled === column) >
    -1;
  if (indexSortColumn < 0 || !enabledOnThisColumn) {
    return;
  }
  ctx.order = ctx.order === 'desc' ? 'asc' : 'desc';
  ctx.orderBy = column;
  ctx.csv.data.sort((row1, row2) => {
    const compare = compareOptionalValues(
      row1[indexSortColumn],
      row2[indexSortColumn]
    );
    return ctx.order === 'desc' ? compare : -compare;
  });
  ctx.updateView();
};
