const regextTiebreak = /tb[0-9]+/g;

const matchesByRegex = (column: string): boolean => {
  const matchResult = column.match(regextTiebreak);
  return matchResult && matchResult.length > 0;
};

const knownTiebreakCodes = new Set<string>(['bre', 'bu', 'sol']);

export const isTieBreakColumn = (column: string): boolean => {
  if (!column) {
    return false;
  }
  const normalized = column.trim().toLowerCase();
  return matchesByRegex(normalized) || knownTiebreakCodes.has(normalized);
};
