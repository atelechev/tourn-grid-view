import { COLUMN_FEDERATION } from './names';
import { isSimpleColumnIdentifier } from './column-utils';

export const isFederationColumn = (column: string): boolean =>
  isSimpleColumnIdentifier(column, COLUMN_FEDERATION);