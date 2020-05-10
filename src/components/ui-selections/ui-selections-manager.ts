import { Filter } from '../filters/filter';
import { Order } from './order';
import { NO_FILTER } from '../filters/no-filter';
import { SortDirection } from '@material-ui/core';
import { Column } from '../columns/column';
import { EventsHandler } from './events-handler';

export class UiSelectionsManager {
  private _interactive: boolean;

  private _showControlPanel: boolean;

  private _filterActive: Filter;

  private _filtersEnabled: Array<Filter>;

  private _order: Order;

  private _orderBy: Column;

  private _orderEnabledColumns: Array<Column>;

  private _selectedRow: Array<any> | undefined;

  private _shownColumns: Array<Column>;

  private readonly _eventsHandler: EventsHandler;

  constructor() {
    this._interactive = true;
    this._showControlPanel = false;
    this._filterActive = NO_FILTER;
    this._filtersEnabled = [];
    this._order = 'desc';
    this._orderBy = undefined;
    this._orderEnabledColumns = [];
    this._selectedRow = undefined;
    this._shownColumns = [];
    this._eventsHandler = new EventsHandler();
  }

  public get eventsHandler(): EventsHandler {
    return this._eventsHandler;
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
    if (!this._interactive) {
      return;
    }
    this._filterActive.selectedValue = item;
    this._selectedRow = undefined;
    this._eventsHandler.fireEvent('filter-item-change', item);
  }

  public set order(ordr: Order) {
    this._order = ordr;
  }

  public get order(): Order {
    return this._order;
  }

  public set orderBy(ordrBy: Column) {
    this._orderBy = ordrBy;
  }

  public get orderBy(): Column {
    return this._orderBy;
  }

  public set orderEnabledColumns(oec: Array<Column>) {
    this._orderEnabledColumns = oec;
  }

  public get orderEnabledColumns(): Array<Column> {
    return this._orderEnabledColumns;
  }

  public set selectedRow(selectedRow: Array<any> | undefined) {
    if (!this._interactive) {
      return;
    }
    this._selectedRow = selectedRow;
    this._eventsHandler.fireEvent('selected-row-change', this._selectedRow);
  }

  public get selectedRow(): Array<any> | undefined {
    return this._selectedRow;
  }

  public set shownColumns(sc: Array<Column>) {
    this._shownColumns = sc ? sc : [];
    this._eventsHandler.fireEvent('shown-columns-change', this._shownColumns);
  }

  public get shownColumns(): Array<Column> {
    return this._shownColumns;
  }

  private isAlwaysShown(column: Column): boolean {
    return column &&
      (column.hasSemantics('rank') || column.hasSemantics('name'));
  }

  public isShown(column: Column): boolean {
    // TODO maybe a pre-calculated map can be more performant
    if (!column) {
      return false;
    }
    return this.isAlwaysShown(column) ||
      this._shownColumns
        .findIndex(shown => shown.name === column.name) > -1;
  }

  public get showControlPanel(): boolean {
    return this._showControlPanel;
  }

  public set showControlPanel(show: boolean) {
    if (!this._interactive) {
      return;
    }
    this._showControlPanel = show;
    this._eventsHandler.fireEvent('control-panel-toggle', this._showControlPanel);
  }

  public getSortDirection(column: Column): SortDirection {
    if (!this._interactive) {
      return false;
    }
    if (this._orderBy === column) {
      return this._order;
    }
    return false;
  }

  public isSortEnabledOn(column: Column): boolean {
    if (!this._interactive) {
      return false;
    }
    return (
      this._orderEnabledColumns.findIndex(
        sortableColumn => sortableColumn === column
      ) > -1
    );
  }

  public isSortActive(column: Column): boolean {
    return this._interactive && this._orderBy === column;
  }

  public applyOrderBy(column: Column): void {
    if (!this._interactive || !this.isSortEnabledOn(column)) {
      return;
    }
    this.inverseSortOrder();
    this._orderBy = column;
    this._eventsHandler.fireEvent('sort-column-change', this._orderBy);
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
    this.filterActive =
      this._filtersEnabled.find(filter => filter.name === filterName) ||
      NO_FILTER;
    this._eventsHandler.fireEvent('filter-type-change', this._filterActive.name);
  }

}
