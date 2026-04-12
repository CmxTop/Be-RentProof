export type PaymentInstruction = {
  asset: 'USDC' | 'XLM';
  amount: string;
  destination: string;
  memo: string;
};

export const buildPaymentInstruction = (instruction: PaymentInstruction) => ({
  ...instruction,
  status: 'ready-for-stellar-sdk',
});

