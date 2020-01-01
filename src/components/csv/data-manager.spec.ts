import { DataManager } from './data-manager';

describe('DataManager', () => {
  describe('constructor', () => {
    const dm = new DataManager();

    it('should create an instance with empty header and data', () => {
      expect(dm.header).toEqual([]);
      expect(dm.data).toEqual([]);
    });

    it('should set positionColumnIndex to -1', () => {
      expect(dm.positionColumnIndex).toEqual(-1);
    });

    it('should set roundColumns and roundColumnsIndices to []', () => {
      expect(dm.roundColumns).toEqual([]);
      expect(dm.roundColumnsIndices).toEqual([]);
    });
  });

  describe('set header', () => {
    const dm = new DataManager();

    it('should throw expected error if arg is undefined', () => {
      expect(() => (dm.header = undefined)).toThrow(
        'header must be a non-empty array.'
      );
    });

    it('should throw expected error if arg is empty', () => {
      expect(() => (dm.header = [])).toThrow(
        'header must be a non-empty array.'
      );
    });

    it('should throw expected error if arg contains an undefined element', () => {
      expect(() => (dm.header = ['a', undefined])).toThrow(
        "Empty and undefined values are not allowed in the CSV header: 'a,'"
      );
    });

    it('should throw expected error if arg contains an empty element', () => {
      expect(() => (dm.header = ['a', '  '])).toThrow(
        "Empty and undefined values are not allowed in the CSV header: 'a,  '"
      );
    });

    it('should set header to the expected value if arg is valid', () => {
      dm.header = ['a', 'b', 'c'];
      expect(dm.header).toEqual(['a', 'b', 'c']);
    });

    it('should trim the column names', () => {
      dm.header = [' a '];
      expect(dm.header).toEqual(['a']);
    });

    it('should make the column names lower case', () => {
      dm.header = [' A '];
      expect(dm.header).toEqual(['a']);
    });

    it('should update the index of position column', () => {
      expect(dm.positionColumnIndex).toEqual(-1);
      dm.header = ['a', 'pos'];
      expect(dm.positionColumnIndex).toEqual(1);
    });

    it('should update roundColumns', () => {
      expect(dm.roundColumns).toEqual([]);
      dm.header = ['pos', 'name', 'r1', 'r2', 'r3'];
      expect(dm.roundColumns).toEqual(['r1', 'r2', 'r3']);
    });

    it('should update roundColumnsIndices', () => {
      dm.header = ['pos', 'name'];
      expect(dm.roundColumnsIndices).toEqual([]);
      dm.header = ['pos', 'name', 'r1', 'r2', 'r3'];
      expect(dm.roundColumnsIndices).toEqual([2, 3, 4]);
    });
  });

  describe('set data', () => {
    const dm = new DataManager();

    it('should throw expected error if arg is undefined', () => {
      expect(() => (dm.data = undefined)).toThrow(
        'data must not be undefined or empty'
      );
    });

    it('should throw expected error if arg is empty', () => {
      expect(() => (dm.data = [])).toThrow(
        'data must not be undefined or empty'
      );
    });

    it('should throw expected error if arg has an undefined element', () => {
      dm.header = ['a', 'b', 'c'];
      expect(() => (dm.data = [undefined])).toThrow(
        "data rows must contain same number of elements than the header, but got: 'undefined'"
      );
    });

    it('should throw expected error if arg has less columns than the header', () => {
      dm.header = ['a', 'b', 'c'];
      expect(() => (dm.data = [[1, 'test']])).toThrow(
        "data rows must contain same number of elements than the header, but got: '1,test'"
      );
    });

    it('should throw expected error if arg has more columns than the header', () => {
      dm.header = ['a'];
      expect(() => (dm.data = [[1, 'test']])).toThrow(
        "data rows must contain same number of elements than the header, but got: '1,test'"
      );
    });

    it('should set the data to the expected value', () => {
      dm.header = ['a', 'b', 'c'];
      dm.data = [[1, 'test', 'X']];
      expect(dm.data).toBeTruthy();
      expect(dm.data[0]).toEqual([1, 'test', 'X']);
    });
  });

  describe('getColumnIndex', () => {
    const dm = new DataManager();

    it('should return -1 if arg is undefined', () => {
      expect(dm.getColumnIndex(undefined)).toEqual(-1);
    });

    it('should return -1 if arg is empty', () => {
      expect(dm.getColumnIndex('  ')).toEqual(-1);
    });

    it('should return -1 if column was not found', () => {
      dm.header = ['a', 'b', 'c'];
      expect(dm.getColumnIndex('d')).toEqual(-1);
    });

    it('should return expected value if column was found', () => {
      dm.header = ['a', 'b', 'c'];
      expect(dm.getColumnIndex('b')).toEqual(1);
    });
  });

  describe('sort', () => {
    it('does not have any effect if the column does not exist', () => {
      const dm = new DataManager();
      dm.header = ['pos', 'name'];
      dm.data = [
        [1, 'C'],
        [2, 'B'],
        [3, 'A']
      ];
      dm.sort('fed', 'asc');
      expect(dm.data[0]).toEqual([1, 'C']);
      expect(dm.data[1]).toEqual([2, 'B']);
      expect(dm.data[2]).toEqual([3, 'A']);
    });

    it('does not have any effect if order is undefined', () => {
      const dm = new DataManager();
      dm.header = ['pos', 'name'];
      dm.data = [
        [1, 'C'],
        [2, 'B'],
        [3, 'A']
      ];
      dm.sort('name', undefined);
      expect(dm.data[0]).toEqual([1, 'C']);
      expect(dm.data[1]).toEqual([2, 'B']);
      expect(dm.data[2]).toEqual([3, 'A']);
    });

    it('executed sorting in descending order', () => {
      const dm = new DataManager();
      dm.header = ['pos', 'name'];
      dm.data = [
        [1, 'C'],
        [2, 'B'],
        [3, 'A']
      ];
      dm.sort('pos', 'desc');
      expect(dm.data[0]).toEqual([3, 'A']);
      expect(dm.data[1]).toEqual([2, 'B']);
      expect(dm.data[2]).toEqual([1, 'C']);
    });

    it('executed sorting in ascending order', () => {
      const dm = new DataManager();
      dm.header = ['pos', 'name'];
      dm.data = [
        [1, 'C'],
        [2, 'B'],
        [3, 'A']
      ];
      dm.sort('name', 'asc');
      expect(dm.data[0]).toEqual([3, 'A']);
      expect(dm.data[1]).toEqual([2, 'B']);
      expect(dm.data[2]).toEqual([1, 'C']);
    });
  });

  describe('getOpponentsFor', () => {
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

    it('should return an empty set if position is undefined', () => {
      expect(csv.getOpponentsFor(undefined)).toEqual(new Set());
    });

    it('should return an empty set if position is negative', () => {
      expect(csv.getOpponentsFor(-1)).toEqual(new Set());
    });

    it('should return an expected set for a valid position', () => {
      expect(csv.getOpponentsFor(0)).toEqual(new Set([7, 5, 2, 4, 3]));
      expect(csv.getOpponentsFor(1)).toEqual(new Set([3, 8, 1, 5, 4]));
      expect(csv.getOpponentsFor(2)).toEqual(new Set([2, 4, 6, 7, 1]));
      expect(csv.getOpponentsFor(3)).toEqual(new Set([6, 3, 8, 1, 2]));
      expect(csv.getOpponentsFor(4)).toEqual(new Set([8, 1, 7, 2, 6]));
    });
  });

  describe('getPositionFor', () => {
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
      [8, 'H', '-5W', '-2B', '-4B', '=6B', '-7W', 0.5],
      [9, 'I', '<', null, null, null, null, 0]
    ];

    it('should return -1 for undefined arg', () => {
      expect(csv.getPositionFor(undefined)).toEqual(-1);
    });

    it('should return -1 for empty arg', () => {
      expect(csv.getPositionFor([])).toEqual(-1);
    });

    it('should return -1 if row does not exist', () => {
      expect(
        csv.getPositionFor([10, 'J', null, null, null, null, null, 0])
      ).toEqual(-1);
    });

    it('should return expected values for valid rows', () => {
      expect(csv.getPositionFor(csv.data[0])).toEqual(0);
      expect(csv.getPositionFor(csv.data[1])).toEqual(1);
      expect(csv.getPositionFor(csv.data[2])).toEqual(2);
      expect(csv.getPositionFor(csv.data[3])).toEqual(3);
      expect(csv.getPositionFor(csv.data[4])).toEqual(4);
      expect(csv.getPositionFor(csv.data[5])).toEqual(5);
      expect(csv.getPositionFor(csv.data[6])).toEqual(6);
      expect(csv.getPositionFor(csv.data[7])).toEqual(7);
      expect(csv.getPositionFor(csv.data[8])).toEqual(8);
    });
  });
});
