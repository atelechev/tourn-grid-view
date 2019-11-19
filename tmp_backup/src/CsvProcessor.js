import * as d3 from 'd3';

class CsvProcessor {

  constructor(idCsvWrapper) {
    const csvElement = d3.select('#' + idCsvWrapper);
    if (!csvElement) {
      throw Error(`Target element with id='${idCsvWrapper}' not found!`);
    }
    const rawCsv = csvElement.text();
    const parsedCSV = Array.from(d3.csv.parseRows(rawCsv))
      .filter(row => row && row.length > 0);
    if (!parsedCSV || parsedCSV.length < 1) {
      throw Error('No CSV data found!');
    }
    this.header = Array.from(parsedCSV[0]);
    if (parsedCSV.length > 1) {
      this.data = parsedCSV.slice(1, parsedCSV.length);
    }
  }

}

export default CsvProcessor;
