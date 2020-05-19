import { Filter, VALUE_NO_FILTER } from 'components/filters/filter';

export class SimpleFilter implements Filter {
  public readonly name: string;

  private _selectedValue: any;

  private _filteredColumnIndex: number;

  private _selectableOptions: Array<any>;

  constructor(name: string) {
    this.name = name;
    this._filteredColumnIndex = -1;
    this._selectedValue = VALUE_NO_FILTER;
    this._selectableOptions = [];
  }

  public set selectedValue(value: any) {
    this._selectedValue = value;
  }

  public get selectedValue(): any {
    return this._selectedValue;
  }

  public set filteredColumnIndex(index: number) {
    this._filteredColumnIndex = index;
  }

  public shouldShowRow(row: Array<any>): boolean {
    if (!row || row.length === 0) {
      return false;
    }
    if (
      !this._selectedValue ||
      this._selectedValue === VALUE_NO_FILTER ||
      this._filteredColumnIndex < 0 ||
      this._filteredColumnIndex >= row.length
    ) {
      return true;
    }
    return row[this._filteredColumnIndex] === this._selectedValue;
  }

  public get selectableOptions(): Array<any> {
    return this._selectableOptions;
  }

  public set selectableOptions(items: Array<any>) {
    const uniqueItems = new Set(items);
    const options = [VALUE_NO_FILTER].concat(Array.from(uniqueItems).sort());
    this._selectableOptions = options;
  }
}
