import { COLUMN_NAME, COLUMN_PLACE } from './names';

export const isAlwaysVisibleColumn = (column: string): boolean =>
  column === COLUMN_PLACE || column === COLUMN_NAME;