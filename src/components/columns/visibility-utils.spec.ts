import {
  COLUMN_PLACE,
  COLUMN_NAME,
  COLUMN_POINTS,
  COLUMN_ROUNDS,
  COLUMN_CATEGORY,
  COLUMN_CLUB,
  COLUMN_FEDERATION,
  COLUMN_RATING
} from './names';
import {
  isAlwaysVisibleColumn,
  calculateColumnVisibility,
  calculateVisibleColumns
} from './visibility-utils';
import { hiddenStyle, visibleStyle } from './column-styles';

describe('isAlwaysVisibleColumn', () => {
  it('should return true for Pos', () => {
    expect(isAlwaysVisibleColumn(COLUMN_PLACE)).toBe(true);
  });

  it('should return true for Name', () => {
    expect(isAlwaysVisibleColumn(COLUMN_NAME)).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isAlwaysVisibleColumn(undefined)).toBe(false);
  });

  it('should return false for Cat', () => {
    expect(isAlwaysVisibleColumn(COLUMN_CATEGORY)).toBe(false);
  });

  it('should return false for Club', () => {
    expect(isAlwaysVisibleColumn(COLUMN_CLUB)).toBe(false);
  });

  it('should return false for Fed', () => {
    expect(isAlwaysVisibleColumn(COLUMN_FEDERATION)).toBe(false);
  });

  it('should return false for Pts', () => {
    expect(isAlwaysVisibleColumn(COLUMN_POINTS)).toBe(false);
  });

  it('should return false for Rating', () => {
    expect(isAlwaysVisibleColumn(COLUMN_RATING)).toBe(false);
  });

  it('should return false for Rounds', () => {
    expect(isAlwaysVisibleColumn(COLUMN_ROUNDS)).toBe(false);
  });
});

describe('calculateColumnVisibility', () => {
  it('should return hiddenStyle if column is undefined and shownColumns are defined', () => {
    expect(calculateColumnVisibility(undefined, ['pos', 'name'])).toEqual(
      hiddenStyle
    );
  });

  it('should return hiddenStyle if column is defined, but shownColumns are undefined', () => {
    expect(calculateColumnVisibility('Fed', undefined)).toEqual(hiddenStyle);
  });

  it('should return visibleStyle if the column is always visible', () => {
    expect(calculateColumnVisibility('Pos', [])).toEqual(visibleStyle);
  });

  it('should return visibleStyle if the column matches a shown column', () => {
    expect(calculateColumnVisibility('Cat', ['fed', 'cat'])).toEqual(
      visibleStyle
    );
  });

  it('should return visibleStyle if the column is a round column and Rounds are visible', () => {
    expect(calculateColumnVisibility('R1', ['rounds'])).toEqual(visibleStyle);
  });

  it('should return hiddenStyle if the column is a round column and Rounds are not visible', () => {
    expect(calculateColumnVisibility('R1', ['fed'])).toEqual(hiddenStyle);
  });

  it('should return hiddenStyle if the column is not among the visible columns', () => {
    expect(calculateColumnVisibility('Club', ['cat', 'fed'])).toEqual(
      hiddenStyle
    );
  });
});

describe('calculateVisibleColumns', () => {
  it('should return an empty array if allColumns arg is undefined', () => {
    expect(calculateVisibleColumns(undefined, ['fed'])).toEqual([]);
  });

  it('should return an empty array if allColumns arg is empty', () => {
    expect(calculateVisibleColumns([], ['fed'])).toEqual([]);
  });

  it('should return an array with allColumns if hiddenColumns arg is undefined', () => {
    expect(calculateVisibleColumns(['name', 'fed', 'cat'], undefined)).toEqual([
      'name',
      'fed',
      'cat'
    ]);
  });

  it('should return an array with allColumns if hiddenColumns arg is empty', () => {
    expect(calculateVisibleColumns(['name', 'fed', 'cat'], [])).toEqual([
      'name',
      'fed',
      'cat'
    ]);
  });

  it('should return an empty array if allColumns contains all elements of hiddenColumns', () => {
    expect(
      calculateVisibleColumns(['name', 'fed', 'cat'], ['fed', 'cat', 'name'])
    ).toEqual([]);
  });

  it('should return an array with allColumns if hiddenColumns contains none of the elements of allColumns', () => {
    expect(
      calculateVisibleColumns(
        ['name', 'fed', 'cat'],
        ['club', 'rounds', 'rating']
      )
    ).toEqual(['name', 'fed', 'cat']);
  });

  it('should return the expected array if allColumns contains some of the elements of hiddenColumns', () => {
    expect(
      calculateVisibleColumns(['name', 'fed', 'club', 'cat'], ['club', 'fed'])
    ).toEqual(['name', 'cat']);
  });
});
