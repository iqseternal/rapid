import { StringFilters, NumberFilters } from '.';

describe('NumberFilters', () => {
  it('should format a number to a fixed number of decimal places', () => {
    expect(NumberFilters.toFixed(3.1415926, 2)).toBe(3.14);
  });

  it('should return 0.00 for void 0 or null values', () => {
    expect(NumberFilters.toFixed(void 0, 2)).toBe(0);
    expect(NumberFilters.toFixed(null, 2)).toBe(0);
  });

  it('should convert a number to a percentage string', () => {
    expect(NumberFilters.toPercentage(0.111111, 2)).toBe('11.11%');
  });

  it('should return a default percentage string for void 0 or null values', () => {
    expect(NumberFilters.toPercentage(void 0, 2)).toBe('0%');
    expect(NumberFilters.toPercentage(null, 2)).toBe('0%');
  });

  it('should convert a number to a string', () => {
    expect(NumberFilters.toString(1000.12)).toBe('1000.12');
  });

  it('should return an empty string for void 0 or null values', () => {
    expect(NumberFilters.toString(void 0, '')).toBe('');
    expect(NumberFilters.toString(null, '')).toBe('');
  });
});
