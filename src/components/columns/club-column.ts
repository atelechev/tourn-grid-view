import { Column } from 'components/columns/column';
import { SerializedStyles } from '@emotion/core';
import { clubColumnStyle } from 'components/columns/column-styles';


export class ClubColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'club', hidden, canOrderBy, canFilterOn);
  }

  public get styles(): SerializedStyles {
    return clubColumnStyle;
  }

}
