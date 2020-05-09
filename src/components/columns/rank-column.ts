import { Column } from './column';
import { SerializedStyles } from '@emotion/core';
import { placeColumnStyle } from './column-styles';


export class RankColumn extends Column {

  constructor(code: string,
    index: number) {
    super(code, index, 'rank', false, true, false);
  }

  public get styles(): SerializedStyles {
    return placeColumnStyle;
  }

}
