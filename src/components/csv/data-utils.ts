import { Csv } from './csv';
import { isRoundColumn } from '../columns/round';

const EMPTY_SET = new Set<number>();

export const extractOpponentPlaces = (
  selectedRow: Array<any>,
  csv: Csv
): Set<number> => {
  if (!selectedRow || selectedRow.length === 0) {
    return EMPTY_SET;
  }
  const extractPosition = /\d+/g;
  // TODO should not recalculate it on each call, but have it pre-calculated
  const roundColumns = csv.header.filter(col => isRoundColumn(col));
  const roundColumnIndices = roundColumns.map(roundCol =>
    csv.header.findIndex(headerCol => headerCol === roundCol)
  );
  const gameResultValues = roundColumnIndices
    .map(indexRoundColumn => selectedRow[indexRoundColumn])
    .filter(gameResult => !!gameResult)
    .map(gameResult => {
      const matchResult = gameResult.toString().match(extractPosition);
      if (matchResult && matchResult.length > 0) {
        return parseInt(matchResult[0]);
      }
      return -1;
    })
    .filter(pos => pos > -1);
  return new Set(gameResultValues);
};
