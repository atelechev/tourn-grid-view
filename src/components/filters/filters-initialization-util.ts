import { Filter } from './filter';
import { SimpleFilter } from './simple-filter';
import RatingFilter from './rating-filter';
import { LoadedTournament } from '../csv/loaded-tournament';
import { Column } from '../columns/column';

const initFilter = (column: Column): SimpleFilter | RatingFilter => {
  if (column.hasSemantics('rating')) {
    return new RatingFilter();
  }
  return new SimpleFilter(column.name);
};

export const initializeFilters = (tournament: LoadedTournament): Array<Filter> => {
  if (!tournament) {
    throw Error('tournament must be defined for filters initialization.');
  }
  return tournament.filteringEnabledOn
    .map(column => {
      const filter = initFilter(column);
      filter.filteredColumnIndex = column.index;
      filter.selectableOptions = tournament.data.map(row => row[column.index]);
      return filter;
    })
    .filter(f => f !== undefined);
};
