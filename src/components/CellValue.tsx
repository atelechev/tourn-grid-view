/** @jsx jsx */
import React, { ReactNode } from 'react';
import { isRoundColumn, calculateColumnVisibility } from './column-utils';
import { TableCell } from '@material-ui/core';
import { columnStyles } from './column-styles';
import { css, jsx, SerializedStyles } from '@emotion/core';
import { GridContext, GridState } from './GridContext';
import { GameResultValue } from './GameResultValue';


const dataCellStyle = css({
  fontSize: '11px',
});


interface CellValueProps {
  column: string,
  cellValue: any
}

export class CellValue extends React.Component<CellValueProps> {

  public render(): ReactNode {
    const { column, cellValue } = this.props;
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => {
          const calculatedStyles = this.calculateStyles(column, ctx.shownColumns);
          return (
            <TableCell css={calculatedStyles}>
              {isRoundColumn(column) ? (
                <GameResultValue rawResult={cellValue} />
              ) : (
                  cellValue
                )}
            </TableCell>
          );
        }}
      </GridContext.Consumer>
    );
  }

  private calculateStyles(column: string, shownColumns: Array<string>): Array<SerializedStyles> {
    const visibilityClass = calculateColumnVisibility(column, shownColumns);
    const styles: Array<SerializedStyles> = [dataCellStyle, visibilityClass];
    const columnStyle = columnStyles.get(column);
    if (columnStyle) {
      styles.push(columnStyle);
    }
    return styles;
  }

}
