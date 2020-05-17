import { Column } from 'components/columns/column';


export class CustomColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'custom', hidden, canOrderBy, canFilterOn);
  }

}
