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
