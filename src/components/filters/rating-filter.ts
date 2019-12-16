import { Filter, VALUE_NO_FILTER } from './filter';
import { COLUMN_RATING } from '../columns/names';

export default class RatingFilter implements Filter {
  private readonly _allRatingGroups: Array<string> = [
    '<1000',
    '1000 - 1199',
    '1200 - 1399',
    '1400 - 1599',
    '1600 - 1799',
    '1800 - 1999',
    '2000 - 2199',
    '2200 - 2399',
    '2400 - 2599',
    '>2600'
  ];

  public readonly name = COLUMN_RATING;

  private _selectedValue: any;

  private _selectedIndex: number;

  private _filteredColumnIndex: number;

  private _selectableOptions: Array<any>;

  constructor() {
    this._filteredColumnIndex = -1;
    this._selectedValue = VALUE_NO_FILTER;
    this._selectedIndex = -1;
    this._selectableOptions = [];
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
    const groupIndex = this.getGroupIndexForRating(
      row[this._filteredColumnIndex]
    );
    return groupIndex === this._selectedIndex;
  }

  public set filteredColumnIndex(index: number) {
    this._filteredColumnIndex = index;
  }

  private getGroupIndexForRating(value: number): number {
    const dividedBy100 = Math.floor(value / 100);
    const rawIndex = Math.floor((dividedBy100 - 10) / 2);
    const inverseRatingMax = (rawIndex * 2 + 10) * 100;
    const diff = value - inverseRatingMax;
    const offset = diff >= 0 ? 1 : 0;
    return Math.min(
      Math.max(rawIndex + offset, 0),
      this._allRatingGroups.length - 1
    );
  }

  public get selectableOptions(): Array<any> {
    return this._selectableOptions;
  }

  public set selectableOptions(allItems: Array<any>) {
    const uniqueGroupIndices = new Set<number>();
    allItems.forEach(rating => {
      if (rating) {
        uniqueGroupIndices.add(this.getGroupIndexForRating(rating));
      }
    });
    const indicesOrdered = Array.from(uniqueGroupIndices).sort();
    this._selectableOptions = [VALUE_NO_FILTER];
    indicesOrdered.forEach(index =>
      this._selectableOptions.push(this._allRatingGroups[index])
    );
  }

  public set selectedValue(value: any) {
    this._selectedIndex = this._allRatingGroups.findIndex(
      group => group === value
    );
    if (this._selectedIndex > -1) {
      this._selectedValue = value;
    } else {
      this._selectedValue = VALUE_NO_FILTER;
    }
  }

  public get selectedValue(): any {
    return this._selectedValue;
  }
}
