import { Column } from 'components/columns/column';
import { roundColumnStyle } from 'components/columns/column-styles';
import { SerializedStyles } from '@emotion/core';


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
