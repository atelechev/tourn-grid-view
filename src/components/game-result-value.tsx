/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';

interface GameResultValueProps {
  rawResult: string;
}

const cellStyle = css({
  width: '40px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const cellFrameStyle = css({
  borderRadius: '3px',
  border: '1px solid #e0e0e0',
});

const whiteColorStyle = css({
  backgroundColor: '#ffffff',
});

const blackColorStyle = css({
  backgroundColor: '#e0e0e0',
});

const voidGameStyle = css({
  backgroundColor: '#f5deb3',
});

// const resultPattern = /([+-=])(\d+)([BbNn])/g;

export class GameResultValue extends React.Component<GameResultValueProps> {
  private readonly _rawNormalized: string | undefined;

  private readonly _resultExists: boolean;

  constructor(props: GameResultValueProps) {
    super(props);
    this._rawNormalized = this.normalizeRawResult();
    this._resultExists = (this._rawNormalized && this._rawNormalized.length > 0) as boolean;
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
    const cellStyles = this.calculateStyles();
    return <div css={cellStyles}>{this.getResultForOutput()}</div>;
  }

  private getResultForOutput(): string {
    if (this._resultExists) {
      const fullOutput = this._rawNormalized as string;
      if (this.isGameColorKnown()) {
        return fullOutput.substring(0, fullOutput.length - 1);
      }
      return fullOutput;
    }
    return '.';
  }

  private isGameColorKnown(): boolean {
    const rawResult = this._rawNormalized as string;
    return (rawResult && (rawResult.endsWith('B') || rawResult.endsWith('N'))) as boolean;
  }

  private isForfeitGame(): boolean {
    const rawResult = this._rawNormalized as string;
    return (rawResult
      && (rawResult === 'EXE' || rawResult.startsWith('>') || rawResult.startsWith('<'))) as boolean;
  }

  private calculateStyles(): Array<SerializedStyles> {
    const styles: Array<SerializedStyles> = [cellStyle];
    if (this._resultExists) {
      styles.push(cellFrameStyle);
      const rawResult = this._rawNormalized as string;
      if (this.isForfeitGame()) {
        styles.push(voidGameStyle);
      } else if (rawResult.endsWith('B')) {
        styles.push(whiteColorStyle);
      } else if (rawResult.endsWith('N')) {
        styles.push(blackColorStyle);
      }
    }

    return styles;
  }
}
