import { isConnected, requestAccess, signTransaction } from '@stellar/freighter-api';

export const isFreighterAvailable = async (): Promise<boolean> => {
  const result = await isConnected();
  return !result.error && result.isConnected;
};

export const connectFreighter = async (): Promise<string> => {
  const result = await requestAccess();
  if (result.error) {
    throw new Error(result.error.message ?? 'Freighter access was denied');
  }
  return result.address;
};

export const signWithFreighter = async (xdr: string, networkPassphrase: string): Promise<string> => {
  const result = await signTransaction(xdr, { networkPassphrase });
  if (result.error) {
    throw new Error(result.error.message ?? 'Freighter signing failed');
  }
  return result.signedTxXdr;
};
