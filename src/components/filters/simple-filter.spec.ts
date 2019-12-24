import { SimpleFilter } from './simple-filter';

describe('SimpleFilter', () => {
  const sampleRow = [1, 'Test', 'FRA', '+2W', '+3B', '+4W', '=5B', '+6W', 4.5];

  it('get selectedValue should return --- by default', () => {
    expect(new SimpleFilter('test').selectedValue).toEqual('---');
  });

  it('get selectableOptions should return an empty array by default', () => {
    expect(new SimpleFilter('test').selectableOptions).toEqual([]);
  });

  it('set selectableOptions should take only sorted unique items and prepend ---', () => {
    const filter = new SimpleFilter('test');
    filter.selectableOptions = [2, 3, 2, 2, 3, 1, 3, 2];
    expect(filter.selectableOptions).toEqual(['---', 1, 2, 3]);
  });

  it('shouldShowRow should return false if arg is undefined', () => {
    const filter = new SimpleFilter('test');
    expect(filter.shouldShowRow(undefined)).toBe(false);
  });

  it('shouldShowRow should return false if arg is an empty array', () => {
    const filter = new SimpleFilter('test');
    expect(filter.shouldShowRow([])).toBe(false);
  });

  it('shouldShowRow should return true if filtered value is not defined', () => {
    const filter = new SimpleFilter('test');
    filter.selectedValue = undefined;
    filter.filteredColumnIndex = 2;
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return true if filtered value is no filter', () => {
    const filter = new SimpleFilter('test');
    filter.selectedValue = '---';
    filter.filteredColumnIndex = 2;
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return true if filteredColumnIndex is not set', () => {
    const filter = new SimpleFilter('test');
    filter.selectedValue = 'GER';
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return true if filteredColumnIndex is >= than the length of the row array', () => {
    const filter = new SimpleFilter('test');
    filter.selectedValue = 'GER';
    filter.filteredColumnIndex = sampleRow.length;
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return true if selected value equals the value of the filtered column', () => {
    const filter = new SimpleFilter('test');
    filter.selectedValue = 'FRA';
    filter.filteredColumnIndex = 2;
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return false if selected value is different from the value of the filtered column', () => {
    const filter = new SimpleFilter('test');
    filter.selectedValue = 'GER';
    filter.filteredColumnIndex = 2;
    expect(filter.shouldShowRow(sampleRow)).toBe(false);
  });
});
