
export const isPointsColumn = (column: string): boolean => {
  if (!column) {
    return false;
  }
  const normalized = column.trim().toLowerCase();
  return normalized === 'pts' || normalized === 'points';
};
