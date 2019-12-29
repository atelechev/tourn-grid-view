import RatingFilter from './rating-filter';

describe('RatingFilter', () => {
  const allOptions = [
    950,
    1100,
    1300,
    1500,
    1700,
    1900,
    2100,
    2300,
    2500,
    2700
  ];

  it('set selectableOptions detects the rating group of <1000', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [750, 820, 960];
    expect(filter.selectableOptions).toEqual(['---', '<1000']);
  });

  it('set selectableOptions detects the rating group of 1000-1199', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [1000, 1100, 1199];
    expect(filter.selectableOptions).toEqual(['---', '1000 - 1199']);
  });

  it('set selectableOptions detects the rating group of 1200-1399', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [1200, 1300, 1399];
    expect(filter.selectableOptions).toEqual(['---', '1200 - 1399']);
  });

  it('set selectableOptions detects the rating group of 1400-1599', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [1400, 1500, 1599];
    expect(filter.selectableOptions).toEqual(['---', '1400 - 1599']);
  });

  it('set selectableOptions detects the rating group of 1600-1799', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [1600, 1700, 1799];
    expect(filter.selectableOptions).toEqual(['---', '1600 - 1799']);
  });

  it('set selectableOptions detects the rating group of 1800-1999', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [1800, 1900, 1999];
    expect(filter.selectableOptions).toEqual(['---', '1800 - 1999']);
  });

  it('set selectableOptions detects the rating group of 2000-2199', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [2000, 2100, 2199];
    expect(filter.selectableOptions).toEqual(['---', '2000 - 2199']);
  });

  it('set selectableOptions detects the rating group of 2200-2399', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [2200, 2300, 2399];
    expect(filter.selectableOptions).toEqual(['---', '2200 - 2399']);
  });

  it('set selectableOptions detects the rating group of 2400-2599', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [2400, 2500, 2599];
    expect(filter.selectableOptions).toEqual(['---', '2400 - 2599']);
  });

  it('set selectableOptions detects the rating group of >2600', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = [2600, 2700, 2899];
    expect(filter.selectableOptions).toEqual(['---', '>2600']);
  });

  it('set selectableOptions detects all available options', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = allOptions;
    expect(filter.selectableOptions).toEqual([
      '---',
      '<1000',
      '1000 - 1199',
      '1200 - 1399',
      '1400 - 1599',
      '1600 - 1799',
      '1800 - 1999',
      '2000 - 2199',
      '2200 - 2399',
      '2400 - 2599',
      '>2600'
    ]);
  });

  it('shouldShowRow should return false if row is undefined', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = allOptions;
    expect(filter.shouldShowRow(undefined)).toBe(false);
  });

  it('shouldShowRow should return false if row is an empty array', () => {
    const filter = new RatingFilter();
    filter.selectableOptions = allOptions;
    expect(filter.shouldShowRow([])).toBe(false);
  });

  it('shouldShowRow should return true if selectedValue is undefined', () => {
    const filter = new RatingFilter();
    const sampleRow = [1, 1650];
    filter.selectableOptions = allOptions;
    filter.selectedValue = undefined;
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return true if selectedValue is ---', () => {
    const filter = new RatingFilter();
    const sampleRow = [1, 1650];
    filter.selectableOptions = allOptions;
    filter.selectedValue = '---';
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return true if filteredColumnIndex is not set', () => {
    const filter = new RatingFilter();
    const sampleRow = [1, 1650];
    filter.selectableOptions = allOptions;
    filter.selectedValue = '1800 - 1999';
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return true if filteredColumnIndex is >= than the length of the row array', () => {
    const filter = new RatingFilter();
    const sampleRow = [1, 1650];
    filter.selectableOptions = allOptions;
    filter.selectedValue = '1800 - 1999';
    filter.filteredColumnIndex = sampleRow.length;
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return true if the target value in the row matches the selected value', () => {
    const filter = new RatingFilter();
    const sampleRow = [1, 1850];
    filter.selectableOptions = allOptions;
    filter.selectedValue = '1800 - 1999';
    filter.filteredColumnIndex = 1;
    expect(filter.shouldShowRow(sampleRow)).toBe(true);
  });

  it('shouldShowRow should return false if the target value in the row does not match the selected value', () => {
    const filter = new RatingFilter();
    const sampleRow = [1, 1350];
    filter.selectableOptions = allOptions;
    filter.selectedValue = '1800 - 1999';
    filter.filteredColumnIndex = 1;
    expect(filter.shouldShowRow(sampleRow)).toBe(false);
  });
});
