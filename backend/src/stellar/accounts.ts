import { Keypair } from '@stellar/stellar-sdk';

export type StellarAccount = {
  publicKey: string;
  secret: string;
  label: 'tenant' | 'landlord';
};

const FRIENDBOT_URL = 'https://friendbot.stellar.org';

/**
 * DEMO MODE ONLY: generates a disposable Testnet keypair and funds it via
 * Friendbot, so the payment flow is clickable for judges without a
 * Freighter wallet installed. Never used for real tenant/landlord funds —
 * the real flow signs client-side with Freighter and never sees a secret.
 */
export const createDemoAccount = async (label: StellarAccount['label']): Promise<StellarAccount> => {
  const keypair = Keypair.random();

  const response = await fetch(`${FRIENDBOT_URL}/?addr=${encodeURIComponent(keypair.publicKey())}`);
  if (!response.ok) {
    throw new Error(`Friendbot funding failed for demo account: ${response.statusText}`);
  }

  return {
    publicKey: keypair.publicKey(),
    secret: keypair.secret(),
    label,
  };
};
