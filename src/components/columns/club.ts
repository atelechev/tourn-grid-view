import { COLUMN_CLUB } from './names';
import { isSimpleColumnIdentifier } from './column-utils';

export const isClubColumn = (column: string): boolean =>
  isSimpleColumnIdentifier(column, COLUMN_CLUB);
