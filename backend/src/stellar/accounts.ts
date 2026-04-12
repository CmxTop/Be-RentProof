export type StellarAccount = {
  publicKey: string;
  label: 'tenant' | 'landlord';
};

export const createAccountReference = (publicKey: string, label: StellarAccount['label']): StellarAccount => ({
  publicKey,
  label,
});

