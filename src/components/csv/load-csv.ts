import * as d3 from 'd3';
import { DataManager } from './data-manager';

export const loadCsv = (idCsvWrapper: string): DataManager => {
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
  let data: Array<any> = [];
  if (parsedCSV.length > 1) {
    data = parsedCSV.slice(1, parsedCSV.length);
  }
  const dataManager = new DataManager();
  dataManager.header = parsedCSV[0];
  dataManager.data = data;
  return dataManager;
};
