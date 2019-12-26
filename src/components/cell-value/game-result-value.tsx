/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import { GameResultValueProps } from './game-result-value-props';
import { I18nContext } from '../context/i18n-context';

const cellStyle = css({
  width: '28px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '90%'
});

const cellFrameStyle = css({
  borderRadius: '3px',
  border: '1px solid #e0e0e0'
});

const whiteColorStyle = css({
  backgroundColor: '#ffffff'
});

const blackColorStyle = css({
  backgroundColor: '#e0e0e0'
});

const voidGameStyle = css({
  backgroundColor: '#f5deb3'
});

export class GameResultValue extends React.Component<GameResultValueProps> {
  private _rawNormalized: string | undefined;

  private _resultExists: boolean;

  constructor(props: GameResultValueProps) {
    super(props);
  }

  private normalizeRawResult(): string | undefined {
    if (this.props.rawResult) {
      const normalized = this.props.rawResult
        .trim()
        .toUpperCase()
        .replace(/\s/g, '');
      return normalized.length > 0 ? normalized : undefined;
    }
    return undefined;
  }

  public render(): ReactNode {
    this._rawNormalized = this.normalizeRawResult();
    this._resultExists = (this._rawNormalized &&
      this._rawNormalized.length > 0) as boolean;
    return (
      <I18nContext.Consumer>
        {(ctx: I18nContext) => {
          const cellStyles = this.calculateStyles(ctx);
          return <div css={cellStyles}>{this.getResultForOutput(ctx)}</div>;
        }}
      </I18nContext.Consumer>
    );
  }

  private getResultForOutput(ctx: I18nContext): string {
    if (this._resultExists) {
      const fullOutput = this._rawNormalized as string;
      if (this.isGameColorKnown(ctx)) {
        return fullOutput.substring(0, fullOutput.length - 1);
      }
      return fullOutput;
    }
    return '.';
  }

  private isGameColorKnown(ctx: I18nContext): boolean {
    const rawResult = this._rawNormalized as string;
    return (rawResult &&
      (ctx.i18nProvider.hasWhiteColorMarker(rawResult) ||
        ctx.i18nProvider.hasBlackColorMarker(rawResult))) as boolean;
  }

  private isForfeitGame(ctx: I18nContext): boolean {
    const rawResult = this._rawNormalized as string;
    return (rawResult &&
      (ctx.i18nProvider.isByeMarker(rawResult) ||
        rawResult.startsWith('>') ||
        rawResult.startsWith('<'))) as boolean;
  }

  private calculateStyles(ctx: I18nContext): Array<SerializedStyles> {
    const styles: Array<SerializedStyles> = [cellStyle];
    if (this._resultExists) {
      styles.push(cellFrameStyle);
      const rawResult = this._rawNormalized as string;
      if (this.isForfeitGame(ctx)) {
        styles.push(voidGameStyle);
      } else if (ctx.i18nProvider.hasWhiteColorMarker(rawResult)) {
        styles.push(whiteColorStyle);
      } else if (ctx.i18nProvider.hasBlackColorMarker(rawResult)) {
        styles.push(blackColorStyle);
      }
    }
    return styles;
  }
}
