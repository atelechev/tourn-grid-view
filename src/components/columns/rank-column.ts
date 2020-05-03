import { Column } from './column';
import { SerializedStyles } from '@emotion/core';
import { placeColumnStyle } from './column-styles';


export class RankColumn extends Column {

  constructor(code: string,
    index: number,
    canOrderBy: boolean) {
    super(code, index, 'rank', false, canOrderBy, false);
  }

  public get styles(): SerializedStyles {
    return placeColumnStyle;
  }

}
