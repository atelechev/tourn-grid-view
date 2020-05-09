import { buildColumn } from './column-factory';
import { Column } from './column';

describe('newColumn', () => {

  it('should throw expected error if rawHeader arg is undefined', () => {
    expect(() => buildColumn(undefined, 0)).toThrowError('rawHeader arg must not be undefined or empty');
  });

  it('should throw expected error if rawHeader arg is empty', () => {
    expect(() => buildColumn('  ', 0)).toThrowError('rawHeader arg must not be undefined or empty');
  });

  it('should throw expected error if index arg is undefined', () => {
    expect(() => buildColumn('test', undefined)).toThrowError('index arg must not be undefined or negative');
  });

  it('should throw expected error if index arg is negative', () => {
    expect(() => buildColumn('test', -1)).toThrowError('index arg must not be undefined or negative');
  });

  it('should throw expected error if the header starts with a separator', () => {
    expect(() => buildColumn('|test', 0)).toThrowError('the column name must not start with the separator character');
  });

  const assertColumnExpected = (checked: Column,
    expectedName: string,
    expectedIndex: number,
    expectedHidden: boolean,
    expectedCanOrderBy: boolean,
    expectedCafilterOn: boolean): void => {

    expect(checked).toBeDefined();
    expect(checked.name).toEqual(expectedName);
    expect(checked.index).toEqual(expectedIndex);
    expect(checked.semantics).toEqual('custom');
    expect(checked.hidden).toBe(expectedHidden);
    expect(checked.canOrderBy).toBe(expectedCanOrderBy);
    expect(checked.canFilterOn).toBe(expectedCafilterOn);
  }

  it('should return expected Column if there is no modifiers in the header', () => {
    const column = buildColumn('Test', 0);
    assertColumnExpected(column, 'test', 0, false, false, false);
  });

  it('should return expected Column if there is no modifiers in the header, but the separator exists', () => {
    const column = buildColumn('Test|', 0);
    assertColumnExpected(column, 'test', 0, false, false, false);
  });

  it('should return expected Column with hidden modifier', () => {
    const column = buildColumn('Test|h', 0);
    assertColumnExpected(column, 'test', 0, true, false, false);
  });

  it('should return expected Column with orderBy modifier', () => {
    const column = buildColumn('Test|o', 0);
    assertColumnExpected(column, 'test', 0, false, true, false);
  });

  it('should return expected Column with filterOn modifier', () => {
    const column = buildColumn('Test|f', 0);
    assertColumnExpected(column, 'test', 0, false, false, true);
  });

  it('should return expected Column with all modifiers set', () => {
    const column = buildColumn('Test|foh', 0);
    assertColumnExpected(column, 'test', 0, true, true, true);
  });

  it('should return expected PointsColumn with "points" name', () => {
    const column = buildColumn('Points', 0);
    expect(column.semantics).toEqual('points');
    expect(column.name).toEqual('points');
  });

  it('should return expected PointsColumn with "pts" name', () => {
    const column = buildColumn('Pts', 0);
    expect(column.semantics).toEqual('points');
    expect(column.name).toEqual('pts');
  });

  it('should return expected CategoryColumn with "category" name', () => {
    const column = buildColumn('Category', 0);
    expect(column.semantics).toEqual('category');
    expect(column.name).toEqual('category');
  });

  it('should return expected CategoryColumn with "cat" name', () => {
    const column = buildColumn('Cat', 0);
    expect(column.semantics).toEqual('category');
    expect(column.name).toEqual('cat');
  });

  it('should return expected CategoryColumn with "ctg" name', () => {
    const column = buildColumn('Ctg', 0);
    expect(column.semantics).toEqual('category');
    expect(column.name).toEqual('ctg');
  });

  it('should return expected ClubColumn with "club" name', () => {
    const column = buildColumn('Club', 0);
    expect(column.semantics).toEqual('club');
    expect(column.name).toEqual('club');
  });

  it('should return expected FederationColumn with "federation" name', () => {
    const column = buildColumn('Federation', 0);
    expect(column.semantics).toEqual('federation');
    expect(column.name).toEqual('federation');
  });

  it('should return expected FederationColumn with "fed" name', () => {
    const column = buildColumn('Fed', 0);
    expect(column.semantics).toEqual('federation');
    expect(column.name).toEqual('fed');
  });

  it('should return expected FederationColumn with "fede" name', () => {
    const column = buildColumn('Fede', 0);
    expect(column.semantics).toEqual('federation');
    expect(column.name).toEqual('fede');
  });

  it('should return expected FederationColumn with "country" name', () => {
    const column = buildColumn('Country', 0);
    expect(column.semantics).toEqual('federation');
    expect(column.name).toEqual('country');
  });

  it('should return expected FederationColumn with "pays" name', () => {
    const column = buildColumn('Pays', 0);
    expect(column.semantics).toEqual('federation');
    expect(column.name).toEqual('pays');
  });

  it('should return expected NameColumn with "name" name', () => {
    const column = buildColumn('Name', 0);
    expect(column.semantics).toEqual('name');
    expect(column.name).toEqual('name');
  });

  it('should return expected NameColumn with "nom" name', () => {
    const column = buildColumn('Nom', 0);
    expect(column.semantics).toEqual('name');
    expect(column.name).toEqual('nom');
  });

  it('should return expected RatingColumn with "rating" name', () => {
    const column = buildColumn('Rating', 0);
    expect(column.semantics).toEqual('rating');
    expect(column.name).toEqual('rating');
  });

  it('should return expected RatingColumn with "rtg" name', () => {
    const column = buildColumn('Rtg', 0);
    expect(column.semantics).toEqual('rating');
    expect(column.name).toEqual('rtg');
  });

  it('should return expected RatingColumn with "elo" name', () => {
    const column = buildColumn('Elo', 0);
    expect(column.semantics).toEqual('rating');
    expect(column.name).toEqual('elo');
  });

  it('should return expected RatingColumn with "classement" name', () => {
    const column = buildColumn('Classement', 0);
    expect(column.semantics).toEqual('rating');
    expect(column.name).toEqual('classement');
  });

  it('should return expected RankColumn with "rank" name', () => {
    const column = buildColumn('Rank', 0);
    expect(column.semantics).toEqual('rank');
    expect(column.name).toEqual('rank');
  });

  it('should return expected RankColumn with "position" name', () => {
    const column = buildColumn('Position', 0);
    expect(column.semantics).toEqual('rank');
    expect(column.name).toEqual('position');
  });

  it('should return expected RankColumn with "pos" name', () => {
    const column = buildColumn('Pos', 0);
    expect(column.semantics).toEqual('rank');
    expect(column.name).toEqual('pos');
  });

  it('should return expected RankColumn with "place" name', () => {
    const column = buildColumn('Place', 0);
    expect(column.semantics).toEqual('rank');
    expect(column.name).toEqual('place');
  });

  it('should return expected RankColumn with "pl" name', () => {
    const column = buildColumn('Pl', 0);
    expect(column.semantics).toEqual('rank');
    expect(column.name).toEqual('pl');
  });

  it('should return expected RoundColumn with "Round 1" name', () => {
    const column = buildColumn('Round 1', 0);
    expect(column.semantics).toEqual('round');
    expect(column.name).toEqual('round 1');
  });

  it('should return expected RoundColumn with "Round01" name', () => {
    const column = buildColumn('Round01', 0);
    expect(column.semantics).toEqual('round');
    expect(column.name).toEqual('round01');
  });

  it('should return expected RoundColumn with "Rd 1" name', () => {
    const column = buildColumn('Rd 1', 0);
    expect(column.semantics).toEqual('round');
    expect(column.name).toEqual('rd 1');
  });

  it('should return expected RoundColumn with "Rd01" name', () => {
    const column = buildColumn('Rd01', 0);
    expect(column.semantics).toEqual('round');
    expect(column.name).toEqual('rd01');
  });

  it('should return expected RoundColumn with "R 1" name', () => {
    const column = buildColumn('R 1', 0);
    expect(column.semantics).toEqual('round');
    expect(column.name).toEqual('r 1');
  });

  it('should return expected RoundColumn with "R01" name', () => {
    const column = buildColumn('R01', 0);
    expect(column.semantics).toEqual('round');
    expect(column.name).toEqual('r01');
  });

  it('should return expected RoundColumn with "Ronde 1" name', () => {
    const column = buildColumn('Ronde 1', 0);
    expect(column.semantics).toEqual('round');
    expect(column.name).toEqual('ronde 1');
  });

  it('should return expected RoundColumn with "Ronde01" name', () => {
    const column = buildColumn('Ronde01', 0);
    expect(column.semantics).toEqual('round');
    expect(column.name).toEqual('ronde01');
  });

  it('should return expected TieBreakColumn with "TB1" name', () => {
    const column = buildColumn('TB1', 0);
    expect(column.semantics).toEqual('tiebreak');
    expect(column.name).toEqual('tb1');
  });

  it('should return expected TieBreakColumn with "Tb 01" name', () => {
    const column = buildColumn('Tb 01', 0);
    expect(column.semantics).toEqual('tiebreak');
    expect(column.name).toEqual('tb 01');
  });

  it('should return expected TieBreakColumn with "bre" name', () => {
    const column = buildColumn('BRE', 0);
    expect(column.semantics).toEqual('tiebreak');
    expect(column.name).toEqual('bre');
  });

  it('should return expected TieBreakColumn with "bu" name', () => {
    const column = buildColumn('BU', 0);
    expect(column.semantics).toEqual('tiebreak');
    expect(column.name).toEqual('bu');
  });

  it('should return expected TieBreakColumn with "sol" name', () => {
    const column = buildColumn('Sol', 0);
    expect(column.semantics).toEqual('tiebreak');
    expect(column.name).toEqual('sol');
  });

  it('should return expected TieBreakColumn with "perf" name', () => {
    const column = buildColumn('Perf', 0);
    expect(column.semantics).toEqual('tiebreak');
    expect(column.name).toEqual('perf');
  });

});
