/** @jsx jsx */
import { css, SerializedStyles } from '@emotion/core';
import { COLUMN_NAME, isRoundColumn, COLUMN_FEDERATION, COLUMN_POINTS, COLUMN_PLACE } from './column-utils';

const nameColumnStyle = css({
  fontWeight: 'bolder'
});

const roundColumnStyle = css({
  maxWidth: '32px',
  width: '32px'
});

const federationColumnStyle = css({
  maxWidth: '40px',
  width: '40px'
});

const placeColumnStyle = css({
  maxWidth: '36px',
  width: '36px',
  paddingLeft: '8px'
});

const pointsColumnStyle = css({
  maxWidth: '40px',
  width: '40px',
  fontWeight: 'bolder',
  textAlign: 'center'
});

class ColumnStylesHandler {

  private readonly _styleDefs = new Map<string, SerializedStyles>([
    [COLUMN_NAME, nameColumnStyle],
    [COLUMN_FEDERATION, federationColumnStyle],
    [COLUMN_POINTS, pointsColumnStyle],
    [COLUMN_PLACE, placeColumnStyle]
  ]);

  get = (key: string): SerializedStyles | undefined => {
    if (key && isRoundColumn(key)) {
      return roundColumnStyle;
    }
    return this._styleDefs.get(key);
  }

}

export const columnStyles: ColumnStylesHandler = new ColumnStylesHandler();
