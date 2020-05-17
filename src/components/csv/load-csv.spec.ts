import { loadCsv } from 'components/csv/load-csv';
import { buildColumn } from 'components/columns/column-factory';

describe('loadCsv', () => {
  const createInlineCsv = (csvAsText: string, idElement: string): void => {
    const elt = document.createElement('div');
    elt.id = idElement;
    elt.textContent = csvAsText;
    document.body.appendChild(elt);
  };

  it('should return expected CSV data', () => {
    const id = 'data-wrapper';
    createInlineCsv(
      'Pos,Name,Rating,Fed,R1,R2,R3,Pts,Bu,Club\n' +
      '1,GM GLEK Igor,2473,GER,+48B,+24N,+5B,6.5,30,""\n' +
      '2,IM BENITAH Yohan,2530,FRA,+39N,+30B,+6N,6,31,"Lyon Olympique Echecs"\n' +
      '3,IM OLIVIER Jean-Christophe,2440,FRA,+41B,+8N,+13B,6,29,"Club d\'Echecs de l\'Agglomeration Chambérienne"\n',
      id
    );
    const csv = loadCsv(id);
    expect(csv).toBeTruthy();
    expect(csv.columns).toEqual([
      buildColumn('pos', 0),
      buildColumn('name', 1),
      buildColumn('rating', 2),
      buildColumn('fed', 3),
      buildColumn('r1', 4),
      buildColumn('r2', 5),
      buildColumn('r3', 6),
      buildColumn('pts', 7),
      buildColumn('bu', 8),
      buildColumn('club', 9)
    ]);
    const data = csv.data;
    expect(data).toBeTruthy();
    expect(data.length).toEqual(3);
    expect(data[0]).toEqual([
      '1',
      'GM GLEK Igor',
      '2473',
      'GER',
      '+48B',
      '+24N',
      '+5B',
      '6.5',
      '30',
      ''
    ]);
    expect(data[1]).toEqual([
      '2',
      'IM BENITAH Yohan',
      '2530',
      'FRA',
      '+39N',
      '+30B',
      '+6N',
      '6',
      '31',
      'Lyon Olympique Echecs'
    ]);
    expect(data[2]).toEqual([
      '3',
      'IM OLIVIER Jean-Christophe',
      '2440',
      'FRA',
      '+41B',
      '+8N',
      '+13B',
      '6',
      '29',
      "Club d'Echecs de l'Agglomeration Chambérienne"
    ]);
  });

  it('should throw expected error if CSV contains only the header', () => {
    const id = 'data-wrapper-header-only';
    createInlineCsv('Pos,Name,Rating,Fed,R1,R2,R3,Pts,Bu,Club', id);
    expect(() => loadCsv(id)).toThrow('No CSV data found!');
  });

  it('should throw expected error if target element id was not found', () => {
    expect(() => loadCsv('another')).toThrow(
      "Target element with id='another' not found!"
    );
  });

  it('should throw expected error if CSV data are empty', () => {
    const id = 'no-data';
    createInlineCsv('', id);
    expect(() => loadCsv(id)).toThrow('No CSV data found!');
  });

  it('should throw expected error if CSV data contain less than one row', () => {
    const id = 'no-data';
    createInlineCsv('Pos,Name,Rating', id);
    expect(() => loadCsv(id)).toThrow('No CSV data found!');
  });

  it('should throw expected error if CSV header contains at least one undefined value', () => {
    const id = 'data-header-one-undefined';
    createInlineCsv(
      'Pos,,Name\n' + '1,GM,"Player A"\n' + '2,GM,"Player B"',
      id
    );
    expect(() => loadCsv(id)).toThrow(
      'rawHeader arg must not be undefined or empty'
    );
  });

  it('should throw expected error if CSV header contains at least one empty value', () => {
    const id = 'data-header-one-empty';
    createInlineCsv(
      'Pos,"  ",Name\n' + '1,GM,"Player A"\n' + '2,GM,"Player B"',
      id
    );
    expect(() => loadCsv(id)).toThrow(
      'rawHeader arg must not be undefined or empty'
    );
  });

  it('should trim all the values in the header', () => {
    const id = 'data-trimmed';
    createInlineCsv(
      '" Pos ","  Fed","Name   "\n' + '1,FRA,"Player A"\n' + '2,USA,"Player B"',
      id
    );
    const csv = loadCsv(id);
    expect(csv.columns).toEqual([
      buildColumn('pos', 0),
      buildColumn('fed', 1),
      buildColumn('name', 2)
    ]);
  });

  it('should lowercase all the values in the header', () => {
    const id = 'data-lowercased';
    createInlineCsv(
      'POS,FED,NAME\n' + '1,FRA,"Player A"\n' + '2,USA,"Player B"',
      id
    );
    const csv = loadCsv(id);
    expect(csv.columns).toEqual([
      buildColumn('pos', 0),
      buildColumn('fed', 1),
      buildColumn('name', 2)
    ]);
  });

  it('should skip all empty lines', () => {
    const id = 'data-emptylines';
    createInlineCsv(
      '\nPOS,FED,NAME\n\n' + '1,FRA,"Player A"\n' + '\n2,USA,"Player B"\n\n',
      id
    );
    const csv = loadCsv(id);
    expect(csv.columns).toEqual([
      buildColumn('pos', 0),
      buildColumn('fed', 1),
      buildColumn('name', 2)
    ]);
    expect(csv.data[0]).toEqual(['1', 'FRA', 'Player A']);
    expect(csv.data[1]).toEqual(['2', 'USA', 'Player B']);
  });

  it('should skip all empty lines', () => {
    const id = 'data-emptylines';
    createInlineCsv(
      '\nPOS,FED,NAME\n\n' + '1,FRA,"Player A"\n' + '\n2,USA,"Player B"\n\n',
      id
    );
    const csv = loadCsv(id);
    expect(csv.columns).toEqual([
      buildColumn('pos', 0),
      buildColumn('fed', 1),
      buildColumn('name', 2)
    ]);
    expect(csv.data[0]).toEqual(['1', 'FRA', 'Player A']);
    expect(csv.data[1]).toEqual(['2', 'USA', 'Player B']);
  });
});
