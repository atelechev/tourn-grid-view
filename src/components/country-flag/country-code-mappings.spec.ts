import { mapCountryCode } from 'components/country-flag/country-code-mappings';

describe('mapCountryCode', () => {
  it('should return undefined if the arg is undefined', () => {
    expect(mapCountryCode(undefined)).toBeUndefined();
  });

  it('should return undefined if the code is not mapped', () => {
    expect(mapCountryCode('XXXX')).toBeUndefined();
  });

  it('should return expected code for valid arg', () => {
    expect(mapCountryCode('FRA')).toEqual('fr');
  });

  it('should return expected code for valid arg untrimmed', () => {
    expect(mapCountryCode(' GER ')).toEqual('de');
  });

  it('should return expected code for valid arg case insensitive', () => {
    expect(mapCountryCode('esp')).toEqual('es');
  });
});
