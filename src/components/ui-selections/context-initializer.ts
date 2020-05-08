import { UiSelectionsManager } from './ui-selections-manager';
import { NO_FILTER } from '../filters/no-filter';
import { initializeFilters } from '../filters/filters-initialization-util';
import { GridProperties } from '../grid-properties';
import { LoadedTournament } from '../csv/loaded-tournament';

export const initUiSelectionsContext = (
  initialConfig: GridProperties,
  tournament: LoadedTournament
): UiSelectionsManager => {
  const uiSelections = new UiSelectionsManager();
  const isInteractive =
    initialConfig.interactive !== undefined ? initialConfig.interactive : true;
  uiSelections.interactive = isInteractive;
  uiSelections.filterActive = NO_FILTER;
  uiSelections.filtersEnabled = initializeFilters(tournament);
  uiSelections.order = 'asc';
  uiSelections.orderBy = tournament.rankColumn;
  uiSelections.orderEnabledColumns = tournament.orderingEnabledOn;
  uiSelections.selectedRow = undefined;
  uiSelections.shownColumns = tournament.columns.filter(column => !column.hidden);
  return uiSelections;
};