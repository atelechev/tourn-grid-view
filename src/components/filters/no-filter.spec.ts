import { NO_FILTER } from './no-filter';

describe('NoFilter', () => {
  it('shouldShowRow should return true for undefined arg', () => {
    expect(NO_FILTER.shouldShowRow(undefined)).toBe(true);
  });

  it('shouldShowRow should return true for empty array arg', () => {
    expect(NO_FILTER.shouldShowRow([])).toBe(true);
  });

  it('shouldShowRow should return true for non-empty array arg', () => {
    expect(NO_FILTER.shouldShowRow([1, 'a', false])).toBe(true);
  });

  it('name should return expected value', () => {
    expect(NO_FILTER.name).toEqual('---');
  });

  it('selectableOptions should return expected value', () => {
    expect(NO_FILTER.selectableOptions).toEqual(['---']);
  });

  it('get selectedValue should return expected value', () => {
    expect(NO_FILTER.selectedValue).toEqual('---');
  });

  it('set selectedValue should have no effect', () => {
    NO_FILTER.selectedValue = 'x';
    expect(NO_FILTER.selectedValue).toEqual('---');
  });
});
