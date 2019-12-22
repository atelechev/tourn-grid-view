/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { CountryFlagProps } from './country-flag-props';
import { countryCodeMappings } from './country-code-mappings';

const COUNTRY_FLAG_WIDTH = 30;

const COUNTRY_FLAG_HEIGHT = 20;

const flagStyle = css({
  border: '1px solid #f5f5f5'
});

export class CountryFlag extends React.Component<CountryFlagProps> {
  private readonly _codeUnknown = 'unknown';

  constructor(props: CountryFlagProps) {
    super(props);
  }

  public render(): ReactNode {
    const targetCode = this.calculateTargetCountryCode();
    const url = `https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/${targetCode}.svg`;
    return (
      <img
        src={url}
        css={flagStyle}
        width={COUNTRY_FLAG_WIDTH}
        height={COUNTRY_FLAG_HEIGHT}
        title={this.props.countryCode}
        alt={`Country flag: ${this.props.countryCode}`}
      />
    );
  }

  private calculateTargetCountryCode(): string {
    const { countryCode } = this.props;
    if (countryCode) {
      return (
        countryCodeMappings.get(countryCode.trim().toUpperCase()) ||
        this._codeUnknown
      );
    }
    return this._codeUnknown;
  }
}
