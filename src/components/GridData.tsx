import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { GridContext } from './GridContext';
import { CellValue } from './CellValue';
import { FiltersManager } from './filters/FiltersManager';


export default class GridData extends React.Component {

  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {ctx => (
          <TableBody>
            {ctx.csv.data.filter(row => {
              const filter = (ctx.filtersManager as FiltersManager).activeFilter;
              return filter.shouldShowRow(row);
            }).map((row, iRow) => (
              <TableRow key={iRow}>
                {row.map((cellValue, iCell) => {
                  const column = ctx.csv.header[iCell];
                  return (
                    <CellValue key={iCell} column={column} cellValue={cellValue} />
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        )}
      </GridContext.Consumer>
    );
  }

}
