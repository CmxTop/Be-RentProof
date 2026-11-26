import { describe, expect, it } from 'vitest';
import { MEMO_MAX_BYTES, buildPropertyMemo, generatePropertyCode } from './propertyCode';

describe('generatePropertyCode', () => {
  it('generates a 6-character code', () => {
    expect(generatePropertyCode()).toHaveLength(6);
  });

  it('avoids ambiguous characters (0, O, 1, I)', () => {
    for (let i = 0; i < 200; i += 1) {
      const code = generatePropertyCode();
      expect(code).not.toMatch(/[0O1I]/);
    }
  });

  it('is reasonably unique across many generations', () => {
    const codes = new Set(Array.from({ length: 500 }, () => generatePropertyCode()));
    expect(codes.size).toBeGreaterThan(490);
  });
});

describe('buildPropertyMemo', () => {
  it('prefixes the property code for memo tagging', () => {
    expect(buildPropertyMemo('7K3QXN')).toBe('RP:7K3QXN');
  });

  it('fits within the Stellar MEMO_TEXT byte limit', () => {
    const memo = buildPropertyMemo(generatePropertyCode());
    expect(Buffer.byteLength(memo, 'utf8')).toBeLessThanOrEqual(MEMO_MAX_BYTES);
  });

  it('rejects a property code that would exceed the memo byte limit', () => {
    expect(() => buildPropertyMemo('X'.repeat(30))).toThrow();
  });
});
