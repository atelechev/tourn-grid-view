/** @jsx jsx */
import { css, SerializedStyles } from '@emotion/core';
import {
  COLUMN_NAME,
  isRoundColumn,
  COLUMN_FEDERATION,
  COLUMN_POINTS,
  COLUMN_PLACE,
  COLUMN_CATEGORY,
  COLUMN_CLUB
} from './column-utils';

const nameColumnStyle = css({
  fontWeight: 'bolder'
});

const roundColumnStyle = css({
  maxWidth: '32px',
  width: '32px'
});

const placeColumnStyle = css({
  maxWidth: '40px',
  width: '40px',
  paddingLeft: '8px'
});

const pointsColumnStyle = css({
  maxWidth: '48px',
  width: '48px',
  fontWeight: 'bolder',
  textAlign: 'center'
});

const standardNarrowColumnStyle = css({
  maxWidth: '44px',
  width: '44px'
});

const clubColumnStyle = css({
  maxWidth: '120px'
});

class ColumnStylesHandler {
  private readonly _styleDefs = new Map<string, SerializedStyles>([
    [COLUMN_NAME, nameColumnStyle],
    [COLUMN_FEDERATION, standardNarrowColumnStyle],
    [COLUMN_POINTS, pointsColumnStyle],
    [COLUMN_PLACE, placeColumnStyle],
    [COLUMN_CATEGORY, standardNarrowColumnStyle],
    [COLUMN_CLUB, clubColumnStyle]
  ]);

  get = (key: string): SerializedStyles | undefined => {
    if (key) {
      if (this._styleDefs.has(key)) {
        return this._styleDefs.get(key);
      }
      if (isRoundColumn(key)) {
        return roundColumnStyle;
      }
    }
    return standardNarrowColumnStyle;
  };
}

export const columnStyles: ColumnStylesHandler = new ColumnStylesHandler();
