import * as d3Select from 'd3-selection';
import * as d3Dsv from 'd3-dsv';
import { LoadedTournament } from './loaded-tournament';
import { buildColumn } from '../columns/column-factory';

const isCsvEmptyLineArray = (row: Array<any>): boolean => {
  return row && row.length === 1 && row[0] === '';
};

export const loadCsv = (idCsvWrapper: string): LoadedTournament => {
  const csvElement = d3Select.select(`#${idCsvWrapper}`);
  if (csvElement.empty()) {
    throw Error(`Target element with id='${idCsvWrapper}' not found!`);
  }
  const rawCsv = csvElement.text();
  const parsedCSV: Array<any> = d3Dsv
    .csvParseRows(rawCsv)
    .filter((row: Array<any>) => row && !isCsvEmptyLineArray(row));
  if (!parsedCSV || parsedCSV.length < 2) {
    throw Error('No CSV data found!');
  }
  const columns = (parsedCSV[0] as Array<string>).map((colName, index) => buildColumn(colName, index));
  const loadedTournament = new LoadedTournament();
  loadedTournament.columns = columns;
  loadedTournament.data = parsedCSV.slice(1, parsedCSV.length);
  return loadedTournament;
};
