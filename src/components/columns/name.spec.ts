import { isNameColumn } from './name';

describe('isNameColumn', () => {
  it('should return true for Name', () => {
    expect(isNameColumn('Name')).toBe(true);
  });

  it('should return true for Name ignore case', () => {
    expect(isNameColumn('name')).toBe(true);
  });

  it('should return true for Name with leading and trailing spaces', () => {
    expect(isNameColumn(' Name ')).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isNameColumn(undefined)).toBe(false);
  });

  it('should return false for another value', () => {
    expect(isNameColumn('x')).toBe(false);
  });

});