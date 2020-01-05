const nameColumnIdentifiers = new Set<string>(['name', 'nom']);

export const isNameColumn = (column: string): boolean => {
  if (!column) {
    return false;
  }
  const normalized = column.trim().toLowerCase();
  return nameColumnIdentifiers.has(normalized);
};
