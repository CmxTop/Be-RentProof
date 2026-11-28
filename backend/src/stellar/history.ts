import type Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { buildPropertyMemo } from '../lib/propertyCode';
import { fetchAccountPayments, type HorizonPayment } from './horizon';

export type ReconstructedPayment = {
  transactionHash: string;
  amount: string;
  asset: string;
  paidAt: string;
};

/**
 * Pure filtering/mapping logic: given a landlord account's raw Horizon
 * payments and a property's memo tag, pick out the payments that belong
 * to that property. Kept separate from any network/DB I/O so it can be
 * unit tested against fixture data instead of live Horizon responses.
 */
export const reconstructHistory = (
  payments: HorizonPayment[],
  propertyCode: string,
): ReconstructedPayment[] => {
  const memo = buildPropertyMemo(propertyCode);

  return payments
    .filter((payment) => payment.type === 'payment' && payment.memo === memo)
    .map((payment) => ({
      transactionHash: payment.transactionHash,
      amount: payment.amount ?? '0',
      asset: payment.assetType === 'native' ? 'XLM' : payment.assetCode ?? 'UNKNOWN',
      paidAt: payment.createdAt,
    }));
};

type PropertyRow = {
  id: string;
  landlord_id: string;
  property_code: string;
};

type LandlordRow = {
  wallet_address: string;
};

/**
 * Indexes any new on-chain payments for a property into the local DB.
 * Idempotent: transaction_hash is unique, so re-running is safe.
 */
export const indexPropertyPayments = async (
  db: Database.Database,
  property: PropertyRow,
): Promise<number> => {
  const landlord = db
    .prepare('SELECT wallet_address FROM landlords WHERE id = ?')
    .get(property.landlord_id) as LandlordRow | undefined;

  if (!landlord) return 0;

  const rawPayments = await fetchAccountPayments(landlord.wallet_address);
  const matches = reconstructHistory(rawPayments, property.property_code);

  const insert = db.prepare(
    `INSERT OR IGNORE INTO rent_payments (id, property_id, transaction_hash, amount, asset, memo, paid_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );

  const memo = buildPropertyMemo(property.property_code);
  let inserted = 0;
  for (const payment of matches) {
    const result = insert.run(
      randomUUID(),
      property.id,
      payment.transactionHash,
      payment.amount,
      payment.asset,
      memo,
      payment.paidAt,
    );
    inserted += result.changes;
  }

  return inserted;
};
