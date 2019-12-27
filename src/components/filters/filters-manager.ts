import { Filter, VALUE_NO_FILTER } from './filter';
import { SimpleFilter } from './simple-filter';
import { Csv } from '../csv/csv';
import RatingFilter from './rating-filter';
import { isRatingColumn } from '../columns/rating';
import { NO_FILTER } from './no-filter';

export class FiltersManager {
  private _activeFilter: Filter;

  private readonly _enabledFilters: Map<string, Filter>;

  constructor(private _csv: Csv) {
    if (!this._csv || !this._csv.header || this._csv.header.length === 0) {
      throw Error(
        'CSV and its header must be defined and not empty for filters initialization.'
      );
    }
    this._activeFilter = NO_FILTER;
    this._enabledFilters = new Map<string, Filter>();
  }

  public enableFilters(filterNames: Array<string>): void {
    this._enabledFilters.clear();
    filterNames.forEach(filterName => {
      const filterNameNormalized = filterName.trim().toLowerCase();
      const columnIndex = this._csv.header.findIndex(
        colName => colName.trim().toLowerCase() === filterNameNormalized
      );
      if (columnIndex < 0) {
        console.warn(
          `Filter ${filterName} not found among CSV columns. Skipping it.`
        );
      } else {
        const filter = this.initFilter(filterNameNormalized);
        filter.filteredColumnIndex = columnIndex;
        filter.selectableOptions = this._csv.data.map(row => row[columnIndex]);
        this._enabledFilters.set(filterNameNormalized, filter);
      }
    });
    this._enabledFilters.set(NO_FILTER.name, NO_FILTER);
  }

  private initFilter(filterName: string): SimpleFilter | RatingFilter {
    if (isRatingColumn(filterName)) {
      return new RatingFilter();
    }
    return new SimpleFilter(filterName);
  }

  public get activeFilter(): Filter {
    return this._activeFilter;
  }

  public get isFilterSelected(): boolean {
    return this._activeFilter !== NO_FILTER;
  }

  public useFilter(filterName: string): void {
    if (!filterName || filterName === VALUE_NO_FILTER) {
      this._activeFilter = NO_FILTER;
      return;
    }
    const filterNormalized = filterName.trim().toLowerCase();
    this._activeFilter =
      (this._enabledFilters.get(filterNormalized) as Filter) || NO_FILTER;
  }

  public get availableFilters(): Array<string> {
    return Array.from(this._enabledFilters.keys());
  }
}
