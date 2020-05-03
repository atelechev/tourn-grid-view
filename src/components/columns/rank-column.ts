import { Column } from './column';
import { SerializedStyles } from '@emotion/core';
import { placeColumnStyle } from './column-styles';


export class RankColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'rank', hidden, canOrderBy, canFilterOn);
  }

  public get styles(): SerializedStyles {
    return placeColumnStyle;
  }

}
