import { Column } from 'components/columns/column';

export class TieBreakColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'tiebreak', hidden, canOrderBy, canFilterOn);
  }

}
