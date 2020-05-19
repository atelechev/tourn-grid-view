import { buildColumn } from 'components/columns/column-factory';
import { LoadedTournament } from 'components/csv/loaded-tournament';

describe('LoadedTournament', () => {

  const testColumns = [
    buildColumn('pos', 0),
    buildColumn('name', 1),
    buildColumn('r1', 2),
    buildColumn('r2', 3),
    buildColumn('r3', 4)
  ];

  describe('constructor', () => {
    const dm = new LoadedTournament();

    it('should create an instance with empty columns and data', () => {
      expect(dm.columns).toEqual([]);
      expect(dm.data).toEqual([]);
    });

    it('should set roundColumns to []', () => {
      expect(dm.roundColumns).toEqual([]);
    });
  });

  describe('set columns', () => {
    const dm = new LoadedTournament();

    it('should throw expected error if arg is undefined', () => {
      expect(() => dm.columns = undefined).toThrow(
        'columns must be a non-empty array.'
      );
    });

    it('should throw expected error if arg is empty', () => {
      expect(() => dm.columns = []).toThrow(
        'columns must be a non-empty array.'
      );
    });

    it('should throw expected error if arg contains an undefined element', () => {
      expect(() => dm.columns = [buildColumn('test', 0), undefined]).toThrow(
        'columns must not contain undefined elements.'
      );
    });

    it('should throw expected error if arg contains non unique values, case insensitive', () => {
      const columns = [
        buildColumn('Pos', 0),
        buildColumn('Name', 1),
        buildColumn('NAME', 2),
        buildColumn('Fed', 3)
      ];
      expect(() => dm.columns = columns).toThrow(
        'header column names must be unique, but found: pos,name,name,fed'
      );
    });

    it('should set header to the expected value if arg is valid', () => {
      const cols = [
        buildColumn('pos', 0),
        buildColumn('name', 1),
        buildColumn('points', 2)
      ];
      dm.columns = cols;
      expect(dm.columns).toEqual(cols);
    });

    it('should update roundColumns', () => {
      expect(dm.roundColumns).toEqual([]);
      dm.columns = testColumns;
      expect(dm.roundColumns).toEqual(testColumns.slice(2));
    });
  });

  describe('set data', () => {
    const dm = new LoadedTournament();

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
      dm.columns = testColumns;
      expect(() => (dm.data = [undefined])).toThrow(
        "data rows must contain same number of elements than the header, but got: 'undefined'"
      );
    });

    it('should throw expected error if arg has less columns than the header', () => {
      dm.columns = testColumns;
      expect(() => (dm.data = [[1, 'test']])).toThrow(
        "data rows must contain same number of elements than the header, but got: '1,test'"
      );
    });

    it('should throw expected error if arg has more columns than the header', () => {
      dm.columns = [buildColumn('a', 0)];
      expect(() => (dm.data = [[1, 'test']])).toThrow(
        "data rows must contain same number of elements than the header, but got: '1,test'"
      );
    });

    it('should set the data to the expected value', () => {
      dm.columns = [buildColumn('a', 0), buildColumn('b', 1), buildColumn('c', 2)];
      dm.data = [[1, 'test', 'X']];
      expect(dm.data).toBeTruthy();
      expect(dm.data[0]).toEqual([1, 'test', 'X']);
    });
  });

  describe('rankColumn', () => {

    it('should be undefined by default', () => {
      const dm = new LoadedTournament();
      expect(dm.rankColumn).toBeUndefined();
    });

    it('should be initialized with expected value when the columns field is set', () => {
      const dm = new LoadedTournament();
      const cols = [buildColumn('pos', 0), buildColumn('name', 1)];
      dm.columns = cols;
      expect(dm.rankColumn).toEqual(cols[0]);
    });

    it('should be initialized with the first rank column', () => {
      const dm = new LoadedTournament();
      const cols = [buildColumn('rank', 0), buildColumn('pos', 1)];
      dm.columns = cols;
      expect(dm.rankColumn).toEqual(cols[0]);
    });

    it('should be undefined when the columns do not contain rank column', () => {
      const dm = new LoadedTournament();
      const cols = [buildColumn('name', 0), buildColumn('club', 1)];
      dm.columns = cols;
      expect(dm.rankColumn).toBeUndefined();
    });

  });

  describe('orderingEnabledOn', () => {

    it('should be empty by default', () => {
      const dm = new LoadedTournament();
      expect(dm.orderingEnabledOn).toEqual([]);
    });

    it('should be initialized with expected value when the columns field is set', () => {
      const dm = new LoadedTournament();
      const cols = [
        buildColumn('pos', 0),
        buildColumn('name|o', 1),
        buildColumn('rating|o', 2),
        buildColumn('fed', 3)
      ];
      dm.columns = cols;
      expect(dm.orderingEnabledOn).toEqual([cols[0], cols[1], cols[2]]);
    });

    it('should contain only rank column if no other column has ordering', () => {
      const dm = new LoadedTournament();
      const cols = [
        buildColumn('pos', 0),
        buildColumn('name', 1)
      ];
      dm.columns = cols;
      expect(dm.orderingEnabledOn).toEqual([cols[0]]);
    });

    it('should be empty if no columns have ordering', () => {
      const dm = new LoadedTournament();
      const cols = [
        buildColumn('club', 0),
        buildColumn('name', 1)
      ];
      dm.columns = cols;
      expect(dm.orderingEnabledOn).toEqual([]);
    });

  });

  describe('filteringEnabledOn', () => {

    it('should be empty by default', () => {
      const dm = new LoadedTournament();
      expect(dm.filteringEnabledOn).toEqual([]);
    });

    it('should be initialized with expected value when the columns field is set', () => {
      const dm = new LoadedTournament();
      const cols = [
        buildColumn('pos', 0),
        buildColumn('name|o', 1),
        buildColumn('rating|o', 2),
        buildColumn('fed|f', 3)
      ];
      dm.columns = cols;
      expect(dm.filteringEnabledOn).toEqual([cols[3]]);
    });

    it('should be empty if no columns have filtering', () => {
      const dm = new LoadedTournament();
      const cols = [
        buildColumn('club', 0),
        buildColumn('name', 1)
      ];
      dm.columns = cols;
      expect(dm.filteringEnabledOn).toEqual([]);
    });

  });

  describe('hiddenColumns', () => {

    it('should be empty by default', () => {
      const dm = new LoadedTournament();
      expect(dm.hiddenColumns).toEqual([]);
    });

    it('should be initialized with expected value when the columns field is set', () => {
      const dm = new LoadedTournament();
      const cols = [
        buildColumn('pos', 0),
        buildColumn('name', 1),
        buildColumn('rating|h', 2),
        buildColumn('fed|h', 3)
      ];
      dm.columns = cols;
      expect(dm.hiddenColumns).toEqual([cols[2], cols[3]]);
    });

    it('should be empty if no columns are hidden', () => {
      const dm = new LoadedTournament();
      const cols = [
        buildColumn('club', 0),
        buildColumn('name', 1)
      ];
      dm.columns = cols;
      expect(dm.hiddenColumns).toEqual([]);
    });

  });

  describe('sort', () => {
    it('does not have any effect if the column does not exist', () => {
      const dm = new LoadedTournament();
      dm.columns = [buildColumn('pos', 0), buildColumn('name', 1)];
      dm.data = [
        [1, 'C'],
        [2, 'B'],
        [3, 'A']
      ];
      dm.sort(buildColumn('fed', 2), 'asc');
      expect(dm.data[0]).toEqual([1, 'C']);
      expect(dm.data[1]).toEqual([2, 'B']);
      expect(dm.data[2]).toEqual([3, 'A']);
    });

    it('does not have any effect if order is undefined', () => {
      const dm = new LoadedTournament();
      dm.columns = [buildColumn('pos', 0), buildColumn('name', 1)];
      dm.data = [
        [1, 'C'],
        [2, 'B'],
        [3, 'A']
      ];
      dm.sort(buildColumn('name', 1), undefined);
      expect(dm.data[0]).toEqual([1, 'C']);
      expect(dm.data[1]).toEqual([2, 'B']);
      expect(dm.data[2]).toEqual([3, 'A']);
    });

    it('should execute sorting in descending order', () => {
      const dm = new LoadedTournament();
      dm.columns = [buildColumn('pos', 0), buildColumn('name', 1)];
      dm.data = [
        [1, 'C'],
        [2, 'B'],
        [3, 'A']
      ];
      dm.sort(buildColumn('pos', 0), 'desc');
      expect(dm.data[0]).toEqual([3, 'A']);
      expect(dm.data[1]).toEqual([2, 'B']);
      expect(dm.data[2]).toEqual([1, 'C']);
    });

    it('should execute sorting in ascending order', () => {
      const dm = new LoadedTournament();
      dm.columns = [buildColumn('pos', 0), buildColumn('name', 1)];
      dm.data = [
        [1, 'C'],
        [2, 'B'],
        [3, 'A']
      ];
      dm.sort(buildColumn('name', 1), 'asc');
      expect(dm.data[0]).toEqual([3, 'A']);
      expect(dm.data[1]).toEqual([2, 'B']);
      expect(dm.data[2]).toEqual([1, 'C']);
    });
  });

  describe('getOpponentsFor', () => {
    const csv = new LoadedTournament();
    csv.columns = testColumns.concat([
      buildColumn('r4', 5),
      buildColumn('r5', 6),
      buildColumn('pts', 7)
    ]);
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
    const csv = new LoadedTournament();
    csv.columns = testColumns.concat([
      buildColumn('r4', 5),
      buildColumn('r5', 6),
      buildColumn('pts', 7)
    ]);
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
