import { Column } from '../columns/column';

export interface CellValueProps {
  column: Column;
  isVisible: boolean;
  cellValue: any;
}
