import { Csv } from './csv';
import { normalizeColumn } from './data-utils';
import { isPlaceColumn } from '../columns/place';
import { isRoundColumn } from '../columns/round';
import { Order } from '../ui-selections/order';
import { compareOptionalValues } from '../ordering/comparators';

export class DataManager implements Csv {
  private _header: Array<string>;

  private readonly _columnIndices: Map<string, number>;

  private _positionColumnIndex: number;

  private _roundColumns: Array<string>;

  private _roundColumnsIndices: Array<number>;

  private _data: Array<Array<any>>;

  constructor() {
    this._header = [];
    this._data = [];
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
