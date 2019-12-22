import {
  COLUMN_PLACE, COLUMN_NAME, COLUMN_POINTS, COLUMN_ROUNDS,
  COLUMN_CATEGORY, COLUMN_CLUB, COLUMN_FEDERATION, COLUMN_RATING
} from './names';
import { isAlwaysVisibleColumn } from './visibility-utils';

describe('isAlwaysVisibleColumn', () => {

  it('should return true for Pos', () => {
    expect(isAlwaysVisibleColumn(COLUMN_PLACE)).toBe(true);
  });

  it('should return true for Name', () => {
    expect(isAlwaysVisibleColumn(COLUMN_NAME)).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isAlwaysVisibleColumn(undefined)).toBe(false);
  });

  it('should return false for Cat', () => {
    expect(isAlwaysVisibleColumn(COLUMN_CATEGORY)).toBe(false);
  });

  it('should return false for Club', () => {
    expect(isAlwaysVisibleColumn(COLUMN_CLUB)).toBe(false);
  });

  it('should return false for Fed', () => {
    expect(isAlwaysVisibleColumn(COLUMN_FEDERATION)).toBe(false);
  });

  it('should return false for Pts', () => {
    expect(isAlwaysVisibleColumn(COLUMN_POINTS)).toBe(false);
  });

  it('should return false for Rating', () => {
    expect(isAlwaysVisibleColumn(COLUMN_RATING)).toBe(false);
  });

  it('should return false for Rounds', () => {
    expect(isAlwaysVisibleColumn(COLUMN_ROUNDS)).toBe(false);
  });

});
