import { Column } from './column';
import { SerializedStyles } from '@emotion/core';
import { roundColumnStyle } from './column-styles';


export class RoundColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'round', hidden, canOrderBy, canFilterOn);
  }

  public get styles(): SerializedStyles {
    return roundColumnStyle;
  }

}
