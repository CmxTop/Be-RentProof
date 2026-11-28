import { Keypair, TransactionBuilder } from '@stellar/stellar-sdk';
import type Database from 'better-sqlite3';
import { Router } from 'express';
import { z } from 'zod';
import { createDemoAccount } from '../stellar/accounts';
import { NETWORK_PASSPHRASE, getHorizonServer } from '../stellar/horizon';
import { buildPaymentTransactionXdr, submitSignedTransaction } from '../stellar/payments';

const buildSchema = z.object({
  sourceAccount: z.string().min(1),
  propertyCode: z.string().min(1),
});

const submitSchema = z.object({
  signedXdr: z.string().min(1),
});

const demoPaySchema = z.object({
  propertyCode: z.string().min(1),
});

type PropertyRow = {
  landlord_id: string;
  rent_amount: string;
  currency: 'USDC' | 'XLM';
};

type LandlordRow = {
  wallet_address: string;
};

export const createPaymentsRouter = (db: Database.Database): Router => {
  const router = Router();

  const lookupPropertyAndLandlord = (propertyCode: string) => {
    const property = db
      .prepare('SELECT landlord_id, rent_amount, currency FROM properties WHERE property_code = ?')
      .get(propertyCode) as PropertyRow | undefined;
    if (!property) return null;

    const landlord = db
      .prepare('SELECT wallet_address FROM landlords WHERE id = ?')
      .get(property.landlord_id) as LandlordRow | undefined;
    if (!landlord) return null;

    return { property, landlord };
  };

  // Real flow: build an unsigned transaction for the client to sign with Freighter.
  router.post('/build', async (req, res) => {
    const parsed = buildSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const found = lookupPropertyAndLandlord(parsed.data.propertyCode);
    if (!found) {
      res.status(404).json({ error: 'Property or landlord not found' });
      return;
    }

    try {
      const xdr = await buildPaymentTransactionXdr({
        sourceAccount: parsed.data.sourceAccount,
        destination: found.landlord.wallet_address,
        asset: found.property.currency,
        amount: found.property.rent_amount,
        propertyCode: parsed.data.propertyCode,
      });
      res.json({ xdr, networkPassphrase: NETWORK_PASSPHRASE });
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to build transaction' });
    }
  });

  // Real flow: submit a transaction the client already signed with Freighter.
  router.post('/submit', async (req, res) => {
    const parsed = submitSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    try {
      const result = await submitSignedTransaction(parsed.data.signedXdr);
      res.json({ transactionHash: result.hash });
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to submit transaction' });
    }
  });

  // DEMO MODE ONLY: funds a disposable Testnet account and pays in one shot,
  // for judges without the Freighter extension installed. Never used for
  // real tenant funds.
  router.post('/demo-pay', async (req, res) => {
    const parsed = demoPaySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const found = lookupPropertyAndLandlord(parsed.data.propertyCode);
    if (!found) {
      res.status(404).json({ error: 'Property or landlord not found' });
      return;
    }

    try {
      // Friendbot only funds XLM (no USDC trustline), so demo mode always
      // pays a fixed small XLM amount regardless of the property's real
      // configured rent currency/amount.
      const demoTenant = await createDemoAccount('tenant');
      const unsignedXdr = await buildPaymentTransactionXdr({
        sourceAccount: demoTenant.publicKey,
        destination: found.landlord.wallet_address,
        asset: 'XLM',
        amount: '10',
        propertyCode: parsed.data.propertyCode,
      });

      const keypair = Keypair.fromSecret(demoTenant.secret);
      const transaction = TransactionBuilder.fromXDR(unsignedXdr, NETWORK_PASSPHRASE);
      transaction.sign(keypair);

      const result = await getHorizonServer().submitTransaction(transaction);
      res.json({ transactionHash: result.hash, demoAccount: demoTenant.publicKey });
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : 'Demo payment failed' });
    }
  });

  return router;
};
