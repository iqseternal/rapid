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

