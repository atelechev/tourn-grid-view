import { Filter } from '../filters/filter';
import { Order } from './order';
import { NO_FILTER } from '../filters/no-filter';
import { COLUMN_PLACE } from '../columns/names';
import { SortDirection } from '@material-ui/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class UiSelectionsManager {

  private _interactive: boolean;

  private _filterActive: Filter;

  private _filtersEnabled: Array<Filter>;

  private _order: Order;

  private _orderBy: string;

  private _orderEnabledColumns: Array<string>;

  private _selectedRow: Array<any> | undefined;

  private _shownColumns: Array<string>;

  private readonly _broadcastFilterTypeChanges: BehaviorSubject<string>;
  private readonly _broadcastFilterTypeChanges$: Observable<string>;

  private readonly _broadcastFilterItemChanges: BehaviorSubject<any>;
  private readonly _broadcastFilterItemChanges$: Observable<any>;

  private readonly _broadcastShownColumnChanges: BehaviorSubject<Array<string>>;
  private readonly _broadcastShownColumnChanges$: Observable<Array<string>>;

  private readonly _broadcastSortColumnChanges: BehaviorSubject<string>;
  private readonly _broadcastSortColumnChanges$: Observable<string>;

  private readonly _broadcastRowSelectionChanges: BehaviorSubject<Array<any>>;
  private readonly _broadcastRowSelectionChanges$: Observable<Array<any>>;


  constructor() {
    this._interactive = true;
    this._filterActive = NO_FILTER;
    this._filtersEnabled = [];
    this._order = 'desc';
    this._orderBy = COLUMN_PLACE;
    this._orderEnabledColumns = [];
    this._selectedRow = undefined;
    this._shownColumns = [];

    this._broadcastShownColumnChanges = new BehaviorSubject<Array<string>>(this._shownColumns);
    this._broadcastShownColumnChanges$ = this._broadcastShownColumnChanges.asObservable();

    this._broadcastFilterTypeChanges = new BehaviorSubject<string>(this._filterActive.name);
    this._broadcastFilterTypeChanges$ = this._broadcastFilterTypeChanges.asObservable();

    this._broadcastFilterItemChanges = new BehaviorSubject<any>(this._filterActive.selectedValue);
    this._broadcastFilterItemChanges$ = this._broadcastFilterItemChanges.asObservable();

    this._broadcastSortColumnChanges = new BehaviorSubject<string>(this._orderBy);
    this._broadcastSortColumnChanges$ = this._broadcastSortColumnChanges.asObservable();

    this._broadcastRowSelectionChanges = new BehaviorSubject<Array<any>>(this._selectedRow);
    this._broadcastRowSelectionChanges$ = this._broadcastRowSelectionChanges.asObservable();
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

  public set filterByItem(item: any) {
    this._filterActive.selectedValue = item;
    this._selectedRow = undefined;
    this._broadcastFilterItemChanges.next(item);
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
    this._broadcastRowSelectionChanges.next(this._selectedRow);
  }

  public get selectedRow(): Array<any> | undefined {
    return this._selectedRow;
  }

  public set shownColumns(sc: Array<string>) {
    this._shownColumns = sc;
    this._broadcastShownColumnChanges.next(this._shownColumns);
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

  public applyOrderBy(columnName: string): void {
    if (!this._interactive || !this.isSortEnabledOn(columnName)) {
      return;
    }
    this.inverseSortOrder();
    this._orderBy = columnName;
    this._broadcastSortColumnChanges.next(this._orderBy);
  }

  public inverseSortOrder(): void {
    this._order = this._order === 'desc' ? 'asc' : 'desc';
  }

  public toggleRowSelection(row: Array<any>): void {
    if (!this._interactive) {
      return;
    }
    if (row === this._selectedRow) {
      this.selectedRow = undefined;
    } else {
      this._filterActive = NO_FILTER;
      this.selectedRow = row;
    }
  }

  public useFilter(filterName: string): void {
    this.filterActive = this._filtersEnabled.find(
      filter => filter.name === filterName
    ) || NO_FILTER;
    this._broadcastFilterTypeChanges.next(this._filterActive.name);
  }

  public get broadcastShownColumnChanges$(): Observable<Array<string>> {
    return this._broadcastShownColumnChanges$;
  }

  public get broadcastFilterTypeChanges$(): Observable<string> {
    return this._broadcastFilterTypeChanges$;
  }

  public get broadcastFilterItemChanges$(): Observable<any> {
    return this._broadcastFilterItemChanges$;
  }

  public get broadcastSortColumnChanges$(): Observable<string> {
    return this._broadcastSortColumnChanges$;
  }

  public get broadcastRowSelectionChanges$(): Observable<Array<any>> {
    return this._broadcastRowSelectionChanges$;
  }

}
