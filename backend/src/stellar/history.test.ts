import { describe, expect, it } from 'vitest';
import type { HorizonPayment } from './horizon';
import { reconstructHistory } from './history';

const basePayment = (overrides: Partial<HorizonPayment>): HorizonPayment => ({
  id: '1',
  transactionHash: 'tx-1',
  type: 'payment',
  assetType: 'credit_alphanum4',
  assetCode: 'USDC',
  amount: '500.0000000',
  createdAt: '2026-01-01T00:00:00Z',
  memo: 'RP:7K3QXN',
  ...overrides,
});

describe('reconstructHistory', () => {
  it('keeps payments matching the property memo', () => {
    const payments = [basePayment({})];
    const result = reconstructHistory(payments, '7K3QXN');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      transactionHash: 'tx-1',
      amount: '500.0000000',
      asset: 'USDC',
      paidAt: '2026-01-01T00:00:00Z',
    });
  });

  it('excludes payments with a different property memo', () => {
    const payments = [basePayment({ memo: 'RP:OTHER1' })];
    expect(reconstructHistory(payments, '7K3QXN')).toHaveLength(0);
  });

  it('excludes non-payment operation types (e.g. create_account)', () => {
    const payments = [basePayment({ type: 'create_account' })];
    expect(reconstructHistory(payments, '7K3QXN')).toHaveLength(0);
  });

  it('excludes payments with no memo at all', () => {
    const payments = [basePayment({ memo: undefined })];
    expect(reconstructHistory(payments, '7K3QXN')).toHaveLength(0);
  });

  it('maps a native XLM payment to the XLM asset', () => {
    const payments = [basePayment({ assetType: 'native', assetCode: undefined })];
    const result = reconstructHistory(payments, '7K3QXN');
    expect(result[0].asset).toBe('XLM');
  });
});
