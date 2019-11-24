
export interface Filter {
  shouldShowRow(row: Array<any>): boolean;
  name: string;
}
