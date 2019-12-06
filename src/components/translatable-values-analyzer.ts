
export interface TranslatableValuesAnalyser {
  hasWhiteColorMarker(value: string): boolean;
  hasBlackColorMarker(value: string): boolean;
  isByeMarker(value: string): boolean;
}

const notInitializedMessage = 'The language support is not initialized properly.';

export const unsupportedTranslator: TranslatableValuesAnalyser = {
  hasWhiteColorMarker: (_: string): boolean => {
    throw Error(notInitializedMessage);
  },
  hasBlackColorMarker: (_: string): boolean => {
    throw Error(notInitializedMessage);
  },
  isByeMarker: (_: string): boolean => {
    throw Error(notInitializedMessage);
  }
}

const frLangSupport: TranslatableValuesAnalyser = {
  hasWhiteColorMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase().endsWith('B');
  },
  hasBlackColorMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase().endsWith('N');
  },
  isByeMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase() === 'EXE';
  }
}

const enLangSupport: TranslatableValuesAnalyser = {
  hasWhiteColorMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase().endsWith('W');
  },
  hasBlackColorMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase().endsWith('B');
  },
  isByeMarker: (value: string): boolean => {
    return value && value.trim().toUpperCase() === 'BYE';
  }
}

export const getTranslatableValuesAnalyzer = (lang: string): TranslatableValuesAnalyser => {
  if (!lang) {
    throw Error('lang must be defined');
  }
  switch (lang.trim().toLowerCase()) {
    case 'fr': return frLangSupport;
    case 'en': return enLangSupport;
    default: throw Error(`Unsupported language: ${lang}`);
  }
}
