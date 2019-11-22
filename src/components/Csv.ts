export interface Csv {
  header: Array<string>;
  data: Array<Array<any>>;
}

export const emptyCsv = {
  header: [],
  data: []
} as Csv;