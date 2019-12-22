import {
  clubColumnStyle,
  nameColumnStyle,
  placeColumnStyle,
  pointsColumnStyle,
  roundColumnStyle,
  standardNarrowColumnStyle
} from './column-styles';
import {
  COLUMN_CLUB,
  COLUMN_NAME,
  COLUMN_PLACE,
  COLUMN_POINTS
} from './names';
import { isRoundColumn } from './round';
import { SerializedStyles } from '@emotion/core';

class ColumnStylesHandler {

  get = (key: string): SerializedStyles | undefined => {
    if (key) {
      const normalized = key.trim().toLowerCase();
      switch (normalized) {
        case COLUMN_NAME: return nameColumnStyle;
        case COLUMN_POINTS: return pointsColumnStyle;
        case COLUMN_PLACE: return placeColumnStyle;
        case COLUMN_CLUB: return clubColumnStyle;
      }
      if (isRoundColumn(normalized)) {
        return roundColumnStyle;
      }
    }
    return standardNarrowColumnStyle;
  };
}

export const columnStylesHandler: ColumnStylesHandler = new ColumnStylesHandler();