/** @jsx jsx */
import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { css, jsx } from '@emotion/core';

const tableStyle = css({
  width: 600
});

export default class TournamentGrid extends React.Component {
  public render(): ReactNode {
    return (
      <div>
        <Paper>
          <Table css={tableStyle} size="small" aria-label="Tournament grid table">
            <TableHead>
              <TableRow>
                <TableCell>TODO1</TableCell>
                <TableCell>TODO2</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      </div>
    );
  }
}
