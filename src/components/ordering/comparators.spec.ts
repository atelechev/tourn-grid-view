import { compareOptionalValues } from './comparators';

describe('compareOptionalValues', () => {
  it('should return 0 if both values are undefined', () => {
    expect(compareOptionalValues(undefined, undefined)).toEqual(0);
  });

  it('should return -1 if first arg is undefined and second arg is defined', () => {
    expect(compareOptionalValues('a', undefined)).toEqual(-1);
  });

  it('should return 1 if first arg is defined and second arg is undefined', () => {
    expect(compareOptionalValues(undefined, 'b')).toEqual(1);
  });

  it('should return 0 if both args are equal numbers', () => {
    expect(compareOptionalValues(100, 100)).toEqual(0);
  });

  it('should return 1 if both args are equal numbers, first is greater than second', () => {
    expect(compareOptionalValues(100, 10)).toEqual(1);
  });

  it('should return -1 if both args are equal numbers, second is greater than first', () => {
    expect(compareOptionalValues(10, 100)).toEqual(-1);
  });

  it('should return 0 if first arg is a string, second is a number and both equal as strings', () => {
    expect(compareOptionalValues('100', 100)).toEqual(0);
  });

  it('should return 0 if first arg is a number, second is a string and both equal as strings', () => {
    expect(compareOptionalValues(100, '100')).toEqual(0);
  });

  it('should return 1 if first arg is a string, second is a number and first is greater as strings', () => {
    expect(compareOptionalValues('100', 10)).toEqual(1);
  });

  it('should return -1 if first arg is a string, second is a number and first is lower as strings', () => {
    expect(compareOptionalValues('10', 100)).toEqual(-1);
  });

  it('should return -1 if first arg is a number, second is a string and second is greater as strings', () => {
    expect(compareOptionalValues(10, '100')).toEqual(-1);
  });

  it('should return 1 if first arg is a number, second is a string and second is lower as strings', () => {
    expect(compareOptionalValues(100, '10')).toEqual(1);
  });

  it('should return 0 if both args are strings and are equal', () => {
    expect(compareOptionalValues('a', 'a')).toEqual(0);
  });

  it('should return 1 if both args are strings and first is greater', () => {
    expect(compareOptionalValues('b', 'a')).toEqual(1);
  });

  it('should return -1 if both args are strings and second is greater', () => {
    expect(compareOptionalValues('a', 'b')).toEqual(-1);
  });
});
