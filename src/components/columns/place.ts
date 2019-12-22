import { COLUMN_PLACE } from './names';
import { isSimpleColumnIdentifier } from './column-utils';

export const isPlaceColumn = (column: string): boolean =>
  isSimpleColumnIdentifier(column, COLUMN_PLACE);