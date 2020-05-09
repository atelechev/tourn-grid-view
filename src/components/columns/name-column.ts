import { Column } from './column';
import { SerializedStyles } from '@emotion/core';
import { nameColumnStyle } from './column-styles';


export class NameColumn extends Column {

  constructor(code: string,
    index: number,
    canOrderBy: boolean) {
    super(code, index, 'name', false, canOrderBy, false);
  }

  public get styles(): SerializedStyles {
    return nameColumnStyle;
  }

}
