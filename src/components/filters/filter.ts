export interface Filter {
  name: string;
  shouldShowRow(row: Array<any>): boolean;
  selectableOptions: Array<any>;
  selectedValue: any;
}

export const VALUE_NO_FILTER = '---';
