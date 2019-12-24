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
      const normalized = key.trim().toLowerCase();
      if (isRoundColumn(normalized)) {
        return roundColumnStyle;
      }
      if (isNameColumn(normalized)) {
        return nameColumnStyle;
      }
      if (isPlaceColumn(normalized)) {
        return placeColumnStyle;
      }
      if (isClubColumn(normalized)) {
        return clubColumnStyle;
      }
      if (isPointsColumn(normalized)) {
        return pointsColumnStyle;
      }
    }
    return standardNarrowColumnStyle;
  };
}

export const columnStylesHandler: ColumnStylesHandler = new ColumnStylesHandler();
