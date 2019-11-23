import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { GridContext } from './GridContext';
import { CellValue } from './CellValue';


export default class GridData extends React.Component {

  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {ctx => (
          <TableBody>
            {ctx.csv.data.map((row, iRow) => (
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
