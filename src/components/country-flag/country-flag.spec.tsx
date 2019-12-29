import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { CountryFlag } from './country-flag';

describe('CountryFlag component', () => {
  const assertSvgHasExpectedSizeAndChildrenCount = (
    svg: any,
    childrenCount: number
  ): void => {
    expect(svg).toBeTruthy();
    expect(svg.props.width).toEqual(30);
    expect(svg.props.height).toEqual(20);
    expect(svg.children.length).toEqual(childrenCount);
  };

  it('should render the unknown flag if the country code is not mapped', () => {
    const props = { countryCode: 'XXX' };
    const flag = renderer.create(<CountryFlag {...props} />).toJSON();
    expect(flag.type).toEqual('div');
    expect(flag.props.title).toEqual('XXX');
    expect(flag.children.length).toEqual(1);
    const svg = flag.children[0];
    assertSvgHasExpectedSizeAndChildrenCount(svg, 2);
    expect(svg.children[1].children[0]).toEqual('?');
  });

  it('should render the FIDE flag if the country code is FIDE', () => {
    const props = { countryCode: 'FIDE' };
    const flag = renderer.create(<CountryFlag {...props} />).toJSON();
    expect(flag.type).toEqual('div');
    expect(flag.props.title).toEqual('FIDE');
    expect(flag.children.length).toEqual(1);
    const svg = flag.children[0];
    assertSvgHasExpectedSizeAndChildrenCount(svg, 15);
  });

  it('should render an expected flag if the code is mapped', () => {
    const props = { countryCode: 'FRA' };
    const flag = renderer.create(<CountryFlag {...props} />).toJSON();
    expect(flag.type).toEqual('img');
    expect(flag.props.title).toEqual('FRA');
    expect(flag.props.src).toEqual(
      'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/fr.svg'
    );
    expect(flag.props.width).toEqual(30);
    expect(flag.props.height).toEqual(20);
    expect(flag.props.alt).toEqual('Country flag: FRA');
    expect(flag.children).toBeNull();
  });
});
