import { InitialConfig } from 'components/initial-config';
import { initializeFilters } from 'components/filters/filters-initialization-util';
import { LoadedTournament } from 'components/csv/loaded-tournament';
import { NO_FILTER } from 'components/filters/no-filter';
import { UiSelectionsManager } from 'components/ui-selections/ui-selections-manager';

export const initUiSelectionsContext = (
  initialConfig: InitialConfig,
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