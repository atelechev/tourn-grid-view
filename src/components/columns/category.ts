import { COLUMN_CATEGORY } from './names';
import { isSimpleColumnIdentifier } from './column-utils';

export const isCategoryColumn = (column: string): boolean =>
  isSimpleColumnIdentifier(column, COLUMN_CATEGORY);
