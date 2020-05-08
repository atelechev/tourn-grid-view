import { initializeFilters } from './filters-initialization-util';
import { Filter } from './filter';
import { LoadedTournament } from '../csv/loaded-tournament';
import { buildColumn } from '../columns/column-factory';

describe('initializeFilters', () => {

  it('should throw expected error if the tournament arg is undefined', () => {
    const message = 'tournament must be defined for filters initialization.';
    expect(() => initializeFilters(undefined)).toThrow(
      message
    );
  });

  it('should return an empty array if no filters are defined in the data', () => {
    const sampleCsv = new LoadedTournament();
    sampleCsv.columns = [
      buildColumn('pos', 0),
      buildColumn('name', 1),
      buildColumn('fed', 2),
      buildColumn('rating', 3)
    ];
    expect(initializeFilters(sampleCsv)).toEqual([]);
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
    const sampleCsv = new LoadedTournament();
    sampleCsv.columns = [
      buildColumn('pos', 0),
      buildColumn('name', 1),
      buildColumn('fed|f', 2),
      buildColumn('rating|f', 3)
    ];
    sampleCsv.data = [
      [1, 'Player A', 'FRA', 1960],
      [2, 'Player B', 'GER', 1940],
      [3, 'Player C', 'BRA', 2105]
    ];
    const filters = initializeFilters(sampleCsv);
    expect(filters).toBeTruthy();
    expect(filters.length).toEqual(2);
    ensureFilterExpected(filters[0], 'fed', ['---', 'BRA', 'FRA', 'GER']);
    ensureFilterExpected(filters[1], 'rating', [
      '---',
      '1800 - 1999',
      '2000 - 2199'
    ]);
  });

});
