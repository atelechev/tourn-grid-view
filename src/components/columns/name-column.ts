import { Column } from './column';
import { SerializedStyles } from '@emotion/core';
import { nameColumnStyle } from './column-styles';


export class NameColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'name', hidden, canOrderBy, canFilterOn);
  }

  public get styles(): SerializedStyles {
    return nameColumnStyle;
  }

}
