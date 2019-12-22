import { COLUMN_FEDERATION } from './names';

export const isFederationColumn = (column: string): boolean => {
  if (!column) {
    return false;
  }
  return column.trim().toLowerCase() === COLUMN_FEDERATION;
};
