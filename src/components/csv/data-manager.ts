import { Csv } from './csv';
import { normalizeColumn } from './data-utils';
import { isPlaceColumn } from '../columns/place';
import { isRoundColumn } from '../columns/round';
import { Order } from '../ui-selections/order';
import { compareOptionalValues } from '../ordering/comparators';

const EMPTY_SET = new Set<number>();
const extractPositionRegex = /\d+/g;

export class DataManager implements Csv {
  private _header: Array<string>;

  private readonly _columnIndices: Map<string, number>;

  private _positionColumnIndex: number;

  private _roundColumns: Array<string>;

  private _roundColumnsIndices: Array<number>;

  private _data: Array<Array<any>>;

  private readonly _positionsToRows: Map<number, Array<Array<any>>>;

  private readonly _rowsToPositions: Map<Array<Array<any>>, number>;

  private readonly _opponents: Map<number, Set<number>>;

  constructor() {
    this._header = [];
    this._data = [];
    this._positionsToRows = new Map<number, Array<any>>();
    this._rowsToPositions = new Map<Array<any>, number>();
    this._opponents = new Map<number, Set<number>>();
    this._columnIndices = new Map<string, number>();
    this._positionColumnIndex = -1;
    this._roundColumns = [];
    this._roundColumnsIndices = [];
  }

  private cleanHeaderOrFail(hdr: Array<string>): Array<string> {
    return hdr.map(column => {
      const normalized = normalizeColumn(column);
      if (!normalized) {
        throw Error(
          `Empty and undefined values are not allowed in the CSV header: \'${hdr.join(
            ','
          )}\'`
        );
      }
      return normalized;
    });
  }

  private updateColumnIndices(): void {
    this._columnIndices.clear();
    this._header.forEach((column, index) => {
      this._columnIndices.set(column, index);
    });
  }

  private updatePositionColumnIndex(): void {
    const positionColumn = this._header.find(isPlaceColumn);
    if (positionColumn) {
      this._positionColumnIndex = this._columnIndices.get(positionColumn);
    } else {
      this._positionColumnIndex = -1;
    }
  }

  private updateRoundColumns(): void {
    this._roundColumns = this._header.filter(isRoundColumn);
  }

  private updateRoundColumnsIndices(): void {
    this._roundColumnsIndices = this._roundColumns.map(roundColumn =>
      this._columnIndices.get(roundColumn)
    );
  }

  public set header(hdr: Array<string>) {
    if (!hdr || hdr.length === 0) {
      throw Error('header must be a non-empty array.');
    }
    this._header = this.cleanHeaderOrFail(hdr);
    this.updateColumnIndices();
    this.updatePositionColumnIndex();
    this.updateRoundColumns();
    this.updateRoundColumnsIndices();
  }

  public get header(): Array<string> {
    return this._header;
  }

  public set data(dt: Array<Array<any>>) {
    if (!dt || dt.length === 0) {
      throw Error('data must not be undefined or empty');
    }
    const expectedColumnsCount = this._header.length;
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
    this._positionsToRows.clear();
    this._rowsToPositions.clear();
    this._data.forEach((row: Array<Array<any>>, index: number) => {
      this._positionsToRows.set(index, row);
      this._rowsToPositions.set(row, index);
    });
  }

  private updateOpponentsMap(): void {
    this._opponents.clear();
    this._positionsToRows.forEach((row: Array<Array<any>>, index: number) => {
      this._opponents.set(index, this.extractOpponents(row));
    });
  }

  private extractOpponents(row: Array<Array<any>>): Set<number> {
    const opponents = this._roundColumnsIndices
      .map(indexRoundColumn => row[indexRoundColumn])
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
    if (this._rowsToPositions.has(row)) {
      return this._rowsToPositions.get(row);
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

  public getColumnIndex(column: string): number {
    if (!column || !this._columnIndices.has(column)) {
      return -1;
    }
    return this._columnIndices.get(column);
  }

  public get positionColumnIndex(): number {
    return this._positionColumnIndex;
  }

  public get roundColumns(): Array<string> {
    return this._roundColumns;
  }

  public get roundColumnsIndices(): Array<number> {
    return this._roundColumnsIndices;
  }

  public sort(column: string, order: Order): void {
    const columnIndex = this.getColumnIndex(column);
    if (columnIndex < 0 || !order) {
      return;
    }
    this._data.sort((row1, row2) => {
      const compare = compareOptionalValues(
        row1[columnIndex],
        row2[columnIndex]
      );
      return order === 'desc' ? -compare : compare;
    });
  }
}
