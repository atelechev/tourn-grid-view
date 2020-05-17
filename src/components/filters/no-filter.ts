import { Filter, VALUE_NO_FILTER } from 'components/filters/filter';

class NoFilter implements Filter {
  public shouldShowRow(_: Array<any>): boolean {
    return true;
  }

  public get name(): string {
    return VALUE_NO_FILTER;
  }

  public get selectableOptions(): Array<any> {
    return [VALUE_NO_FILTER];
  }

  public set selectedValue(_: any) {
    // nothing
  }

  public get selectedValue(): any {
    return VALUE_NO_FILTER;
  }
}

export const NO_FILTER: Filter = new NoFilter();
