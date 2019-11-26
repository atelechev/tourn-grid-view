const compareAsStrings = (val1: number, val2: number): number => {
  const str1 = val1.toString();
  const str2 = val2.toString();
  return str1.localeCompare(str2);
};

const compareAsNumbers = (val1: any, val2: any): number => {
  const num1 = parseFloat(val1);
  const num2 = parseFloat(val2);
  if (isNaN(num1)) {
    if (isNaN(num2)) {
      return compareAsStrings(val1, val2);
    }
    return 1;
  }
  if (isNaN(num2)) {
    return -1;
  }
  if (num1 === num2) {
    return 0;
  }
  return num1 > num2 ? 1 : -1;
};

export const compareOptionalValues = (val1: any | undefined, val2: any | undefined): number => {
  if (val1 === undefined) {
    if (val2 === undefined) {
      return 0;
    }
    return 1;
  }
  if (val2 === undefined) {
    return -1;
  }
  return compareAsNumbers(val1, val2);
};
