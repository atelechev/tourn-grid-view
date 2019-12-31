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
});
