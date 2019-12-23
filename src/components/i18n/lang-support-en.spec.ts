import { langSupportEn } from './lang-support-en';

describe('hasWhiteColorMarker', () => {
  it('should return false if value is undefined', () => {
    expect(langSupportEn.hasWhiteColorMarker(undefined)).toBe(false);
  });

  it('should return false if value does not end with W', () => {
    expect(langSupportEn.hasWhiteColorMarker('1V')).toBe(false);
  });

  it('should return true if value ends with W', () => {
    expect(langSupportEn.hasWhiteColorMarker('+1W')).toBe(true);
  });

  it('should return true if value ends with W case insensitive', () => {
    expect(langSupportEn.hasWhiteColorMarker('+1w')).toBe(true);
  });

  it('should return true if untrimmed value ends with W', () => {
    expect(langSupportEn.hasWhiteColorMarker(' +1W ')).toBe(true);
  });
});

describe('hasBlackColorMarker', () => {
  it('should return false if value is undefined', () => {
    expect(langSupportEn.hasBlackColorMarker(undefined)).toBe(false);
  });

  it('should return false if value does not end with B', () => {
    expect(langSupportEn.hasBlackColorMarker('1C')).toBe(false);
  });

  it('should return true if value ends with B', () => {
    expect(langSupportEn.hasBlackColorMarker('+1B')).toBe(true);
  });

  it('should return true if value ends with B case insensitive', () => {
    expect(langSupportEn.hasBlackColorMarker('+1b')).toBe(true);
  });

  it('should return true if untrimmed value ends with B', () => {
    expect(langSupportEn.hasBlackColorMarker(' +1B ')).toBe(true);
  });
});

describe('isByeMarker', () => {
  it('should return false if value is undefined', () => {
    expect(langSupportEn.isByeMarker(undefined)).toBe(false);
  });

  it('should return true if value is BYE', () => {
    expect(langSupportEn.isByeMarker('BYE')).toBe(true);
  });

  it('should return true if value is BYE case insensitive', () => {
    expect(langSupportEn.isByeMarker('bye')).toBe(true);
  });

  it('should return true if value is BYE untrimmed', () => {
    expect(langSupportEn.isByeMarker(' BYE ')).toBe(true);
  });

  it('should return false if value is not BYE', () => {
    expect(langSupportEn.isByeMarker('EXE')).toBe(false);
  });

});

describe('translate', () => {
  it('should return expected translation for control-panel.filter-by', () => {
    expect(langSupportEn.translate('control-panel.filter-by')).toEqual('Filter by');
  });

  it('should return expected translation for control-panel.show-only', () => {
    expect(langSupportEn.translate('control-panel.show-only')).toEqual('Show only');
  });

  it('should return expected translation for control-panel.filter-by', () => {
    expect(langSupportEn.translate('control-panel.visible-columns')).toEqual('Shown columns');
  });

});
