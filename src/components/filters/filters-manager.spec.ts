import { FiltersManager } from './filters-manager';
import { NO_FILTER } from './no-filter';

describe('FiltersManager', () => {
  const expectedInitErrorMessage =
    'CSV and its header must be defined and not empty for filters initialization.';

  const sampleCsv = {
    header: ['Pos', 'Name'],
    data: [
      [1, 'A'],
      [2, 'B']
    ]
  };

  it('should throw expected error if initialized with an undefined csv', () => {
    expect(() => new FiltersManager(undefined)).toThrow(
      expectedInitErrorMessage
    );
  });

  it('should throw expected error if initialized with an undefined csv header', () => {
    const csv = { header: undefined, data: [] };
    expect(() => new FiltersManager(csv)).toThrow(expectedInitErrorMessage);
  });

  it('should throw expected error if initialized with an empty csv header', () => {
    const csv = { header: [], data: [] };
    expect(() => new FiltersManager(csv)).toThrow(expectedInitErrorMessage);
  });

  it('activeFilter should be initialized with noFilter by default', () => {
    expect(new FiltersManager(sampleCsv).activeFilter).toEqual(NO_FILTER);
  });

  it('isFilterSelected should return false by default', () => {
    expect(new FiltersManager(sampleCsv).isFilterSelected).toBe(false);
  });

  it('availableFilters should return an empty array by default', () => {
    expect(new FiltersManager(sampleCsv).availableFilters).toEqual([]);
  });

  it('availableFilters should return expected filters when enableFilters was already called', () => {
    const filterManager = new FiltersManager(sampleCsv);
    filterManager.enableFilters(['Name']);
    expect(filterManager.availableFilters).toEqual(['name', '---']);
  });

  it('useFilter should set the active filter to one of enabled filters, by name case insensitive', () => {
    const filterManager = new FiltersManager(sampleCsv);
    filterManager.enableFilters(['Pos']);
    expect(filterManager.activeFilter.name).toEqual('---');
    filterManager.useFilter('POS');
    expect(filterManager.activeFilter.name).toEqual('pos');
  });

  it('useFilter should reset the active filter to noFilter if arg is undefined', () => {
    const filterManager = new FiltersManager(sampleCsv);
    filterManager.enableFilters(['Pos']);
    filterManager.useFilter('Pos');
    expect(filterManager.activeFilter.name).toEqual('pos');
    filterManager.useFilter(undefined);
    expect(filterManager.activeFilter.name).toEqual('---');
  });

  it('useFilter should reset the active filter to noFilter if arg does not match available filters', () => {
    const filterManager = new FiltersManager(sampleCsv);
    filterManager.enableFilters(['Pos']);
    filterManager.useFilter('Pos');
    expect(filterManager.activeFilter.name).toEqual('pos');
    filterManager.useFilter('Club');
    expect(filterManager.activeFilter.name).toEqual('---');
  });

  it('useFilter should reset the active filter to noFilter if arg is ---', () => {
    const filterManager = new FiltersManager(sampleCsv);
    filterManager.enableFilters(['Pos']);
    filterManager.useFilter('Pos');
    expect(filterManager.activeFilter.name).toEqual('pos');
    filterManager.useFilter('---');
    expect(filterManager.activeFilter.name).toEqual('---');
  });
});
