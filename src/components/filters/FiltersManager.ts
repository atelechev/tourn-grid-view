import { Filter } from './Filter';
import { NoFilter } from './NoFilter';
import { SimpleFilter } from './SimpleFilter';
import { Csv } from '../Csv';


export class FiltersManager {

  private readonly _noFilter: Filter;

  private _activeFilter: Filter;

  private readonly _enabledFilters: Map<string, Filter>;

  constructor(private _csv: Csv) {
    if (!this._csv || !this._csv.header || this._csv.header.length === 0) {
      throw Error('CSV and its header must be defined and not empty for filters initialization.');
    }
    this._noFilter = new NoFilter();
    this._activeFilter = this._noFilter;
    this._enabledFilters = new Map<string, Filter>();
  }

  public enableFilters(filterNames: Array<string>): void {
    this._enabledFilters.clear();
    filterNames.forEach(filterName => {
      const columnIndex = this._csv.header.findIndex(colName => colName === filterName);
      if (columnIndex < 0) {
        console.warn(`Filter ${filterName} not found among CSV columns. Skipping it.`);
      } else {
        const filter = new SimpleFilter(filterName);
        filter.filteredColumnIndex = columnIndex;
        filter.filteredValue = undefined;
        this._enabledFilters.set(filterName, filter);
      }
    });
    this._enabledFilters.set(this._noFilter.name, this._noFilter);
  }

  public get activeFilter(): Filter {
    return this._activeFilter;
  }

  public useFilter(filterName: string): void {
    if (this._enabledFilters.has(filterName)) {
      this._activeFilter = (this._enabledFilters.get(filterName)) as Filter;
    } else {
      console.warn(`Unexpected filter '${filterName}', skipping it.`);
      this._activeFilter = this._noFilter;
    }
  }

  public get availableFilters(): Array<string> {
    return Array.from(this._enabledFilters.keys());
  }

}
