import { normalizeColumn } from './data-utils';

describe('normalizeColumn', () => {
  it('should return undefined if arg is undefined', () => {
    expect(normalizeColumn(undefined)).toBeUndefined();
  });

  it('should return undefined if arg contains only spaces', () => {
    expect(normalizeColumn('   ')).toBeUndefined();
  });

  it('should return a trimmed string if arg contains leading or trailing spaces', () => {
    expect(normalizeColumn(' aaa ')).toEqual('aaa');
  });

  it('should return a lowercased string if arg contains upper case characters', () => {
    expect(normalizeColumn('AAA')).toEqual('aaa');
  });
});
