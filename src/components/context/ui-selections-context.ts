import React from 'react';
import { UiSelectionsManager } from '../ui-selections/ui-selections-manager';

const defaultSelectionsContext = new UiSelectionsManager();

export const UiSelectionsContext = React.createContext<UiSelectionsManager>(
  defaultSelectionsContext
);
