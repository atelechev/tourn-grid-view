import { COLUMN_NAME } from './names';
import { isSimpleColumnIdentifier } from './column-utils';

export const isNameColumn = (column: string): boolean =>
  isSimpleColumnIdentifier(column, COLUMN_NAME);
