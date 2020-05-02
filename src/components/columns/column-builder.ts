import { Column } from './column';

export const newColumn = (rawHeader: string, index: number): Column => {
  if (!rawHeader || rawHeader.trim().length === 0) {
    throw Error('rawHeader arg must not be undefined or empty');
  }
  if (isNaN(index) || index < 0) {
    throw Error('index arg must not be undefined or negative');
  }
  const normalizedHeader = rawHeader.trim().toLowerCase();
  const separatorIndex = normalizedHeader.indexOf('|');
  if (separatorIndex < 0) {
    return new Column(normalizedHeader, index, false, false, false);
  }
  if (separatorIndex === 0) {
    throw Error('the column name must not start with the separator character');
  }
  const modifiers = normalizedHeader.substring(separatorIndex);
  const hidden = modifiers.indexOf('h') > -1;
  const orderBy = modifiers.indexOf('o') > -1;
  const filterable = modifiers.indexOf('f') > -1;
  const code = normalizedHeader.substring(0, separatorIndex);
  return new Column(code, index, hidden, orderBy, filterable);
};
