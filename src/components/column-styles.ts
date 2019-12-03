/** @jsx jsx */
// eslint-disable-next-line
import { css, jsx, SerializedStyles } from '@emotion/core';
import { COLUMN_NAME } from './column-utils';

const nameColumnStyle = css({
  fontWeight: 'bolder'
});

export const columnStyles: Map<string, SerializedStyles> = new Map([
  [COLUMN_NAME, nameColumnStyle]
]);
