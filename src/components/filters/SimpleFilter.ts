import { Filter } from './Filter';


export class SimpleFilter implements Filter {

  public readonly name: string;

  private _filteredValue: string | undefined;

  private _filteredColumnIndex: number;

  constructor(name: string) {
    this.name = name;
    this._filteredColumnIndex = -1;
    this._filteredValue = undefined;
  }

  public set filteredValue(value: string | undefined) {
    this._filteredValue = value;
  }

  public set filteredColumnIndex(index: number) {
    this._filteredColumnIndex = index;
  }

  public shouldShowRow(row: Array<any>): boolean {
    if (!row || row.length === 0) {
      return false;
    }
    if (!this._filteredValue ||
      this._filteredColumnIndex < 0 ||
      this._filteredColumnIndex >= row.length) {
      return true;
    }
    return row[this._filteredColumnIndex] === this._filteredValue;
  }

}