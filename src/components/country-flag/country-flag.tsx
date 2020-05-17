/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';
import { CountryFlagProps } from 'components/country-flag/country-flag-props';
import { mapCountryCode } from 'components/country-flag/country-code-mappings';

const COUNTRY_FLAG_WIDTH = 30;

const COUNTRY_FLAG_HEIGHT = 20;

const flagStyle = css({
  border: '1px solid #f5f5f5'
});

const getUnknownFlag = (countryCode: string): ReactNode => (
  <div title={countryCode}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={COUNTRY_FLAG_WIDTH}
      height={COUNTRY_FLAG_HEIGHT}
    >
      <rect
        fill="#999999"
        stroke="none"
        width={COUNTRY_FLAG_WIDTH}
        height={COUNTRY_FLAG_HEIGHT}
      />
      <text
        fontSize="22px"
        fontFamily="sans-serif"
        fill="#ffffff"
        stroke="none"
        x="9.2889196"
        y="18.038869"
      >
        ?
      </text>
    </svg>
  </div>
);

const fideFlag: ReactNode = (
  <div title="FIDE">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 133 89"
      width={COUNTRY_FLAG_WIDTH}
      height={COUNTRY_FLAG_HEIGHT}
    >
      <path
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="1.5"
        d="m 161.25,23.625 a 61.75,37.5 0 1 1 -123.5,0 61.75,37.5 0 1 1 123.5,0 z"
        transform="translate(-33.25,17.75)"
      />
      <path
        fill="none"
        stroke="#334166"
        strokeWidth="1px"
        d="m 27.75,11.875 c 18.652225,11.03337 59.300331,10.50497 76.375,0"
      />
      <path
        fill="none"
        stroke="#334166"
        strokeWidth="1px"
        d="m 27.75,70.688934 c 18.652225,-11.03337 59.300331,-10.50497 76.375,0"
      />
      <path
        fill="none"
        stroke="#334166"
        strokeWidth="1px"
        d="m 4.2536892,41.568603 124.0309508,0"
      />
      <path
        fill="none"
        stroke="#334166"
        strokeWidth="1px"
        d="m 11.313708,58.440981 c 23.06936,-10.079188 89.714172,-7.969511 109.778332,0"
      />
      <path
        fill="none"
        stroke="#334166"
        strokeWidth="1px"
        d="m 11.313708,24.122953 c 23.06936,10.079189 89.714172,7.969511 109.778332,0"
      />
      <path
        fill="#334166"
        stroke="#000000"
        strokeWidth="0.5"
        d="M 61.65252,33.427399 C 51.840632,37.42585 44.784907,46.828685 49.760842,56.1471 c 18.380737,12.154494 6.204373,14.908063 -3.68145,15.253132 l 0,10.049937 40.95946,0 0,-10.476598 C 68.752891,70.327533 71.708955,61.9147 85.118878,55.933769 l -0.08958,-3.809747 C 78.791582,50.325007 80.800439,44.171559 82.665577,38.973993 87.58187,22.807893 80.613787,14.813879 63.785826,12.841004 61.24704,11.233574 60.130215,9.7666104 58.079234,7.8277369 l 0,6.0799201 c -2.094536,0.323181 -4.577858,1.572823 -5.919922,3.413288 -2.037689,2.794423 -2.41006,4.419881 -11.946509,11.733179 -1.473498,3.009416 1.200949,5.745251 3.946615,5.759924 L 55.14594,31.934086 c 2.586012,-0.966189 5.395525,-0.401359 6.50658,1.493313 z"
      />
      <path
        fill="#7f7f7f"
        stroke="#7f7f7f"
        strokeWidth="0.168"
        d="m 52.049556,57.75 c 0.467169,0.337765 0.896328,0.678264 1.3125,1 l 26.512944,0 c 0.521842,-0.336497 1.07085,-0.669838 1.65625,-1 z"
      />
      <path
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="0.168"
        d="m 50.78125,56.84375 c 0.504472,0.345792 0.983665,0.669969 1.4375,1 l 29.15625,0 c 0.594593,-0.33929 1.216496,-0.670143 1.875,-1 l -32.46875,0 z"
      />
      <path
        fill="#7f7f7f"
        stroke="#7f7f7f"
        strokeWidth="0.168"
        d="m 49.65625,55.9375 c 0.03692,0.07182 0.02226,0.146943 0.0606,0.21875 0.411362,0.272019 0.80638,0.51857 1.1875,0.78125 l 32.182139,0 c 0.665022,-0.33761 1.310061,-0.675108 2.038507,-1 z"
      />
      <path
        fill="#334166"
        stroke="#334166"
        strokeWidth="0.5"
        d="m -14.75,-13.25 c -0.142295,0 -0.25,0.107705 -0.25,0.25 l 0,127.5 c 0,0.1423 0.107705,0.25 0.25,0.25 l 164.75,0 c 0.1423,0 0.25,-0.1077 0.25,-0.25 l 0,-127.5 c 0,-0.142295 -0.1077,-0.25 -0.25,-0.25 l -164.75,0 z m 81,17.125 c 34.10358,0 61.75,16.789322 61.75,37.5 0,20.710678 -27.64642,37.5 -61.75,37.5 -34.103583,0 -61.75,-16.789322 -61.75,-37.5 0,-20.710678 27.646417,-37.5 61.75,-37.5 z"
      />
      <path
        fill="#ffffff"
        stroke="none"
        d="m 49.099727,74.018175 7.999145,0 0,0.928078 -6.098796,0 0,4.02167 6.098796,0 0,1.016466 -6.054601,0 0,4.993941 -1.988738,0 z"
      />
      <path
        fill="#ffffff"
        stroke="none"
        d="m 57.97885,73.973981 6.071452,0 0,1.07751 -1.995325,0 0,8.902791 1.987282,0 0,1.0939 -6.087125,0 0,-1.086318 2.049505,0 0,-8.982465 -2.021883,0 z"
      />
      <path
        fill="#ffffff"
        stroke="none"
        d="m 65,73.9375 0,11.03125 6.46875,0 c 1.991267,-0.10391 3.198874,-2.483934 3.198874,-5.852903 0.07751,-3.441294 -1.332697,-5.159917 -3.198874,-5.147097 z M 71.046415,75 c 2.476692,2.462124 1.878528,7.164446 0,8.96875 l -4.046415,0 0,-8.9375 z"
      />
      <path
        fill="#ffffff"
        stroke="none"
        d="m 76,74 8,0 0,1 -5.96875,0 0,3.957864 6.029354,0 0,1.010886 -6.029354,0 0,4 5.96875,0 0,1.0625 -8,0 z"
      />
    </svg>
  </div>
);

export class CountryFlag extends React.Component<CountryFlagProps> {
  constructor(props: CountryFlagProps) {
    super(props);
  }

  public render(): ReactNode {
    const targetCode = mapCountryCode(this.props.countryCode);
    if (!targetCode) {
      return getUnknownFlag(this.props.countryCode);
    }
    if (targetCode === 'fide') {
      return fideFlag;
    }
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
}
