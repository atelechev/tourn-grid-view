import { DataManager } from './data-manager';

const EMPTY_SET = new Set<number>();

export const extractOpponentPlaces = (
  selectedRow: Array<any>,
  csv: DataManager
): Set<number> => {
  if (!selectedRow || selectedRow.length === 0) {
    return EMPTY_SET;
  }
  const extractPosition = /\d+/g;
  const gameResultValues = csv.roundColumnsIndices
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

export const normalizeColumn = (column: string): string | undefined => {
  if (!column) {
    return undefined;
  }
  const normalized = column.trim().toLowerCase();
  if (normalized.length > 0) {
    return normalized;
  }
  return undefined;
};
