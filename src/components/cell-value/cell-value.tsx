/** @jsx jsx */
import React, { ReactNode } from 'react';
import { CellValueProps } from 'components/cell-value/cell-value-props';
import { CountryFlag } from 'components/country-flag/country-flag';
import { css, jsx, SerializedStyles } from '@emotion/core';
import { GameResultValue } from 'components/cell-value/game-result-value';
import { TableCell } from '@material-ui/core';
import { visibleStyle, hiddenStyle } from 'components/columns/column-styles';

const dataCellStyle = css({
  fontSize: '11px'
});

export class CellValue extends React.Component<CellValueProps> {
  public render(): ReactNode {
    const calculatedStyles = this.calculateStyles();
    return <TableCell css={calculatedStyles}>{this.renderValue()}</TableCell>;
  }

  private renderValue() {
    if (this.props.column.hasSemantics('round')) {
      return <GameResultValue rawResult={this.props.cellValue} />;
    }
    if (this.props.column.hasSemantics('federation')) {
      return <CountryFlag countryCode={this.props.cellValue} />;
    }
    return <span>{this.props.cellValue}</span>;
  }

  private calculateStyles(): Array<SerializedStyles> {
    const visibilityClass = this.props.isVisible ? visibleStyle : hiddenStyle;
    const styles: Array<SerializedStyles> = [dataCellStyle, visibilityClass];
    const columnStyle = this.props.column.styles;
    styles.push(columnStyle);
    return styles;
  }
}
