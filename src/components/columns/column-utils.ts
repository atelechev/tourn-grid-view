// TODO tests
export const isSimpleColumnIdentifier = (
  column: string,
  expectedIdentifier: string
): boolean => {
  if (!column) {
    return false;
  }
  return column.trim().toLowerCase() === expectedIdentifier.toLowerCase();
};
