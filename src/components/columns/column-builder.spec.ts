import { newColumn } from './column-builder';
import { Column } from 'components/columns/column';

describe('newColumn', () => {

  it('should throw expected error if rawHeader arg is undefined', () => {
    expect(() => newColumn(undefined, 0)).toThrowError('rawHeader arg must not be undefined or empty');
  });

  it('should throw expected error if rawHeader arg is empty', () => {
    expect(() => newColumn('  ', 0)).toThrowError('rawHeader arg must not be undefined or empty');
  });

  it('should throw expected error if index arg is undefined', () => {
    expect(() => newColumn('test', undefined)).toThrowError('index arg must not be undefined or negative');
  });

  it('should throw expected error if index arg is negative', () => {
    expect(() => newColumn('test', -1)).toThrowError('index arg must not be undefined or negative');
  });

  it('should throw expected error if the header starts with a separator', () => {
    expect(() => newColumn('|test', 0)).toThrowError('the column name must not start with the separator character');
  });

  const assertColumnExpected = (checked: Column,
    expectedCode: string,
    expectedIndex: number,
    expectedHidden: boolean,
    expectedCanOrderBy: boolean,
    expectedCafilterOn: boolean): void => {

    expect(checked).toBeDefined();
    expect(checked.code).toEqual(expectedCode);
    expect(checked.index).toEqual(expectedIndex);
    expect(checked.hidden).toBe(expectedHidden);
    expect(checked.canOrderBy).toBe(expectedCanOrderBy);
    expect(checked.canFilterOn).toBe(expectedCafilterOn);
  }

  it('should return expected Column if there is no modifiers in the header', () => {
    const column = newColumn('Test', 0);
    assertColumnExpected(column, 'test', 0, false, false, false);
  });

  it('should return expected Column if there is no modifiers in the header, but the separator exists', () => {
    const column = newColumn('Test|', 0);
    assertColumnExpected(column, 'test', 0, false, false, false);
  });

  it('should return expected Column with hidden modifier', () => {
    const column = newColumn('Test|h', 0);
    assertColumnExpected(column, 'test', 0, true, false, false);
  });

  it('should return expected Column with orderBy modifier', () => {
    const column = newColumn('Test|o', 0);
    assertColumnExpected(column, 'test', 0, false, true, false);
  });

  it('should return expected Column with filterOn modifier', () => {
    const column = newColumn('Test|f', 0);
    assertColumnExpected(column, 'test', 0, false, false, true);
  });

  it('should return expected Column with all modifiers set', () => {
    const column = newColumn('Test|foh', 0);
    assertColumnExpected(column, 'test', 0, true, true, true);
  });

});
