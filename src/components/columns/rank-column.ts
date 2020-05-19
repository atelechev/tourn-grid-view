import { Column } from 'components/columns/column';
import { placeColumnStyle } from 'components/columns/column-styles';
import { SerializedStyles } from '@emotion/core';


export class RankColumn extends Column {

  constructor(code: string,
    index: number) {
    super(code, index, 'rank', false, true, false);
  }

  public get styles(): SerializedStyles {
    return placeColumnStyle;
  }

}
