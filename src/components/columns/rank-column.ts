import { Column } from 'components/columns/column';
import { SerializedStyles } from '@emotion/core';
import { placeColumnStyle } from 'components/columns/column-styles';


export class RankColumn extends Column {

  constructor(code: string,
    index: number) {
    super(code, index, 'rank', false, true, false);
  }

  public get styles(): SerializedStyles {
    return placeColumnStyle;
  }

}
