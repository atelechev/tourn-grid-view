import { extractOpponentPlaces, normalizeColumn } from './data-utils';
import { DataManager } from './data-manager';

describe('extractOpponentPlaces', () => {
  const csv = new DataManager();
  csv.header = ['pos', 'name', 'r1', 'r2', 'r3', 'r4', 'r5', 'pts'];
  csv.data = [
    [1, 'A', '+7B', '+5W', '=2B', '+4W', '=3B', 4],
    [2, 'B', '-3B', '+8W', '=1W', '+5B', '+4W', 3.5],
    [3, 'C', '+2W', '-4B', '=6W', '+7B', '=1W', 3],
    [4, 'D', '+6B', '+3W', '+8W', '-1B', '-2B', 3],
    [5, 'E', '+8B', '-1B', '=7W', '-2W', '+6B', 2.5],
    [6, 'F', '-4W', '+7B', '=3B', '=8W', '-5W', 2],
    [7, 'G', '-1W', '-6W', '=5B', '-3W', '+8B', 1.5],
    [8, 'H', '-5W', '-2B', '-4B', '=6B', '-7W', 0.5]
  ];

  it('should return an empty set if selectedRow is undefined', () => {
    expect(extractOpponentPlaces(undefined, csv)).toEqual(new Set());
  });

  it('should return an empty set if selectedRow is empty', () => {
    expect(extractOpponentPlaces([], csv)).toEqual(new Set());
  });

  it('should return an expected set for a valid selected row', () => {
    expect(extractOpponentPlaces(csv.data[0], csv)).toEqual(
      new Set([7, 5, 2, 4, 3])
    );
    expect(extractOpponentPlaces(csv.data[1], csv)).toEqual(
      new Set([3, 8, 1, 5, 4])
    );
    expect(extractOpponentPlaces(csv.data[2], csv)).toEqual(
      new Set([2, 4, 6, 7, 1])
    );
    expect(extractOpponentPlaces(csv.data[3], csv)).toEqual(
      new Set([6, 3, 8, 1, 2])
    );
    expect(extractOpponentPlaces(csv.data[4], csv)).toEqual(
      new Set([8, 1, 7, 2, 6])
    );
  });
});

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
