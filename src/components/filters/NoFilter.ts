import { Filter } from './Filter';

export class NoFilter implements Filter {

  public shouldShowRow(_: Array<any>): boolean {
    return true;
  }

  public readonly name = '---';

}
