import { NoFilter } from './no-filter';

describe('NoFilter', () => {

  const filter = new NoFilter();

  it('shouldShowRow should return true for undefined arg', () => {
    expect(filter.shouldShowRow(undefined)).toBe(true);
  });

  it('shouldShowRow should return true for empty array arg', () => {
    expect(filter.shouldShowRow([])).toBe(true);
  });

  it('shouldShowRow should return true for non-empty array arg', () => {
    expect(filter.shouldShowRow([1, 'a', false])).toBe(true);
  });

  it('name should return expected value', () => {
    expect(filter.name).toEqual('---');
  });

  it('selectableOptions should return expected value', () => {
    expect(filter.selectableOptions).toEqual(['---']);
  });

  it('get selectedValue should return expected value', () => {
    expect(filter.selectedValue).toEqual('---');
  });

  it('set selectedValue should have no effect', () => {
    filter.selectedValue = 'x';
    expect(filter.selectedValue).toEqual('---');
  });

});
