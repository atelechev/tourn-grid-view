import { langUnsupported } from './lang-unsupported';

describe('langUnsupported', () => {
  const expectedMessage = 'The language support is not initialized properly.';

  it('hasWhiteColorMarker should throw expected Error no matter the arg', () => {
    expect(() => langUnsupported.hasWhiteColorMarker(undefined)).toThrow(
      expectedMessage
    );
  });

  it('hasBlackColorMarker should throw expected Error no matter the arg', () => {
    expect(() => langUnsupported.hasBlackColorMarker(undefined)).toThrow(
      expectedMessage
    );
  });

  it('isByeMarker should throw expected Error no matter the arg', () => {
    expect(() => langUnsupported.isByeMarker(undefined)).toThrow(
      expectedMessage
    );
  });

  it('translate should throw expected Error no matter the arg', () => {
    expect(() => langUnsupported.translate(undefined)).toThrow(expectedMessage);
  });
});
