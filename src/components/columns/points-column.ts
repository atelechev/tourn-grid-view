import { Column } from './column';
import { SerializedStyles } from '@emotion/core';
import { pointsColumnStyle } from './column-styles';

export class PointsColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'points', hidden, canOrderBy, canFilterOn);
  }

  public get styles(): SerializedStyles {
    return pointsColumnStyle;
  }

}
