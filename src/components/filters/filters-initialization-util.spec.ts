import { initializeFilters } from './filters-initialization-util';
import { Filter } from './filter';
import { DataManager } from '../csv/data-manager';

describe('initializeFilters', () => {
  const sampleCsv = new DataManager();
  sampleCsv.header = ['pos', 'name', 'fed', 'rating'];
  sampleCsv.data = [
    [1, 'Player A', 'FRA', 1960],
    [2, 'Player B', 'GER', 1940],
    [3, 'Player C', 'BRA', 2105]
  ];

  it('should throw expected error if the csv arg is undefined', () => {
    const message = 'csv must be defined for filters initialization.';
    expect(() => initializeFilters(['fed', 'rating'], undefined)).toThrow(
      message
    );
  });

  it('should return an empty array if the filterNames arg is undefined', () => {
    expect(initializeFilters(undefined, sampleCsv)).toEqual([]);
  });

  it('should return an empty array if the filterNames arg is empty', () => {
    expect(initializeFilters([], sampleCsv)).toEqual([]);
  });

  const ensureFilterExpected = (
    checked: Filter,
    expName: string,
    expOptions: Array<any>
  ): void => {
    expect(checked).toBeTruthy();
    expect(checked.name).toEqual(expName);
    expect(checked.selectableOptions).toEqual(expOptions);
  };

  it('should return expected filters for valid args', () => {
    const filters = initializeFilters(['fed', 'rating'], sampleCsv);
    expect(filters).toBeTruthy();
    expect(filters.length).toEqual(2);
    ensureFilterExpected(filters[0], 'fed', ['---', 'BRA', 'FRA', 'GER']);
    ensureFilterExpected(filters[1], 'rating', [
      '---',
      '1800 - 1999',
      '2000 - 2199'
    ]);
  });

  it('should initialize filters by name case insensitive', () => {
    const filters = initializeFilters(['FED'], sampleCsv);
    expect(filters).toBeTruthy();
    expect(filters.length).toEqual(1);
    ensureFilterExpected(filters[0], 'fed', ['---', 'BRA', 'FRA', 'GER']);
  });

  it('should skip empty identifiers', () => {
    const filters = initializeFilters(['FED', undefined, '   '], sampleCsv);
    expect(filters).toBeTruthy();
    expect(filters.length).toEqual(1);
    ensureFilterExpected(filters[0], 'fed', ['---', 'BRA', 'FRA', 'GER']);
  });
});
