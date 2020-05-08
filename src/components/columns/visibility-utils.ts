import { UiSelectionsManager } from '../ui-selections/ui-selections-manager';
import { Column } from './column';

export const isAlwaysVisibleColumn = (column: Column): boolean =>
  column.hasSemantics('rank') || column.hasSemantics('name');

export const isRowVisible = (
  row: Array<any>,
  uiSelections: UiSelectionsManager,
  placeColumnIndex: number,
  opponentPlacesOfSelected: Set<number>
): boolean => {
  if (uiSelections.selectedRow) {
    const selectedPlace = parseInt(
      uiSelections.selectedRow[placeColumnIndex].toString()
    );
    const candidatePlace = parseInt(row[placeColumnIndex].toString());
    return (
      selectedPlace === candidatePlace ||
      opponentPlacesOfSelected.has(candidatePlace)
    );
  }
  return uiSelections.filterActive.shouldShowRow(row);
};
