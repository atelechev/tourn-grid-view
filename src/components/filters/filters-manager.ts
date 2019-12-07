import { Filter, VALUE_NO_FILTER } from './filter';
import { NoFilter } from './no-filter';
import { SimpleFilter } from './simple-filter';
import { Csv } from '../csv/csv';
import RatingFilter from './rating-filter';
import { COLUMN_RATING } from '../columns/column-utils';

export class FiltersManager {
  private readonly _noFilter: Filter;

  private _activeFilter: Filter;

  private readonly _enabledFilters: Map<string, Filter>;

  constructor(private _csv: Csv) {
    if (!this._csv || !this._csv.header || this._csv.header.length === 0) {
      throw Error(
        'CSV and its header must be defined and not empty for filters initialization.'
      );
    }
    this._noFilter = new NoFilter();
    this._activeFilter = this._noFilter;
    this._enabledFilters = new Map<string, Filter>();
  }

  public enableFilters(filterNames: Array<string>): void {
    this._enabledFilters.clear();
    filterNames.forEach(filterName => {
      const columnIndex = this._csv.header.findIndex(
        colName => colName === filterName
      );
      if (columnIndex < 0) {
        console.warn(
          `Filter ${filterName} not found among CSV columns. Skipping it.`
        );
      } else {
        const filter = this.initFilter(filterName);
        filter.filteredColumnIndex = columnIndex;
        filter.selectableOptions = this._csv.data.map(row => row[columnIndex]);
        this._enabledFilters.set(filterName, filter);
      }
    });
    this._enabledFilters.set(this._noFilter.name, this._noFilter);
  }

  private initFilter(filterName: string): SimpleFilter | RatingFilter {
    if (filterName === COLUMN_RATING) {
      return new RatingFilter();
    }
    return new SimpleFilter(filterName);
  }

  public get activeFilter(): Filter {
    return this._activeFilter;
  }

  public get isFilterSelected(): boolean {
    return this._activeFilter !== this._noFilter;
  }

  public useFilter(filterName: string): void {
    if (!filterName || filterName === VALUE_NO_FILTER) {
      this._activeFilter = this._noFilter;
    } else if (this._enabledFilters.has(filterName)) {
      this._activeFilter = this._enabledFilters.get(filterName) as Filter;
    } else {
      console.warn(`Unexpected filter '${filterName}', skipping it.`);
      this._activeFilter = this._noFilter;
    }
  }

  public get availableFilters(): Array<string> {
    return Array.from(this._enabledFilters.keys());
  }
}
