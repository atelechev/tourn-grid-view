/** @jsx jsx */
import React, { ReactNode } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { calculateColumnVisibility } from './column-utils';
import { jsx } from '@emotion/core';
import { GridContext } from './GridContext';

export default class GridData extends React.Component {

  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {ctx => (
          <TableBody>
            {ctx.csv.data.map((row, iRow) => (
              <TableRow key={iRow}>
                {row.map((cellValue, iCell) => {
                  const columnName = ctx.csv.header[iCell];
                  const visibilityClass = calculateColumnVisibility(columnName, ctx.shownColumns);
                  return (
                    <TableCell key={iCell} css={visibilityClass}>
                      {cellValue}
                    </TableCell>
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
