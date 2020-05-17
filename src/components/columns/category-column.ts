import { Column } from 'components/columns/column';


export class CategoryColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'category', hidden, canOrderBy, canFilterOn);
  }

}
