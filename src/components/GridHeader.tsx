/** @jsx jsx */
import React, { ReactNode } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { calculateColumnVisibility } from './column-utils';
import { jsx } from '@emotion/core';
import { GridContext } from './GridContext';

export default class GridHeader extends React.Component {

  public render(): ReactNode {
    return (
      <GridContext.Consumer>
        {ctx => (
          <TableHead>
            <TableRow>
              {ctx.csv.header.map((columnName, index) => {
                const visibilityClass = calculateColumnVisibility(columnName, ctx.shownColumns);
                return (
                  <TableCell key={index} css={visibilityClass}>
                    {columnName}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        )}
      </GridContext.Consumer>
    );
  }

}
