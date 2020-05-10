import { Order } from '../ui-selections/order';
import { compareOptionalValues } from '../ordering/comparators';
import { Column } from '../columns/column';
import { RankColumn } from 'components/columns/rank-column';

const EMPTY_SET = new Set<number>();
const extractPositionRegex = /\d+/g;

export class LoadedTournament {

  private _columns: Array<Column>;

  private _rankColumn: RankColumn;

  private _roundColumns: Array<Column>;

  private _data: Array<Array<any>>;

  private readonly _rankingToRows: Map<number, Array<Array<any>>>;

  private readonly _rowsToRanking: Map<Array<Array<any>>, number>;

  private readonly _opponents: Map<number, Set<number>>;

  constructor() {
    this._columns = [];
    this._data = [];
    this._rankingToRows = new Map<number, Array<any>>();
    this._rowsToRanking = new Map<Array<any>, number>();
    this._opponents = new Map<number, Set<number>>();
    this._roundColumns = [];
    this._rankColumn = undefined;
  }

  private updateRoundColumns(): void {
    this._roundColumns = this._columns.filter(column => column && column.hasSemantics('round'));
  }

  private updateRankColumn(): void {
    this._rankColumn = this._columns.find(col => col.hasSemantics('rank'));
  }

  private ensureColumnsValid(columns: Array<Column>): void {
    if (!columns || columns.length === 0) {
      throw Error('columns must be a non-empty array.');
    }
    columns.forEach(column => {
      if (!column || column.name.trim().length === 0) {
        throw Error('columns must not contain undefined elements.');
      }
    });
  }

  private ensureColumnNamesUnique(columns: Array<Column>): void {
    const colNames = new Set(columns.map(col => col.name.toLowerCase()));
    if (columns.length !== colNames.size) {
      const names = columns.map(col => col.name).join(',');
      throw Error(`header column names must be unique, but found: ${names}`);
    }
  }

  public set columns(cls: Array<Column>) {
    this.ensureColumnsValid(cls);
    this.ensureColumnNamesUnique(cls);
    this._columns = cls;
    this.updateRankColumn();
    this.updateRoundColumns();
  }

  public get columns(): Array<Column> {
    return this._columns;
  }

  public get rankColumn(): Column {
    return this._rankColumn;
  }

  public get hiddenColumns(): Array<Column> {
    if (!this._columns) {
      return [];
    }
    return this._columns.filter(col => col.hidden);
  }

  public get orderingEnabledOn(): Array<Column> {
    if (!this._columns) {
      return [];
    }
    return this._columns.filter(col => col.canOrderBy);
  }

  public get filteringEnabledOn(): Array<Column> {
    if (!this._columns) {
      return [];
    }
    return this._columns.filter(col => col.canFilterOn);
  }

  public set data(dt: Array<Array<any>>) {
    if (!dt || dt.length === 0) {
      throw Error('data must not be undefined or empty');
    }
    const expectedColumnsCount = this._columns.length;
    dt.forEach(row => {
      if (!row || row.length !== expectedColumnsCount) {
        const rowSerialized = row ? row.join(',') : 'undefined';
        throw Error(
          `data rows must contain same number of elements than the header, but got: \'${rowSerialized}\'`
        );
      }
    });
    this._data = dt;
    this.updatePositionMaps();
    this.updateOpponentsMap();
  }

  private updatePositionMaps(): void {
    this._rankingToRows.clear();
    this._rowsToRanking.clear();
    this._data.forEach((row: Array<Array<any>>, index: number) => {
      this._rankingToRows.set(index, row);
      this._rowsToRanking.set(row, index);
    });
  }

  private updateOpponentsMap(): void {
    this._opponents.clear();
    this._rankingToRows.forEach((row: Array<Array<any>>, index: number) => {
      this._opponents.set(index, this.extractOpponents(row));
    });
  }

  private extractOpponents(row: Array<Array<any>>): Set<number> {
    const opponents = this._roundColumns
      .map(column => row[column.index])
      .filter(gameResult => !!gameResult)
      .map(gameResult => {
        const matchResult = gameResult.toString().match(extractPositionRegex);
        if (matchResult && matchResult.length > 0) {
          return parseInt(matchResult[0]);
        }
        return -1;
      })
      .filter(pos => pos > -1);
    return new Set(opponents);
  }

  public getPositionFor(row: Array<any>): number {
    if (this._rowsToRanking.has(row)) {
      return this._rowsToRanking.get(row);
    }
    return -1;
  }

  public getOpponentsFor(position: number): Set<number> {
    const opponents = this._opponents.get(position);
    if (!opponents) {
      return EMPTY_SET;
    }
    return opponents;
  }

  public get data(): Array<Array<any>> {
    return this._data;
  }

  public get roundColumns(): Array<Column> {
    return this._roundColumns;
  }

  public sort(column: Column, order: Order): void {
    if (!column || !order) {
      return;
    }
    this._data.sort((row1, row2) => {
      const compare = compareOptionalValues(
        row1[column.index],
        row2[column.index]
      );
      return order === 'desc' ? -compare : compare;
    });
  }
}
