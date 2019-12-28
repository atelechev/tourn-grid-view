import { Csv } from '../csv/csv';
import { Filter } from './filter';
import { SimpleFilter } from './simple-filter';
import RatingFilter from './rating-filter';
import { isRatingColumn } from '../columns/rating';

const initFilter = (filterName: string): SimpleFilter | RatingFilter => {
  if (isRatingColumn(filterName)) {
    return new RatingFilter();
  }
  return new SimpleFilter(filterName);
};

export const initializeFilters = (
  filterNames: Array<string>,
  csv: Csv
): Array<Filter> => {
  if (!csv) {
    throw Error('csv must be defined for filters initialization.');
  }
  if (!filterNames || filterNames.length === 0) {
    return [];
  }
  return filterNames
    .filter(name => !!name)
    .map(filterName => {
      const filterNameNormalized = filterName.trim().toLowerCase();
      const columnIndex = csv.header.findIndex(
        colName => colName === filterNameNormalized
      );
      if (columnIndex < 0) {
        return undefined;
      } else {
        const filter = initFilter(filterNameNormalized);
        filter.filteredColumnIndex = columnIndex;
        filter.selectableOptions = csv.data.map(row => row[columnIndex]);
        return filter;
      }
    })
    .filter(f => f !== undefined);
};
