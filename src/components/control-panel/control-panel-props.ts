import { Csv } from '../csv/csv';

export interface ControlPanelProps {
  csv: Csv;
  enabledFilters: Array<string>;
}
