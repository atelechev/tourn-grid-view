import { Column } from 'components/columns/column';
import { nameColumnStyle } from 'components/columns/column-styles';
import { SerializedStyles } from '@emotion/core';


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
