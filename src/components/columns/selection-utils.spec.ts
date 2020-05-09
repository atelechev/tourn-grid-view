import { buildSelectableColumns } from './selection-utils';
import { buildColumn } from './column-factory';

describe('buildSelectableColumns', () => {
  it('should return an empty array if arg is undefined', () => {
    expect(buildSelectableColumns(undefined)).toEqual([]);
  });

  it('should return an empty array if arg is empty', () => {
    expect(buildSelectableColumns(undefined)).toEqual([]);
  });

  it('should return original array if there were no round columns and no always visible ones', () => {
    expect(buildSelectableColumns([
      buildColumn('Fed', 0),
      buildColumn('Cat', 1),
      buildColumn('Club', 2)
    ])).toEqual([
      buildColumn('Fed', 0),
      buildColumn('Cat', 1),
      buildColumn('Club', 2)
    ]);
  });

  it('should return an array with all original columns and replace R* columns with rounds', () => {
    expect(buildSelectableColumns([
      buildColumn('Fed', 0),
      buildColumn('Cat', 1),
      buildColumn('Club', 2),
      buildColumn('R1', 3),
      buildColumn('R2', 4),
      buildColumn('R3', 5)
    ])).toEqual([
      buildColumn('Fed', 0),
      buildColumn('Cat', 1),
      'rounds' // TODO
    ]);
  });

  it('should return an array with all original columns except always visible columns', () => {
    expect(buildSelectableColumns([
      buildColumn('Fed', 0),
      buildColumn('Cat', 1),
      buildColumn('Pos', 2),
      buildColumn('Name', 3)
    ])).toEqual([
      buildColumn('Fed', 0),
      buildColumn('Cat', 1)
    ]);
  });
});
