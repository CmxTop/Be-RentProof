import { Account, Transaction, TransactionBuilder } from '@stellar/stellar-sdk';
import { describe, expect, it, vi } from 'vitest';

const sourceAccount = 'GBVDKJD7MRKJRMT3TQ2BXPSTY4EWSHVEPXVSY7GWNBVKBCCIVCPL3ZFB';
const destination = 'GDAKEYWJHXEBNBMHGHCXJWORODYKJVOSVRCTW6KDE3JYEI23WUTSVXAJ';
const issuer = 'GDCVIZ2GVG6SC7PRIL5NB5MWER67WXGDE75VYN5YZ2FSPMJE5THONA2G';

vi.mock('./horizon', async () => {
  const actual = await vi.importActual<typeof import('./horizon')>('./horizon');
  return {
    ...actual,
    getHorizonServer: () => ({
      loadAccount: async (accountId: string) => new Account(accountId, '100'),
    }),
  };
});

const { buildPaymentTransactionXdr } = await import('./payments');

describe('buildPaymentTransactionXdr', () => {
  it('builds a native XLM payment tagged with the property memo', async () => {
    const xdr = await buildPaymentTransactionXdr({
      sourceAccount,
      destination,
      asset: 'XLM',
      amount: '500',
      propertyCode: '7K3QXN',
    });

    const tx = TransactionBuilder.fromXDR(xdr, 'Test SDF Network ; September 2015') as Transaction;
    expect(new TextDecoder().decode(tx.memo.value as Uint8Array)).toBe('RP:7K3QXN');
    expect(tx.operations).toHaveLength(1);
  });

  it('requires an issuer for non-native assets like USDC', async () => {
    await expect(
      buildPaymentTransactionXdr({
        sourceAccount,
        destination,
        asset: 'USDC',
        amount: '500',
        propertyCode: '7K3QXN',
      }),
    ).rejects.toThrow(/issuer/i);
  });

  it('builds a USDC payment when an issuer is provided', async () => {
    const xdr = await buildPaymentTransactionXdr({
      sourceAccount,
      destination,
      asset: 'USDC',
      amount: '500',
      propertyCode: '7K3QXN',
      assetIssuer: issuer,
    });

    const tx = TransactionBuilder.fromXDR(xdr, 'Test SDF Network ; September 2015');
    expect(tx.operations).toHaveLength(1);
  });

  it('rejects a property code that would overflow the memo byte limit', async () => {
    await expect(
      buildPaymentTransactionXdr({
        sourceAccount,
        destination,
        asset: 'XLM',
        amount: '500',
        propertyCode: 'X'.repeat(30),
      }),
    ).rejects.toThrow(/memo/i);
  });
});
