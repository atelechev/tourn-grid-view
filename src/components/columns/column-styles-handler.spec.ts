import {
  clubColumnStyle,
  nameColumnStyle,
  placeColumnStyle,
  pointsColumnStyle,
  roundColumnStyle,
  standardNarrowColumnStyle
} from './column-styles';
import { columnStylesHandler } from './column-styles-handler';

describe('ColumnStylesHandler', () => {
  const hanlder = columnStylesHandler;

  it('should return standardNarrowColumnStyle for undefined arg', () => {
    expect(hanlder.get(undefined)).toEqual(standardNarrowColumnStyle);
  });

  it('should return standardNarrowColumnStyle for arg that does not match keys nor rounds', () => {
    expect(hanlder.get('oups')).toEqual(standardNarrowColumnStyle);
  });

  it('should return roundColumnStyle for arg that matches a round', () => {
    expect(hanlder.get('R1')).toEqual(roundColumnStyle);
  });

  it('should return nameColumnStyle for Name arg', () => {
    expect(hanlder.get('Name')).toEqual(nameColumnStyle);
  });

  it('should return pointsColumnStyle for Pts arg', () => {
    expect(hanlder.get('Pts')).toEqual(pointsColumnStyle);
  });

  it('should return placeColumnStyle for Pos arg', () => {
    expect(hanlder.get('Pos')).toEqual(placeColumnStyle);
  });

  it('should return clubColumnStyle for Club arg', () => {
    expect(hanlder.get('Club')).toEqual(clubColumnStyle);
  });
});
