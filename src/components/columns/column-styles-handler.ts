import {
  clubColumnStyle,
  nameColumnStyle,
  placeColumnStyle,
  pointsColumnStyle,
  roundColumnStyle,
  standardNarrowColumnStyle
} from './column-styles';
import { isRoundColumn } from './round';
import { SerializedStyles } from '@emotion/core';
import { isNameColumn } from './name';
import { isPlaceColumn } from './place';
import { isClubColumn } from './club';
import { isPointsColumn } from './points';

// TODO refactor and test
class ColumnStylesHandler {
  get = (key: string): SerializedStyles | undefined => {
    if (key) {
      if (isRoundColumn(key)) {
        return roundColumnStyle;
      }
      if (isNameColumn(key)) {
        return nameColumnStyle;
      }
      if (isPlaceColumn(key)) {
        return placeColumnStyle;
      }
      if (isClubColumn(key)) {
        return clubColumnStyle;
      }
      if (isPointsColumn(key)) {
        return pointsColumnStyle;
      }
    }
    return standardNarrowColumnStyle;
  };
}

export const columnStylesHandler: ColumnStylesHandler = new ColumnStylesHandler();
