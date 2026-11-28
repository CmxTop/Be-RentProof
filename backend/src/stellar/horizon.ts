import { Horizon, Networks } from '@stellar/stellar-sdk';

export const HORIZON_TESTNET_URL = 'https://horizon-testnet.stellar.org';
export const NETWORK_PASSPHRASE = Networks.TESTNET;

let server: Horizon.Server | null = null;

export const getHorizonServer = (): Horizon.Server => {
  if (!server) {
    server = new Horizon.Server(HORIZON_TESTNET_URL);
  }
  return server;
};

export type HorizonPayment = {
  id: string;
  transactionHash: string;
  type: string;
  amount?: string;
  assetCode?: string;
  assetType: string;
  to?: string;
  from?: string;
  createdAt: string;
  memo?: string;
};

/**
 * Fetches recent payment operations for an account and normalizes the
 * fields we care about. Horizon's payments collection mixes several
 * operation types, so non-payment entries are filtered out by the caller.
 */
export const fetchAccountPayments = async (
  accountId: string,
  limit = 50,
): Promise<HorizonPayment[]> => {
  const page = await getHorizonServer()
    .payments()
    .forAccount(accountId)
    .order('desc')
    .limit(limit)
    .call();

  const payments = await Promise.all(
    page.records.map(async (record) => {
      const tx = await record.transaction();
      return {
        id: record.id,
        transactionHash: record.transaction_hash,
        type: record.type,
        amount: 'amount' in record ? record.amount : undefined,
        assetCode: 'asset_code' in record ? record.asset_code : undefined,
        assetType: 'asset_type' in record ? record.asset_type : 'native',
        to: 'to' in record ? record.to : undefined,
        from: 'from' in record ? record.from : undefined,
        createdAt: record.created_at,
        memo: tx.memo ?? undefined,
      } satisfies HorizonPayment;
    }),
  );

  return payments;
};
