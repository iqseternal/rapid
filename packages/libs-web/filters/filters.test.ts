import { StringFilters, NumberFilters } from '.';

describe('StringFilters', () => {
  it('should convert void 0 or null to a valid string', () => {
    expect(StringFilters.toValidStr(void 0, '-')).toBe('-');
    expect(StringFilters.toValidStr(null, '-')).toBe('-');
  });

  it('should convert an empty string to a valid string', () => {
    expect(StringFilters.toValidStr('', '-')).toBe('-');
  });

  it('should return the original string if it is valid', () => {
    expect(StringFilters.toValidStr('hello', '-')).toBe('hello');
  });
});

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

  it('should convert a number to scientific notation', () => {
    expect(NumberFilters.toScientificCount(1234567.89)).toBe('1.235E6');
  });

  it('should return 0 for void 0 or null values in scientific notation', () => {
    expect(NumberFilters.toScientificCount(void 0)).toBe('0E0');
    expect(NumberFilters.toScientificCount(null)).toBe('0E0');
  });

  it('should convert a number to a currency string', () => {
    expect(NumberFilters.toCurrency(1000.12, 'CNY')).toBe('¥1,000.12');
  });

  it('should return the currency string with default value for void 0 or null values', () => {
    expect(NumberFilters.toCurrency(void 0, 'CNY')).toBe('¥0.00');
    expect(NumberFilters.toCurrency(null, 'CNY')).toBe('¥0.00');
  });

  it('should convert a number to a string', () => {
    expect(NumberFilters.toString(1000.12)).toBe('1000.12');
  });

  it('should return an empty string for void 0 or null values', () => {
    expect(NumberFilters.toString(void 0, '')).toBe('');
    expect(NumberFilters.toString(null, '')).toBe('');
  });
});
