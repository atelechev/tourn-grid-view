export const COLUMN_FEDERATION = 'fed';

export const isFederationColumn = (column: string): boolean => {
  if (!column) {
    return false;
  }
  return column.trim().toLowerCase() === COLUMN_FEDERATION;
};
