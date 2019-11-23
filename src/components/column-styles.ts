/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';

const nameColumnStyle = css({
  fontWeight: 'bolder'
});

export const columnStyles: Map<string, SerializedStyles> = new Map([
  ['Nom', nameColumnStyle]
]);
