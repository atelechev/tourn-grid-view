import { Column } from './column';


export class RatingColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'rating', hidden, canOrderBy, canFilterOn);
  }

}
