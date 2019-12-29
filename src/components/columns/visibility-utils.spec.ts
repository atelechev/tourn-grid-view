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
  isColumnVisible,
  getColumnVisibilityStyle,
  calculateVisibleColumns,
  buildColumnsVisibilityMap
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

describe('isColumnVisible', () => {
  it('should return false if column is undefined and shownColumns are defined', () => {
    expect(isColumnVisible(undefined, ['pos', 'name'])).toBe(false);
  });

  it('should return false if column is defined, but shownColumns are undefined', () => {
    expect(isColumnVisible('Fed', undefined)).toBe(false);
  });

  it('should return true if the column is always visible', () => {
    expect(isColumnVisible('Pos', [])).toBe(true);
  });

  it('should return true if the column matches a shown column', () => {
    expect(isColumnVisible('Cat', ['fed', 'cat'])).toBe(true);
  });

  it('should return true if the column is a round column and Rounds are visible', () => {
    expect(isColumnVisible('R1', ['rounds'])).toBe(true);
  });

  it('should return false if the column is a round column and Rounds are not visible', () => {
    expect(isColumnVisible('R1', ['fed'])).toBe(false);
  });

  it('should return false if the column is not among the visible columns', () => {
    expect(isColumnVisible('Club', ['cat', 'fed'])).toBe(false);
  });
});

describe('getColumnVisibilityStyle', () => {
  it('should return hiddenStyle if column is undefined and shownColumns are defined', () => {
    expect(getColumnVisibilityStyle(undefined, ['pos', 'name'])).toEqual(
      hiddenStyle
    );
  });

  it('should return hiddenStyle if column is defined, but shownColumns are undefined', () => {
    expect(getColumnVisibilityStyle('Fed', undefined)).toEqual(hiddenStyle);
  });

  it('should return visibleStyle if the column is always visible', () => {
    expect(getColumnVisibilityStyle('Pos', [])).toEqual(visibleStyle);
  });

  it('should return visibleStyle if the column matches a shown column', () => {
    expect(getColumnVisibilityStyle('Cat', ['fed', 'cat'])).toEqual(
      visibleStyle
    );
  });

  it('should return visibleStyle if the column is a round column and Rounds are visible', () => {
    expect(getColumnVisibilityStyle('R1', ['rounds'])).toEqual(visibleStyle);
  });

  it('should return hiddenStyle if the column is a round column and Rounds are not visible', () => {
    expect(getColumnVisibilityStyle('R1', ['fed'])).toEqual(hiddenStyle);
  });

  it('should return hiddenStyle if the column is not among the visible columns', () => {
    expect(getColumnVisibilityStyle('Club', ['cat', 'fed'])).toEqual(
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

describe('buildColumnsVisibilityMap', () => {
  it('should return an empty map if allColumns arg is undefined', () => {
    expect(buildColumnsVisibilityMap(undefined, ['fed'])).toEqual(
      new Map<string, boolean>()
    );
  });

  it('should return an empty map if allColumns arg is empty', () => {
    expect(buildColumnsVisibilityMap([], ['fed'])).toEqual(
      new Map<string, boolean>()
    );
  });

  it('should return a map with all false values except always visible, if shownColumns arg is undefined', () => {
    const result = buildColumnsVisibilityMap(
      ['pos', 'name', 'fed', 'club'],
      undefined
    );
    expect(result).toEqual(
      new Map<string, boolean>([
        ['pos', true],
        ['name', true],
        ['fed', false],
        ['club', false]
      ])
    );
  });

  it('should return a map with all false values except always visible, if shownColumns arg is empty', () => {
    const result = buildColumnsVisibilityMap(
      ['pos', 'name', 'fed', 'club'],
      []
    );
    expect(result).toEqual(
      new Map<string, boolean>([
        ['pos', true],
        ['name', true],
        ['fed', false],
        ['club', false]
      ])
    );
  });

  it('should return a map of expected values', () => {
    const result = buildColumnsVisibilityMap(
      ['pos', 'name', 'fed', 'club', 'cat'],
      ['fed', 'cat']
    );
    expect(result).toEqual(
      new Map<string, boolean>([
        ['pos', true],
        ['name', true],
        ['fed', true],
        ['club', false],
        ['cat', true]
      ])
    );
  });
});
