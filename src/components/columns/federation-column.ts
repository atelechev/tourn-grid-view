import { Column } from 'components/columns/column';


export class FederationColumn extends Column {

  constructor(code: string,
    index: number,
    hidden: boolean,
    canOrderBy: boolean,
    canFilterOn: boolean) {
    super(code, index, 'federation', hidden, canOrderBy, canFilterOn);
  }

}
