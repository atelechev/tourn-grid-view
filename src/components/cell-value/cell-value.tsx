/** @jsx jsx */
import React, { ReactNode } from 'react';
import { CellValueProps } from './cell-value-props';
import { columnStylesHandler } from '../columns/column-styles-handler';
import { CountryFlag } from '../country-flag/country-flag';
import { css, jsx, SerializedStyles } from '@emotion/core';
import { GameResultValue } from './game-result-value';
import { isFederationColumn } from '../columns/federation';
import { isRoundColumn } from '../columns/round';
import { TableCell } from '@material-ui/core';
import { visibleStyle, hiddenStyle } from '../columns/column-styles';

const dataCellStyle = css({
  fontSize: '11px'
});

export class CellValue extends React.Component<CellValueProps> {
  public render(): ReactNode {
    const calculatedStyles = this.calculateStyles();
    return <TableCell css={calculatedStyles}>{this.renderValue()}</TableCell>;
  }

  private renderValue() {
    if (isRoundColumn(this.props.column)) {
      return <GameResultValue rawResult={this.props.cellValue} />;
    }
    if (isFederationColumn(this.props.column)) {
      return <CountryFlag countryCode={this.props.cellValue} />;
    }
    return <span>{this.props.cellValue}</span>;
  }

  private calculateStyles(): Array<SerializedStyles> {
    const visibilityClass = this.props.isVisible ? visibleStyle : hiddenStyle;
    const styles: Array<SerializedStyles> = [dataCellStyle, visibilityClass];
    const columnStyle = columnStylesHandler.get(this.props.column);
    styles.push(columnStyle);
    return styles;
  }
}
