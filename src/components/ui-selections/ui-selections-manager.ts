import { Filter, VALUE_NO_FILTER } from '../filters/filter';
import { Order } from './order';
import { NO_FILTER } from '../filters/no-filter';
import { COLUMN_PLACE } from '../columns/names';
import { SortDirection } from '@material-ui/core';

export class UiSelectionsManager {
  private _interactive: boolean;
  private _filterActive: Filter;
  private _filtersEnabled: Array<Filter>;
  private _order: Order;
  private _orderBy: string;
  private _orderEnabledColumns: Array<string>;
  private _selectedRow: Array<any> | undefined;
  private _shownColumns: Array<string>;

  constructor() {
    this._interactive = true;
    this._filterActive = NO_FILTER;
    this._filtersEnabled = [];
    this._order = 'desc';
    this._orderBy = COLUMN_PLACE;
    this._orderEnabledColumns = [];
    this._selectedRow = undefined;
    this._shownColumns = [];
  }

  public set interactive(isInteractive: boolean) {
    this._interactive = isInteractive;
  }

  public get interactive(): boolean {
    return this._interactive;
  }

  public set filterActive(fActive: Filter) {
    if (!fActive) {
      this._filterActive = NO_FILTER;
    } else {
      const isEnabled = this._filtersEnabled.findIndex(f => f === fActive) > -1;
      this._filterActive = isEnabled ? fActive : NO_FILTER;
    }
  }

  public get filterActive(): Filter {
    return this._filterActive;
  }

  public set filtersEnabled(fEnabled: Array<Filter>) {
    this._filtersEnabled = fEnabled;
  }

  public get filtersEnabled(): Array<Filter> {
    return this._filtersEnabled;
  }

  public set order(ordr: Order) {
    this._order = ordr;
  }

  public get order(): Order {
    return this._order;
  }

  public set orderBy(ordrBy: string) {
    this._orderBy = ordrBy;
  }

  public get orderBy(): string {
    return this._orderBy;
  }

  public set orderEnabledColumns(oec: Array<string>) {
    this._orderEnabledColumns = oec;
  }

  public get orderEnabledColumns(): Array<string> {
    return this._orderEnabledColumns;
  }

  public set selectedRow(selectedRow: Array<any> | undefined) {
    this._selectedRow = selectedRow;
  }

  public get selectedRow(): Array<any> | undefined {
    return this._selectedRow;
  }

  public set shownColumns(sc: Array<string>) {
    this._shownColumns = sc;
  }

  public get shownColumns(): Array<string> {
    return this._shownColumns;
  }

  public getSortDirection(columnName: string): SortDirection {
    if (!this._interactive) {
      return false;
    }
    if (this._orderBy === columnName) {
      return this._order;
    }
    return false;
  }

  public isSortEnabledOn(columnName: string): boolean {
    if (!this._interactive) {
      return false;
    }
    return (
      this._orderEnabledColumns.findIndex(
        sortableColumn => sortableColumn === columnName
      ) > -1
    );
  }

  public isSortActive(columnName: string): boolean {
    return this._interactive && this._orderBy === columnName;
  }

  public applyOrderBy(columnName: string): boolean {
    if (!this._interactive || !this.isSortEnabledOn(columnName)) {
      return false;
    }
    this.inverseSortOrder();
    this._orderBy = columnName;
    return true;
  }

  public inverseSortOrder(): void {
    this._order = this._order === 'desc' ? 'asc' : 'desc';
  }

  public toggleRowSelection(row: Array<any>): boolean {
    if (!this._interactive) {
      return false;
    }
    if (row === this._selectedRow) {
      this._selectedRow = undefined;
    } else {
      this._selectedRow = row;
      this._filterActive = NO_FILTER;
    }
    return true;
  }

  public useFilter(filterName: string): void {
    this.filterActive = this._filtersEnabled.find(
      filter => filter.name === filterName
    );
  }
}
