/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import { TableCell } from '@material-ui/core';
import {
  isRoundColumn,
  calculateColumnVisibility
} from '../columns/column-utils';
import { isFederationColumn } from '../columns/column-federation';
import { columnStyles } from '../columns/column-styles';
import { GridContext, GridState } from '../grid-context';
import { GameResultValue } from './game-result-value';
import { CountryFlag } from '../country-flag/country-flag';
import { CellValueProps } from './cell-value-props';

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
    const columnStyle = columnStyles.get(column);
    if (columnStyle) {
      styles.push(columnStyle);
    }
    return styles;
  }
}
