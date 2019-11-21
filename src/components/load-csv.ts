import { Csv } from './Csv';
import * as d3 from 'd3';

export const loadCsv = (idCsvWrapper: string): Csv => {
  const csvElement = d3.select(`#${idCsvWrapper}`);
  if (!csvElement) {
    throw Error(`Target element with id='${idCsvWrapper}' not found!`);
  }
  const rawCsv = csvElement.text();
  const parsedCSV = Array.from(d3.csv.parseRows(rawCsv))
    .filter((row: Array<any>) => row && row.length > 0);
  if (!parsedCSV || parsedCSV.length < 1) {
    throw Error('No CSV data found!');
  }
  const header = Array.from(parsedCSV[0]);
  let data: Array<any> = [];
  if (parsedCSV.length > 1) {
    data = parsedCSV.slice(1, parsedCSV.length);
  }
  return {
    header: header,
    data: data
  }
}
