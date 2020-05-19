import { UiSelectionsManager } from 'components/ui-selections/ui-selections-manager';

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
