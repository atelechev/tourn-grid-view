import * as d3 from 'd3';
import { Csv } from './csv';

const normalizeColumn = (column: string): string | undefined => {
  if (!column) {
    return undefined;
  }
  const normalized = column.trim().toLowerCase();
  if (normalized.length > 0) {
    return normalized;
  }
  return undefined;
}

const cleanHeader = (rawHeader: Array<string>): Array<string> => {
  return rawHeader
    .map(column => {
      const normalized = normalizeColumn(column);
      if (!normalized) {
        throw Error(`Empty values are not allowed in the CSV header: ${rawHeader.join(',')}`);
      }
      return normalized;
    });
};

export const loadCsv = (idCsvWrapper: string): Csv => {
  const csvElement = d3.select(`#${idCsvWrapper}`);
  if (!csvElement || !csvElement[0] || !csvElement[0][0]) {
    throw Error(`Target element with id='${idCsvWrapper}' not found!`);
  }
  const rawCsv = csvElement.text();
  const parsedCSV: Array<any> = Array.from(d3.csv.parseRows(rawCsv)).filter(
    (row: Array<any>) => row && row.length > 0
  );
  if (!parsedCSV || parsedCSV.length < 1) {
    throw Error('No CSV data found!');
  }
  const header: Array<string> = cleanHeader(parsedCSV[0]);
  let data: Array<any> = [];
  if (parsedCSV.length > 1) {
    data = parsedCSV.slice(1, parsedCSV.length);
  }
  return {
    header,
    data
  };
};
