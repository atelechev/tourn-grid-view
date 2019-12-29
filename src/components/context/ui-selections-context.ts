import React from 'react';
import { COLUMN_PLACE } from '../columns/names';
import { Filter } from '../filters/filter';
import { NO_FILTER } from '../filters/no-filter';

export type Order = 'asc' | 'desc';

// TODO check whether it can be transformed into an abstract class and include many of related methods that expect it as arg
export interface UiSelectionsContext {
  interactive: boolean;
  filterActive: Filter;
  filtersEnabled: Array<Filter>;
  order: Order;
  orderBy: string;
  orderEnabledColumns: Array<string>;
  selectedRow: Array<any> | undefined;
  shownColumns: Array<string>;
}

const defaultSelections: UiSelectionsContext = {
  interactive: true,
  filterActive: NO_FILTER,
  filtersEnabled: [],
  order: 'desc',
  orderBy: COLUMN_PLACE,
  orderEnabledColumns: [],
  selectedRow: undefined,
  shownColumns: []
};

export const UiSelectionsContext = React.createContext<UiSelectionsContext>(
  defaultSelections
);
