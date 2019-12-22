const regexRound = /[Rr][0-9]+/g;

export const isRoundColumn = (column: string): boolean => {
  if (!column) {
    return false;
  }
  const normalized = column.trim().toLowerCase();
  const matchResult = normalized.match(regexRound);
  return !!matchResult && matchResult.length > 0;
};
