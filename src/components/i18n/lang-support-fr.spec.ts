import { langSupportFr } from 'components/i18n/lang-support-fr';

describe('hasWhiteColorMarker', () => {
  it('should return false if value is undefined', () => {
    expect(langSupportFr.hasWhiteColorMarker(undefined)).toBe(false);
  });

  it('should return false if value does not end with B', () => {
    expect(langSupportFr.hasWhiteColorMarker('1W')).toBe(false);
  });

  it('should return true if value ends with B', () => {
    expect(langSupportFr.hasWhiteColorMarker('+1B')).toBe(true);
  });

  it('should return true if value ends with B case insensitive', () => {
    expect(langSupportFr.hasWhiteColorMarker('+1b')).toBe(true);
  });

  it('should return true if untrimmed value ends with B', () => {
    expect(langSupportFr.hasWhiteColorMarker(' +1B ')).toBe(true);
  });
});

describe('hasBlackColorMarker', () => {
  it('should return false if value is undefined', () => {
    expect(langSupportFr.hasBlackColorMarker(undefined)).toBe(false);
  });

  it('should return false if value does not end with N', () => {
    expect(langSupportFr.hasBlackColorMarker('1m')).toBe(false);
  });

  it('should return true if value ends with N', () => {
    expect(langSupportFr.hasBlackColorMarker('+1N')).toBe(true);
  });

  it('should return true if value ends with N case insensitive', () => {
    expect(langSupportFr.hasBlackColorMarker('+1n')).toBe(true);
  });

  it('should return true if untrimmed value ends with N', () => {
    expect(langSupportFr.hasBlackColorMarker(' +1N ')).toBe(true);
  });
});

describe('isByeMarker', () => {
  it('should return false if value is undefined', () => {
    expect(langSupportFr.isByeMarker(undefined)).toBe(false);
  });

  it('should return true if value is EXE', () => {
    expect(langSupportFr.isByeMarker('EXE')).toBe(true);
  });

  it('should return true if value is EXE case insensitive', () => {
    expect(langSupportFr.isByeMarker('exe')).toBe(true);
  });

  it('should return true if value is EXE untrimmed', () => {
    expect(langSupportFr.isByeMarker(' EXE ')).toBe(true);
  });

  it('should return false if value is not EXE', () => {
    expect(langSupportFr.isByeMarker('bye')).toBe(false);
  });
});

describe('translate', () => {
  it('should return expected translation for control-panel.filter-by', () => {
    expect(langSupportFr.translate('control-panel.filter-by')).toEqual(
      'Filtrer par'
    );
  });

  it('should return expected translation for control-panel.show-only', () => {
    expect(langSupportFr.translate('control-panel.show-only')).toEqual(
      'Afficher seulement'
    );
  });

  it('should return expected translation for control-panel.filter-by', () => {
    expect(langSupportFr.translate('control-panel.visible-columns')).toEqual(
      'Colonnes affichées'
    );
  });

  it('should return expected translation for dialog.ok', () => {
    expect(langSupportFr.translate('dialog.ok')).toEqual('OK');
  });

  it('should return expected translation for header-tools.about', () => {
    expect(langSupportFr.translate('header-tools.about')).toEqual(
      'A propos de ce composant'
    );
  });

  it('should return expected translation for header-tools.about.text', () => {
    expect(langSupportFr.translate('header-tools.about.text')).toEqual(
      'Ce projet sur Github:'
    );
  });

  it('should return expected translation for header-tools.show-panel', () => {
    expect(langSupportFr.translate('header-tools.show-panel')).toEqual(
      'Afficher le panneau de contrôle'
    );
  });
});
