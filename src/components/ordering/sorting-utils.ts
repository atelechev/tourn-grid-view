import { UiSelectionsContext } from '../context/ui-selections-context';
import { SortDirection } from '@material-ui/core';

export const getSortDirection = (
  columnName: string,
  uiSelections: UiSelectionsContext
): SortDirection => {
  if (!uiSelections.interactive) {
    return false;
  }
  if (uiSelections.orderBy === columnName) {
    return uiSelections.order;
  }
  return false;
};

export const isSortEnabledOn = (
  columnName: string,
  uiSelections: UiSelectionsContext
): boolean => {
  if (!uiSelections.interactive) {
    return false;
  }
  return (
    uiSelections.orderEnabledColumns.findIndex(
      sortableColumn => sortableColumn === columnName
    ) > -1
  );
};
