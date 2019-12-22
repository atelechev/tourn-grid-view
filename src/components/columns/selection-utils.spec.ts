import { buildSelectableColumns } from './selection-utils';

describe('buildSelectableColumns', () => {

  it('should return an empty array if arg is undefined', () => {
    expect(buildSelectableColumns(undefined)).toEqual([]);
  });

  it('should return an empty array if arg is empty', () => {
    expect(buildSelectableColumns(undefined)).toEqual([]);
  });

  it('should return original array if there were no round columns and no always visible ones', () => {
    expect(buildSelectableColumns(['Fed', 'Cat', 'Club'])).toEqual(['Fed', 'Cat', 'Club']);
  });

  it('should return an array with all original columns and replace R* columns with rounds', () => {
    expect(buildSelectableColumns(['Fed', 'Cat', 'R1', 'R2', 'R3'])).toEqual(['Fed', 'Cat', 'rounds']);
  });

  it('should return an array with all original columns except always visible columns', () => {
    expect(buildSelectableColumns(['Fed', 'Cat', 'Pos', 'Name'])).toEqual(['Fed', 'Cat']);
  });

});
