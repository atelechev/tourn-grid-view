const ratingColumnIdentifiers = new Set<string>(['elo', 'rating', 'rtg']);

export const isRatingColumn = (column: string): boolean => {
  if (!column) {
    return false;
  }
  const normalized = column.trim().toLowerCase();
  return ratingColumnIdentifiers.has(normalized) || normalized === 'perf';
};
