/** @jsx jsx */
import React, { ReactNode } from 'react';
import { calculateColumnVisibility } from '../columns/column-utils';
import { CellValueProps } from './cell-value-props';
import { columnStylesHandler } from '../columns/column-styles-handler';
import { CountryFlag } from '../country-flag/country-flag';
import { css, jsx, SerializedStyles } from '@emotion/core';
import { GameResultValue } from './game-result-value';
import { GridContext, GridState } from '../grid-context';
import { isFederationColumn } from '../columns/column-federation';
import { isRoundColumn } from '../columns/column-round';
import { TableCell } from '@material-ui/core';

const dataCellStyle = css({
  fontSize: '11px'
});

export class CellValue extends React.Component<CellValueProps> {
  public render(): ReactNode {
    const { column, cellValue } = this.props;
    return (
      <GridContext.Consumer>
        {(ctx: GridState) => {
          const calculatedStyles = this.calculateStyles(
            column,
            ctx.shownColumns
          );
          return (
            <TableCell css={calculatedStyles}>
              {this.renderValue(column, cellValue)}
            </TableCell>
          );
        }}
      </GridContext.Consumer>
    );
  }

  private renderValue(column: string, cellValue: any) {
    if (isRoundColumn(column)) {
      return <GameResultValue rawResult={cellValue} />;
    }
    if (isFederationColumn(column)) {
      return <CountryFlag countryCode={cellValue} />;
    }
    return cellValue;
  }

  private calculateStyles(
    column: string,
    shownColumns: Array<string>
  ): Array<SerializedStyles> {
    const visibilityClass = calculateColumnVisibility(column, shownColumns);
    const styles: Array<SerializedStyles> = [dataCellStyle, visibilityClass];
    const columnStyle = columnStylesHandler.get(column);
    if (columnStyle) {
      styles.push(columnStyle);
    }
    return styles;
  }
}
