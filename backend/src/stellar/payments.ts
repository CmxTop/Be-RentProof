import { Asset, BASE_FEE, Memo, Operation, TransactionBuilder } from '@stellar/stellar-sdk';
import { buildPropertyMemo } from '../lib/propertyCode';
import { getHorizonServer, NETWORK_PASSPHRASE } from './horizon';

export type PaymentInstruction = {
  sourceAccount: string;
  destination: string;
  asset: 'USDC' | 'XLM';
  amount: string;
  propertyCode: string;
  /** Required for USDC: the asset issuer's account id. */
  assetIssuer?: string;
};

const resolveAsset = (instruction: PaymentInstruction): Asset => {
  if (instruction.asset === 'XLM') return Asset.native();
  if (!instruction.assetIssuer) {
    throw new Error('assetIssuer is required for non-native assets like USDC');
  }
  return new Asset(instruction.asset, instruction.assetIssuer);
};

/**
 * Builds an unsigned Stellar payment transaction tagged with the
 * property's memo, returned as XDR for the client to sign (e.g. with
 * Freighter) and submit.
 */
export const buildPaymentTransactionXdr = async (instruction: PaymentInstruction): Promise<string> => {
  const memo = buildPropertyMemo(instruction.propertyCode);
  const account = await getHorizonServer().loadAccount(instruction.sourceAccount);

  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({
        destination: instruction.destination,
        asset: resolveAsset(instruction),
        amount: instruction.amount,
      }),
    )
    .addMemo(Memo.text(memo))
    .setTimeout(180)
    .build();

  return transaction.toXDR();
};

export const submitSignedTransaction = async (signedXdr: string) => {
  const transaction = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
  return getHorizonServer().submitTransaction(transaction);
};
